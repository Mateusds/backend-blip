import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const endpoints = [
      '/monitoring/tickets?version=2',
      '/monitoring/ticket-metrics?version=2',
      '/monitoring/teams?version=2',
      '/monitoring/waiting-tickets?version=2'
    ];

    const results = await Promise.all(
      endpoints.map(uri =>
        fetch('https://msging.net/commands', {
          method: 'POST',
          headers: {
            Authorization: `Key ${process.env.BLIP_HTTP_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: crypto.randomUUID(),
            to: 'postmaster@desk.msging.net',
            method: 'get',
            uri
          })
        }).then(r => r.json())
      )
    );

    res.setHeader('Cache-Control', 's-maxage=30');
    return res.status(200).json({
      tickets: results[0].resource,
      metrics: results[1].resource,
      teams: results[2].resource,
      waiting: results[3].resource
    });

  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao montar dashboard', detail: error.message });
  }
}
