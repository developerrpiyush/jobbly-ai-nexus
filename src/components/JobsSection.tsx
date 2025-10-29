import { MapPin, DollarSign, Clock, Building, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const JobsSection = () => {
  const navigate = useNavigate();
  
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      remote: true,
      logo: 'https://placehold.co/60x60/6366f1/ffffff?text=TC',
      rating: 4.8,
      skills: ['React', 'TypeScript', 'Node.js'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      company: 'DataVision',
      location: 'Remote',
      salary: '$140k - $180k',
      type: 'Full-time',
      remote: true,
      logo: 'https://placehold.co/60x60/8b5cf6/ffffff?text=DV',
      rating: 4.9,
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'InnovateLab',
      location: 'New York, NY',
      salary: '$110k - $140k',
      type: 'Full-time',
      remote: false,
      logo: 'https://placehold.co/60x60/10b981/ffffff?text=IL',
      rating: 4.7,
      skills: ['Strategy', 'Analytics', 'Leadership'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudFlow',
      location: 'Austin, TX',
      salary: '$100k - $130k',
      type: 'Full-time',
      remote: true,
      logo: 'https://placehold.co/60x60/f59e0b/ffffff?text=CF',
      rating: 4.6,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Seattle, WA',
      salary: '$85k - $110k',
      type: 'Full-time',
      remote: true,
      logo: 'https://placehold.co/60x60/ef4444/ffffff?text=DS',
      rating: 4.8,
      skills: ['Figma', 'Research', 'Prototyping'],
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'Boston, MA',
      salary: '$115k - $145k',
      type: 'Full-time',
      remote: true,
      logo: 'https://placehold.co/60x60/06b6d4/ffffff?text=AP',
      rating: 4.7,
      skills: ['R', 'SQL', 'Machine Learning'],
      posted: '4 days ago'
    }
  ];

  return (
    <section id="jobs" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient-purple">Job Opportunities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover hand-picked opportunities from top companies actively looking for talented professionals like you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredJobs.map((job) => (
            <div key={job.id} className="jobbly-card p-6 group hover:scale-105 transition-all duration-300">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-gradient-purple transition-colors duration-300">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Building size={16} />
                      <span className="text-sm">{job.company}</span>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm">{job.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {job.remote && (
                  <Badge variant="secondary" className="bg-jobbly-purple/20 text-jobbly-purple">
                    Remote
                  </Badge>
                )}
              </div>

              {/* Job Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign size={16} className="mr-2" />
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">{job.type} • Posted {job.posted}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Apply Button */}
              <Button 
                className="w-full jobbly-btn-primary font-medium"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>

        {/* View All Jobs CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-jobbly-border hover:border-jobbly-purple hover:bg-jobbly-purple/10"
            onClick={() => navigate('/jobs')}
          >
            View All {featuredJobs.length * 50}+ Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;