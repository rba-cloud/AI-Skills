"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const links = [
  ["Learn AI", "/learn"], ["AI Tools", "/tools"], ["Projects", "/projects"],
  ["Resources", "/resources"], ["Training", "/training"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <Link className="primary-button header-cta" href="/learn">Start Learning</Link>
        <button ref={buttonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <Link ref={index === 0 ? firstLinkRef : undefined} tabIndex={open ? 0 : -1} key={href} href={href}>{label}<span aria-hidden="true">↗</span></Link>
          ))}
          <Link tabIndex={open ? 0 : -1} className="primary-button" href="/learn">Start Learning</Link>
        </nav>
      </div>
    </header>
  );
}
