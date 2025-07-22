import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenLogin: () => void;
};

const Header = ({ isLoggedIn, setIsLoggedIn, onOpenLogin }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Proud Mentions', href: '#proud-mentions' },
    { name: 'Executives', href: '#executives' },
    { name: 'General Members', href: '#general-members' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contests', href: '#contests' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Notice', href: '#notice' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b shadow-elegant bg-[#befae9]/30 backdrop-blur-xl backdrop-saturate-150">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="py-4 border-b flex items-center justify-between">
          <img
            src="/images/Club-logo.png"
            alt="Left Logo"
            className="h-12 w-auto object-contain hidden sm:block"
          />
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Mid Day Programming Club
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Jatiya Kabi Kazi Nazrul Islam University, Trishal, Mymensingh
            </p>
          </div>
          <img
            src="/images/Jkkniu.webp"
            alt="Right Logo"
            className="h-12 w-auto object-contain hidden sm:block"
          />
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onOpenLogin}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 space-y-4 pb-4 border-t pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2"
                >
                  {item.name}
                </button>
              ))}

              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2 mt-4"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 mt-4"
                >
                  <User className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
