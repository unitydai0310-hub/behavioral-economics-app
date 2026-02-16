export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not set');
      return new Response(JSON.stringify({ error: 'Notification system not configured' }), { status: 500 });
    }

    const discordMessage = {
      content: '📩 **新しいフィードバックが届きました**',
      embeds: [
        {
          title: 'フィードバック内容',
          color: 0x00ff00, // Green
          fields: [
            { name: 'お名前', value: name || '未設定', inline: true },
            { name: 'メール', value: email || '未設定', inline: true },
            { name: 'メッセージ', value: message },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('[FEEDBACK API] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
}
