export default async function handler(req, res) {
    const DEPLOY_HOOK_URL = process.env.DEPLOY_HOOK_URL;

    if (!DEPLOY_HOOK_URL) {
        console.error("No DEPLOY_HOOK_URL found in environment variables.");
        return res.status(500).json({ error: 'Deploy hook URL is not configured' });
    }

    try {
        const response = await fetch(DEPLOY_HOOK_URL, {
            method: 'POST',
        });

        if (response.ok) {
            const data = await response.json();
            return res.status(200).json({ success: true, message: 'Deployment triggered', data });
        } else {
            return res.status(response.status).json({ error: 'Failed to trigger deployment' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
