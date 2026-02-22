/**
 * @module schema – JSON schema validation for mirror pipeline artifacts.
 * Ensures pipeline stages receive well-formed input data.
 */

/**
 * Validate that a value is a non-empty string.
 * @param {*} value
 * @param {string} field
 */
const assertString = (value, field) => {
    if (typeof value !== "string" || value.length === 0) {
        throw new TypeError(`Expected non-empty string for "${field}", got ${typeof value}`);
    }
};

/**
 * Validate that a value is an array.
 * @param {*} value
 * @param {string} field
 */
const assertArray = (value, field) => {
    if (!Array.isArray(value)) {
        throw new TypeError(`Expected array for "${field}", got ${typeof value}`);
    }
};

/**
 * Validate a snapshot manifest (snapshot-manifest.json).
 * @param {object} manifest
 * @throws {TypeError} if the manifest is malformed.
 */
export const validateManifest = (manifest) => {
    if (!manifest || typeof manifest !== "object") {
        throw new TypeError("Manifest must be a non-null object");
    }

    assertString(manifest.sourceOrigin, "sourceOrigin");
    assertString(manifest.capturedAt, "capturedAt");
    assertString(manifest.entryUrl, "entryUrl");
    assertArray(manifest.assets, "assets");

    for (let i = 0; i < manifest.assets.length; i += 1) {
        const asset = manifest.assets[i];
        if (!asset || typeof asset !== "object") {
            throw new TypeError(`assets[${i}] must be a non-null object`);
        }
        assertString(asset.sourceUrl, `assets[${i}].sourceUrl`);
        assertString(asset.localPath, `assets[${i}].localPath`);
    }
};

/**
 * Validate capture metadata (capture-meta.json).
 * @param {object} meta
 * @throws {TypeError} if metadata is malformed.
 */
export const validateCaptureMeta = (meta) => {
    if (!meta || typeof meta !== "object") {
        throw new TypeError("Capture metadata must be a non-null object");
    }

    assertString(meta.sourceOrigin, "sourceOrigin");
    assertString(meta.capturedAt, "capturedAt");
    assertString(meta.htmlSha256, "htmlSha256");

    if (typeof meta.status !== "number") {
        throw new TypeError(`Expected number for "status", got ${typeof meta.status}`);
    }
};

/**
 * Validate static refs (static-refs.json).
 * @param {object} refs
 * @throws {TypeError} if refs are malformed.
 */
export const validateStaticRefs = (refs) => {
    if (!refs || typeof refs !== "object") {
        throw new TypeError("Static refs must be a non-null object");
    }

    assertString(refs.sourceOrigin, "sourceOrigin");
    assertArray(refs.htmlRefs, "htmlRefs");
    assertArray(refs.cssRefs, "cssRefs");
};
