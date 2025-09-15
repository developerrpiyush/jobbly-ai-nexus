import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import JobsSection from '@/components/JobsSection';
import CompaniesSection from '@/components/CompaniesSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add 3D card tilt effects
    const cards = document.querySelectorAll('.jobbly-card');
    
    const handleMouseMove = (e: MouseEvent, card: Element) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = (e.clientX - centerX) / rect.width;
      const mouseY = (e.clientY - centerY) / rect.height;
      
      const rotateY = mouseX * 10;
      const rotateX = -mouseY * 10;
      
      const gradientX = (e.clientX - rect.left) / rect.width * 100;
      const gradientY = (e.clientY - rect.top) / rect.height * 100;
      
      (card as HTMLElement).style.setProperty('--rotateX', `${rotateX}deg`);
      (card as HTMLElement).style.setProperty('--rotateY', `${rotateY}deg`);
      (card as HTMLElement).style.setProperty('--mouse-x', `${gradientX}%`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${gradientY}%`);
    };

    const handleMouseLeave = (card: Element) => {
      (card as HTMLElement).style.setProperty('--rotateX', '0deg');
      (card as HTMLElement).style.setProperty('--rotateY', '0deg');
      (card as HTMLElement).style.setProperty('--mouse-x', '50%');
      (card as HTMLElement).style.setProperty('--mouse-y', '50%');
    };

    cards.forEach((card) => {
      const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, card);
      const mouseLeaveHandler = () => handleMouseLeave(card);
      
      card.addEventListener('mousemove', mouseMoveHandler);
      card.addEventListener('mouseleave', mouseLeaveHandler);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main>
        <HeroSection />
        
        <div className="section-separator" />
        <FeaturesSection />
        
        <div className="section-separator" />
        <JobsSection />
        
        <div className="section-separator" />
        <CompaniesSection />
        
        <div className="section-separator" />
        <TestimonialSection />
        
        {/* Final CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="jobbly-card p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your <span className="text-gradient-purple">Dream Job?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join Jobbly today and let our AI-powered platform connect you with opportunities 
                that perfectly match your skills, experience, and career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="jobbly-btn-primary px-8 py-4 text-lg font-semibold rounded-full">
                  Get Started Free
                </button>
                <button className="bg-transparent border border-jobbly-border text-muted-foreground hover:border-jobbly-purple hover:text-foreground px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                  Schedule a Demo
                </button>
              </div>
              <p className="text-muted-foreground mt-6">
                No credit card required • Free forever plan available
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;