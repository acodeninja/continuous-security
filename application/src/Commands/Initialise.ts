import select from "@inquirer/select";
import checkbox from "@inquirer/checkbox";
import {Command, InvalidArgumentError} from "commander";
import {stringify as YAMLStringify} from "yaml";
import {writeFile} from 'fs/promises';
import {resolve} from "path";

import availableScanners from "../scanners.json";

export const InitialiseCommand = (program: Command) => {
  program.command('init')
    .description('Initialise continuous security configuration')
    .action(async () => {
      console.log('Initialising new continuous security config.');
      const format = await select({
        message: 'Choose a configuration format.',
        choices: [
          {name: 'YAML', value: 'yaml'},
          {name: 'JSON', value: 'json'},
        ],
      });

      const choices = availableScanners.scanners.map(({name, description}) => ({
        name: `${name}: ${description}`,
        value: name,
      }));

      const chosenScanners = await checkbox({
        message: 'Select the scanners you wish to use.',
        choices,
      });

      if (!chosenScanners || chosenScanners.length === 0) throw new InvalidArgumentError('To initialise a project, you must select at least one scanner.');

      const configuration = {scanners: chosenScanners.map(a => `@continuous-security/scanner-${a}`)};

      switch (format) {
        case 'json':
          await writeFile(
            resolve(process.cwd(), '.continuous-security.json'),
            JSON.stringify(configuration, null, 2),
          );
          break;
        case 'yaml':
          await writeFile(
            resolve(process.cwd(), '.continuous-security.yml'),
            YAMLStringify(configuration),
          );
          break;
      }

      console.log("Success! Scan your project with continuous-security scan");
    });
}
