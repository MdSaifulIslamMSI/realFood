function isAllowedOrigin(origin) {
    if (!origin) return false;
    if (origin === 'https://clone-smoky-xi.vercel.app') return true;
    if (process.env.ALLOWED_ORIGIN && origin === process.env.ALLOWED_ORIGIN) return true;
    if (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`) return true;
    if (/^https:\/\/[a-zA-Z0-9_-]+\.vercel\.app$/.test(origin)) return true;
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
    return false;
}

export default function handler(req, res) {
    const origin = req.headers.origin || '';
    const allowedOrigin = isAllowedOrigin(origin) ? origin : 'null';

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
