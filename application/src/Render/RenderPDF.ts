import _ from 'lodash';
const {template} = _;

import {Report} from '../Report';
import {Emitter} from '../Emitter';
import {groupToObjectBy, sortObjectKeysBy} from '../Helpers/Arrays';
import {capitalise} from '../Helpers/Strings';

import PDFTemplate from '../assets/report.pdf.template.md';
import HTMLTemplateWrapper from '../assets/report.html.wrapper.html';
import showdown from 'showdown';
const {Converter: Showdown} = showdown;
import {makeTemporaryFolder} from '../Helpers/Files';
import {readFile, writeFile} from 'fs/promises';
import {resolve} from 'path';
import {executed} from '../Helpers/Processes';
import {buildImage, runImage} from '../Helpers/DockerClient';
import {timezone, toDate, toTime} from '../Helpers/Dates';

export class RenderPDF {
  private report: Report;
  private emitter: Emitter;

  constructor(report: Report, emitter: Emitter) {
    this.report = report;
    this.emitter = emitter;
  }

  async render(): Promise<Buffer> {
    this.emitter.emit('report:render:pdf:started', '');

    const report = await this.report.toObject();
    const convert = new Showdown();

    const innerReport = convert.makeHtml(template(PDFTemplate)({...report, functions: {
      groupToObjectBy,
      sortObjectKeysBy,
      capitalise,
      toDate,
      toTime,
      timezone,
    }}));

    const html = HTMLTemplateWrapper.toString().replace('%%REPORT%%', innerReport);

    const htmlCacheLocation = await makeTemporaryFolder('html-');

    await writeFile(resolve(htmlCacheLocation, 'report.html'), html);

    const pdfPath = resolve(htmlCacheLocation, 'report.pdf');
    const htmlPath = resolve(htmlCacheLocation, 'report.html');

    const chromeExecutables = [
      'google-chrome',
      'chromium',
      '"/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome"',
      '"/Applications/Chromium.app/Contents/MacOS/Chromium"',
    ];

    for (const executable of chromeExecutables) {
      const chromeRun = await executed(
        `${executable} ` +
          '--headless ' + 
          '--disable-gpu ' + 
          '--no-pdf-header-footer ' + 
          `--print-to-pdf="${pdfPath}" `+
          `${htmlPath}`,
      );

      if (chromeRun) {
        this.emitter.emit('report:render:pdf:finished', '');
        return Buffer.from(await readFile(pdfPath));
      }
    }

    this.emitter.emit(
      'report:render:pdf:fallback',
      'Failed to generate with local chrome, falling back to docker',
    );

    const Dockerfile = 'FROM debian:bookworm-slim\n' +
        'RUN apt-get update && apt-get install -y chromium && apt-get clean\n';

    const imageHash = await buildImage({files: {Dockerfile}});

    await runImage({
      imageHash,
      command: [
        'chromium',
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--no-pdf-header-footer',
        '--print-to-pdf=/output/report.pdf',
        '/output/report.html',
      ],
      volumes: {output: htmlCacheLocation},
    });

    this.emitter.emit('report:render:pdf:finished', '');

    return Buffer.from(await readFile(pdfPath));
  }
}
