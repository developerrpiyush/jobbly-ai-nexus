import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Cookie className="w-16 h-16 text-jobbly-purple mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="jobbly-card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help 
                  us provide you with a better experience by remembering your preferences and understanding how you 
                  use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      Required for the website to function properly. These include cookies for authentication, 
                      security, and basic site functionality.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
                    <p className="text-muted-foreground">
                      Help us understand how visitors interact with our website by collecting anonymous information 
                      about page visits, time spent, and navigation patterns.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
                    <p className="text-muted-foreground">
                      Remember your preferences and choices, such as language settings, saved searches, and 
                      customized layouts.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Targeting Cookies</h3>
                    <p className="text-muted-foreground">
                      Used to deliver relevant job recommendations and advertisements based on your interests and 
                      browsing activity.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set their own cookies, including analytics providers, 
                  advertising networks, and social media platforms. These services have their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control cookies through:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Browser settings - Most browsers allow you to block or delete cookies</li>
                  <li>Our cookie preference center - Manage your cookie preferences directly on our site</li>
                  <li>Opt-out tools - Use industry opt-out tools for advertising cookies</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Note: Disabling certain cookies may affect website functionality and your user experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Cookie Duration</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use both session cookies (deleted when you close your browser) and persistent cookies 
                  (remain on your device for a set period or until you delete them). The duration varies based 
                  on the cookie's purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in technology or 
                  regulations. The "Last updated" date at the top indicates when the policy was last revised.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about our use of cookies, contact us at privacy@jobbly.com or 
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

export default CookiePolicy;
