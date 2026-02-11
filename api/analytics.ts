import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://msging.net/commands', {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.BLIP_HTTP_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        method: 'analytics.query',
        uri: '/analytics',
        resource: { take: 100 }
      })
    });

    const data = await response.json();
    return res.status(200).json(data.resource);

  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao consultar analytics', detail: error.message });
  }
}
