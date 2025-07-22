import { useState } from 'react';
import { X, LogIn, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string, role: string) => void;
  onOpenSignUp: () => void;
}

const userRoles = [
  { value: 'general', label: 'General Member' },
  { value: 'executive', label: 'Executive' },
  { value: 'senior-executive', label: 'Senior Executive' },
  { value: 'proud-member', label: 'Proud Mention Member' }
];

export function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onOpenSignUp
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !selectedRole) return;

    setIsLoading(true);
    setTimeout(() => {
      onLogin(email, password, selectedRole);
      setIsLoading(false);
      onClose();
      setEmail('');
      setPassword('');
      setSelectedRole('');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md card-glow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-primary from-primary to-secondary bg-clip-text text-transparent">
              Club Login
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
          <p className="text-muted-foreground">
            Access your club dashboard and exclusive content
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-1 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@jkkniu.edu.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-1 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role" className="mb-1 block">
                Role
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Select value={selectedRole} onValueChange={setSelectedRole} required>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-hero"
              disabled={isLoading || !email || !password || !selectedRole}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need an account?{' '}
              <Button variant="./SignUpModal" className="p-0 h-auto text-primary" onClick={onOpenSignUp}>
                Sign up
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
