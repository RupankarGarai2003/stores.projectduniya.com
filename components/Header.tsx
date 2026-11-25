'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NETWORK } from '@/lib/config';
import type { TechGroupWithTechs } from '@/lib/tech';
import type { Category } from '@/lib/types';
import { GENERAL_QUESTION, out, waLink } from '@/utils/links';
import { Ext, WaIcon } from './Icons';
import SearchPalette from './SearchPalette';
import type { SearchItem } from './SearchPalette';
import ThemeToggle from './ThemeToggle';
import SavedCount from './SavedCount';

type Props = { categories: Category[]; groups: TechGroupWithTechs[]; items: SearchItem[] };

export default function Header({ categories, groups, items }: Props) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const close = () => { setOpen(false); setMega(false); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMega(false); };
    const onDown = (e: MouseEvent) => {
      if (menu.current && !menu.current.contains(e.target as Node)) setMega(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, []);

  const navLink = (href: string, label: string, match = href) => {
    const active = pathname === match || (match !== '/' && pathname.startsWith(match + '/'));
    return (
      <Link href={href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined} onClick={close}>
        {label}
      </Link>
    );
  };

  return (
    <header className={'header' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap header-in">
        <Link href="/" className="logo" onClick={close}>
          <span className="logo-mark">PD</span>
          <span>ProjectDuniya <b>Store</b></span>
        </Link>
        <button className="burger" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="nav" className={'nav' + (open ? ' open' : '')}>
          <div className="menu" ref={menu}>
            <button className={'menu-btn' + (mega ? ' on' : '')} aria-expanded={mega} aria-controls="mega" onClick={() => setMega(!mega)}>
              Browse <span className="caret" aria-hidden="true">▾</span>
            </button>
            <div id="mega" className={'mega' + (mega ? ' open' : '')}>
              <div className="mega-col">
                <h4>Project categories</h4>
                <ul>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/category/${c.slug}`} onClick={close}>
                        <span className="mg" style={{ ['--h' as string]: c.hue }}>{c.glyph}</span>
                        <span><b>{c.name}</b><small>{c.blurb}</small></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mega-col">
                <h4>Tech categories</h4>
                <ul>
                  {groups.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/tech/${g.slug}`} onClick={close}>
                        <span className="mg" style={{ ['--h' as string]: g.hue }}>{g.glyph}</span>
                        <span><b>{g.name}</b><small>{g.techs.slice(0, 4).map((t) => t.name).join(' · ')}</small></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {navLink('/projects', 'All projects')}
          <SavedCount />
          {navLink('/tech', 'Technologies')}
          {navLink('/how-to-buy', 'How to buy')}
          <a href={out(NETWORK.main, '/contact', 'store_header_custom')} onClick={close}>Custom project<Ext /></a>
          <div className="nav-tools"><SearchPalette items={items} /><ThemeToggle /></div>
          <a className="btn btn-buy btn-sm" href={waLink(GENERAL_QUESTION)} target="_blank" rel="noopener noreferrer">
            <WaIcon /> WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
