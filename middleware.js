export const config = {
    matcher: '/stubs/:path*',
};

function isAllowedOrigin(origin) {
    if (!origin) return false;
    if (origin === 'https://clone-smoky-xi.vercel.app') return true;
    if (process.env.ALLOWED_ORIGIN && origin === process.env.ALLOWED_ORIGIN) return true;
    if (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`) return true;
    if (/^https:\/\/[a-zA-Z0-9_-]+\.vercel\.app$/.test(origin)) return true;
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
    return false;
}

export default function middleware(request) {
    // If a tracking script attempts to POST or OPTIONS to a static stub file, Vercel will 
    // normally throw a 405 Method Not Allowed because static files only support GET.
    // We intercept the request at the Edge before Vercel's static router even sees it.

    if (request.method === 'POST' || request.method === 'OPTIONS') {
        const origin = request.headers.get('Origin') || '';
        const allowedOrigin = isAllowedOrigin(origin) ? origin : 'null';

        return new Response('', {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
                'Vary': 'Origin',
                'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }
        });
    }
}
