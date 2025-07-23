import { useState, useEffect } from 'react';
import { X, LogIn, Mail, Lock, User, Key } from 'lucide-react';
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

import { supabase } from '@/lib/supabaseClient'; // 🔹 Added this import

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
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  useEffect(() => {
    if (isOpen || showForgotModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen, showForgotModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !selectedRole) return;

    setIsLoading(true);
    setTimeout(() => {
      onLogin(email, password, selectedRole);
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setSelectedRole('');
    }, 1000);
  };

  // 🔹 Supabase Forgot Password Handler
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus('Sending reset email...');

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: 'http://192.168.100.113:8080/update-password', // 🔸 Customize this
    });

    if (error) {
      setResetStatus(`Error: ${error.message}`);
    } else {
      setResetStatus('Reset link sent to ' + resetEmail);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Login Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <Card className="w-full max-w-2xl bg-[#42fff6]/30 backdrop-blur-xl text-white border border-white/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold bg-gradient-primary to-secondary bg-clip-text text-transparent">
                Club Login
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 text-white"
                aria-label="Close login modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-white/80">
              Access your club dashboard and exclusive content
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-1 block text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@jkkniu.edu.bd"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="mb-1 block text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <Label htmlFor="role" className="mb-1 block text-white">
                  Role
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 z-10" />
                  <Select value={selectedRole} onValueChange={setSelectedRole} required>
                    <SelectTrigger className="pl-10 bg-white/20 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
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
                className="w-full bg-primary hover:bg-primary/80 text-white"
                disabled={isLoading || !email || !password || !selectedRole}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
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

            {/* Sign Up and Forgot Password */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Need an account?{' '}
                <Button variant="link" className="p-0 h-auto text-primary" onClick={onOpenSignUp}>
                  Sign up
                </Button>
              </p>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="hover:underline text-primary text-sm mt-2"
              >
                Forgot password?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur p-4">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white border border-white/20 shadow-lg">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold flex items-center gap-2 text-primary">
                <Key className="h-5 w-5" />
                Reset Password
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetStatus('');
                  setResetEmail('');
                }}
                className="h-8 w-8 p-0 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail" className="mb-1 block text-white">
                    Enter your email
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="your.email@jkkniu.edu.bd"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white">
                  Send Reset Link
                </Button>
                {resetStatus && (
                  <p className="text-sm text-green-400 text-center">{resetStatus}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
