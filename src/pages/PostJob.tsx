import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Briefcase } from 'lucide-react';
import Header from '@/components/Header';

const PostJob = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary_min: '',
    salary_max: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        posted_by: user?.id,
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) throw error;

      toast({
        title: "Job posted successfully!",
        description: "Your job posting is now live and visible to job seekers.",
      });

      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        type: '',
        salary_min: '',
        salary_max: '',
        description: '',
        requirements: '',
        benefits: '',
      });

    } catch (error: any) {
      toast({
        title: "Error posting job",
        description: error.message || "There was an error posting your job.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Post a <span className="text-gradient-purple">Job</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the perfect candidate for your team
            </p>
          </div>

          <Card className="jobbly-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Job Details
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Senior Software Engineer"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="e.g. TechCorp Inc."
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g. San Francisco, CA or Remote"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select value={formData.type} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary_min">Minimum Salary (₹ per annum)</Label>
                      <Input
                        id="salary_min"
                        name="salary_min"
                        type="number"
                        placeholder="e.g. 800000"
                        value={formData.salary_min}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary_max">Maximum Salary (₹ per annum)</Label>
                      <Input
                        id="salary_max"
                        name="salary_max"
                        type="number"
                        placeholder="e.g. 1200000"
                        value={formData.salary_max}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                      rows={6}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      placeholder="List the required skills, experience, and qualifications..."
                      rows={4}
                      value={formData.requirements}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits & Perks</Label>
                    <Textarea
                      id="benefits"
                      name="benefits"
                      placeholder="Describe the benefits, perks, and company culture..."
                      rows={4}
                      value={formData.benefits}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full jobbly-btn-primary" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Posting Job...' : 'Post Job'}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    By posting a job, you agree to our terms of service
                  </p>
                </div>
              </CardContent>
            </form>
          </Card>

          {/* Tips Card */}
          <Card className="jobbly-card mt-8">
            <CardHeader>
              <CardTitle>Tips for a Great Job Posting</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Write a clear, descriptive job title</li>
                <li>• Include specific requirements and qualifications</li>
                <li>• Mention salary range to attract qualified candidates</li>
                <li>• Highlight unique benefits and company culture</li>
                <li>• Keep the description concise but comprehensive</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PostJob;