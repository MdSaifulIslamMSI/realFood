import { fileURLToPath } from 'url';
import path from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, '..');

console.log(`Starting automated refresh pipeline in ${projectDir}`);

// Sequence of commands to run the refresh pipeline
const commands = [
    ['node', 'scripts/mirror/capture-html.mjs'],
    ['node', 'scripts/mirror/extract-static-refs.mjs'],
    ['node', 'scripts/mirror/build-manifest.mjs'],
    ['node', 'scripts/mirror/download-assets.mjs'],
    ['node', 'scripts/mirror/sanitize-third-party.mjs'],
    ['node', 'scripts/mirror/verify-sanity.mjs'],
    ['node', 'scripts/mirror/rewrite-html.mjs'],
    ['node', 'scripts/mirror/update-production-csp.mjs']
];

function runCommand(index) {
    if (index >= commands.length) {
        console.log('Automated refresh pipeline completed successfully.');
        return;
    }

    const [cmd, ...args] = commands[index];
    const fullCmd = `${cmd} ${args.join(' ')}`;
    console.log(`Running: ${fullCmd}`);

    const child = spawn(cmd, args, { cwd: projectDir });

    child.stdout.on('data', (data) => {
        console.log(data.toString().trim());
    });

    child.stderr.on('data', (data) => {
        console.error(data.toString().trim());
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`Command failed with exit code ${code}: ${fullCmd}`);
            process.exit(1);
        } else {
            console.log(`Command succeeded: ${fullCmd}`);
            runCommand(index + 1);
        }
    });
}

runCommand(0);
