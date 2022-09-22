#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import { platform } from 'os';
import path from 'path';

const parts = process.cwd().split(/\\\/+/);
let cwd = process.cwd();
let installer = 'yarn add';

for (let i = 0; i < parts.length; ++i) {
	const root = parts
		.slice(0, i)
		.reduce((a, b) => path.resolve(a, b), path.resolve('/'));

	if (fs.existsSync(path.resolve(root, 'pnpm-lock.yaml'))) {
		installer = 'pnpm add';
		cwd = root;
		break;
	} else if (fs.existsSync(path.resolve(root, 'package-lock.json'))) {
		installer = 'npm install';
		cwd = root;
		break;
	} else if (
		fs.existsSync(path.resolve(root, 'yarn.lock')) ||
		fs.existsSync(path.resolve(root, 'package.json'))
	) {
		installer = 'yarn';
		cwd = root;
		break;
	}
}

const pkg = platform() === 'linux' ? 'nsblob-native' : 'nsblob';

execSync(`${installer} ${pkg}`, { cwd });
