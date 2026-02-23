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
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-4 flex min-h-[80vh] items-center justify-center overflow-hidden md:-mx-6 lg:-mx-8">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0 scale-110 blur-md grayscale-[0.2] opacity-40">
          <Image
            src="https://picsum.photos/seed/artha-hero/1600/900"
            alt="Financial landscape"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Card */}
        <div className="relative z-10 w-full max-w-4xl px-4">
          <div className="rounded-[3rem] border border-white/40 bg-white/60 p-12 text-center shadow-2xl backdrop-blur-xl md:p-20">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl">
              Your Personal Finance Guide
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-foreground/80 md:text-xl lg:text-2xl leading-relaxed">
              Simplify your finances and start your investment journey with Dhan Mitra. We provide the tools and knowledge to build your future, one step at a time.
            </p>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row lg:gap-6">
              <Button asChild size="lg" className="h-14 rounded-xl px-10 text-lg font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95">
                <Link href="/plan-generator">Generate Your Plan</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 rounded-xl border-2 border-primary/20 bg-white/40 px-10 text-lg font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95">
                <Link href="/learn">Learn About Investing</Link>
              </Button>
            </div>

            <p className="mt-12 text-sm font-medium text-foreground/60 tracking-wide uppercase">
              Trusted by over 3,000 users globally
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold text-foreground sm:text-5xl">Explore Our Tools</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to master your financial destiny.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group">
              <Card className="h-full border-2 border-transparent transition-all duration-500 ease-out hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                  <CardTitle className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">{link.label}</CardTitle>
                  <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {React.createElement(link.icon, { className: "h-7 w-7" })}
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-base text-muted-foreground mb-6 line-clamp-2">
                    {link.label === 'Plan Generator' ? 'Get a custom roadmap based on your goals.' :
                      link.label === 'Product Finder' ? 'Find the best investment vehicles for you.' :
                        link.label === 'Learning Hub' ? 'Master the basics of wealth creation.' :
                          link.label === 'Risk Quiz' ? 'Understand your relationship with risk.' :
                            link.label === 'Calculators' ? 'Plan your future with precision.' :
                              `Explore our ${link.label.toLowerCase()} content.`}
                  </p>
                  <div className="flex items-center text-primary font-semibold">
                    Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
