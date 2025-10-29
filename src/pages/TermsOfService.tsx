import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <FileText className="w-16 h-16 text-jobbly-purple mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="jobbly-card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Jobbly, you agree to be bound by these Terms of Service and all applicable 
                  laws and regulations. If you do not agree with any of these terms, you are prohibited from using 
                  this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you create an account with us, you must provide accurate, complete, and current information. 
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your profile information is accurate and up-to-date</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Post false, misleading, or fraudulent information</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to scrape or collect data</li>
                  <li>Impersonate others or misrepresent your affiliation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Job Postings and Applications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Employers are responsible for the accuracy and legality of their job postings. Job seekers are 
                  responsible for the accuracy of their applications and resumes. Jobbly does not guarantee job 
                  placements or verify all employer claims.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Jobbly platform, including its design, functionality, and content, is owned by Jobbly and 
                  protected by intellectual property laws. You retain ownership of content you submit but grant us 
                  a license to use it for providing our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jobbly shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use of our services. Our total liability shall not exceed the amount 
                  you paid us in the past 12 months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time for violations of these 
                  terms or for any other reason. You may also terminate your account at any time through your 
                  account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may modify these terms at any time. Continued use of our services after changes constitutes 
                  acceptance of the modified terms. We will notify users of significant changes via email or 
                  platform notifications.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, contact us at legal@jobbly.com or 
                  123 Innovation Drive, San Francisco, CA 94105.
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

export default TermsOfService;
