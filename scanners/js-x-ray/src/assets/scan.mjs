#!/usr/bin/env node

import {runASTAnalysis} from "@nodesecure/js-x-ray";
import {getToken} from "@nodesecure/i18n";
import {lookup} from "mime-types";
import _ from "lodash";
import {readdirSync, lstatSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

const getAllFiles = (root = '/target') => {
  return readdirSync(root)
    .map(item =>
      lstatSync(join(root, item)).isDirectory() ?
        getAllFiles(join(root, item)) :
        join(root, item)
    ).flat();
};

const translateSeverity = (severity) => {
  switch (severity) {
    case 'Information':
      return 'info';
    case 'Warning':
      return 'moderate';
    case 'Critical':
      return 'critical';
  }
};

Array.prototype.groupBy = function (field) {
  const grouped = {};

  this.forEach(item => {
    const current = grouped[item[field]] ?? {};

    grouped[item[field]] = _.mergeWith(item, current, function(a, b) {
      if (Array.isArray(a)) {
        return b.concat(a);
      }
    });
  })

  return Object.values(grouped);
};

const analysis = getAllFiles()
  // Filter out non-javascript files
  .filter(path => lookup(path) === 'application/javascript')
  // Filter out minified javascript files
  .filter(path => path.indexOf('.min.') === -1)
  // Read the file's contents
  .map(path => ({
    path: path.replace('/target/', ''),
    file: readFileSync(path).toString('utf-8'),
  }))
  // Pass the file through AST analysis
  .map(({path, file}) => ({path, analysis: runASTAnalysis(file)}))
  // Filter out files without warnings
  .filter(({analysis: {warnings}}) => warnings.length > 0)
  // Create exported report
  .map(({path, analysis}) => analysis.warnings.map(warning => ({
    title: warning.kind,
    severity: warning.severity,
    description: warning.i18n,
    extracts: [{
      path,
      lines: warning.location.map(([line]) => line)
        .filter((element, index, lines) => lines.indexOf(element) === index)
        .map(line => `${line}`),
      code: warning.value,
      language: 'javascript',
    }],
  })))
  // Flatten
  .flat()
  // Group the results by title, merging extracts
  .groupBy('title');

const issues = await Promise.all(analysis.map(async (item) => ({
  ...item,
  title: item.title.split('-').map(w => `${w[0].toUpperCase()}${w.substring(1)}`).join(' '),
  description: await getToken(item.description),
  severity: translateSeverity(item.severity),
})));

console.log(JSON.stringify({issues}, null, 2));
writeFileSync('/output/report.json', JSON.stringify({issues}, null, 2));
