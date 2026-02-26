export const runtime = 'nodejs';

export async function POST(req: Request) {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return Response.json({ error: 'API_URL is not configured' }, { status: 500 });
  }

  const body = await req.text();
  const authorization = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

  const upstreamRes = await fetch(new URL('/api/notifications/push/subscribe', apiUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authorization ? { Authorization: authorization } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body,
    cache: 'no-store',
  });

  if (!upstreamRes.ok) {
    const message = await upstreamRes.text().catch(() => 'Failed to subscribe push');
    return Response.json({ error: message }, { status: upstreamRes.status || 502 });
  }

  return Response.json(await upstreamRes.json());
}

