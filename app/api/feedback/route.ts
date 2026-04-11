export async function POST(request: Request) {
  const { message } = await request.json()

  if (!message?.trim()) {
    return Response.json({ error: 'empty' }, { status: 400 })
  }

  const webhook = process.env.SLACK_WEBHOOK_URL
  if (!webhook) {
    return Response.json({ error: 'not configured' }, { status: 500 })
  }

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `*ThinkSpeak feedback*\n${message.trim()}`,
    }),
  })

  return Response.json({ ok: true })
}
