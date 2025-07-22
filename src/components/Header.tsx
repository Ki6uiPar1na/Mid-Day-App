import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-elegant">
      <div className="container mx-auto px-4">
        {/* University Header */}
        <div className="text-center py-4 border-b">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Mid Day Programming Club
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Jatiya Kabi Kazi Nazrul Islam University, Trishal, Mymensingh
          </p>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation - Center */}
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

            {/* Login/Logout - Right */}
            <div className="hidden lg:flex">
              <Button
                variant={isLoggedIn ? "outline" : "default"}
                size="sm"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="flex items-center gap-2"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    Login
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
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
              <Button
                variant={isLoggedIn ? "outline" : "default"}
                size="sm"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="flex items-center gap-2 mt-4"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    Login
                  </>
                )}
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;