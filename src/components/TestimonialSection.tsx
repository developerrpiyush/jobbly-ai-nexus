import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Meta',
      avatar: 'https://placehold.co/80x80/8b5cf6/ffffff?text=SC',
      rating: 5,
      text: "Jobbly's AI matching is incredible! I found my dream job at Meta within just 2 weeks. The platform understood exactly what I was looking for and connected me with the perfect opportunity."
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Product Manager',
      company: 'Google',
      avatar: 'https://placehold.co/80x80/10b981/ffffff?text=MJ',
      rating: 5,
      text: "The interview prep tools and AI coaching helped me nail my Google interview. Jobbly doesn't just find you jobs, it prepares you to succeed in them."
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Data Scientist',
      company: 'Netflix',
      avatar: 'https://placehold.co/80x80/ef4444/ffffff?text=ER',
      rating: 5,
      text: "As someone changing careers, Jobbly's skill assessment and personalized learning paths were game-changers. I transitioned from finance to tech seamlessly."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success <span className="text-gradient-purple">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who transformed their careers with Jobbly's AI-powered platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="jobbly-card p-8 text-center group">
              {/* Quote Icon */}
              <div className="text-jobbly-purple mb-6 flex justify-center">
                <Quote size={40} />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-3 border-2 border-jobbly-purple/50"
                />
                <h4 className="font-bold text-foreground text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 jobbly-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient-purple mb-2">98.5%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-purple mb-2">14 Days</div>
              <div className="text-muted-foreground">Average Time to Hire</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-purple mb-2">$15k</div>
              <div className="text-muted-foreground">Average Salary Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-purple mb-2">500k+</div>
              <div className="text-muted-foreground">Happy Job Seekers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;