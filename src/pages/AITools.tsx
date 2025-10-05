import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, FileText, Download, Sparkles, Plus, Trash2, Loader2 } from 'lucide-react';
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
  
  const [resumeData, setResumeData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    
    // Professional Summary
    summary: '',
    
    // Experience
    experiences: [{
      company: '',
      position: '',
      duration: '',
      responsibilities: '',
    }] as Experience[],
    
    // Education
    educations: [{
      institution: '',
      degree: '',
      year: '',
      score: '',
    }] as Education[],
    
    // Skills
    technicalSkills: '',
    softSkills: '',
    
    // Projects
    projects: [{
      name: '',
      description: '',
      technologies: '',
    }] as Project[],
    
    // Certifications
    certifications: '',
    
    // Languages
    languages: '',
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
      if (array.length <= 1) return prev; // Keep at least one item
      return {
        ...prev,
        [field]: array.filter((_, i) => i !== index)
      };
    });
  };

  const generateResume = async () => {
    setIsGenerating(true);
    
    // Simulating AI resume generation with more detailed formatting
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
            AI Resume <span className="text-gradient-purple">Builder</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a professional resume in minutes with our AI-powered builder
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Builder Form */}
          <Card className="jobbly-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Resume Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

              {/* Certifications */}
              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Textarea
                  id="certifications"
                  name="certifications"
                  value={resumeData.certifications}
                  onChange={handleInputChange}
                  placeholder="List your certifications..."
                  rows={3}
                />
              </div>

              {/* Languages */}
              <div className="space-y-2">
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

              <Button 
                onClick={generateResume} 
                className="w-full jobbly-btn-primary" 
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Resume with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Resume Preview */}
          <Card className="jobbly-card lg:sticky lg:top-4 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Generated Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedResume ? (
                <div className="space-y-4">
                  <div className="bg-secondary p-6 rounded-lg max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {generatedResume}
                    </pre>
                  </div>
                  <Button 
                    onClick={downloadResume} 
                    className="w-full jobbly-btn-primary"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fill in your information and click "Generate Resume with AI" to see your professional resume here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AITools;