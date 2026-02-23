import Link from 'next/link';
import { Logo } from './logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { navLinks } from '@/lib/nav-links';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-secondary-foreground/80">
              Your personal guide to financial freedom in India.
            </p>
            <div className="mt-8 flex space-x-6">
              <a href="#" className="hover:opacity-75">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-75">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <p className="font-medium">Tools</p>
              <ul className="mt-6 space-y-4 text-sm">
                {navLinks.filter(l => l.href !== '/').map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className=" transition hover:opacity-75">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className=" transition hover:opacity-75"> About </a>
                </li>
                <li>
                  <a href="#" className=" transition hover:opacity-75"> Careers </a>
                </li>
                <li>
                  <a href="#" className=" transition hover:opacity-75"> Blog </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className=" transition hover:opacity-75"> Terms & Conditions </a>
                </li>
                <li>
                  <a href="#" className=" transition hover:opacity-75"> Privacy Policy </a>
                </li>
                <li>
                  <a href="#" className=" transition hover:opacity-75"> Disclaimer </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-foreground/20 pt-8">
          <p className="text-center text-xs/relaxed text-secondary-foreground/60">
            © Dhan Mitra {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
