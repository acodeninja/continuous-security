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

    const [weakness] = select(`//*[local-name(.)='Weakness' and @ID='${parsedId}']`, this.data);

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
        description: queryable.find('Description')
          .first()
          .text()
          .replace(/(\r\n|\n|\r)/gm, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
        url: `https://cwe.mitre.org/data/definitions/${parsedId}.html`,
      };
    }

    throw new CWEDoesNotExist();
  }
}
