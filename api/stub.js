export default function handler(req, res) {
    // Allow all CORS origins for stub APIs to prevent CORS console errors.
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    // Return a 200 OK with no content to satisfy analytics scripts without throwing errors.
    res.status(200).send('')
}
