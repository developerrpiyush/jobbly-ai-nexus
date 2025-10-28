import { BookOpen, Video, FileText, Users, TrendingUp, Award, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { useState } from 'react';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');

const CareerResources = () => {
  const { toast } = useToast();
  const [selectedResource, setSelectedResource] = useState<number | null>(null);
  const [showArticle, setShowArticle] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

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

  const detailedContent: Record<number, { title: string; content: string[] }> = {
    0: {
      title: 'Career Guides',
      content: [
        '**How to Write a Perfect Resume**: Learn the essential components of a standout resume including formatting, keyword optimization, and tailoring your experience to specific roles.',
        '**Interview Preparation Checklist**: Master the art of interviews with our comprehensive checklist covering research, common questions, body language, and follow-up strategies.',
        '**Negotiating Your Salary**: Understand your market value, learn negotiation tactics, and discover when and how to discuss compensation effectively.',
        '**Building Your Personal Brand**: Create a compelling professional identity across LinkedIn, personal website, and other platforms to attract opportunities.',
      ],
    },
    1: {
      title: 'Video Tutorials',
      content: [
        '**Mastering Technical Interviews**: Step-by-step guidance on solving coding problems, system design questions, and demonstrating technical expertise.',
        '**Effective Communication Skills**: Learn professional communication techniques for emails, presentations, meetings, and cross-functional collaboration.',
        '**Remote Work Best Practices**: Optimize your remote work setup, time management, virtual collaboration, and work-life balance strategies.',
        '**Leadership Development**: Develop essential leadership skills including team management, decision-making, conflict resolution, and strategic thinking.',
      ],
    },
    2: {
      title: 'Templates & Tools',
      content: [
        '**Resume Templates**: Professional, ATS-friendly resume templates for various industries and experience levels, ready to customize.',
        '**Cover Letter Examples**: Proven cover letter templates that help you stand out and showcase your enthusiasm and qualifications.',
        '**Interview Question Bank**: 200+ common interview questions with sample answers and tips for different job roles and industries.',
        '**Career Development Plan**: Structured templates to set career goals, track progress, and plan your professional development journey.',
      ],
    },
    3: {
      title: 'Mentorship Program',
      content: [
        '**One-on-One Mentoring**: Get personalized guidance from experienced professionals in your field through regular mentoring sessions.',
        '**Group Workshops**: Participate in interactive workshops on career development, skill building, and industry insights with peers.',
        '**Networking Events**: Connect with professionals, recruiters, and industry leaders at our exclusive networking events and virtual meetups.',
        '**Career Coaching Sessions**: Work with certified career coaches to clarify your goals, overcome challenges, and accelerate your career growth.',
      ],
    },
    4: {
      title: 'Industry Insights',
      content: [
        '**Salary Reports by Industry**: Access comprehensive salary data, compensation trends, and benefits packages across different industries and roles.',
        '**In-Demand Skills Analysis**: Discover the most sought-after skills in your field and learn how to acquire them through targeted learning.',
        '**Job Market Trends**: Stay informed about hiring trends, emerging job roles, industry growth patterns, and market opportunities.',
        '**Future of Work Reports**: Understand how technology, automation, and workplace evolution will impact your career and industry.',
      ],
    },
    5: {
      title: 'Certification Courses',
      content: [
        '**Digital Marketing Certification**: Comprehensive training in SEO, social media marketing, content strategy, analytics, and digital advertising.',
        '**Project Management Professional**: Prepare for PMP certification with training in agile methodologies, project planning, and stakeholder management.',
        '**Data Science Bootcamp**: Learn Python, machine learning, data visualization, and statistical analysis through hands-on projects.',
        '**UI/UX Design Course**: Master design thinking, user research, wireframing, prototyping, and usability testing for digital products.',
      ],
    },
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: 'Invalid Email',
        description: validation.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Subscribed',
            description: 'This email is already subscribed to our newsletter.',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Successfully Subscribed!',
          description: 'Thank you for subscribing to our career tips newsletter.',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Subscription Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

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
                  <Button 
                    className="w-full mt-4 jobbly-btn-primary"
                    onClick={() => setSelectedResource(index)}
                  >
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
              <Button 
                className="jobbly-btn-primary"
                onClick={() => setShowArticle(true)}
              >
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
          <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribing}
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-jobbly-border focus:border-jobbly-purple focus:outline-none disabled:opacity-50"
            />
            <Button 
              type="submit"
              className="jobbly-btn-primary px-8"
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        </section>
      </main>

      {/* Resource Details Dialog */}
      <Dialog open={selectedResource !== null} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedResource !== null && detailedContent[selectedResource]?.title}
            </DialogTitle>
            <DialogDescription>
              Comprehensive resources to help you advance your career
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {selectedResource !== null && detailedContent[selectedResource]?.content.map((item, idx) => {
              const [title, ...contentParts] = item.split(': ');
              const content = contentParts.join(': ');
              return (
                <div key={idx} className="border-l-4 border-jobbly-purple pl-4 py-2">
                  <h3 className="font-bold text-lg mb-2">{title.replace(/\*\*/g, '')}</h3>
                  <p className="text-muted-foreground">{content}</p>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Article Dialog */}
      <Dialog open={showArticle} onOpenChange={setShowArticle}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4">
              10 Essential Skills Every Professional Needs in 2025
            </DialogTitle>
            <DialogDescription>
              A comprehensive guide to staying competitive in the evolving job market
            </DialogDescription>
          </DialogHeader>
          <article className="prose prose-lg max-w-none pt-4 space-y-6">
            <p className="text-lg text-muted-foreground">
              As we navigate through 2025, the professional landscape continues to evolve at an unprecedented pace. 
              Whether you're just starting your career or looking to stay relevant in your field, these 10 essential 
              skills will help you thrive in today's competitive job market.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">1. Digital Literacy & AI Collaboration</h2>
              <p>
                Understanding and effectively working alongside AI tools is no longer optional. From ChatGPT to specialized 
                industry AI, professionals who can leverage these technologies to enhance their productivity will have a 
                significant advantage. This includes prompt engineering, understanding AI limitations, and knowing when 
                human judgment is essential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">2. Data Analysis & Interpretation</h2>
              <p>
                Data-driven decision making is crucial across all industries. You don't need to be a data scientist, 
                but understanding how to read analytics, interpret trends, and make informed decisions based on data 
                is essential. Tools like Excel, Google Analytics, and basic SQL knowledge are increasingly valuable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">3. Adaptive Communication</h2>
              <p>
                The ability to communicate effectively across various platforms—from video calls to async messaging, 
                from presentations to written reports—is critical. This also includes cross-cultural communication 
                as remote work continues to connect professionals globally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">4. Emotional Intelligence</h2>
              <p>
                As automation handles more technical tasks, uniquely human skills like empathy, self-awareness, and 
                relationship management become more valuable. Leaders with high EQ create better team dynamics and 
                drive successful outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">5. Continuous Learning Mindset</h2>
              <p>
                The half-life of skills is decreasing. Professionals who embrace continuous learning through online 
                courses, certifications, and hands-on experimentation will stay ahead. Platforms like Coursera, 
                LinkedIn Learning, and industry-specific resources are essential tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">6. Project Management</h2>
              <p>
                Whether you're officially a project manager or not, understanding project management principles helps 
                you deliver results efficiently. Familiarity with agile methodologies, tools like Asana or Jira, and 
                basic planning techniques are increasingly expected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">7. Creative Problem Solving</h2>
              <p>
                As AI handles routine tasks, human creativity becomes more valuable. The ability to approach problems 
                from multiple angles, think outside the box, and develop innovative solutions sets professionals apart.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">8. Cybersecurity Awareness</h2>
              <p>
                With increasing digital threats, every professional needs basic cybersecurity knowledge. Understanding 
                phishing, password security, data protection, and compliance requirements protects both you and your 
                organization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">9. Remote Collaboration</h2>
              <p>
                Mastering remote work tools and practices is essential. This includes video conferencing etiquette, 
                asynchronous communication, time zone management, and maintaining productivity outside traditional 
                office environments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gradient-purple mb-3">10. Sustainability & Social Responsibility</h2>
              <p>
                Organizations increasingly value professionals who understand ESG (Environmental, Social, and Governance) 
                principles. Whether it's reducing carbon footprints, promoting diversity, or ethical decision-making, 
                these considerations are becoming central to business strategy.
              </p>
            </section>

            <section className="bg-muted p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-3">Taking Action</h2>
              <p className="mb-4">
                Don't feel overwhelmed by this list. Focus on 2-3 skills that are most relevant to your career goals 
                and industry. Create a learning plan, dedicate time each week to skill development, and look for 
                opportunities to apply new knowledge in your current role.
              </p>
              <p>
                Remember, the goal isn't to master everything but to build a diverse skill set that makes you adaptable, 
                valuable, and prepared for future opportunities. Start today, and you'll be amazed at your progress by 
                the end of the year.
              </p>
            </section>
          </article>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerResources;