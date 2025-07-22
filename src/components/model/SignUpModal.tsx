import { useState } from 'react';
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
  onClose: () => void
  onSubmit: (formData: Record<string, string>) => void;
}

const platforms = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/' },
  { label: 'Codolio', link: 'https://codolio.com/' },
  { label: 'Codeforces', link: 'https://codeforces.com/register' },
  { label: 'Codechef', link: 'https://www.codechef.com/signup' },
  { label: 'Toph', link: 'https://toph.co/' },
  { label: 'Hackerrank', link: 'https://www.hackerrank.com/' }
];

export function SignUpModal({ isOpen, onClose, onSubmit }: SignUpModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    Name: '',
    Gmail: '',
    Phone: '',
    Session: '',
    LinkedIn: '',
    Codolio: '',
    Codeforces: '',
    Codechef: '',
    Toph: '',
    Hackerrank: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg card-glow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Club Sign Up
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">Join the club officially!</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['Name', 'Gmail', 'Phone', 'Session'].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>{field}</Label>
                <Input
                  id={field}
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required
                />
              </div>
            ))}

            {platforms.map((platform) => (
              <div key={platform.label}>
                <div className="flex items-center justify-between">
                  <Label htmlFor={platform.label}>{platform.label}</Label>
                  {!formData[platform.label] && (
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      Create account
                    </a>
                  )}
                </div>
                <Input
                  id={platform.label}
                  placeholder={`Your ${platform.label} URL or username`}
                  value={formData[platform.label]}
                  onChange={(e) => handleChange(platform.label, e.target.value)}
                />
              </div>
            ))}

            <Button type="submit" className="w-full btn-hero mt-4">
              Submit to Executives
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
