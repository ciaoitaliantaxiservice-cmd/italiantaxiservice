import { en } from './en';
import { it } from './it';
import type { Lang } from '../i18n';

/** Typing `it` against `typeof en` guarantees neither language loses a key.
 *  It does NOT mean the copy is a translation — the wording is written
 *  separately in each file and must stay that way. */
export const content: Record<Lang, typeof en> = { en, it };

export function t(lang: Lang): typeof en {
  return content[lang];
}
