import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, string>) => void;
}

export function SignUpModal({ isOpen, onClose, onSubmit }: SignUpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [codolio, setCodolio] = useState('');
  const [codeforces, setCodeforces] = useState('');
  const [codechef, setCodechef] = useState('');
  const [hackerrank, setHackerrank] = useState('');
  const [toph, setToph] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = {
      name,
      email,
      phone,
      linkedIn,
      codolio,
      codeforces,
      codechef,
      hackerrank,
      toph,
      password
    };

    setIsLoading(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
      onClose();

      // Clear all fields
      setName('');
      setEmail('');
      setPhone('');
      setLinkedIn('');
      setCodolio('');
      setCodeforces('');
      setCodechef('');
      setHackerrank('');
      setToph('');
      setPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-[#42fff6]/30 backdrop-blur-xl text-white border border-white/20 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sign Up
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white"
              aria-label="Close signup modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-white/80">
            Create your club account
          </p>
        </CardHeader>

        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
            {/* LEFT SECTION */}
            <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold text-white/90">Basic Info</h3>

            <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
                className="bg-white/20 text-white placeholder:text-white/60" required />
            </div>

            <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 text-white placeholder:text-white/60" required />
            </div>

            <div>
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="bg-white/20 text-white placeholder:text-white/60" required />
            </div>

            <div>
                <Label htmlFor="linkedIn" className="text-white">LinkedIn</Label>
                <Input id="linkedIn" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="LinkedIn profile" className="bg-white/20 text-white placeholder:text-white/60" />
            </div>
            </div>

            {/* MIDDLE SECTION */}
            <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold text-white/90">Platform Handles</h3>

            <div>
                <Label htmlFor="codolio" className="text-white">Codolio</Label>
                <Input id="codolio" value={codolio} onChange={(e) => setCodolio(e.target.value)}
                placeholder="Codolio username" className="bg-white/20 text-white placeholder:text-white/60" />
            </div>

            <div>
                <Label htmlFor="codeforces" className="text-white">Codeforces</Label>
                <Input id="codeforces" value={codeforces} onChange={(e) => setCodeforces(e.target.value)}
                placeholder="Codeforces handle" className="bg-white/20 text-white placeholder:text-white/60" />
            </div>

            <div>
                <Label htmlFor="codechef" className="text-white">Codechef</Label>
                <Input id="codechef" value={codechef} onChange={(e) => setCodechef(e.target.value)}
                placeholder="Codechef username" className="bg-white/20 text-white placeholder:text-white/60" />
            </div>

            <div>
                <Label htmlFor="hackerrank" className="text-white">Hackerrank</Label>
                <Input id="hackerrank" value={hackerrank} onChange={(e) => setHackerrank(e.target.value)}
                placeholder="Hackerrank username" className="bg-white/20 text-white placeholder:text-white/60" />
            </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold text-white/90">Security</h3>

            <div>
                <Label htmlFor="toph" className="text-white">Toph</Label>
                <Input id="toph" value={toph} onChange={(e) => setToph(e.target.value)}
                placeholder="Toph username" className="bg-white/20 text-white placeholder:text-white/60" />
            </div>

            <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 text-white placeholder:text-white/60" required />
            </div>

            <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/20 text-white placeholder:text-white/60" required />
            </div>

            <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-white mt-2"
                disabled={isLoading}
            >
                {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
            </div>
        </div>
        </form>
        </CardContent>

      </Card>
    </div>
  );
}
