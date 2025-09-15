import { useState } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jobblyLogo from '@/assets/jobbly-logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Jobs', href: '#jobs' },
    { name: 'Companies', href: '#companies' },
    { name: 'Career Resources', href: '#resources' },
    { name: 'AI Tools', href: '#ai-tools' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-jobbly-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={jobblyLogo} 
              alt="Jobbly Logo" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-bold text-gradient-purple">
              Jobbly
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="font-medium">
                Login
              </Button>
              <Button className="jobbly-btn-primary px-6 py-2">
                Post a Job
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-jobbly-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="ghost" className="font-medium">
                  Login
                </Button>
                <Button className="jobbly-btn-primary py-2">
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;