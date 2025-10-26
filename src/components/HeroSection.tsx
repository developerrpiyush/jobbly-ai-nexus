import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (location) params.append('location', location);
    if (selectedType) params.append('type', selectedType);
    
    navigate(`/jobs?${params.toString()}`);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(selectedType === type ? '' : type);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-jobbly-purple/10" />
      
      {/* Animated Blob Effects */}
      <div className="absolute w-96 h-96 bg-jobbly-purple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob top-20 left-1/4" />
      <div className="absolute w-96 h-96 bg-jobbly-purple-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 bottom-20 right-1/4" />
      <div className="absolute w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Hero Text */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          Find Your Dream
          <span className="block text-gradient-purple mt-2">Career Today</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Discover opportunities that match your skills with AI-powered job recommendations. 
          Join over <span className="text-foreground font-semibold">500,000+</span> professionals 
          who found their perfect job through Jobbly.
        </p>

        {/* Job Search Bar */}
        <div className="jobbly-card p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Job title, keywords, or company"
                className="pl-12 py-6 text-lg bg-background border-jobbly-border focus:border-jobbly-purple"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Location or Remote"
                className="pl-12 py-6 text-lg bg-background border-jobbly-border focus:border-jobbly-purple"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              className="jobbly-btn-primary px-8 py-6 text-lg font-semibold"
              onClick={handleSearch}
            >
              Search Jobs
            </Button>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {['remote', 'full-time', 'part-time', 'contract', 'internship'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleTypeSelect(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedType === filter
                    ? 'bg-jobbly-purple text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-jobbly-purple/20'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <Button className="jobbly-btn-primary px-12 py-4 text-lg font-semibold" onClick={() => window.location.href = '/login'}>
            Login / Sign Up
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-purple mb-2">50K+</div>
            <div className="text-muted-foreground">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-purple mb-2">10K+</div>
            <div className="text-muted-foreground">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-purple mb-2">500K+</div>
            <div className="text-muted-foreground">Success Stories</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;