#!/usr/bin/env node

import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const applicationDir = resolve(__dirname, '..');
const buildDir = resolve(applicationDir, 'build');

const pkg = JSON.parse(readFileSync(resolve(applicationDir, 'package.json'), 'utf8'));

delete pkg.devDependencies;
delete pkg.scripts;
pkg.type = 'commonjs';
pkg.files = ['continuous-security', 'package.json', 'README.md'];
pkg.bin = { 'continuous-security': 'continuous-security' };

writeFileSync(resolve(buildDir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
copyFileSync(resolve(applicationDir, '..', 'README.md'), resolve(buildDir, 'README.md'));
