import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient-purple">Jobbly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to revolutionize the job search experience using AI-powered technology, 
              connecting talented professionals with opportunities that truly match their potential.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="jobbly-card p-8">
                <Target className="w-12 h-12 text-jobbly-purple mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower job seekers and employers through intelligent matching technology, 
                  making the hiring process more efficient, transparent, and successful for everyone involved.
                </p>
              </div>
              
              <div className="jobbly-card p-8">
                <Heart className="w-12 h-12 text-jobbly-purple mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the world's most trusted job platform where every professional finds 
                  meaningful work that aligns with their skills, values, and career aspirations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10M+', label: 'Active Users' },
                { number: '500K+', label: 'Companies' },
                { number: '2M+', label: 'Jobs Posted' },
                { number: '98%', label: 'Success Rate' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient-purple mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our <span className="text-gradient-purple">Values</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'People First',
                  description: 'We prioritize the success and satisfaction of both job seekers and employers.'
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'We strive for the highest quality in our platform, service, and user experience.'
                },
                {
                  icon: Heart,
                  title: 'Integrity',
                  description: 'We operate with transparency, honesty, and ethical practices in everything we do.'
                }
              ].map((value) => (
                <div key={value.title} className="jobbly-card p-8 text-center">
                  <value.icon className="w-12 h-12 text-jobbly-purple mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
