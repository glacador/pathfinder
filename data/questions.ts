import { Question } from '@/types';

export const QUESTIONS: Question[] = [
  // === VERBAL (4) ===
  {
    id: 'V1',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'BIRD is to NEST as BEAR is to:',
    options: [
      { id: 'a', text: 'Forest', correct: false },
      { id: 'b', text: 'Den', correct: true },
      { id: 'c', text: 'Fur', correct: false },
      { id: 'd', text: 'Hibernate', correct: false },
    ],
    explanation: 'A bird lives in a nest, a bear lives in a den.',
  },
  {
    id: 'V2',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Select the word most similar in meaning to UBIQUITOUS:',
    options: [
      { id: 'a', text: 'Rare', correct: false },
      { id: 'b', text: 'Omnipresent', correct: true },
      { id: 'c', text: 'Ambiguous', correct: false },
      { id: 'd', text: 'Unique', correct: false },
    ],
    explanation: 'Ubiquitous means present everywhere.',
  },
  {
    id: 'V3',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      "Despite the team's _____ efforts, the project failed due to _____ planning.",
    options: [
      { id: 'a', text: 'minimal ... excellent', correct: false },
      { id: 'b', text: 'heroic ... inadequate', correct: true },
      { id: 'c', text: 'weak ... strong', correct: false },
      { id: 'd', text: 'lazy ... careful', correct: false },
    ],
    explanation:
      '"Despite" indicates contrast between positive efforts and negative planning.',
  },
  {
    id: 'V4',
    aptitude: 'verbal',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'CRESCENDO is to MUSIC as CLIMAX is to:',
    options: [
      { id: 'a', text: 'Mountain', correct: false },
      { id: 'b', text: 'Narrative', correct: true },
      { id: 'c', text: 'Weather', correct: false },
      { id: 'd', text: 'Temperature', correct: false },
    ],
    explanation:
      'Crescendo is the peak of music; climax is the peak of a narrative.',
  },

  // === NUMERICAL (4) ===
  {
    id: 'N1',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'What number comes next? 2, 6, 18, 54, ___',
    options: [
      { id: 'a', text: '108', correct: false },
      { id: 'b', text: '162', correct: true },
      { id: 'c', text: '126', correct: false },
      { id: 'd', text: '216', correct: false },
    ],
    explanation: 'Each number is multiplied by 3. 54 × 3 = 162.',
  },
  {
    id: 'N2',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'A store offers 25% off, then an additional 10% off the sale price. Original: $80. Final price?',
    options: [
      { id: 'a', text: '$52.00', correct: false },
      { id: 'b', text: '$54.00', correct: true },
      { id: 'c', text: '$56.00', correct: false },
      { id: 'd', text: '$48.00', correct: false },
    ],
    explanation: '$80 - 25% = $60. Then $60 - 10% = $54.',
  },
  {
    id: 'N3',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'If 3 workers complete a task in 8 days, how many days for 6 workers?',
    options: [
      { id: 'a', text: '16 days', correct: false },
      { id: 'b', text: '4 days', correct: true },
      { id: 'c', text: '6 days', correct: false },
      { id: 'd', text: '12 days', correct: false },
    ],
    explanation: 'Double workers = half time. 8 ÷ 2 = 4 days.',
  },
  {
    id: 'N4',
    aptitude: 'numerical',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Revenue: Q1 $120K, Q4 $180K. What % increase from Q1 to Q4?',
    options: [
      { id: 'a', text: '33%', correct: false },
      { id: 'b', text: '50%', correct: true },
      { id: 'c', text: '60%', correct: false },
      { id: 'd', text: '45%', correct: false },
    ],
    explanation: '($180K - $120K) / $120K × 100 = 50%.',
  },

  // === PATTERN (4) ===
  {
    id: 'P1',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'What comes next? ●, ●●, ●●●, ____',
    options: [
      { id: 'a', text: '●●●●', correct: true },
      { id: 'b', text: '●●●', correct: false },
      { id: 'c', text: '●●', correct: false },
      { id: 'd', text: '●', correct: false },
    ],
    explanation: 'Pattern adds one dot each time.',
  },
  {
    id: 'P2',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'What comes next? 1, 1, 2, 3, 5, 8, 13, ___',
    options: [
      { id: 'a', text: '18', correct: false },
      { id: 'b', text: '20', correct: false },
      { id: 'c', text: '21', correct: true },
      { id: 'd', text: '26', correct: false },
    ],
    explanation: 'Fibonacci: each = sum of previous two. 8 + 13 = 21.',
  },
  {
    id: 'P3',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Find the odd one out: 2, 3, 5, 7, 9, 11, 13',
    options: [
      { id: 'a', text: '2', correct: false },
      { id: 'b', text: '9', correct: true },
      { id: 'c', text: '7', correct: false },
      { id: 'd', text: '11', correct: false },
    ],
    explanation: 'All are prime numbers except 9 (3×3).',
  },
  {
    id: 'P4',
    aptitude: 'pattern',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Pattern: AZ, BY, CX, DW, ___',
    options: [
      { id: 'a', text: 'EV', correct: true },
      { id: 'b', text: 'EU', correct: false },
      { id: 'c', text: 'FV', correct: false },
      { id: 'd', text: 'EW', correct: false },
    ],
    explanation: 'First letter goes forward, second goes backward.',
  },

  // === SPATIAL (4) ===
  {
    id: 'S1',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'easy',
    timeLimit: 30,
    question:
      'If you rotate the letter "N" 90 degrees clockwise, what does it look like?',
    options: [
      { id: 'a', text: 'Z', correct: true },
      { id: 'b', text: 'N', correct: false },
      { id: 'c', text: 'И', correct: false },
      { id: 'd', text: 'M', correct: false },
    ],
    explanation: 'When N is rotated 90° clockwise, it resembles Z.',
  },
  {
    id: 'S2',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 45,
    question:
      'A paper is folded in half once, then a hole is punched. When unfolded, how many holes?',
    options: [
      { id: 'a', text: '1', correct: false },
      { id: 'b', text: '2', correct: true },
      { id: 'c', text: '3', correct: false },
      { id: 'd', text: '4', correct: false },
    ],
    explanation: 'One fold = 2 layers = 2 holes.',
  },
  {
    id: 'S3',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 45,
    question:
      'How many faces does a cube have?',
    options: [
      { id: 'a', text: '4', correct: false },
      { id: 'b', text: '6', correct: true },
      { id: 'c', text: '8', correct: false },
      { id: 'd', text: '12', correct: false },
    ],
    explanation: 'A cube has 6 faces.',
  },
  {
    id: 'S4',
    aptitude: 'spatial',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 60,
    question:
      'A 3D structure has 3 layers: bottom layer 6 cubes, middle 5 cubes, top 4 cubes. Total cubes?',
    options: [
      { id: 'a', text: '12', correct: false },
      { id: 'b', text: '14', correct: false },
      { id: 'c', text: '15', correct: true },
      { id: 'd', text: '16', correct: false },
    ],
    explanation: 'Count layer by layer: 6 + 5 + 4 = 15.',
  },

  // === PROCESSING SPEED (4) ===
  {
    id: 'PS1',
    aptitude: 'processing',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 15,
    question: 'Which is larger: 847 or 874?',
    options: [
      { id: 'a', text: '847', correct: false },
      { id: 'b', text: '874', correct: true },
      { id: 'c', text: 'They are equal', correct: false },
      { id: 'd', text: 'Cannot determine', correct: false },
    ],
    explanation: '874 > 847 (compare the tens digit: 7 > 4).',
  },
  {
    id: 'PS2',
    aptitude: 'processing',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 15,
    question: 'How many 3s are in: 3, 7, 3, 9, 3, 2, 8, 3, 5?',
    options: [
      { id: 'a', text: '3', correct: false },
      { id: 'b', text: '4', correct: true },
      { id: 'c', text: '5', correct: false },
      { id: 'd', text: '2', correct: false },
    ],
    explanation: 'Count the 3s: positions 1, 3, 5, 8 = 4 total.',
  },
  {
    id: 'PS3',
    aptitude: 'processing',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 20,
    question:
      'The word RED is printed in blue ink. What COLOR is the ink? (not what the word says)',
    options: [
      { id: 'a', text: 'Red', correct: false },
      { id: 'b', text: 'Blue', correct: true },
      { id: 'c', text: 'Green', correct: false },
      { id: 'd', text: 'Black', correct: false },
    ],
    explanation:
      'This is a Stroop test - the INK color is blue, not the word meaning.',
  },
  {
    id: 'PS4',
    aptitude: 'processing',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 20,
    question: 'Find the symbol that is different: ★ ★ ★ ☆ ★ ★ ★',
    options: [
      { id: 'a', text: 'Position 2', correct: false },
      { id: 'b', text: 'Position 4', correct: true },
      { id: 'c', text: 'Position 6', correct: false },
      { id: 'd', text: 'All are the same', correct: false },
    ],
    explanation: 'Position 4 has an outlined star (☆) instead of filled (★).',
  },

  // === MEMORY (4) ===
  {
    id: 'M1',
    aptitude: 'memory',
    type: 'multiple_choice',
    difficulty: 'easy',
    question:
      'Remember: 4, 7, 2, 9. What was the SECOND number?',
    options: [
      { id: 'a', text: '4', correct: false },
      { id: 'b', text: '7', correct: true },
      { id: 'c', text: '2', correct: false },
      { id: 'd', text: '9', correct: false },
    ],
    explanation: 'The sequence was 4, 7, 2, 9. Second number is 7.',
  },
  {
    id: 'M2',
    aptitude: 'memory',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Remember these words: APPLE, RIVER, CHAIR, BLUE, HAPPY. Which word was NOT in the list?',
    options: [
      { id: 'a', text: 'APPLE', correct: false },
      { id: 'b', text: 'RIVER', correct: false },
      { id: 'c', text: 'TABLE', correct: true },
      { id: 'd', text: 'BLUE', correct: false },
    ],
    explanation: 'TABLE was not in the original list.',
  },
  {
    id: 'M3',
    aptitude: 'memory',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 60,
    question:
      'Remember: CAR, DOG, TREE, PHONE, BOOK, LAMP. What was the 4th item?',
    options: [
      { id: 'a', text: 'TREE', correct: false },
      { id: 'b', text: 'PHONE', correct: true },
      { id: 'c', text: 'BOOK', correct: false },
      { id: 'd', text: 'DOG', correct: false },
    ],
    explanation: 'The sequence was CAR, DOG, TREE, PHONE, BOOK, LAMP. 4th is PHONE.',
  },
  {
    id: 'M4',
    aptitude: 'memory',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 45,
    question:
      'Mental math: Start with 47, add 18, subtract 23, multiply by 2. Result?',
    options: [
      { id: 'a', text: '76', correct: false },
      { id: 'b', text: '84', correct: true },
      { id: 'c', text: '92', correct: false },
      { id: 'd', text: '68', correct: false },
    ],
    explanation: '47 + 18 = 65. 65 - 23 = 42. 42 × 2 = 84.',
  },

  // === MECHANICAL (4) ===
  {
    id: 'MR1',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'easy',
    question:
      'If Gear A turns clockwise, which way does Gear C turn? (A→B→C, all meshed)',
    options: [
      { id: 'a', text: 'Clockwise', correct: true },
      { id: 'b', text: 'Counter-clockwise', correct: false },
      { id: 'c', text: "Doesn't move", correct: false },
      { id: 'd', text: 'Cannot determine', correct: false },
    ],
    explanation: 'Gears alternate direction: CW → CCW → CW.',
  },
  {
    id: 'MR2',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Which simple machine multiplies force the most: lever, pulley, or inclined plane?',
    options: [
      { id: 'a', text: 'Lever', correct: true },
      { id: 'b', text: 'Pulley', correct: false },
      { id: 'c', text: 'Inclined plane', correct: false },
      { id: 'd', text: 'All equal', correct: false },
    ],
    explanation:
      'A lever can provide the greatest mechanical advantage depending on fulcrum placement.',
  },
  {
    id: 'MR3',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Lever: 20kg at 2m from fulcrum. Where place 10kg to balance?',
    options: [
      { id: 'a', text: '1m', correct: false },
      { id: 'b', text: '2m', correct: false },
      { id: 'c', text: '4m', correct: true },
      { id: 'd', text: '3m', correct: false },
    ],
    explanation: 'Torque balance: 20×2 = 10×?. ? = 4m.',
  },
  {
    id: 'MR4',
    aptitude: 'mechanical',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'Water flows through a pipe that narrows. In the narrow section, the water:',
    options: [
      { id: 'a', text: 'Flows slower', correct: false },
      { id: 'b', text: 'Flows faster', correct: true },
      { id: 'c', text: 'Stays the same speed', correct: false },
      { id: 'd', text: 'Stops flowing', correct: false },
    ],
    explanation:
      'Continuity equation: same volume must pass, so narrower = faster.',
  },

  // === IDEA GENERATION (4) ===
  {
    id: 'IG1',
    aptitude: 'idea',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Which is the MOST creative use for a paperclip?',
    options: [
      { id: 'a', text: 'Holding papers together', correct: false },
      { id: 'b', text: 'As a tiny sculpture armature', correct: true },
      { id: 'c', text: 'Throwing it away', correct: false },
      { id: 'd', text: 'Keeping it in a drawer', correct: false },
    ],
    explanation:
      'Creative thinking involves finding unusual, novel uses beyond the obvious.',
  },
  {
    id: 'IG2',
    aptitude: 'idea',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'A coffee shop has slow afternoons. Best creative solution?',
    options: [
      { id: 'a', text: 'Close during slow hours', correct: false },
      { id: 'b', text: 'Reduce staff', correct: false },
      { id: 'c', text: 'Host afternoon events like poetry readings', correct: true },
      { id: 'd', text: 'Lower all prices permanently', correct: false },
    ],
    explanation:
      'Creative problem-solving adds value rather than cutting costs.',
  },
  {
    id: 'IG3',
    aptitude: 'idea',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'What if humans only needed 1 hour of sleep? Most significant change?',
    options: [
      { id: 'a', text: 'Bedrooms would disappear', correct: false },
      { id: 'b', text: 'Work hours would increase to 100+ per week', correct: false },
      { id: 'c', text: 'Entire economy and social structure would transform', correct: true },
      { id: 'd', text: 'Mattress companies would go bankrupt', correct: false },
    ],
    explanation:
      'Second-order thinking: the ripple effects would be massive and systemic.',
  },
  {
    id: 'IG4',
    aptitude: 'idea',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'Combine UMBRELLA + SOCIAL MEDIA. Best product idea?',
    options: [
      { id: 'a', text: 'An umbrella with a phone holder', correct: false },
      { id: 'b', text: 'A smart umbrella that shares weather to your feed', correct: true },
      { id: 'c', text: 'A waterproof phone case', correct: false },
      { id: 'd', text: 'An umbrella with a picture on it', correct: false },
    ],
    explanation:
      'Best combination creates functional synergy between concepts.',
  },

  // === SEQUENTIAL (4) ===
  {
    id: 'SQ1',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'easy',
    question:
      'Correct order for making tea: 1) Drink 2) Boil water 3) Add tea bag 4) Pour water 5) Wait to steep',
    options: [
      { id: 'a', text: '2, 3, 4, 5, 1', correct: true },
      { id: 'b', text: '3, 2, 4, 5, 1', correct: false },
      { id: 'c', text: '2, 4, 3, 5, 1', correct: false },
      { id: 'd', text: '1, 2, 3, 4, 5', correct: false },
    ],
    explanation:
      'Boil water → Add tea bag → Pour water → Wait → Drink.',
  },
  {
    id: 'SQ2',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'A before B, B before C, D after A but before C. Which sequence is INVALID?',
    options: [
      { id: 'a', text: 'A→D→B→C', correct: false },
      { id: 'b', text: 'A→B→D→C', correct: false },
      { id: 'c', text: 'D→A→B→C', correct: true },
      { id: 'd', text: 'A→B→C', correct: false },
    ],
    explanation: 'D must come AFTER A, so D→A is invalid.',
  },
  {
    id: 'SQ3',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 60,
    question:
      'Algorithm: X=5. If X<10, double X. If X even, add 3. If X>15, subtract 7. Final X?',
    options: [
      { id: 'a', text: '13', correct: true },
      { id: 'b', text: '10', correct: false },
      { id: 'c', text: '6', correct: false },
      { id: 'd', text: '16', correct: false },
    ],
    explanation: '5<10→double→10. 10 even→add 3→13. 13 not >15. Final: 13.',
  },
  {
    id: 'SQ4',
    aptitude: 'sequential',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'Dependencies: E needs B,C. B needs A. D needs A. C needs D. Valid order?',
    options: [
      { id: 'a', text: 'A→B→D→C→E', correct: true },
      { id: 'b', text: 'A→C→D→B→E', correct: false },
      { id: 'c', text: 'B→A→D→C→E', correct: false },
      { id: 'd', text: 'A→D→B→C→E', correct: false },
    ],
    explanation:
      'A first (no deps), then B and D (need A), then C (needs D), finally E.',
  },

  // === INTERPERSONAL (4) ===
  {
    id: 'IP1',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'easy',
    question:
      'A coworker seems upset but says "I\'m fine." Best response?',
    options: [
      { id: 'a', text: 'Accept it and walk away', correct: false },
      { id: 'b', text: 'Say "You don\'t look fine, what\'s wrong?"', correct: false },
      { id: 'c', text: 'Say "I\'m here if you want to talk" and give space', correct: true },
      { id: 'd', text: 'Tell others they seem upset', correct: false },
    ],
    explanation:
      'Offering support without pressure respects boundaries while showing care.',
  },
  {
    id: 'IP2',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Coworker takes credit for your idea in meeting. Best response?',
    options: [
      { id: 'a', text: 'Call them out publicly', correct: false },
      { id: 'b', text: 'Say nothing', correct: false },
      { id: 'c', text: 'Speak privately first, escalate if needed', correct: true },
      { id: 'd', text: 'Email whole team clarifying', correct: false },
    ],
    explanation: 'Private conversation preserves relationship while addressing issue.',
  },
  {
    id: 'IP3',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Customer: "This is the THIRD time this happened!" Primary concern?',
    options: [
      { id: 'a', text: 'Wants refund', correct: false },
      { id: 'b', text: 'Feels disrespected/unvalued', correct: true },
      { id: 'c', text: 'Needs item urgently', correct: false },
      { id: 'd', text: 'Wants manager', correct: false },
    ],
    explanation: '"Third time" emphasis = feels ignored and frustrated.',
  },
  {
    id: 'IP4',
    aptitude: 'interpersonal',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'Leading meeting, two members disagree and stop contributing. Best action?',
    options: [
      { id: 'a', text: 'Ignore, move on', correct: false },
      { id: 'b', text: 'Take 5-min break, speak to each privately', correct: true },
      { id: 'c', text: "Ask what's wrong in front of everyone", correct: false },
      { id: 'd', text: 'End meeting, reschedule', correct: false },
    ],
    explanation: 'Break allows reset without embarrassment.',
  },

  // === DETAIL (4) ===
  {
    id: 'DO1',
    aptitude: 'detail',
    type: 'multiple_choice',
    difficulty: 'easy',
    timeLimit: 30,
    question:
      'How many letter E\'s in: "EXCELLENCE EXCEEDS EXPECTATIONS"?',
    options: [
      { id: 'a', text: '7', correct: false },
      { id: 'b', text: '8', correct: true },
      { id: 'c', text: '9', correct: false },
      { id: 'd', text: '6', correct: false },
    ],
    explanation: 'EXCELLENCE(3) + EXCEEDS(2) + EXPECTATIONS(3) = 8 E\'s.',
  },
  {
    id: 'DO2',
    aptitude: 'detail',
    type: 'multiple_choice',
    difficulty: 'medium',
    timeLimit: 60,
    question:
      'Which number appears twice: 4782, 9156, 3847, 6291, 7824, 4728?',
    options: [
      { id: 'a', text: '4782', correct: false },
      { id: 'b', text: '7824', correct: false },
      { id: 'c', text: 'None repeat exactly', correct: true },
      { id: 'd', text: '4728', correct: false },
    ],
    explanation: 'Careful examination shows no exact duplicates in the list.',
  },
  {
    id: 'DO3',
    aptitude: 'detail',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 90,
    question:
      'Find the error: "The companys quarterly report showed a signficant increase."',
    options: [
      { id: 'a', text: '1 error', correct: false },
      { id: 'b', text: '2 errors', correct: true },
      { id: 'c', text: '3 errors', correct: false },
      { id: 'd', text: 'No errors', correct: false },
    ],
    explanation: 'Errors: "companys" (should be company\'s) and "signficant" (significant).',
  },
  {
    id: 'DO4',
    aptitude: 'detail',
    type: 'multiple_choice',
    difficulty: 'hard',
    timeLimit: 45,
    question:
      'Which code breaks the pattern? ABC-123, DEF-456, GHI-789, JKL-012, MNP-345',
    options: [
      { id: 'a', text: 'DEF-456', correct: false },
      { id: 'b', text: 'JKL-012', correct: false },
      { id: 'c', text: 'MNP-345', correct: true },
      { id: 'd', text: 'GHI-789', correct: false },
    ],
    explanation: 'Should be MNO not MNP - letter sequence broken.',
  },

  // === RISK (4) ===
  {
    id: 'RA1',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'easy',
    question:
      'Investment: 80% chance of $1000 gain OR guaranteed $700. You choose:',
    options: [
      { id: 'a', text: '80% chance of $1000', correct: false },
      { id: 'b', text: 'Guaranteed $700', correct: false },
      { id: 'c', text: 'Need more information about my situation', correct: true },
      { id: 'd', text: 'Neither option', correct: false },
    ],
    explanation: 'Smart risk assessment considers personal context and goals.',
  },
  {
    id: 'RA2',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'medium',
    question:
      'Startup opportunity: quit stable job, 30% success rate, 5x potential return. Best approach?',
    options: [
      { id: 'a', text: 'Take the leap immediately', correct: false },
      { id: 'b', text: 'Never risk stable income', correct: false },
      { id: 'c', text: 'Calculate runway, test part-time first', correct: true },
      { id: 'd', text: 'Flip a coin', correct: false },
    ],
    explanation: 'Calculated risk-taking with mitigation strategies.',
  },
  {
    id: 'RA3',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'Project 50% complete, major issue found. Continue (may fail) or restart (certain delay)?',
    options: [
      { id: 'a', text: 'Always continue - sunk cost', correct: false },
      { id: 'b', text: 'Always restart - quality first', correct: false },
      { id: 'c', text: 'Assess: failure impact vs delay cost', correct: true },
      { id: 'd', text: 'Ask manager to decide', correct: false },
    ],
    explanation: 'Rational risk analysis weighs options without bias.',
  },
  {
    id: 'RA4',
    aptitude: 'risk',
    type: 'multiple_choice',
    difficulty: 'hard',
    question:
      'You can save $500/month for 10 years at 5% interest OR invest in index funds averaging 8% with volatility. Best choice depends on:',
    options: [
      { id: 'a', text: 'Always take the guaranteed option', correct: false },
      { id: 'b', text: 'Always take higher returns', correct: false },
      { id: 'c', text: 'Your time horizon and risk tolerance', correct: true },
      { id: 'd', text: 'What your friends do', correct: false },
    ],
    explanation: 'Personal factors determine optimal risk levels.',
  },
];

export function getQuestionsByAptitude(aptitudeId: string): Question[] {
  return QUESTIONS.filter((q) => q.aptitude === aptitudeId);
}

export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
