import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

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

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
    linkedin: z.string().optional(),
    github: z.string().optional(), // Changed from codolio
    codeforces: z.string().optional(),
    codechef: z.string().optional(),
    hackerrank: z.string().optional(),
    toph: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof schema>;

export function SignUpModal({ isOpen, onClose, onSubmit }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (isOpen) {
      reset();
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen, reset]);

  const onFormSubmit = async (data: FormData) => {
    const { email, password, confirmPassword, ...profileData } = data;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      setError('email', { message: signUpError.message });
      return;
    }

    const user = signUpData.user;
    if (!user) {
      alert('User created but no user data returned');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, email, ...profileData }]);

    if (profileError) {
      alert('Profile insert error: ' + profileError.message);
      return;
    }

    alert('Signup successful! Check your email for verification.');
    onSubmit(profileData);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Card className="w-full max-w-5xl bg-[#42fff6]/30 backdrop-blur-xl text-white border border-white/20 shadow-lg">
        <CardHeader className="space-y-1 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-0 top-0 h-8 w-8 p-0 text-white"
            aria-label="Close signup modal"
          >
            <X className="h-4 w-4" />
          </Button>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
            Sign Up
          </CardTitle>
          <p className="text-sm text-white/80 text-center">Create your club account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT SECTION */}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-white/90">Basic Info</h3>

                <div>
                  <Label className="text-white">Name</Label>
                  <Input {...register('name')} className="bg-white/20 text-white" />
                  {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <Label className="text-white">Email</Label>
                  <Input type="email" {...register('email')} className="bg-white/20 text-white" />
                  {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <Label className="text-white">Phone</Label>
                  <Input {...register('phone')} className="bg-white/20 text-white" />
                  {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                  <Label className="text-white">LinkedIn</Label>
                  <Input {...register('linkedin')} className="bg-white/20 text-white" />
                </div>
              </div>

              {/* MIDDLE SECTION */}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-white/90">Platform Handles</h3>

                <div>
                  <Label className="text-white">GitHub</Label>
                  <Input {...register('github')} className="bg-white/20 text-white" />
                </div>

                <div>
                  <Label className="text-white">Codeforces</Label>
                  <Input {...register('codeforces')} className="bg-white/20 text-white" />
                </div>

                <div>
                  <Label className="text-white">Codechef</Label>
                  <Input {...register('codechef')} className="bg-white/20 text-white" />
                </div>

                <div>
                  <Label className="text-white">Hackerrank</Label>
                  <Input {...register('hackerrank')} className="bg-white/20 text-white" />
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-white/90">Security</h3>

                <div>
                  <Label className="text-white">Toph</Label>
                  <Input {...register('toph')} className="bg-white/20 text-white" />
                </div>

                <div>
                  <Label className="text-white">Password</Label>
                  <Input type="password" {...register('password')} className="bg-white/20 text-white" />
                  {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                  <Label className="text-white">Confirm Password</Label>
                  <Input type="password" {...register('confirmPassword')} className="bg-white/20 text-white" />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/80 text-white mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      Signing up...
                    </div>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
