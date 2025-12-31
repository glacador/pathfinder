import { CelebrityProfile, AptitudeId } from '@/types';

export const CELEBRITIES: CelebrityProfile[] = [
  {
    name: 'Elon Musk',
    title: 'Entrepreneur & Engineer',
    image: '/celebrities/elon.jpg',
    aptitudes: {
      verbal: 7,
      numerical: 9,
      spatial: 9,
      pattern: 10,
      processing: 7,
      memory: 8,
      mechanical: 9,
      idea: 10,
      sequential: 8,
      interpersonal: 5,
      detail: 7,
      risk: 10,
    },
  },
  {
    name: 'Oprah Winfrey',
    title: 'Media Executive & Philanthropist',
    image: '/celebrities/oprah.jpg',
    aptitudes: {
      verbal: 10,
      numerical: 6,
      spatial: 4,
      pattern: 7,
      processing: 6,
      memory: 8,
      mechanical: 2,
      idea: 8,
      sequential: 7,
      interpersonal: 10,
      detail: 5,
      risk: 8,
    },
  },
  {
    name: 'Marie Curie',
    title: 'Physicist & Chemist',
    image: '/celebrities/curie.jpg',
    aptitudes: {
      verbal: 7,
      numerical: 10,
      spatial: 8,
      pattern: 10,
      processing: 6,
      memory: 9,
      mechanical: 7,
      idea: 9,
      sequential: 9,
      interpersonal: 5,
      detail: 10,
      risk: 7,
    },
  },
  {
    name: 'Steve Jobs',
    title: 'Entrepreneur & Visionary',
    image: '/celebrities/jobs.jpg',
    aptitudes: {
      verbal: 9,
      numerical: 6,
      spatial: 9,
      pattern: 8,
      processing: 7,
      memory: 7,
      mechanical: 5,
      idea: 10,
      sequential: 7,
      interpersonal: 7,
      detail: 9,
      risk: 9,
    },
  },
  {
    name: 'Albert Einstein',
    title: 'Theoretical Physicist',
    image: '/celebrities/einstein.jpg',
    aptitudes: {
      verbal: 7,
      numerical: 10,
      spatial: 10,
      pattern: 10,
      processing: 5,
      memory: 9,
      mechanical: 6,
      idea: 10,
      sequential: 8,
      interpersonal: 4,
      detail: 7,
      risk: 8,
    },
  },
  {
    name: 'Ruth Bader Ginsburg',
    title: 'Supreme Court Justice',
    image: '/celebrities/rbg.jpg',
    aptitudes: {
      verbal: 10,
      numerical: 7,
      spatial: 3,
      pattern: 8,
      processing: 6,
      memory: 9,
      mechanical: 1,
      idea: 7,
      sequential: 10,
      interpersonal: 8,
      detail: 10,
      risk: 7,
    },
  },
  {
    name: 'Leonardo da Vinci',
    title: 'Renaissance Polymath',
    image: '/celebrities/davinci.jpg',
    aptitudes: {
      verbal: 7,
      numerical: 8,
      spatial: 10,
      pattern: 10,
      processing: 6,
      memory: 9,
      mechanical: 10,
      idea: 10,
      sequential: 7,
      interpersonal: 6,
      detail: 10,
      risk: 8,
    },
  },
  {
    name: 'Warren Buffett',
    title: 'Investor & CEO',
    image: '/celebrities/buffett.jpg',
    aptitudes: {
      verbal: 8,
      numerical: 10,
      spatial: 3,
      pattern: 9,
      processing: 6,
      memory: 9,
      mechanical: 2,
      idea: 7,
      sequential: 9,
      interpersonal: 8,
      detail: 8,
      risk: 8,
    },
  },
  {
    name: 'Maya Angelou',
    title: 'Poet & Civil Rights Activist',
    image: '/celebrities/angelou.jpg',
    aptitudes: {
      verbal: 10,
      numerical: 4,
      spatial: 5,
      pattern: 7,
      processing: 5,
      memory: 8,
      mechanical: 2,
      idea: 10,
      sequential: 6,
      interpersonal: 10,
      detail: 7,
      risk: 7,
    },
  },
  {
    name: 'Bill Gates',
    title: 'Tech Pioneer & Philanthropist',
    image: '/celebrities/gates.jpg',
    aptitudes: {
      verbal: 7,
      numerical: 10,
      spatial: 7,
      pattern: 10,
      processing: 8,
      memory: 9,
      mechanical: 6,
      idea: 9,
      sequential: 9,
      interpersonal: 6,
      detail: 8,
      risk: 8,
    },
  },
  {
    name: 'Michelle Obama',
    title: 'Attorney & Author',
    image: '/celebrities/mobama.jpg',
    aptitudes: {
      verbal: 10,
      numerical: 6,
      spatial: 4,
      pattern: 7,
      processing: 6,
      memory: 8,
      mechanical: 2,
      idea: 8,
      sequential: 8,
      interpersonal: 10,
      detail: 7,
      risk: 6,
    },
  },
  {
    name: 'Neil deGrasse Tyson',
    title: 'Astrophysicist & Communicator',
    image: '/celebrities/tyson.jpg',
    aptitudes: {
      verbal: 10,
      numerical: 9,
      spatial: 9,
      pattern: 9,
      processing: 7,
      memory: 9,
      mechanical: 5,
      idea: 8,
      sequential: 8,
      interpersonal: 9,
      detail: 7,
      risk: 5,
    },
  },
];

export function findCelebrityMatches(
  userScores: Record<AptitudeId, number>
): { celebrity: CelebrityProfile; matchScore: number }[] {
  return CELEBRITIES.map((celeb) => {
    let totalDiff = 0;
    let count = 0;

    Object.entries(celeb.aptitudes).forEach(([apt, score]) => {
      const userScore = (userScores[apt as AptitudeId] || 50) / 10;
      totalDiff += Math.abs(userScore - score);
      count++;
    });

    const avgDiff = totalDiff / count;
    const matchScore = Math.round((1 - avgDiff / 10) * 100);

    return { celebrity: celeb, matchScore };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

export function getCelebrityByName(name: string): CelebrityProfile | undefined {
  return CELEBRITIES.find((c) => c.name === name);
}
