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
    setIsGenerating(true);
    
    setTimeout(() => {
      if (resumeData.name && resumeData.email) {
        const resume = `
═══════════════════════════════════════════════════
                    ${resumeData.name.toUpperCase()}
═══════════════════════════════════════════════════

📧 ${resumeData.email} | 📱 ${resumeData.phone}
${resumeData.location ? `📍 ${resumeData.location}` : ''}
${resumeData.linkedin ? `🔗 ${resumeData.linkedin}` : ''}
${resumeData.portfolio ? `🌐 ${resumeData.portfolio}` : ''}

───────────────────────────────────────────────────
                 PROFESSIONAL SUMMARY
───────────────────────────────────────────────────
${resumeData.summary || 'A dedicated professional seeking opportunities to leverage skills and experience.'}

───────────────────────────────────────────────────
                    EXPERIENCE
───────────────────────────────────────────────────
${resumeData.experiences.map(exp => exp.company ? `
• ${exp.position} at ${exp.company}
  Duration: ${exp.duration}
  ${exp.responsibilities}
` : '').join('\n')}

───────────────────────────────────────────────────
                    EDUCATION
───────────────────────────────────────────────────
${resumeData.educations.map(edu => edu.institution ? `
• ${edu.degree} from ${edu.institution}
  Year: ${edu.year} | Score: ${edu.score}
` : '').join('\n')}

───────────────────────────────────────────────────
                      SKILLS
───────────────────────────────────────────────────
Technical Skills: ${resumeData.technicalSkills}
Soft Skills: ${resumeData.softSkills}

${resumeData.projects[0].name ? `───────────────────────────────────────────────────
                     PROJECTS
───────────────────────────────────────────────────
${resumeData.projects.map(proj => proj.name ? `
• ${proj.name}
  ${proj.description}
  Technologies: ${proj.technologies}
` : '').join('\n')}` : ''}

${resumeData.certifications ? `───────────────────────────────────────────────────
                  CERTIFICATIONS
───────────────────────────────────────────────────
${resumeData.certifications}` : ''}

${resumeData.languages ? `───────────────────────────────────────────────────
                    LANGUAGES
───────────────────────────────────────────────────
${resumeData.languages}` : ''}

═══════════════════════════════════════════════════
      `;
        
        setGeneratedResume(resume);
        toast({
          title: "Resume Generated Successfully!",
          description: "Your AI-powered resume is ready to download.",
        });
      } else {
        toast({
          title: "Missing Information",
          description: "Please fill in at least your name and email.",
          variant: "destructive",
        });
      }
      setIsGenerating(false);
    }, 2000);
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
  const generateCoverLetter = () => {
    setIsGeneratingCoverLetter(true);
    
    setTimeout(() => {
      const letter = `
${coverLetterData.yourName}
${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

${coverLetterData.hiringManager || 'Hiring Manager'}
${coverLetterData.companyName}

Dear ${coverLetterData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${coverLetterData.jobTitle} position at ${coverLetterData.companyName}. With ${coverLetterData.yourExperience}, I am confident in my ability to contribute effectively to your team.

${coverLetterData.whyInterested}

Throughout my career, I have developed expertise in ${coverLetterData.keySkills}. I am particularly drawn to ${coverLetterData.companyName} because of its innovative approach and commitment to excellence in the industry.

I am excited about the opportunity to bring my unique blend of skills and experience to your organization. I would welcome the chance to discuss how my background aligns with your needs.

Thank you for considering my application. I look forward to the opportunity to speak with you soon.

Sincerely,
${coverLetterData.yourName}
      `;
      
      setGeneratedCoverLetter(letter);
      toast({
        title: "Cover Letter Generated!",
        description: "Your personalized cover letter is ready.",
      });
      setIsGeneratingCoverLetter(false);
    }, 1500);
  };

  // Interview Prep Functions
  const generateInterviewQuestions = () => {
    setIsGeneratingQuestions(true);
    
    setTimeout(() => {
      const questions = [
        `Tell me about your experience in ${interviewData.jobRole}.`,
        `What interests you most about ${interviewData.industry}?`,
        `How do you handle challenging situations in your work?`,
        `Describe a project where you demonstrated leadership.`,
        `What are your greatest strengths as a ${interviewData.jobRole}?`,
        `How do you stay updated with industry trends in ${interviewData.industry}?`,
        `Tell me about a time you failed and what you learned from it.`,
        `Where do you see yourself in 5 years?`,
        `How do you prioritize tasks when working on multiple projects?`,
        `What motivates you in your professional career?`,
        `Describe your ideal work environment.`,
        `How do you handle feedback and criticism?`,
        `What unique skills do you bring to this ${interviewData.jobRole} position?`,
        `Tell me about a time you had to work with a difficult team member.`,
        `Why should we hire you for this position?`,
      ];
      
      setInterviewQuestions(questions);
      toast({
        title: "Questions Generated!",
        description: `${questions.length} interview questions ready for practice.`,
      });
      setIsGeneratingQuestions(false);
    }, 1500);
  };

  // Salary Negotiation Functions
  const generateNegotiationAdvice = () => {
    setIsGeneratingAdvice(true);
    
    setTimeout(() => {
      const advice = `
🎯 SALARY NEGOTIATION STRATEGY

Based on your profile:
• Current Salary: ₹${salaryData.currentSalary ? `${(parseInt(salaryData.currentSalary)/100000).toFixed(1)} LPA` : 'Not specified'}
• Desired Salary: ₹${salaryData.desiredSalary ? `${(parseInt(salaryData.desiredSalary)/100000).toFixed(1)} LPA` : 'Not specified'}
• Experience: ${salaryData.experience}
• Location: ${salaryData.location}

📊 MARKET ANALYSIS:
For your skill set (${salaryData.skills}) and experience level, the market range is typically competitive in ${salaryData.location}. Your desired salary appears reasonable for your profile.

💡 NEGOTIATION TIPS:

1. TIMING IS KEY
   • Wait for the offer before discussing numbers
   • Never reveal your current salary first
   • Let them make the initial offer

2. JUSTIFY YOUR VALUE
   • Highlight your ${salaryData.skills} expertise
   • Mention specific achievements and ROI
   • Reference market data for your role

3. NEGOTIATION TACTICS
   • Ask for ${parseInt(salaryData.desiredSalary) * 1.15} initially
   • Be prepared to justify with concrete examples
   • Consider total compensation, not just salary

4. BENEFITS TO NEGOTIATE
   • Performance bonuses
   • Stock options/ESOPs
   • Remote work flexibility
   • Professional development budget
   • Health insurance coverage
   • Signing bonus

5. POWER PHRASES TO USE
   • "Based on my research and experience..."
   • "I'm looking for a package that reflects my value..."
   • "Can we discuss the complete compensation structure?"
   • "I'm flexible if we can discuss other benefits..."

6. RED FLAGS TO AVOID
   • Don't accept the first offer immediately
   • Never lie about current or past compensation
   • Don't compare yourself negatively to others
   • Avoid discussing personal financial needs

🎯 FINAL STRATEGY:
Target range: ₹${salaryData.desiredSalary ? `${(parseInt(salaryData.desiredSalary) * 0.95)/100000}` : 'X'} - ${salaryData.desiredSalary ? `${(parseInt(salaryData.desiredSalary) * 1.15)/100000}` : 'Y'} LPA
This gives you negotiation room while staying realistic.
      `;
      
      setNegotiationAdvice(advice);
      toast({
        title: "Negotiation Strategy Ready!",
        description: "Your personalized salary negotiation guide is prepared.",
      });
      setIsGeneratingAdvice(false);
    }, 2000);
  };

  // Career Path Functions
  const generateCareerPath = () => {
    setIsGeneratingPath(true);
    
    setTimeout(() => {
      const path = `
🚀 PERSONALIZED CAREER ROADMAP

CURRENT POSITION:
${careerData.currentRole} | ${careerData.yearsOfExperience} of experience

SKILLS INVENTORY:
${careerData.skills}

INTERESTS:
${careerData.interests}

─────────────────────────────────────────

📈 CAREER PROGRESSION PATH

SHORT TERM (1-2 years):
→ Senior ${careerData.currentRole}
  • Master advanced concepts in your current domain
  • Take on mentorship responsibilities
  • Lead small to medium-sized projects
  • Build expertise in: ${careerData.skills}

MID TERM (3-5 years):
→ Lead ${careerData.currentRole} / Team Lead
  • Manage a team of 3-5 professionals
  • Drive strategic initiatives
  • Develop leadership and communication skills
  • Expand into: Architecture, System Design

→ Technical Architect
  • Design large-scale systems
  • Make high-level technical decisions
  • Guide multiple teams on best practices

LONG TERM (5-10 years):
→ Engineering Manager / Director
  • Oversee multiple teams
  • Set technical vision and strategy
  • Budget and resource management
  • Stakeholder management

→ VP of Engineering / CTO
  • Company-wide technical leadership
  • Business strategy involvement
  • Build and scale engineering culture

ALTERNATIVE PATHS:
→ Freelance Consultant
  • Build diverse portfolio
  • Work with multiple clients
  • Flexible lifestyle

→ Entrepreneur / Startup Founder
  • Launch your own venture
  • Leverage ${careerData.interests}
  • Build something innovative

─────────────────────────────────────────

🎯 RECOMMENDED ACTIONS:

1. SKILL DEVELOPMENT
   • Advanced certifications in ${careerData.skills}
   • Leadership and management courses
   • Public speaking and presentation skills

2. NETWORKING
   • Attend industry conferences
   • Join professional communities
   • Build your personal brand on LinkedIn

3. EXPERIENCE BUILDING
   • Take on stretch assignments
   • Contribute to open source
   • Write technical blogs or create content

4. CONTINUOUS LEARNING
   • Stay updated with industry trends
   • Learn emerging technologies
   • Read leadership and business books
      `;
      
      setCareerPath(path);
      toast({
        title: "Career Path Generated!",
        description: "Your personalized roadmap is ready.",
      });
      setIsGeneratingPath(false);
    }, 2000);
  };

  // Skills Gap Functions
  const analyzeSkillsGap = () => {
    setIsAnalyzingSkills(true);
    
    setTimeout(() => {
      const currentSkillsArray = skillsGapData.currentSkills.split(',').map(s => s.trim());
      
      const analysis = `
🎯 SKILLS GAP ANALYSIS

TARGET ROLE: ${skillsGapData.targetRole}
INDUSTRY: ${skillsGapData.industry}

─────────────────────────────────────────

✅ YOUR CURRENT SKILLS:
${currentSkillsArray.map(skill => `• ${skill}`).join('\n')}

─────────────────────────────────────────

📊 SKILLS REQUIRED FOR ${skillsGapData.targetRole.toUpperCase()}:

CORE TECHNICAL SKILLS (Must Have):
• Advanced programming concepts
• System design and architecture
• Cloud platforms (AWS/Azure/GCP)
• Database management (SQL & NoSQL)
• Version control (Git)
• CI/CD pipelines
• Testing frameworks

SECONDARY SKILLS (Good to Have):
• Containerization (Docker, Kubernetes)
• Microservices architecture
• Security best practices
• Performance optimization
• API design and development

SOFT SKILLS (Essential):
• Communication and presentation
• Team collaboration
• Problem-solving
• Time management
• Leadership potential

INDUSTRY-SPECIFIC (${skillsGapData.industry}):
• Domain knowledge
• Compliance and regulations
• Industry tools and platforms
• Business acumen

─────────────────────────────────────────

🎓 LEARNING ROADMAP:

IMMEDIATE FOCUS (0-3 months):
1. Fill critical gaps in core technical skills
2. Complete relevant online courses
3. Build portfolio projects demonstrating new skills
4. Practice coding challenges daily

SHORT TERM (3-6 months):
1. Earn industry certifications
2. Contribute to open-source projects
3. Attend workshops and webinars
4. Network with professionals in ${skillsGapData.industry}

MEDIUM TERM (6-12 months):
1. Take on real-world projects
2. Build a comprehensive portfolio
3. Seek mentorship in target role
4. Apply for stretch positions

─────────────────────────────────────────

📚 RECOMMENDED RESOURCES:

Online Platforms:
• Coursera, Udemy, Pluralsight
• LeetCode, HackerRank for practice
• YouTube channels for tutorials
• LinkedIn Learning

Certifications:
• AWS Certified Solutions Architect
• Google Cloud Professional
• Industry-specific certifications

Books & Blogs:
• Technical blogs in ${skillsGapData.industry}
• System design interview books
• Leadership and soft skills resources

Communities:
• Reddit r/cscareerquestions
• Stack Overflow
• Industry-specific forums
• Local meetup groups

─────────────────────────────────────────

⏱️ ESTIMATED TIMELINE:
With consistent effort (10-15 hours/week), you can bridge this gap in 6-12 months and be ready for ${skillsGapData.targetRole} positions.

💪 Stay committed to continuous learning!
      `;
      
      setSkillsGapAnalysis(analysis);
      toast({
        title: "Analysis Complete!",
        description: "Your personalized skills gap analysis is ready.",
      });
      setIsAnalyzingSkills(false);
    }, 2000);
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
