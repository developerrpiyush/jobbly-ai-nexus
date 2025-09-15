import React, { useEffect, useRef } from 'react';
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  FileText,
  Calendar,
  MessageSquare,
  Award
} from 'lucide-react';

const FeaturesSection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    };

    cardRefs.current.forEach((card) => {
      if (card) {
        const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, card);
        const mouseLeaveHandler = () => handleMouseLeave(card);
        
        card.addEventListener('mousemove', mouseMoveHandler);
        card.addEventListener('mouseleave', mouseLeaveHandler);
        
        return () => {
          card.removeEventListener('mousemove', mouseMoveHandler);
          card.removeEventListener('mouseleave', mouseLeaveHandler);
        };
      }
    });
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI Job Matching',
      description: 'Advanced AI algorithms analyze your skills and preferences to recommend perfect job matches.',
      color: 'text-purple-400'
    },
    {
      icon: FileText,
      title: 'Resume Analysis',
      description: 'Get instant feedback on your resume with AI-powered optimization suggestions.',
      color: 'text-blue-400'
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Take validated skill tests to showcase your expertise to potential employers.',
      color: 'text-green-400'
    },
    {
      icon: TrendingUp,
      title: 'Salary Insights',
      description: 'Access real-time salary data and market trends for informed career decisions.',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      title: 'Company Reviews',
      description: 'Read authentic employee reviews and company ratings before you apply.',
      color: 'text-pink-400'
    },
    {
      icon: Calendar,
      title: 'Interview Prep',
      description: 'AI-powered interview practice with personalized feedback and tips.',
      color: 'text-indigo-400'
    },
    {
      icon: MessageSquare,
      title: 'Career Coaching',
      description: 'Get personalized career advice from AI coaches and industry mentors.',
      color: 'text-red-400'
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Receive real-time notifications for jobs that match your preferences.',
      color: 'text-orange-400'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. Apply privately with confidence.',
      color: 'text-teal-400'
    },
    {
      icon: Award,
      title: 'Success Tracking',
      description: 'Monitor your application progress and career growth with detailed analytics.',
      color: 'text-cyan-400'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient-purple">Jobbly?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of job searching with our AI-powered platform designed to 
            accelerate your career growth and connect you with opportunities that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => (cardRefs.current[index] = el)}
              className="jobbly-card p-6 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={48} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-gradient-purple transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;