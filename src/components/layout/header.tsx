'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/nav-links';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
import React from 'react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden gap-8 text-sm font-medium md:flex lg:gap-10">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`transition-colors hover:text-primary ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-primary'
                    : 'text-muted-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium p-6">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Logo />
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      className={`flex items-center gap-4 px-2.5 transition-colors hover:text-primary ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'text-primary' : 'text-muted-foreground'
                        }`}
                    >
                      {React.createElement(link.icon, { className: "h-5 w-5" })}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
