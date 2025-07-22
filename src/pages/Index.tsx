import { useState } from 'react';
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

  const handleLogin = (email: string, password: string, role: string) => {
    // Simple dummy auth logic
    console.log('Logging in:', { email, password, role });
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenLogin={() => setIsLoginOpen(true)}
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
      />
    </div>
  );
};

export default Index;
