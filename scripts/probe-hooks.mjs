import fs from 'fs';

const token = 'vca_6Yt2PUuJVsXtEkMa8M9NxCY1w6BkLFf1rjzgvxPHfa2fIm3wwb1Noaan';
const projectId = 'prj_H30oqz84KgkMJ4PoKWvTHMYhjMIK';

async function tryEndpoint(url, body) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    console.log(url, res.status, await res.text());
}

async function main() {
    await tryEndpoint(`https://api.vercel.com/v1/integrations/deploy-hooks`, { projectId, name: 'Daily Update', ref: 'master' });
    await tryEndpoint(`https://api.vercel.com/v1/projects/${projectId}/deploy-hooks`, { name: 'Daily Update', ref: 'master' });
}

main();
