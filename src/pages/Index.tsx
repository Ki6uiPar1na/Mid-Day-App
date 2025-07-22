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

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <HeroSection />
      <AboutSection />
      <ProudMentionsSection />
      <ExecutivesSection />
      <GeneralMembersSection />
      <AchievementsSection />

      {/* Show contests only if logged in */}
      {isLoggedIn && <ContestsSection />}

      <GallerySection />
      <NoticeSection />
      <Footer />
    </div>
  );
};

export default Index;
