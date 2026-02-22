import {
  Home,
  BrainCircuit,
  Lightbulb,
  FileQuestion,
  Calculator,
  ShoppingBag,
} from 'lucide-react';
import React from 'react';

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plan-generator', label: 'Plan Generator', icon: BrainCircuit },
  { href: '/product-recommender', label: 'Product Finder', icon: ShoppingBag },
  { href: '/learn', label: 'Learning Hub', icon: Lightbulb },
  { href: '/quiz', label: 'Risk Quiz', icon: FileQuestion },
  { href: '/calculators', label: 'Calculators', icon: Calculator },
];
