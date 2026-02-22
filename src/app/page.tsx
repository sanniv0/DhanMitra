import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { navLinks } from '@/lib/nav-links';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';

export default function HomePage() {
  const featureLinks = navLinks.filter(link => link.href !== '/');

  return (
    <div className="space-y-16">
      <section className="relative -mx-4 -mt-4 md:-mx-6 lg:-mx-8">
        <div className="relative h-[50vh] min-h-[400px] w-full">
            <Image
                src="https://picsum.photos/seed/dhanmitra-hero/1200/600"
                alt="Financial planning"
                fill
                className="object-cover"
                data-ai-hint="financial planning abstract"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        </div>
        <div className="relative -mt-32 px-4 text-center text-foreground md:px-6 lg:px-8">
            <div className="bg-background/80 backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto">
                <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
                    Your Personal Finance Guide
                </h1>
                <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Simplify your finances and start your investment journey with DhanMitra. We provide the tools and knowledge to build your future, one step at a time.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/plan-generator">Generate Your Plan</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/learn">Learn About Investing</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      <section className="container mx-auto">
        <h2 className="font-headline text-3xl font-semibold mb-6 text-center">Explore Our Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium font-headline">{link.label}</CardTitle>
                  <div className="text-primary">
                    {React.createElement(link.icon, { className: "h-6 w-6" })}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore our {link.label.toLowerCase()}.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Go to {link.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
