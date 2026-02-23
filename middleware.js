export const config = {
    matcher: '/stubs/:path*',
};

export default function middleware(request) {
    // If a tracking script attempts to POST or OPTIONS to a static stub file, Vercel will 
    // normally throw a 405 Method Not Allowed because static files only support GET.
    // We intercept the request at the Edge before Vercel's static router even sees it.

    if (request.method === 'POST' || request.method === 'OPTIONS') {
        const ALLOWED_ORIGINS = ['https://clone-smoky-xi.vercel.app'];
        const origin = request.headers.get('Origin') || '';
        const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : 'null';

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
