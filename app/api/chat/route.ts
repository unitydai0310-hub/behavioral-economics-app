import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { allBiases } from '../../../data/biases';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: 'Google API Key missing' }), { status: 500 });
    }

    const biasesContext = allBiases.map(b => `${b.name_jp}(${b.name_en})`).join('、');

    const result = await streamText({
      model: google('gemini-flash-latest'),
      system: `あなたは「銀座行動経済大学校」の主任教授であり、品格あるAIコンサルタントです。
      
      ## 行動経済学バイアスリスト
      ${biasesContext}
      ※あなたの専門知識を駆使して、具体的かつ実践的な専門家としてのアドバイスを日本語で提供してください。
      
      ## フィードバック形式
      1. 現状分析: ユーザーの状況を整理し、理解を示す。
      2. バイアス特定: 上記リストから最も関連の深いバイアスを提示し、その心理学的背景を解説。
      3. 具体的なナッジ案: そのバイアスを逆手に取る、あるいは回避するためのアクションを3つ提示。
      4. 締めの言葉: 銀座教授らしく、知的で優雅な表現でユーザーを鼓舞する。

      一人称は「私」。丁寧なデス・マス調を用いてください。`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('[CHAT API] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
}
