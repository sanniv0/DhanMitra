import { Handshake } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Handshake className="h-8 w-8 text-primary" />
      <h1 className="font-headline text-2xl font-bold text-primary">DhanMitra</h1>
    </div>
  );
}
