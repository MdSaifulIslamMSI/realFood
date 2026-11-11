/**
 * Minimal CSP auditor used by deployment smoke checks.
 *
 * The production policy intentionally allows `style-src 'unsafe-inline'` for
 * React's runtime style injection, while script execution stays hash-based.
 * A global substring search for "unsafe-inline" therefore produces false
 * positives; the audit must distinguish script directives from style ones.
 */

const SCRIPT_DIRECTIVES = ["script-src", "script-src-elem", "script-src-attr"];

const normalizeToken = (token) => token.trim().replace(/^'+|'+$/g, "").toLowerCase();

export const auditCsp = (header) => {
    const value = typeof header === "string" ? header.trim() : "";
    const directives = new Map();

    for (const part of value.split(";")) {
        const [name, ...tokens] = part.trim().split(/\s+/).filter(Boolean);
        if (!name) continue;
        directives.set(name.toLowerCase(), tokens.map(normalizeToken));
    }

    const scriptTokens = SCRIPT_DIRECTIVES.flatMap((name) => directives.get(name) ?? []);

    return {
        present: value.length > 0,
        hasScriptSrc: directives.has("script-src"),
        hasUnsafeInlineScript: scriptTokens.includes("unsafe-inline"),
        hasUnsafeEval: [...directives.values()].flat().includes("unsafe-eval"),
    };
};
