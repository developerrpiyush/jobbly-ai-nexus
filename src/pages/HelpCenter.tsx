import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You can sign up as a job seeker or employer."
    },
    {
      question: "How does the AI job matching work?",
      answer: "Our AI analyzes your profile, skills, experience, and preferences to match you with relevant job opportunities. The more complete your profile, the better the matches."
    },
    {
      question: "Is Jobbly free to use?",
      answer: "Yes! Job seekers can use Jobbly for free. Employers have free and premium options depending on their hiring needs."
    },
    {
      question: "How do I apply for a job?",
      answer: "Browse jobs, click on any listing that interests you, and click the 'Apply Now' button. You'll need to upload your resume and can add a cover letter."
    },
    {
      question: "Can I edit my resume after uploading?",
      answer: "Yes, you can update your resume, profile information, and preferences at any time from your dashboard."
    },
    {
      question: "How do I track my applications?",
      answer: "Visit your dashboard to see all your job applications, their status, and any messages from employers."
    },
    {
      question: "What if I forget my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions to reset your password."
    },
    {
      question: "How do employers contact me?",
      answer: "Employers can message you through the platform. You'll receive email notifications for new messages."
    }
  ];

  const categories = [
    { icon: Book, title: "Getting Started", description: "Learn the basics of using Jobbly" },
    { icon: HelpCircle, title: "Account & Profile", description: "Manage your account settings" },
    { icon: MessageCircle, title: "Applications", description: "Track and manage job applications" },
    { icon: Mail, title: "Contact Support", description: "Get help from our team" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 bg-secondary/20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How can we <span className="text-gradient-purple">help you?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Search our knowledge base or browse categories below
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Search for answers..."
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {categories.map((category) => (
                <div key={category.title} className="jobbly-card p-6 text-center hover:border-jobbly-purple transition-colors cursor-pointer">
                  <category.icon className="w-12 h-12 text-jobbly-purple mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Frequently Asked <span className="text-gradient-purple">Questions</span>
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="jobbly-card px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:text-jobbly-purple">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to assist you
            </p>
            <button className="jobbly-btn-primary px-8 py-3">
              Contact Support
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
