import { ExternalLink, MapPin, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import googleLogo from '/logos/google.png';
import microsoftLogo from '/logos/microsoft.png';
import amazonLogo from '/logos/amazon.png';
import metaLogo from '/logos/meta.png';
import appleLogo from '/logos/apple.png';
import netflixLogo from '/logos/netflix.png';

const CompaniesSection = () => {
  const navigate = useNavigate();
  
  const companies = [
    {
      id: 1,
      name: 'Google',
      logo: googleLogo,
      industry: 'Technology',
      location: 'Mountain View, CA',
      employees: '150,000+',
      rating: 4.5,
      openJobs: 234,
      description: 'Leading technology company focused on internet-related services and products.',
      benefits: ['Health Insurance', 'Remote Work', 'Stock Options', 'Learning Budget']
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: microsoftLogo,
      industry: 'Technology',
      location: 'Redmond, WA',
      employees: '220,000+',
      rating: 4.4,
      openJobs: 189,
      description: 'Global technology company developing software, hardware, and cloud services.',
      benefits: ['401k Match', 'Parental Leave', 'Gym Membership', 'Professional Development']
    },
    {
      id: 3,
      name: 'Amazon',
      logo: amazonLogo,
      industry: 'E-commerce & Cloud',
      location: 'Seattle, WA',
      employees: '1,500,000+',
      rating: 4.3,
      openJobs: 567,
      description: "World's largest online retailer and leading cloud computing provider.",
      benefits: ['Career Growth', 'Relocation Support', 'Employee Discounts', 'Tuition Assistance']
    },
    {
      id: 4,
      name: 'Meta',
      logo: metaLogo,
      industry: 'Social Media',
      location: 'Menlo Park, CA',
      employees: '86,000+',
      rating: 4.2,
      openJobs: 145,
      description: 'Social technology company building the future of human connection.',
      benefits: ['Generous PTO', 'Wellness Programs', 'Innovation Time', 'Global Mobility']
    },
    {
      id: 5,
      name: 'Apple',
      logo: appleLogo,
      industry: 'Technology',
      location: 'Cupertino, CA',
      employees: '164,000+',
      rating: 4.5,
      openJobs: 178,
      description: 'Innovative technology company creating groundbreaking products and services.',
      benefits: ['Product Discounts', 'Health & Wellness', 'Commuter Benefits', 'Educational Support']
    },
    {
      id: 6,
      name: 'Netflix',
      logo: netflixLogo,
      industry: 'Entertainment',
      location: 'Los Gatos, CA',
      employees: '12,800+',
      rating: 4.3,
      openJobs: 67,
      description: 'Global streaming entertainment service with original content production.',
      benefits: ['Unlimited PTO', 'Freedom & Responsibility', 'Competitive Salary', 'Content Access']
    }
  ];

  return (
    <section id="companies" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Top <span className="text-gradient-purple">Companies</span> Hiring
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing companies that are actively hiring talented professionals. 
            Explore their culture, benefits, and open positions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {companies.map((company) => (
            <div key={company.id} className="jobbly-card p-6 group">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="w-16 h-16 rounded-xl"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-gradient-purple transition-colors duration-300">
                      {company.name}
                    </h3>
                    <p className="text-muted-foreground">{company.industry}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{company.employees}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{company.rating}</span>
                  </div>
                  <Badge variant="secondary" className="bg-jobbly-purple/20 text-jobbly-purple">
                    {company.openJobs} Open Jobs
                  </Badge>
                </div>
              </div>

              {/* Company Description */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {company.description}
              </p>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Benefits & Perks</h4>
                <div className="flex flex-wrap gap-2">
                  {company.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  className="jobbly-btn-primary flex-1"
                  onClick={() => navigate(`/jobs?company=${encodeURIComponent(company.name)}`)}
                >
                  View Jobs ({company.openJobs})
                </Button>
                <Button 
                  variant="outline" 
                  className="border-jobbly-border hover:border-jobbly-purple"
                  onClick={() => navigate('/companies')}
                >
                  <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Company Stats */}
        <div className="jobbly-card p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient-purple mb-2">10,000+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-purple mb-2">500+</div>
              <div className="text-muted-foreground">Fortune 500 Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-purple mb-2">95%</div>
              <div className="text-muted-foreground">Company Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-purple mb-2">24/7</div>
              <div className="text-muted-foreground">New Jobs Posted</div>
            </div>
          </div>
        </div>

        {/* View All Companies CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-jobbly-border hover:border-jobbly-purple hover:bg-jobbly-purple/10"
            onClick={() => navigate('/companies')}
          >
            Explore All Companies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;