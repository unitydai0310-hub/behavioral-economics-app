import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return new Response(JSON.stringify({ 
        error: '通知システムのキー（RESEND_API_KEY）が設定されていません。Vercelまたは.env.localを確認してください。' 
      }), { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: 'Behavioral Economics App <onboarding@resend.dev>',
      to: ['unitydai.0310@gmail.com'],
      subject: '📩 新しいフィードバックが届きました',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">新しいフィードバック</h2>
          <p><strong>お名前:</strong> ${name || '未設定'}</p>
          <p><strong>メール:</strong> ${email || '未設定'}</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0;"><strong>メッセージ:</strong></p>
            <p style="white-space: pre-wrap; margin-top: 10px;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="font-size: 12px; color: #64748b;">このメールは行動経済学アプリのフィードバックフォームから送信されました。</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return new Response(JSON.stringify({ error: `メール送信エラー: ${error.message}` }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), { status: 200 });
  } catch (error: any) {
    console.error('[FEEDBACK API] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
}
