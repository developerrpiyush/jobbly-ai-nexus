import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, FileText, Download, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const AITools = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    education: ''
  });
  const [generatedResume, setGeneratedResume] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI resume generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const resume = `
**${resumeData.name}**
Email: ${resumeData.email} | Phone: ${resumeData.phone}

**PROFESSIONAL SUMMARY**
Experienced professional with expertise in ${resumeData.skills.split(',')[0]} and related technologies. 

**SKILLS**
${resumeData.skills}

**EXPERIENCE**
${resumeData.experience}

**EDUCATION**
${resumeData.education}
      `.trim();
      
      setGeneratedResume(resume);
      toast({
        title: "Resume Generated!",
        description: "Your AI-powered resume has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your resume.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadResume = () => {
    const blob = new Blob([generatedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI <span className="text-gradient-purple">Career Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage AI to build the perfect resume and advance your career in the Indian job market
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Builder */}
          <Card className="jobbly-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                AI Resume Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={resumeData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={resumeData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={resumeData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  placeholder="React, Node.js, Python, Data Analytics"
                  value={resumeData.skills}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Work Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Describe your work experience..."
                  rows={4}
                  value={resumeData.experience}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea
                  id="education"
                  name="education"
                  placeholder="Your educational background..."
                  rows={3}
                  value={resumeData.education}
                  onChange={handleInputChange}
                />
              </div>

              <Button 
                onClick={generateResume}
                className="w-full jobbly-btn-primary"
                disabled={isGenerating || !resumeData.name || !resumeData.email}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate AI Resume
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Resume */}
          <Card className="jobbly-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Generated Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedResume ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">
                      {generatedResume}
                    </pre>
                  </div>
                  <Button 
                    onClick={downloadResume}
                    className="w-full jobbly-btn-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Fill in your details and click "Generate AI Resume" to see your professional resume here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional AI Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">More AI Tools Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="jobbly-card opacity-60">
              <CardContent className="p-6 text-center">
                <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">AI Interview Coach</h3>
                <p className="text-sm text-muted-foreground">
                  Practice interviews with AI-powered feedback
                </p>
              </CardContent>
            </Card>
            
            <Card className="jobbly-card opacity-60">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Cover Letter Generator</h3>
                <p className="text-sm text-muted-foreground">
                  Create personalized cover letters instantly
                </p>
              </CardContent>
            </Card>
            
            <Card className="jobbly-card opacity-60">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Skill Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluate your skills with AI-powered tests
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AITools;