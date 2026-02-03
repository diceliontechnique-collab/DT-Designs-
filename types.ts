
export type Industry = string;

export type LanguageCode = 'ar' | 'en' | 'fr' | 'tr' | 'fa' | 'es' | 'de' | 'it' | 'ru' | 'pt' | 'zh' | 'nl' | 'ku' | 'hi' | 'ja' | 'ko';

export type DialectCode = 'moroccan' | 'palestinian' | 'egyptian' | 'gulf' | 'algerian' | 'tunisian' | 'libyan' | 'yemeni' | 'iraqi' | 'levantine' | 'fusha';

export type EmojiLevel = 'official' | 'light' | 'balanced' | 'radiant';

export interface CaptionVariation {
  title: string;
  headline: string;
  body: string;
  cta: string;
  hashtags: string;
}

export interface GenerationResult {
  isUpsell: boolean;
  upsellMessage?: string;
  variations?: CaptionVariation[];
}
