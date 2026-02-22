import { fileURLToPath } from 'url';
import path from 'path';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, '..');

console.log(`Starting automated refresh pipeline in ${projectDir}`);

// Sequence of commands to run the refresh pipeline
const commands = [
    'node scripts/mirror/capture-html.mjs',
    'node scripts/mirror/extract-static-refs.mjs',
    'node scripts/mirror/build-manifest.mjs',
    'node scripts/mirror/download-assets.mjs',
    'node scripts/mirror/sanitize-third-party.mjs',
    'node scripts/mirror/rewrite-html.mjs'
];

function runCommand(index) {
    if (index >= commands.length) {
        console.log('Automated refresh pipeline completed successfully.');
        return;
    }

    const cmd = commands[index];
    console.log(`Running: ${cmd}`);

    const process = exec(cmd, { cwd: projectDir });

    process.stdout.on('data', (data) => {
        console.log(data.trim());
    });

    process.stderr.on('data', (data) => {
        console.error(data.trim());
    });

    process.on('close', (code) => {
        if (code !== 0) {
            console.error(`Command failed with exit code ${code}: ${cmd}`);
            process.exit(1);
        } else {
            console.log(`Command succeeded: ${cmd}`);
            runCommand(index + 1);
        }
    });
}

runCommand(0);
