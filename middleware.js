export const config = {
    matcher: '/stubs/:path*',
};

export default function middleware(request) {
    // If a tracking script attempts to POST or OPTIONS to a static stub file, Vercel will 
    // normally throw a 405 Method Not Allowed because static files only support GET.
    // We intercept the request at the Edge before Vercel's static router even sees it.

    if (request.method === 'POST' || request.method === 'OPTIONS') {
        return new Response('', {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }
        });
    }
}
