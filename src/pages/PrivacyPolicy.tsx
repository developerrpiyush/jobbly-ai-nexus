import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-jobbly-purple mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="jobbly-card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information that you provide directly to us, including your name, email address, 
                  resume, work experience, and other profile information. We also collect information about your 
                  use of our services, including job searches, applications, and interactions with employers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Match you with relevant job opportunities</li>
                  <li>Communicate with you about jobs, services, and updates</li>
                  <li>Analyze usage patterns and optimize our platform</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We share your information with employers when you apply for jobs. We may also share aggregated, 
                  non-personally identifiable information with partners and service providers. We do not sell your 
                  personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your data, including encryption, 
                  secure servers, and regular security audits. However, no method of transmission over the internet 
                  is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to certain data processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                  personalized content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at privacy@jobbly.com or 
                  write to us at 123 Innovation Drive, San Francisco, CA 94105.
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

export default PrivacyPolicy;
