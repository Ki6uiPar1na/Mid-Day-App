import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Facebook, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Club Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Mid Day Programming Club</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              JKKNIU's premier programming community fostering excellence in competitive programming and software development.
            </p>
            <div className="flex space-x-3">
              <Button variant="secondary" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="p-2">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="p-2">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#about" className="hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#executives" className="hover:opacity-100 transition-opacity">Executive Committee</a></li>
              <li><a href="#contests" className="hover:opacity-100 transition-opacity">Contests</a></li>
              <li><a href="#achievements" className="hover:opacity-100 transition-opacity">Achievements</a></li>
              <li><a href="#gallery" className="hover:opacity-100 transition-opacity">Gallery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>JKKNIU, Trishal, Mymensingh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@mdpc.jkkniu.edu.bd</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </div>

          {/* University Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">University</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              Jatiya Kabi Kazi Nazrul Islam University, established in 2005, is a leading public university in Bangladesh.
            </p>
            <Button variant="secondary" size="sm">
              Visit University Website
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-80">
              © 2024 Mid Day Programming Club, JKKNIU. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm opacity-80">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;