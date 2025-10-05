import { BookOpen, Video, FileText, Users, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const CareerResources = () => {
  const resources = [
    {
      icon: BookOpen,
      title: 'Career Guides',
      description: 'Comprehensive guides to help you navigate your career path',
      items: [
        'How to Write a Perfect Resume',
        'Interview Preparation Checklist',
        'Negotiating Your Salary',
        'Building Your Personal Brand',
      ],
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn from industry experts through our video content',
      items: [
        'Mastering Technical Interviews',
        'Effective Communication Skills',
        'Remote Work Best Practices',
        'Leadership Development',
      ],
    },
    {
      icon: FileText,
      title: 'Templates & Tools',
      description: 'Ready-to-use templates and tools for your job search',
      items: [
        'Resume Templates',
        'Cover Letter Examples',
        'Interview Question Bank',
        'Career Development Plan',
      ],
    },
    {
      icon: Users,
      title: 'Mentorship Program',
      description: 'Connect with experienced professionals in your field',
      items: [
        'One-on-One Mentoring',
        'Group Workshops',
        'Networking Events',
        'Career Coaching Sessions',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Industry Insights',
      description: 'Stay updated with the latest trends and market demands',
      items: [
        'Salary Reports by Industry',
        'In-Demand Skills Analysis',
        'Job Market Trends',
        'Future of Work Reports',
      ],
    },
    {
      icon: Award,
      title: 'Certification Courses',
      description: 'Enhance your skills with our certification programs',
      items: [
        'Digital Marketing Certification',
        'Project Management Professional',
        'Data Science Bootcamp',
        'UI/UX Design Course',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career <span className="text-gradient-purple">Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to advance your career and achieve your professional goals
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="jobbly-card hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-jobbly-purple mr-2">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 jobbly-btn-primary">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Article Section */}
        <section className="jobbly-card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Article</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                alt="Career Development"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                10 Essential Skills Every Professional Needs in 2025
              </h3>
              <p className="text-muted-foreground mb-6">
                As the job market evolves, staying competitive requires continuous learning and skill development. 
                Discover the most in-demand skills that employers are looking for and how you can acquire them.
              </p>
              <Button className="jobbly-btn-primary">
                Read Full Article
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="jobbly-card p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Career Tips
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get weekly insights, job market trends, and career advice delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-jobbly-border focus:border-jobbly-purple focus:outline-none"
            />
            <Button className="jobbly-btn-primary px-8">
              Subscribe
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerResources;