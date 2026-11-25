import { SITE } from '@/lib/config';
import type { Project } from '@/lib/types';
import { inr } from './format';

// Link to a sister site with UTM tags, the same pattern your other sites use.
export function out(base: string, path = '', campaign = 'link') {
  const url = base + path;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=${SITE.host}&utm_medium=store&utm_campaign=${campaign}`;
}

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function buyMessage(p: Project) {
  return `Hi ProjectDuniya, I want to buy this project from your store:\n\n${p.title}\nCode: ${p.code}\nPrice: ${inr(p.price)}\nLink: ${SITE.url}/projects/${p.slug}\n\nPlease share the next steps.`;
}

export function askMessage(p: Project) {
  return `Hi ProjectDuniya, I have a question about this project:\n\n${p.title} (${p.code})\n${SITE.url}/projects/${p.slug}`;
}

export const GENERAL_QUESTION = 'Hi ProjectDuniya, I have a question about the projects in your store.';
