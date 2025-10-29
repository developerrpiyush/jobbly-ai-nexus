import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accessibility as AccessibilityIcon } from 'lucide-react';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <AccessibilityIcon className="w-16 h-16 text-jobbly-purple mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4">Accessibility Statement</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="jobbly-card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jobbly is committed to ensuring digital accessibility for people with disabilities. We are 
                  continually improving the user experience for everyone and applying relevant accessibility 
                  standards to ensure our platform is inclusive and accessible to all users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Accessibility Standards</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
                  These guidelines help make web content more accessible to people with disabilities, including 
                  visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our platform includes the following accessibility features:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Keyboard navigation support throughout the platform</li>
                  <li>Screen reader compatibility with ARIA labels and landmarks</li>
                  <li>High contrast color schemes and adjustable text sizes</li>
                  <li>Clear and consistent navigation structure</li>
                  <li>Alternative text for images and visual content</li>
                  <li>Captioned videos and transcripts for audio content</li>
                  <li>Form labels and error messages that are clearly identified</li>
                  <li>Skip navigation links for efficient browsing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Assistive Technology</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jobbly is designed to be compatible with common assistive technologies, including screen readers, 
                  screen magnification software, speech recognition software, and alternative input devices. We test 
                  our platform with popular assistive technologies to ensure compatibility.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Despite our best efforts, some areas of our platform may not yet be fully accessible. We are 
                  actively working to identify and address these issues. If you encounter any accessibility barriers, 
                  please let us know so we can work on solutions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Feedback and Support</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We welcome your feedback on the accessibility of Jobbly. If you encounter accessibility issues or 
                  have suggestions for improvement, please contact us:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Email: accessibility@jobbly.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Mail: 123 Innovation Drive, San Francisco, CA 94105</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We aim to respond to accessibility feedback within 3 business days and strive to resolve issues 
                  as quickly as possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Continuous Improvement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Accessibility is an ongoing effort. We regularly review our platform, conduct accessibility audits, 
                  and implement improvements based on user feedback and evolving best practices. We are committed to 
                  maintaining and improving the accessibility of Jobbly.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Accessibility;
