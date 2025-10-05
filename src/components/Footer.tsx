import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jobblyLogo from '@/assets/jobbly-logo.png';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { toast } = useToast();
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  const handleNewsletterSubmit = async () => {
    const emailInput = document.getElementById('newsletter-email') as HTMLInputElement;
    const email = emailInput?.value;

    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed",
            description: "You're already subscribed to our newsletter!",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully Subscribed!",
          description: "Thank you for subscribing to our newsletter. Check your inbox for updates!",
        });
        emailInput.value = '';
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing you to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  const footerLinks = {
    'Job Seekers': [
      'Browse Jobs',
      'Career Advice',
      'Resume Builder',
      'Skill Tests',
      'Interview Prep',
      'Salary Guide'
    ],
    'Employers': [
      'Post a Job',
      'Browse Candidates',
      'Hiring Solutions',
      'Company Reviews',
      'Pricing',
      'Success Stories'
    ],
    'Resources': [
      'Career Blog',
      'Industry Reports',
      'Webinars',
      'Help Center',
      'API Documentation',
      'Mobile App'
    ],
    'Company': [
      'About Us',
      'Press',
      'Careers',
      'Contact',
      'Privacy Policy',
      'Terms of Service'
    ]
  };

  return (
    <footer className="bg-jobbly-card border-t border-jobbly-border">
      {/* Newsletter Section */}
      <div className="border-b border-jobbly-border py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Stay Updated with <span className="text-gradient-purple">Job Opportunities</span>
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest job alerts, career tips, and industry insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 py-3 bg-background border-jobbly-border focus:border-jobbly-purple"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNewsletterSubmit();
                }
              }}
            />
            <Button 
              className="jobbly-btn-primary px-8 py-3" 
              onClick={handleNewsletterSubmit}
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={jobblyLogo} 
                  alt="Jobbly Logo" 
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-2xl font-bold text-gradient-purple">
                  Jobbly
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The AI-powered job portal that connects talented professionals with their dream careers. 
                Join millions who trust Jobbly to accelerate their career growth.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Mail size={16} className="mr-3" />
                  <span>hello@jobbly.com</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone size={16} className="mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-3" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Instagram, href: '#', label: 'Instagram' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-jobbly-purple hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-foreground mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-jobbly-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © 2024 Jobbly. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Cookie Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;