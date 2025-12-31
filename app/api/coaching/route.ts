import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PricingTier } from '@/types/pricing';
import { AptitudeId, APTITUDES } from '@/types/aptitudes';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface UserData {
  name: string;
  scores: Record<AptitudeId, number>;
  topCareers: Array<{ title: string; matchScore: number }>;
  strengths: string[];
  weaknesses: string[];
}

function generateCoachingPrompt(userData: UserData, tier: PricingTier): string {
  const aptitudeDetails = Object.entries(userData.scores)
    .map(([apt, score]) => {
      const aptitude = APTITUDES.find((a) => a.id === apt);
      const level = score >= 80 ? 'Exceptional' : score >= 60 ? 'Strong' : 'Developing';
      return `- ${aptitude?.name || apt}: ${score}/100 (${level})`;
    })
    .join('\n');

  return `You are an expert career coach with 20+ years of experience. You're warm, encouraging, but also direct and practical.

## CLIENT: ${userData.name}

## APTITUDE PROFILE:
${aptitudeDetails}

## TOP STRENGTHS:
${userData.strengths.map((s) => `- ${s}`).join('\n')}

## DEVELOPMENT AREAS:
${userData.weaknesses.map((w) => `- ${w}`).join('\n')}

## TOP CAREER MATCHES:
${userData.topCareers
  .slice(0, 10)
  .map((c, i) => `${i + 1}. ${c.title} (${c.matchScore}% match)`)
  .join('\n')}

## COACHING APPROACH:
1. Acknowledge their unique profile — what makes their combination special
2. Ask about their current situation — job, education, goals, constraints
3. Give SPECIFIC recommendations tied to THEIR scores
4. Create concrete action plans with timelines
5. End each response with a question to continue the conversation

## RULES:
- Reference their SPECIFIC scores (e.g., "Your 92nd percentile spatial visualization means...")
- Don't just list careers — explain WHY each fits their profile
- Be encouraging but realistic about timelines
- Keep responses conversational, 2-3 paragraphs max
- If they seem stuck, suggest unexpected paths that match their profile

## OPENING MESSAGE:
If this is the start of the session, begin with an engaging opening that references their unique aptitude combination and asks about their current situation.`;
}

export async function POST(request: Request) {
  try {
    const { userData, messages, tier } = await request.json();

    // Verify user has access to coaching
    if (!['premium', 'professional', 'executive'].includes(tier)) {
      return NextResponse.json(
        { error: 'Coaching not available for this tier' },
        { status: 403 }
      );
    }

    const systemPrompt = generateCoachingPrompt(userData, tier);

    const anthropicMessages =
      messages.length === 0
        ? [
            {
              role: 'user' as const,
              content:
                'Please start the coaching session with your opening message.',
            },
          ]
        : messages.map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          }));

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    const textContent = response.content.find((c) => c.type === 'text');
    const assistantMessage = textContent?.type === 'text' ? textContent.text : '';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Coaching API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
