import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mid Day Programming Club</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Fostering programming excellence at JKKNIU through contests, workshops, and community building.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm opacity-90">
              <p>About Us</p>
              <p>Contests</p>
              <p>Membership</p>
              <p>Gallery</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@mdpc.jkkniu.edu.bd</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>JKKNIU, Trishal, Mymensingh</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 opacity-90 hover:opacity-100 cursor-pointer" />
              <Linkedin className="h-5 w-5 opacity-90 hover:opacity-100 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2024 Mid Day Programming Club, JKKNIU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;