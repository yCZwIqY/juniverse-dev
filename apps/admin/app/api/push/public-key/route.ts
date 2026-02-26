export const runtime = 'nodejs';

export async function GET() {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return Response.json({ error: 'API_URL is not configured' }, { status: 500 });
  }

  const upstreamRes = await fetch(new URL('/api/notifications/push/public-key', apiUrl), {
    cache: 'no-store',
  });

  if (!upstreamRes.ok) {
    const message = await upstreamRes.text().catch(() => 'Failed to fetch VAPID public key');
    return Response.json({ error: message }, { status: upstreamRes.status || 502 });
  }

  return Response.json(await upstreamRes.json());
}

