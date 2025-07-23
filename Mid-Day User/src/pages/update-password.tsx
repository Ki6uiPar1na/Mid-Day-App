import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setStatus('❌ Missing or expired session. Please try the reset link again.');
      }
      setSessionChecked(true);
    };
    checkSession();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setStatus(`❌ ${error.message}`);
    } else {
      setStatus('✅ Password updated successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 2000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#befae9]/30 flex items-center justify-center p-4 backdrop-blur">
      <Card className="w-full max-w-md bg-white/90 text-black border border-gray-300 shadow-2xl backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Reset Your Password
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Please enter a new password to complete the reset.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-5">
            <div>
              <Label htmlFor="new-password" className="text-sm">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
                placeholder="********"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-white"
              disabled={isSubmitting || !sessionChecked}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>

            {status && (
              <p className="text-center text-sm mt-3">
                {status.includes('✅') ? (
                  <span className="text-green-600">{status}</span>
                ) : (
                  <span className="text-red-500">{status}</span>
                )}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
