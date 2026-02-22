import { test, expect, describe } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Sanitizer Component Isolation Tests', () => {
    test('noop-third-party.js executes safely and overrides variables without throwing', () => {
        const stubPath = path.resolve(__dirname, '../../public/stubs/noop-third-party.js');
        const content = fs.readFileSync(stubPath, 'utf8');

        // Create an isolated mock window context
        const sandboxWindow = {};
        const executionContext = new Function('window', content);

        // Execute the generated static payload
        executionContext(sandboxWindow);

        // Verify it successfully stubbed the tracking execution
        expect(sandboxWindow.__MIRROR_STUB__).toBe(true);
    });

    test('network-guard.js payload contains the valid blocked hosts from configuration', () => {
        const guardPath = path.resolve(__dirname, '../../public/stubs/network-guard.js');
        const content = fs.readFileSync(guardPath, 'utf8');

        // Verify the static injection embedded the Cloudflare and PostHog domains
        expect(content).toContain('static.cloudflareinsights.com');
        expect(content).toContain('us-assets.i.posthog.com');
        expect(content).toContain('XMLHttpRequest.prototype.open');
        expect(content).toContain('navigator.sendBeacon');
    });
});
