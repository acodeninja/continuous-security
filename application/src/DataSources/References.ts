import {CVE} from './References/CVE';
import {CWE} from './References/CWE';
import {OSV} from './References/OSV';
import {Emitter} from '../Emitter';

export class References {
  private cveDataset: CVE = new CVE();
  private cweDataset: CWE = new CWE();
  private osvDataset: OSV = new OSV();
  private cachedReferences: Record<string, ReportOutputIssueReference>;
  private emitter: Emitter;

  constructor(emitter: Emitter) {
    this.emitter = emitter;
  }

  async getAll(references: Array<string>):
    Promise<Array<ReportOutputIssueReference>> {
    const expandedReferences: Record<string, ReportOutputIssueReference> = {
      ...this.cachedReferences,
    };
    const referencesToProcess = Array.from(references);
    const processedReferences = [];

    while (referencesToProcess.length > 0) {
      const ref = referencesToProcess.pop();

      if (!ref) continue;

      processedReferences.push(ref);

      if (expandedReferences[ref]) continue;

      const slug = ref.toLowerCase();
      this.emitter.emit('report:reference', `fetching details for ${ref}`);

      try {
        if (slug.indexOf('cwe') === 0) {
          expandedReferences[ref] = this.cweDataset.getById(ref.toUpperCase());
        } else if (slug.indexOf('cve') === 0) {
          expandedReferences[ref] = await this.cveDataset.getById(ref.toUpperCase());
        } else {
          expandedReferences[ref] = await this.osvDataset.getById(ref);
        }
      } catch (e) {
        this.emitter.emit(
          'report:reference:failure',
          `Failed to fetch vulnerability reference ${ref}`,
        );
      }

      if (expandedReferences[ref]?.dataSourceSpecific?.osv?.aliases) {
        expandedReferences[ref].dataSourceSpecific.osv.aliases
          .forEach(a => {
            if (!expandedReferences[ref]) referencesToProcess.push(a);
            if (!processedReferences.includes(a)) referencesToProcess.push(a);
          });
      }
    }

    this.cachedReferences = expandedReferences;

    const outputReferences = Object.values(this.cachedReferences)
      .filter(r => processedReferences.includes(r.label));

    outputReferences.sort((a, b) =>
      (a.label < b.label) ? -1 : ((a.label > b.label) ? 1 : 0));

    return outputReferences;
  }
}
