import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle'; // ✅ Import the Theme Toggle

type HeaderProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenLogin: () => void;
  onLogout: () => void;
  userEmail?: string;
  userAvatarUrl?: string;
};

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  onOpenLogin,
  onLogout,
  userEmail,
  userAvatarUrl
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Proud Mentions', href: '#proud-mentions' },
    { name: 'Executives', href: '#executives' },
    { name: 'General Members', href: '#general-members' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contests', href: '#contests' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Notice', href: '#notice' }
  ];

  const scrollToSection = (href: string) => {
    if (href === '#contests' && !isLoggedIn) {
      onOpenLogin();
      setIsMenuOpen(false);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b shadow-elegant bg-[#befae9]/30 backdrop-blur-xl backdrop-saturate-150 dark:bg-[#0f0f0f]/60">
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
            <p className="text-sm text-muted-foreground mt-1 dark:text-gray-300">
              Jatiya Kabi Kazi Nazrul Islam University, Trishal, Mymensingh
            </p>
            {isLoggedIn && userEmail && (
              <p className="text-sm text-white/70 mt-1">Welcome, {userEmail}</p>
            )}
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

            {/* Desktop Auth Buttons and Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4 relative">
              <ThemeToggle /> {/* ✅ Dark/Light toggle */}

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-primary transition duration-200"
                    aria-label="User Menu"
                  >
                    <img
                      src={userAvatarUrl || '/images/default-avatar.png'}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 transition duration-200 ease-out origin-top animate-fade-in dark:bg-gray-800 dark:text-white">
                      <button
                        onClick={() => {
                          window.location.href = '/profile';
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 transition duration-200 hover:scale-[1.02]"
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
              <div className="flex justify-end pr-2">
                <ThemeToggle /> {/* ✅ Mobile Theme Toggle */}
              </div>

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
                <div className="flex items-center gap-2 mt-4">
                  <img
                    src={userAvatarUrl || '/images/default-avatar.png'}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-primary transition duration-200"
                  />
                  <div className="flex flex-col ml-2">
                    <button
                      onClick={() => {
                        window.location.href = '/profile';
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-left hover:text-primary transition duration-200"
                    >
                      Go to Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-left hover:text-primary mt-1 transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 mt-4 transition duration-200 hover:scale-[1.02]"
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
