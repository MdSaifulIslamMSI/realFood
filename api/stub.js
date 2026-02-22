export default function handler(req, res) {
    // Return a dummy JavaScript payload for GET requests (script tags)
    // and empty 200 OK for POST requests (analytics beacons)
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200).send('/* strict mirror third-party stub */\nwindow.__MIRROR_STUB__ = true;\n');
}
