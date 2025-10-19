import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, FileText, Download, Sparkles, Plus, Trash2, Loader2, MessageSquare, Briefcase, TrendingUp, GraduationCap, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
  score: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
}

const AITools = () => {
  const { toast } = useToast();
  
  // Resume Builder State
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
    experiences: [{
      company: '',
      position: '',
      duration: '',
      responsibilities: '',
    }] as Experience[],
    educations: [{
      institution: '',
      degree: '',
      year: '',
      score: '',
    }] as Education[],
    technicalSkills: '',
    softSkills: '',
    projects: [{
      name: '',
      description: '',
      technologies: '',
    }] as Project[],
    certifications: '',
    languages: '',
  });
  
  const [generatedResume, setGeneratedResume] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Cover Letter State
  const [coverLetterData, setCoverLetterData] = useState({
    jobTitle: '',
    companyName: '',
    hiringManager: '',
    yourName: '',
    yourExperience: '',
    whyInterested: '',
    keySkills: '',
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);

  // Interview Prep State
  const [interviewData, setInterviewData] = useState({
    jobRole: '',
    experience: '',
    industry: '',
  });
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Salary Negotiation State
  const [salaryData, setSalaryData] = useState({
    currentSalary: '',
    desiredSalary: '',
    experience: '',
    skills: '',
    location: '',
  });
  const [negotiationAdvice, setNegotiationAdvice] = useState('');
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);

  // Career Path State
  const [careerData, setCareerData] = useState({
    currentRole: '',
    yearsOfExperience: '',
    skills: '',
    interests: '',
  });
  const [careerPath, setCareerPath] = useState('');
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);

  // Skills Gap State
  const [skillsGapData, setSkillsGapData] = useState({
    currentSkills: '',
    targetRole: '',
    industry: '',
  });
  const [skillsGapAnalysis, setSkillsGapAnalysis] = useState('');
  const [isAnalyzingSkills, setIsAnalyzingSkills] = useState(false);

  // Resume Builder Functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field: keyof typeof resumeData, index: number, subfield: string, value: string) => {
    setResumeData(prev => {
      const array = [...prev[field]] as any[];
      array[index] = { ...array[index], [subfield]: value };
      return { ...prev, [field]: array };
    });
  };

  const addArrayItem = (field: keyof typeof resumeData) => {
    setResumeData(prev => {
      let emptyItem: any;
      if (field === 'experiences') {
        emptyItem = { company: '', position: '', duration: '', responsibilities: '' };
      } else if (field === 'educations') {
        emptyItem = { institution: '', degree: '', year: '', score: '' };
      } else if (field === 'projects') {
        emptyItem = { name: '', description: '', technologies: '' };
      }
      
      return {
        ...prev,
        [field]: [...prev[field] as any[], emptyItem]
      };
    });
  };

  const removeArrayItem = (field: keyof typeof resumeData, index: number) => {
    setResumeData(prev => {
      const array = prev[field] as any[];
      if (array.length <= 1) return prev;
      return {
        ...prev,
        [field]: array.filter((_, i) => i !== index)
      };
    });
  };

  const generateResume = async () => {
    if (!resumeData.name || !resumeData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch(
        `https://ffeqmosdqilspnfdndbe.supabase.co/functions/v1/generate-ai-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'resume',
            data: resumeData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const { content } = await response.json();
      setGeneratedResume(content);
      
      toast({
        title: "Resume Generated Successfully!",
        description: "Your AI-powered resume is ready to download.",
      });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate resume. Please try again.",
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
    a.download = `${resumeData.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded.",
    });
  };

  // Cover Letter Functions
  const generateCoverLetter = async () => {
    if (!coverLetterData.yourName || !coverLetterData.jobTitle || !coverLetterData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, job title, and company name.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingCoverLetter(true);
    
    try {
      const response = await fetch(
        `https://ffeqmosdqilspnfdndbe.supabase.co/functions/v1/generate-ai-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'cover_letter',
            data: coverLetterData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const { content } = await response.json();
      setGeneratedCoverLetter(content);
      
      toast({
        title: "Cover Letter Generated!",
        description: "Your personalized cover letter is ready.",
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  // Interview Prep Functions
  const generateInterviewQuestions = async () => {
    if (!interviewData.jobRole || !interviewData.industry) {
      toast({
        title: "Missing Information",
        description: "Please fill in job role and industry.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingQuestions(true);
    
    try {
      const response = await fetch(
        `https://ffeqmosdqilspnfdndbe.supabase.co/functions/v1/generate-ai-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'interview',
            data: interviewData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate interview questions');
      }

      const { content } = await response.json();
      const questions = content.split('\n').filter((q: string) => q.trim().match(/^\d+\.|^-|^•/));
      
      setInterviewQuestions(questions);
      toast({
        title: "Questions Generated!",
        description: `${questions.length} interview questions ready for practice.`,
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Salary Negotiation Functions
  const generateNegotiationAdvice = async () => {
    if (!salaryData.desiredSalary || !salaryData.experience || !salaryData.skills) {
      toast({
        title: "Missing Information",
        description: "Please fill in desired salary, experience, and skills.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAdvice(true);
    
    try {
      const response = await fetch(
        `https://ffeqmosdqilspnfdndbe.supabase.co/functions/v1/generate-ai-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'salary',
            data: salaryData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate negotiation advice');
      }

      const { content } = await response.json();
      setNegotiationAdvice(content);
      
      toast({
        title: "Negotiation Strategy Ready!",
        description: "Your personalized salary negotiation guide is prepared.",
      });
    } catch (error) {
      console.error('Error generating advice:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate negotiation advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  // Career Path Functions
  const generateCareerPath = async () => {
    if (!careerData.currentRole || !careerData.yearsOfExperience) {
      toast({
        title: "Missing Information",
        description: "Please fill in current role and years of experience.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPath(true);
    
    try {
      const response = await fetch(
        `https://ffeqmosdqilspnfdndbe.supabase.co/functions/v1/generate-ai-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'career_path',
            data: careerData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate career path');
      }

      const { content } = await response.json();
      setCareerPath(content);
      
      toast({
        title: "Career Path Generated!",
        description: "Your personalized roadmap is ready.",
      });
    } catch (error) {
      console.error('Error generating career path:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate career path. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPath(false);
    }
  };

  // Skills Gap Functions
  const analyzeSkillsGap = async () => {
    if (!skillsGapData.currentSkills || !skillsGapData.targetRole) {
      toast({
        title: "Missing Information",
        description: "Please fill in current skills and target role.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingSkills(true);
    
    try {
      const response = await fetch(
        `https://ffeqmosdqilspnfdndbe.supabase.co/functions/v1/generate-ai-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'skills_gap',
            data: skillsGapData
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze skills gap');
      }

      const { content } = await response.json();
      setSkillsGapAnalysis(content);
      
      toast({
        title: "Analysis Complete!",
        description: "Your skills gap analysis is ready.",
      });
    } catch (error) {
      console.error('Error analyzing skills gap:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze skills gap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzingSkills(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Career <span className="text-gradient-purple">Assistant</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI tools to accelerate your career growth and job search success
          </p>
        </div>

        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="resume">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="cover-letter">
              <MessageSquare className="w-4 h-4 mr-2" />
              Cover Letter
            </TabsTrigger>
            <TabsTrigger value="interview">
              <Briefcase className="w-4 h-4 mr-2" />
              Interview
            </TabsTrigger>
            <TabsTrigger value="salary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Salary
            </TabsTrigger>
            <TabsTrigger value="career">
              <GraduationCap className="w-4 h-4 mr-2" />
              Career Path
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Lightbulb className="w-4 h-4 mr-2" />
              Skills Gap
            </TabsTrigger>
          </TabsList>

          {/* Resume Builder */}
          <TabsContent value="resume">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Resume Information
                  </CardTitle>
                  <CardDescription>Fill in your details to generate a professional resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-h-[600px] overflow-y-auto">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={resumeData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={resumeData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={resumeData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={resumeData.location}
                          onChange={handleInputChange}
                          placeholder="Mumbai, India"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          value={resumeData.linkedin}
                          onChange={handleInputChange}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio</Label>
                        <Input
                          id="portfolio"
                          name="portfolio"
                          value={resumeData.portfolio}
                          onChange={handleInputChange}
                          placeholder="johndoe.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={resumeData.summary}
                      onChange={handleInputChange}
                      placeholder="Write a brief summary about yourself..."
                      rows={4}
                    />
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Experience</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addArrayItem('experiences')}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add More
                      </Button>
                    </div>
                    {resumeData.experiences.map((exp, index) => (
                      <Card key={index} className="p-4 bg-secondary/50">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Experience #{index + 1}</span>
                            {resumeData.experiences.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('experiences', index)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                          <Input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => handleArrayChange('experiences', index, 'company', e.target.value)}
                          />
                          <Input
                            placeholder="Position"
                            value={exp.position}
                            onChange={(e) => handleArrayChange('experiences', index, 'position', e.target.value)}
                          />
                          <Input
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                            value={exp.duration}
                            onChange={(e) => handleArrayChange('experiences', index, 'duration', e.target.value)}
                          />
                          <Textarea
                            placeholder="Key responsibilities and achievements..."
                            value={exp.responsibilities}
                            onChange={(e) => handleArrayChange('experiences', index, 'responsibilities', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Education</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addArrayItem('educations')}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add More
                      </Button>
                    </div>
                    {resumeData.educations.map((edu, index) => (
                      <Card key={index} className="p-4 bg-secondary/50">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Education #{index + 1}</span>
                            {resumeData.educations.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('educations', index)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                          <Input
                            placeholder="Institution Name"
                            value={edu.institution}
                            onChange={(e) => handleArrayChange('educations', index, 'institution', e.target.value)}
                          />
                          <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => handleArrayChange('educations', index, 'degree', e.target.value)}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Year"
                              value={edu.year}
                              onChange={(e) => handleArrayChange('educations', index, 'year', e.target.value)}
                            />
                            <Input
                              placeholder="Score/GPA"
                              value={edu.score}
                              onChange={(e) => handleArrayChange('educations', index, 'score', e.target.value)}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Skills</h3>
                    <div>
                      <Label htmlFor="technicalSkills">Technical Skills</Label>
                      <Textarea
                        id="technicalSkills"
                        name="technicalSkills"
                        value={resumeData.technicalSkills}
                        onChange={handleInputChange}
                        placeholder="e.g., JavaScript, React, Node.js, Python, SQL"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="softSkills">Soft Skills</Label>
                      <Textarea
                        id="softSkills"
                        name="softSkills"
                        value={resumeData.softSkills}
                        onChange={handleInputChange}
                        placeholder="e.g., Leadership, Communication, Problem Solving"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Projects</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addArrayItem('projects')}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add More
                      </Button>
                    </div>
                    {resumeData.projects.map((proj, index) => (
                      <Card key={index} className="p-4 bg-secondary/50">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Project #{index + 1}</span>
                            {resumeData.projects.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('projects', index)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                          <Input
                            placeholder="Project Name"
                            value={proj.name}
                            onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                          />
                          <Textarea
                            placeholder="Project Description"
                            value={proj.description}
                            onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                            rows={2}
                          />
                          <Input
                            placeholder="Technologies Used"
                            value={proj.technologies}
                            onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Certifications & Languages */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="certifications">Certifications</Label>
                      <Textarea
                        id="certifications"
                        name="certifications"
                        value={resumeData.certifications}
                        onChange={handleInputChange}
                        placeholder="List your certifications..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="languages">Languages</Label>
                      <Textarea
                        id="languages"
                        name="languages"
                        value={resumeData.languages}
                        onChange={handleInputChange}
                        placeholder="e.g., English (Fluent), Hindi (Native)"
                        rows={2}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={generateResume} 
                    className="w-full jobbly-btn-primary"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Resume Preview */}
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Resume Preview
                  </CardTitle>
                  <CardDescription>Your AI-generated resume</CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedResume ? (
                    <>
                      <pre className="whitespace-pre-wrap font-mono text-sm bg-secondary p-4 rounded-lg mb-4 max-h-[500px] overflow-y-auto">
                        {generatedResume}
                      </pre>
                      <Button onClick={downloadResume} className="w-full jobbly-btn-primary">
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in your information and click "Generate Resume" to see your professional resume here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cover Letter Generator */}
          <TabsContent value="cover-letter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Cover Letter Generator</CardTitle>
                  <CardDescription>Create a personalized cover letter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Your Name</Label>
                    <Input
                      value={coverLetterData.yourName}
                      onChange={(e) => setCoverLetterData({...coverLetterData, yourName: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      value={coverLetterData.jobTitle}
                      onChange={(e) => setCoverLetterData({...coverLetterData, jobTitle: e.target.value})}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={coverLetterData.companyName}
                      onChange={(e) => setCoverLetterData({...coverLetterData, companyName: e.target.value})}
                      placeholder="Company you're applying to"
                    />
                  </div>
                  <div>
                    <Label>Hiring Manager Name (if known)</Label>
                    <Input
                      value={coverLetterData.hiringManager}
                      onChange={(e) => setCoverLetterData({...coverLetterData, hiringManager: e.target.value})}
                      placeholder="Leave blank if unknown"
                    />
                  </div>
                  <div>
                    <Label>Your Experience</Label>
                    <Textarea
                      value={coverLetterData.yourExperience}
                      onChange={(e) => setCoverLetterData({...coverLetterData, yourExperience: e.target.value})}
                      placeholder="Briefly describe your relevant experience..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Why Are You Interested?</Label>
                    <Textarea
                      value={coverLetterData.whyInterested}
                      onChange={(e) => setCoverLetterData({...coverLetterData, whyInterested: e.target.value})}
                      placeholder="Why do you want to work at this company?"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Key Skills</Label>
                    <Textarea
                      value={coverLetterData.keySkills}
                      onChange={(e) => setCoverLetterData({...coverLetterData, keySkills: e.target.value})}
                      placeholder="List your most relevant skills..."
                      rows={2}
                    />
                  </div>
                  <Button 
                    onClick={generateCoverLetter}
                    className="w-full jobbly-btn-primary"
                    disabled={isGeneratingCoverLetter}
                  >
                    {isGeneratingCoverLetter ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Cover Letter
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Cover Letter Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedCoverLetter ? (
                    <pre className="whitespace-pre-wrap text-sm bg-secondary p-4 rounded-lg max-h-[600px] overflow-y-auto">
                      {generatedCoverLetter}
                    </pre>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in the details to generate your cover letter</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interview Prep */}
          <TabsContent value="interview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Interview Question Generator</CardTitle>
                  <CardDescription>Practice with AI-generated questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Job Role</Label>
                    <Input
                      value={interviewData.jobRole}
                      onChange={(e) => setInterviewData({...interviewData, jobRole: e.target.value})}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Years of Experience</Label>
                    <Input
                      value={interviewData.experience}
                      onChange={(e) => setInterviewData({...interviewData, experience: e.target.value})}
                      placeholder="e.g., 3-5 years"
                    />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Input
                      value={interviewData.industry}
                      onChange={(e) => setInterviewData({...interviewData, industry: e.target.value})}
                      placeholder="e.g., Fintech, Healthcare"
                    />
                  </div>
                  <Button 
                    onClick={generateInterviewQuestions}
                    className="w-full jobbly-btn-primary"
                    disabled={isGeneratingQuestions}
                  >
                    {isGeneratingQuestions ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Questions
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Practice Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  {interviewQuestions.length > 0 ? (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                      {interviewQuestions.map((question, index) => (
                        <Card key={index} className="p-4 bg-secondary/50">
                          <p className="text-sm">
                            <strong>Q{index + 1}:</strong> {question}
                          </p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generate questions to start practicing</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Salary Negotiation */}
          <TabsContent value="salary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Salary Negotiation Assistant</CardTitle>
                  <CardDescription>Get personalized negotiation strategies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Salary (INR/year)</Label>
                    <Input
                      type="number"
                      value={salaryData.currentSalary}
                      onChange={(e) => setSalaryData({...salaryData, currentSalary: e.target.value})}
                      placeholder="e.g., 1200000"
                    />
                  </div>
                  <div>
                    <Label>Desired Salary (INR/year)</Label>
                    <Input
                      type="number"
                      value={salaryData.desiredSalary}
                      onChange={(e) => setSalaryData({...salaryData, desiredSalary: e.target.value})}
                      placeholder="e.g., 1800000"
                    />
                  </div>
                  <div>
                    <Label>Years of Experience</Label>
                    <Input
                      value={salaryData.experience}
                      onChange={(e) => setSalaryData({...salaryData, experience: e.target.value})}
                      placeholder="e.g., 5 years"
                    />
                  </div>
                  <div>
                    <Label>Key Skills</Label>
                    <Textarea
                      value={salaryData.skills}
                      onChange={(e) => setSalaryData({...salaryData, skills: e.target.value})}
                      placeholder="Your strongest skills..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={salaryData.location}
                      onChange={(e) => setSalaryData({...salaryData, location: e.target.value})}
                      placeholder="e.g., Bangalore"
                    />
                  </div>
                  <Button 
                    onClick={generateNegotiationAdvice}
                    className="w-full jobbly-btn-primary"
                    disabled={isGeneratingAdvice}
                  >
                    {isGeneratingAdvice ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Negotiation Strategy
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Negotiation Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  {negotiationAdvice ? (
                    <pre className="whitespace-pre-wrap text-sm bg-secondary p-4 rounded-lg max-h-[600px] overflow-y-auto">
                      {negotiationAdvice}
                    </pre>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your details to get personalized advice</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Career Path */}
          <TabsContent value="career">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Career Path Analyzer</CardTitle>
                  <CardDescription>Discover your career trajectory</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Role</Label>
                    <Input
                      value={careerData.currentRole}
                      onChange={(e) => setCareerData({...careerData, currentRole: e.target.value})}
                      placeholder="e.g., Software Developer"
                    />
                  </div>
                  <div>
                    <Label>Years of Experience</Label>
                    <Input
                      value={careerData.yearsOfExperience}
                      onChange={(e) => setCareerData({...careerData, yearsOfExperience: e.target.value})}
                      placeholder="e.g., 3 years"
                    />
                  </div>
                  <div>
                    <Label>Current Skills</Label>
                    <Textarea
                      value={careerData.skills}
                      onChange={(e) => setCareerData({...careerData, skills: e.target.value})}
                      placeholder="List your current skills..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Career Interests</Label>
                    <Textarea
                      value={careerData.interests}
                      onChange={(e) => setCareerData({...careerData, interests: e.target.value})}
                      placeholder="What excites you professionally?"
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={generateCareerPath}
                    className="w-full jobbly-btn-primary"
                    disabled={isGeneratingPath}
                  >
                    {isGeneratingPath ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Career Path
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Your Career Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  {careerPath ? (
                    <pre className="whitespace-pre-wrap text-sm bg-secondary p-4 rounded-lg max-h-[600px] overflow-y-auto">
                      {careerPath}
                    </pre>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generate your personalized career roadmap</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Gap */}
          <TabsContent value="skills">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Skills Gap Analyzer</CardTitle>
                  <CardDescription>Identify skills to learn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Skills (comma-separated)</Label>
                    <Textarea
                      value={skillsGapData.currentSkills}
                      onChange={(e) => setSkillsGapData({...skillsGapData, currentSkills: e.target.value})}
                      placeholder="e.g., JavaScript, React, HTML, CSS"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Target Role</Label>
                    <Input
                      value={skillsGapData.targetRole}
                      onChange={(e) => setSkillsGapData({...skillsGapData, targetRole: e.target.value})}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Input
                      value={skillsGapData.industry}
                      onChange={(e) => setSkillsGapData({...skillsGapData, industry: e.target.value})}
                      placeholder="e.g., Tech, Finance"
                    />
                  </div>
                  <Button 
                    onClick={analyzeSkillsGap}
                    className="w-full jobbly-btn-primary"
                    disabled={isAnalyzingSkills}
                  >
                    {isAnalyzingSkills ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Skills Gap
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {skillsGapAnalysis ? (
                    <pre className="whitespace-pre-wrap text-sm bg-secondary p-4 rounded-lg max-h-[600px] overflow-y-auto">
                      {skillsGapAnalysis}
                    </pre>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Get a detailed analysis of skills you need to learn</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AITools;
