import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch('https://msging.net/commands', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.BLIP_HTTP_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        to: 'postmaster@desk.msging.net',
        method: 'get',
        uri: '/monitoring/tickets?version=2'
      })
    });

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=30');
    res.status(200).json(data.resource);
  } catch (error: any) {
    res.status(500).json({
      error: 'Erro ao consultar tickets',
      detail: error.message
    });
  }
}
