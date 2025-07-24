import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export function AuthForm({ onLoginSuccess }: { onLoginSuccess: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const trimmedEmail = email.trim().toLowerCase();

    if (isLogin) {
      // ✅ LOGIN using Supabase Auth
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (loginError) {
        setError('Invalid email or password');
        return;
      }

      localStorage.setItem('admin_email', trimmedEmail);
      onLoginSuccess(trimmedEmail);
      navigate('/admin/dashboard');
    } else {
      // ✅ SIGNUP using Supabase Auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      setMessage('Account created! Please check your email to confirm your account.');
      setIsLogin(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
        <button type="submit" className="w-full bg-primary text-white p-2 rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <button
        className="mt-4 text-sm underline"
        onClick={() => {
          setError(null);
          setMessage(null);
          setIsLogin(!isLogin);
        }}
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
