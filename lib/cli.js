#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const parts = process.cwd().split(/[\\\/]+/g);
let cwd = process.cwd();
let installer = 'yarn add';
for (let i = 1; i <= parts.length; ++i) {
    const root = parts
        .slice(0, i)
        .reduce((a, b) => path_1.default.resolve(a, b), path_1.default.resolve('/'));
    console.log({ root }, [
        fs_1.default.existsSync(path_1.default.resolve(root, 'pnpm-lock.yaml')),
        fs_1.default.existsSync(path_1.default.resolve(root, 'package-lock.json')),
        fs_1.default.existsSync(path_1.default.resolve(root, 'yarn.lock')),
        fs_1.default.existsSync(path_1.default.resolve(root, 'package.json')),
    ]);
    if (fs_1.default.existsSync(path_1.default.resolve(root, 'pnpm-lock.yaml'))) {
        installer = 'pnpm add';
        cwd = root;
        break;
    }
    else if (fs_1.default.existsSync(path_1.default.resolve(root, 'package-lock.json'))) {
        installer = 'npm install';
        cwd = root;
        break;
    }
    else if (fs_1.default.existsSync(path_1.default.resolve(root, 'yarn.lock')) ||
        fs_1.default.existsSync(path_1.default.resolve(root, 'package.json'))) {
        installer = 'yarn add';
        cwd = root;
        break;
    }
}
const pkg = (0, os_1.platform)() === 'linux' ? 'nsblob-native' : 'nsblob';
(0, child_process_1.execSync)(`${installer} ${pkg}`, { cwd });
