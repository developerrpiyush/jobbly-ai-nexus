import { ExternalLink, MapPin, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CompaniesSection = () => {
  const companies = [
    {
      id: 1,
      name: 'TechFlow Inc.',
      logo: 'https://placehold.co/80x80/6366f1/ffffff?text=TF',
      industry: 'Technology',
      location: 'San Francisco, CA',
      employees: '1,000-5,000',
      rating: 4.8,
      openJobs: 23,
      description: 'Leading fintech company revolutionizing digital payments and blockchain solutions.',
      benefits: ['Remote Work', 'Health Insurance', 'Stock Options', '401k Match']
    },
    {
      id: 2,
      name: 'DataVision AI',
      logo: 'https://placehold.co/80x80/8b5cf6/ffffff?text=DV',
      industry: 'Artificial Intelligence',
      location: 'New York, NY',
      employees: '500-1,000',
      rating: 4.9,
      openJobs: 15,
      description: 'Cutting-edge AI research company developing next-generation machine learning solutions.',
      benefits: ['Flexible Hours', 'Learning Budget', 'Gym Membership', 'Catered Meals']
    },
    {
      id: 3,
      name: 'GreenTech Solutions',
      logo: 'https://placehold.co/80x80/10b981/ffffff?text=GT',
      industry: 'Clean Energy',
      location: 'Austin, TX',
      employees: '200-500',
      rating: 4.7,
      openJobs: 12,
      description: 'Sustainable technology company focused on renewable energy and environmental solutions.',
      benefits: ['4-Day Work Week', 'Unlimited PTO', 'Green Commute', 'Wellness Programs']
    },
    {
      id: 4,
      name: 'CloudFlow Systems',
      logo: 'https://placehold.co/80x80/f59e0b/ffffff?text=CF',
      industry: 'Cloud Computing',
      location: 'Seattle, WA',
      employees: '1,000-5,000',
      rating: 4.6,
      openJobs: 31,
      description: 'Enterprise cloud infrastructure provider serving Fortune 500 companies worldwide.',
      benefits: ['Remote First', 'Sabbatical Leave', 'Professional Development', 'Mental Health Support']
    },
    {
      id: 5,
      name: 'HealthTech Innovations',
      logo: 'https://placehold.co/80x80/ef4444/ffffff?text=HT',
      industry: 'Healthcare Technology',
      location: 'Boston, MA',
      employees: '500-1,000',
      rating: 4.8,
      openJobs: 18,
      description: 'Digital health platform improving patient care through innovative medical technology.',
      benefits: ['Health Stipend', 'Parental Leave', 'Conference Budget', 'Volunteer Time Off']
    },
    {
      id: 6,
      name: 'EdTech Future',
      logo: 'https://placehold.co/80x80/06b6d4/ffffff?text=EF',
      industry: 'Education Technology',
      location: 'Remote',
      employees: '50-200',
      rating: 4.9,
      openJobs: 8,
      description: 'Online learning platform transforming education with personalized AI-driven curricula.',
      benefits: ['Fully Remote', 'Learning Stipend', 'Equipment Budget', 'Team Retreats']
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
                <Button className="jobbly-btn-primary flex-1">
                  View Jobs ({company.openJobs})
                </Button>
                <Button variant="outline" className="border-jobbly-border hover:border-jobbly-purple">
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
          <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-jobbly-border hover:border-jobbly-purple hover:bg-jobbly-purple/10">
            Explore All Companies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;