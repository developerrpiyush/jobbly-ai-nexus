import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for job seekers just starting out',
      features: [
        { name: 'Basic job search', included: true },
        { name: 'Apply to unlimited jobs', included: true },
        { name: 'Basic resume builder', included: true },
        { name: 'Email job alerts', included: true },
        { name: 'AI-powered recommendations', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Resume review', included: false },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '₹499',
      period: 'per month',
      description: 'For serious job seekers who want an edge',
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'AI-powered recommendations', included: true },
        { name: 'Advanced resume builder', included: true },
        { name: 'Priority application visibility', included: true },
        { name: 'Interview preparation tools', included: true },
        { name: 'Salary insights', included: true },
        { name: 'Priority support', included: false },
        { name: 'Resume review', included: false },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '₹9,999',
      period: 'per month',
      description: 'For companies hiring top talent',
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'Unlimited job postings', included: true },
        { name: 'Advanced candidate filtering', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Analytics dashboard', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient-purple">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`jobbly-card ${plan.popular ? 'ring-2 ring-jobbly-purple scale-105' : ''} hover:scale-105 transition-transform relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'jobbly-btn-primary' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="jobbly-card p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked <span className="text-gradient-purple">Questions</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Can I switch plans at any time?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes! All paid plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Can I cancel my subscription?</h3>
              <p className="text-muted-foreground">
                Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12 jobbly-card p-12">
          <h2 className="text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Contact us anytime for personalized assistance.
          </p>
          <Button className="jobbly-btn-primary px-8 py-3">
            Contact Sales
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Pricing;