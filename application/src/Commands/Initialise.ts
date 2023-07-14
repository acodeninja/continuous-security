import select from '@inquirer/select';
import checkbox from '@inquirer/checkbox';
import {input} from '@inquirer/prompts';
import {Command, InvalidArgumentError} from 'commander';
import {stringify as YAMLStringify} from 'yaml';
import {writeFile} from 'fs/promises';
import {resolve} from 'path';

import availableScanners from '../scanners.json';

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

      const configurationNeeded = chosenScanners.map(s => availableScanners.scanners.find(e => e.name === s))
        .filter(s => s.runConfiguration);

      console.log(`The following scanners require additional configuration ${configurationNeeded.map(s => s.name)}`);

      const configuration: ConfigurationFile = {scanners: chosenScanners.map(a => `@continuous-security/scanner-${a}`)};

      for (const c of configurationNeeded) {
        console.log(`Configuring ${c.name}`);
        const configIndex = configuration.scanners.findIndex(s => s === `@continuous-security/scanner-${c.name}`);

        configuration.scanners[configIndex] = {
          name: `@continuous-security/scanner-${c.name}`,
          with: {},
        };

        for (const [propName, _propInfo] of Object.entries(c.runConfiguration)) {
          (configuration.scanners[configIndex] as ScannerConfiguration).with[propName] = await input({message: `Enter value for ${propName}`});
        }
      }

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

      console.log('Success! Scan your project with continuous-security scan');
    });
};
