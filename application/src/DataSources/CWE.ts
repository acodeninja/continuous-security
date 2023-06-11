import {DOMParser} from '@xmldom/xmldom';
import XmlReader from 'xml-reader';
import XmlQuery from 'xml-query';
import {select} from 'xpath';
import {tidyString} from '../Helpers';

import CWEDataset from '../assets/cwe.xml';

export class CWEDoesNotExist extends Error {
  message = 'Could not find CWE';
}

export class CWE {
  private data = (new DOMParser({
    errorHandler: undefined,
  })).parseFromString(CWEDataset);

  getById(id: string): ReportOutputIssueReference {
    const parsedId = id.toLowerCase().replace('cwe-', '');

    const [weakness] = select(`//*[local-name(.)='Weakness' and @id='${parsedId}']`, this.data);

    if (weakness) {
      const queryable = XmlQuery(XmlReader.parseSync(weakness.toString()));
      const attributes = queryable.attr() as {
        ID: string;
        Name: string;
        Abstraction: string;
        Structure: string;
        Status: string;
        xmlns: string;
      };

      return {
        label: id,
        title: attributes.Name,
        description: this.expandCWELinks(tidyString(queryable.find('Description').first().text())),
        directLink: `https://cwe.mitre.org/data/definitions/${parsedId}.html`,
        dataSourceSpecific: {
          cwe: {
            extendedDescription: this.expandCWELinks(tidyString(queryable.find('Extended_Description').first().text())),
            background: this.expandCWELinks(tidyString(queryable.find('Background_Detail').first().text())),
            consequences: this.expandConsequences(queryable.find('Consequence')),
            mitigations: this.expandMitigations(queryable.find('Mitigation')),
          },
        },
      };
    }

    throw new CWEDoesNotExist();
  }

  private expandConsequences(consequencesNodes): ReportOutputIssueReference['dataSourceSpecific']['cwe']['consequences'] {
    const consequences = [];

    consequencesNodes.each(node => {
      node = XmlQuery(node);
      const consequence = {};
      const scopes = node.find('Scope').children().map(n => tidyString(n.value));
      const impacts = node.find('Impact').children().map(n => tidyString(n.value));
      const likelihood = tidyString(node.find('Likelihood').text());
      const note = tidyString(node.find('Note').text());

      consequence['scopeImpacts'] = scopes.map((scope, index) => {
        const scopeImpact = {scope};
        if (impacts[index]) scopeImpact['impact'] = impacts[index];
        return scopeImpact;
      });

      if (likelihood) consequence['likelihood'] = likelihood;
      if (note) consequence['note'] = note;

      consequences.push(consequence);
    });

    return consequences;
  }

  private expandMitigations(mitigationsNodes) {
    const mitigations = [];

    mitigationsNodes.each(node => {
      node = XmlQuery(node);

      mitigations.push({
        phase: node.find('Phase').children().map(p => tidyString(p.value)).join(' / '),
        description: tidyString(node.find('Description').text()),
        effectiveness: tidyString(node.find('Effectiveness').text()),
        notes: tidyString(node.find('Effectiveness_Notes').text()),
      });
    });

    return mitigations;
  }

  private expandCWELinks(text: string): string {
    return text.replace(/(CWE-)(\d+)/gm, '[$1$2](https://cwe.mitre.org/data/definitions/$2.html)');
  }
}
