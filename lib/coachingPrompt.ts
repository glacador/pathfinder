import { PricingTier } from '@/types/pricing';
import { AptitudeId, APTITUDES } from '@/types/aptitudes';

interface UserData {
  name: string;
  scores: Record<AptitudeId, number>;
  topCareers: Array<{ title: string; matchScore: number }>;
  strengths: string[];
  weaknesses: string[];
}

export function generateCoachingPrompt(
  userData: UserData & { tier: PricingTier }
): string {
  const sessionLimit = userData.tier === 'executive' ? 'unlimited' : '1 session';

  const aptitudeDetails = Object.entries(userData.scores)
    .map(([apt, score]) => {
      const aptitude = APTITUDES.find((a) => a.id === apt);
      const level =
        score >= 80 ? 'Exceptional' : score >= 60 ? 'Strong' : 'Developing';
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
Start with: "Looking at your results, ${userData.name}, I'm genuinely excited — you have a fascinating combination of strengths. Your [top strength] paired with [second strength] is actually quite rare, showing up in only about [X]% of people I work with.

Before I dive into specific recommendations, I'd love to understand your current situation better. Are you currently working? In school? Looking to make a change?"`;
}
