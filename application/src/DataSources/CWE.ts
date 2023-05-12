import {DOMParser} from '@xmldom/xmldom';
import XmlReader from 'xml-reader';
import XmlQuery from 'xml-query';
import {select} from 'xpath';

import CWEDataset from '../assets/cwe.xml';

export class CWEDoesNotExist extends Error {
  message = 'Could not find CWE';
}

export class CWE {
  private data = (new DOMParser()).parseFromString(CWEDataset);

  getById(id: string, issue?: ScanReportIssue): ReportOutputIssueReference {
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
        description: this.tidyString(queryable.find('Description').first().text()),
        url: `https://cwe.mitre.org/data/definitions/${parsedId}.html`,
        dataSourceSpecific: {
          cwe: {
            extendedDescription: this.tidyString(queryable.find('Extended_Description').first().text()),
            background: this.tidyString(queryable.find('Background_Detail').first().text()),
            consequences: queryable.find('Consequence').map(node => {
              node = XmlQuery(node);
              return {
                scope: this.tidyString(node.find('Scope').text()),
                impact: this.tidyString(node.find('Impact').text()),
                note: this.tidyString(node.find('Note').text()),
              };
            }),
            mitigations: queryable.find('Mitigation').map(node => {
              node = XmlQuery(node);
              return {
                phase: this.tidyString(node.find('Phase').text()),
                description: this.tidyString(node.find('Description').text()),
                effectiveness: this.tidyString(node.find('Effectiveness').text()),
                notes: this.tidyString(node.find('Effectiveness_Notes').text()),
              };
            }),
          }
        }
      };
    }

    throw new CWEDoesNotExist();
  }

  private tidyString(input: string) {
    return input.replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
}
