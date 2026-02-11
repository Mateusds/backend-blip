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
        to: 'postmaster@desk.msging.net',
        method: 'get',
        uri: '/monitoring/tickets-per-hour?version=2'
      })
    });

    const data = await response.json();

    if (data.status !== 'success') {
      return res.status(502).json({ error: 'Blip failure', detail: data.reason });
    }

    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(data.resource);

  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao consultar tickets por hora', detail: error.message });
  }
}
