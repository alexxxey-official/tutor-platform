# SKILL: Hebrew Lesson Creation (עברית)

## Overview
This skill defines the standards and patterns for creating Hebrew (Ivrit) lessons on the tutor platform. Hebrew has unique requirements: RTL text direction, vowel marks (nikud), and a different alphabet system.

## Core Principles

### 1. RTL (Right-to-Left) Support
- **Always use `dir="rtl"`** for Hebrew text containers
- Hebrew text flows right-to-left, but UI elements (buttons, navigation) remain LTR
- Example:
  ```jsx
  <div className="text-5xl" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
    שָׁלוֹם
  </div>
  ```

### 2. Nikud (Vowel Marks) System
- **Always include nikud** in beginner lessons (Lessons 0-10)
- Nikud are essential for pronunciation and learning
- Use proper Unicode combining characters
- Color-code vowel groups:
  - **A sounds** (Kamatz, Patah): Orange (`bg-orange-500`)
  - **E sounds** (Tzere, Segol): Green (`bg-green-500`)
  - **I sounds** (Hirik): Blue (`bg-blue-500`)
  - **O sounds** (Holam): Purple (`bg-purple-500`)
  - **U sounds** (Kubutz, Shuruk): Gray (`bg-slate-700`)
  - **Shva**: Gray (`bg-gray-600`)

### 3. Typography
- **Primary font:** `Assistant` (Google Fonts) — excellent Hebrew support with nikud
- **Fallback:** System fonts with Hebrew support
- **Size guidelines:**
  - Headers: `text-5xl` to `text-6xl`
  - Letters in tables: `text-6xl`
  - Body text: `text-lg`
  - Nikud examples: `text-5xl`

### 4. Color Scheme
- **Primary:** `blue-600` (Israeli flag blue)
- **Accent:** `cyan-500` (sky/sea)
- **Correct answers:** `emerald-500`
- **Errors:** `red-500`
- **Guttural letters:** `orange-600` (special marker)

## Lesson Structure Template

### Standard Hebrew Lesson Layout
```jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, BookOpen, Info, Volume2 } from 'lucide-react';
import { useLessonProgress } from '../../../../hooks/useLessonProgress';
import AdvancedProgressBar from '../../../../components/AdvancedProgressBar';
import Exercise from '../../../../components/Exercise';

export default function HebrewLessonName() {
  const router = useRouter();
  const lessonId = 'heb_lesson_id';
  const totalCW = 20;
  const totalHW = 15;

  const { progress, updateProgress, resetHW, variant, getStats, loading } =
    useLessonProgress(lessonId, totalCW, totalHW);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const statsCW = getStats('cw');
  const statsHW = getStats('hw');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100" dir="ltr">
      {/* Header with Hebrew styling */}
      {/* Navigation */}
      {/* Progress Bar */}
      {/* Theory Section */}
      {/* Classwork Section */}
      {/* Homework Section */}
    </div>
  );
}
```

## Content Guidelines

### 1. Alphabet Lessons
- Show both **print** and **cursive** forms (if applicable)
- Include **letter name** (Alef, Bet, Gimel...)
- Show **sound** ([a], [b], [g]...)
- Mark **guttural letters** (א ה ח ע ר) with special tag
- Show **final forms (sofit)** for כ מ נ פ צ
- Example card structure:
  ```jsx
  <div className="border-2 rounded-xl p-4 bg-blue-50">
    <div className="text-6xl mb-2" dir="rtl">א</div>
    <div className="font-bold text-lg">Alef</div>
    <div className="text-blue-600 font-bold">[—]</div>
    <div className="text-xs text-gray-600">Silent letter</div>
  </div>
  ```

### 2. Nikud (Vowels) Lessons
- Group by sound (A, E, I, O, U, Shva)
- Show vowel on a base letter (usually ב)
- Include **name** (Kamatz, Patah...)
- Show **sound** and **description**
- Use color-coded sections

### 3. Vocabulary Lessons
- Always include **nikud** in Hebrew words
- Show **transliteration** (Latin letters)
- Show **translation** (Russian/English)
- Include **audio** icon (even if not implemented yet)
- Example:
  ```
  שָׁלוֹם (shalom) — привет, мир
  ```

### 4. Grammar Lessons
- Explain **gender** (masculine/feminine) clearly
- Show **number** (singular/plural) forms
- Include **examples** with full sentences
- Use tables for conjugations/declensions

## Exercise Types for Hebrew

### Type 1: Letter Recognition
```jsx
<Exercise
  id="cw1"
  mode="cw"
  type="dropdown"
  label="Какая это буква?"
  labelHebrew={<span dir="rtl" className="text-4xl">א</span>}
  options={['Alef', 'Bet', 'Gimel']}
  correctAnswer="Alef"
  progressItem={progress.cw?.cw1}
  onUpdate={updateProgress}
/>
```

### Type 2: Sound Identification
```jsx
<Exercise
  id="cw2"
  mode="cw"
  type="dropdown"
  label="Какой звук даёт эта огласовка?"
  labelHebrew={<span dir="rtl" className="text-4xl">בָּ</span>}
  options={['а', 'э', 'и', 'о', 'у']}
  correctAnswer="а"
  progressItem={progress.cw?.cw2}
  onUpdate={updateProgress}
/>
```

### Type 3: Reading Syllables
```jsx
<Exercise
  id="cw3"
  mode="cw"
  type="text"
  label="Как читается этот слог? (латинскими буквами)"
  labelHebrew={<span dir="rtl" className="text-4xl">בַּ</span>}
  correctAnswer="ba"
  placeholder="Введи транскрипцию"
  progressItem={progress.cw?.cw3}
  onUpdate={updateProgress}
/>
```

### Type 4: Translation
```jsx
<Exercise
  id="hw1"
  mode="hw"
  type="text"
  label="Переведи на русский:"
  labelHebrew={<span dir="rtl" className="text-3xl">שָׁלוֹם</span>}
  correctAnswer="привет"
  alternativeAnswers={['мир', 'здравствуй', 'здравствуйте']}
  placeholder="Введи перевод"
  progressItem={progress.hw?.hw1}
  onUpdate={updateProgress}
/>
```

## Special Components

### Hebrew Letter Card
```jsx
const HebrewLetterCard = ({ letter, name, sound, guttural, description }) => (
  <div className={`relative border-2 rounded-xl p-4 text-center ${
    guttural ? 'border-orange-300 bg-orange-50' : 'border-blue-200 bg-blue-50'
  }`}>
    {guttural && (
      <div className="absolute top-2 right-2 text-[10px] font-bold text-orange-600 uppercase">
        Гортанная
      </div>
    )}
    <div className="text-6xl font-bold mb-2" dir="rtl">
      {letter}
    </div>
    <div className="font-bold text-lg text-gray-800 mb-1">{name}</div>
    <div className="text-sm font-bold text-blue-600 mb-2">[{sound}]</div>
    <div className="text-xs text-gray-600">{description}</div>
  </div>
);
```

### Nikud Display Card
```jsx
const NikudCard = ({ symbol, name, sound, description, color }) => (
  <div className="text-center">
    <div className="text-5xl font-bold mb-2" dir="rtl" style={{ fontFamily: 'Assistant, sans-serif' }}>
      {symbol}
    </div>
    <div className={`font-bold ${color}`}>{name}</div>
    <div className="text-sm text-gray-600">{description}</div>
  </div>
);
```

## Metadata in lessons.js

```javascript
hebrew: [
  {
    id: 'heb_intro',
    title: 'Введение в иврит',
    subject: 'עברית',
    path: '/lessons/hebrew/intro',
    color: '#2563eb',
    totalCW: 0,
    totalHW: 0,
    totalScore: 0,
  },
  {
    id: 'heb_alphabet_1',
    title: 'Урок 1: Алфавит (א-כ)',
    subject: 'עברית',
    path: '/lessons/hebrew/alphabet-1',
    color: '#0891b2',
    totalCW: 20,
    totalHW: 15,
    totalScore: 35,
  },
  // ... more lessons
]
```

## Testing Checklist

Before deploying a Hebrew lesson:
- [ ] Hebrew text displays RTL correctly
- [ ] Nikud (vowel marks) render properly
- [ ] Font (Assistant) loads correctly
- [ ] All Hebrew characters are visible (no boxes/question marks)
- [ ] Exercise answers accept Hebrew input if needed
- [ ] Progress saves correctly to Supabase
- [ ] Mobile responsive (Hebrew text doesn't overflow)
- [ ] Colors match the Hebrew course theme (blue/cyan)

## Common Mistakes to Avoid

1. **Forgetting `dir="rtl"`** — Hebrew will display LTR (wrong!)
2. **Missing nikud** — Beginners can't read without vowels
3. **Wrong font** — Some fonts don't support nikud properly
4. **Mixing LTR/RTL** — Keep UI elements LTR, only Hebrew text RTL
5. **Incorrect Unicode** — Use proper combining characters for nikud
6. **No transliteration** — Beginners need Latin letters to learn pronunciation
7. **Ignoring gender** — Hebrew has grammatical gender, always specify

## Resources

- **Unicode Hebrew Block:** U+0590 to U+05FF
- **Nikud Combining Characters:** U+05B0 to U+05BD
- **Font:** Google Fonts "Assistant" family
- **Reference:** Hebrew Wikipedia for correct nikud usage

## Example: Complete Lesson Section

```jsx
{/* Alphabet Table */}
<div className="bg-white rounded-2xl shadow-lg p-8">
  <h2 className="text-3xl font-bold text-blue-900 mb-6">
    אָלֶף־בֵּית — Алфавит
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {alphabet.map((item, idx) => (
      <HebrewLetterCard
        key={idx}
        letter={item.letter}
        name={item.name}
        sound={item.sound}
        guttural={item.guttural}
        description={item.desc}
      />
    ))}
  </div>
</div>
```

---

**Last Updated:** 2026-05-10  
**Maintainer:** opencode (AI)
