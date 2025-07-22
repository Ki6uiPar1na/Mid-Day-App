import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProudMentionsSection from '@/components/ProudMentionsSection';
import ExecutivesSection from '@/components/ExecutivesSection';
import GeneralMembersSection from '@/components/GeneralMembersSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContestsSection from '@/components/ContestsSection';
import GallerySection from '@/components/GallerySection';
import NoticeSection from '@/components/NoticeSection';
import Footer from '@/components/Footer';
import { LoginModal } from '@/components/model/LoginModal';
import { SignUpModal } from '@/components/model/SignUpModal';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
        setUserEmail(data.session.user.email);
      }
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Login handler
  const handleLogin = async (email: string, password: string, role: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login error: ' + error.message);
      return;
    }

    // Optional: verify role by querying your profiles table
    // Example:
    /*
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();
    if (profileError || profileData.role !== role) {
      alert('Role does not match');
      await supabase.auth.signOut();
      return;
    }
    */

    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  // Signup handler
  const handleSignUp = async (formData: Record<string, string>) => {
    const { email, password, confirmPassword, ...profileData } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert('Sign-up error: ' + signUpError.message);
      return;
    }

    if (!signUpData.user) {
      alert('User created but no user data returned');
      return;
    }

    // Insert user profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: signUpData.user.id, email, ...profileData }]);

    if (profileError) {
      alert('Profile insert error: ' + profileError.message);
      return;
    }

    alert('Signup successful! Please check your email to verify your account.');

    setIsSignUpOpen(false);
    setIsLoggedIn(true);
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        userEmail={userEmail}
      />

      <HeroSection />
      <AboutSection />
      <ProudMentionsSection />
      <ExecutivesSection />
      <GeneralMembersSection />
      <AchievementsSection />
      <ContestsSection />
      <GallerySection />
      <NoticeSection />
      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onOpenSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSubmit={handleSignUp}
      />
    </div>
  );
};

export default Index;
