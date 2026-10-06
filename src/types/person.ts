export enum PersonCategory {
  CHILD = 0,
  TEEN = 1,
  ADULT = 2,
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  category: PersonCategory;
}

export interface CategoryMetadata {
  label: string;
  russianLabel: string;
  fileName: string;
  code: number;
  description: string;
  ageRange: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    glow: string;
  };
}

export const CATEGORY_INFO: Record<PersonCategory, CategoryMetadata> = {
  [PersonCategory.CHILD]: {
    label: 'CHILD',
    russianLabel: 'Дети (до 12 лет)',
    fileName: 'children.txt',
    code: 0,
    description: 'Дети до 12 лет включительно (возраст ≤ 12)',
    ageRange: '≤ 12 лет',
    color: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      glow: 'shadow-emerald-500/10',
    },
  },
  [PersonCategory.TEEN]: {
    label: 'TEEN',
    russianLabel: 'Подростки (13–18 лет)',
    fileName: 'teens.txt',
    code: 1,
    description: 'Подростки от 13 до 18 лет (13 ≤ возраст ≤ 18)',
    ageRange: '13 – 18 лет',
    color: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      glow: 'shadow-amber-500/10',
    },
  },
  [PersonCategory.ADULT]: {
    label: 'ADULT',
    russianLabel: 'Взрослые (> 18 лет)',
    fileName: 'adults.txt',
    code: 2,
    description: 'Взрослые старше 18 лет (возраст > 18)',
    ageRange: '> 18 лет',
    color: {
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-400',
      badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      glow: 'shadow-sky-500/10',
    },
  },
};

export const DEFAULT_REFERENCE_YEAR = 2026;
