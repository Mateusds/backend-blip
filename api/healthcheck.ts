import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await fetch('https://msging.net/commands', {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.BLIP_HTTP_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        to: 'postmaster@desk.msging.net',
        method: 'get',
        uri: '/monitoring/tickets?version=2'
      })
    });

    return res.status(200).json({ status: 'ok' });

  } catch {
    return res.status(500).json({ status: 'error' });
  }
}
