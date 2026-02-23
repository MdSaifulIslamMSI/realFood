export default function handler(req, res) {
    const ALLOWED_ORIGINS = ['https://clone-smoky-xi.vercel.app'];
    const origin = req.headers.origin || '';
    const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : 'null';

    // Reflect CORS only for explicitly allowed origins; all others receive 'null'.
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    // Return a 200 OK with no content to satisfy analytics scripts without throwing errors.
    res.status(200).send('')
}
