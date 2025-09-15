import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Building2, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

type Job = Tables<'jobs'>;

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchJob(id);
      if (user) {
        checkIfApplied(id);
      }
    }
  }, [id, user]);

  const fetchJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfApplied = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('user_id', user?.id)
        .single();

      if (data) {
        setHasApplied(true);
      }
    } catch (error) {
      // User hasn't applied yet
    }
  };

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    setApplying(true);
    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            job_id: id,
            user_id: user.id,
            cover_letter: "Applied through Jobbly platform",
          }
        ]);

      if (error) throw error;

      setHasApplied(true);
      toast({
        title: "Application submitted!",
        description: "Your application has been sent to the employer.",
      });
    } catch (error) {
      toast({
        title: "Error applying",
        description: "There was an error submitting your application.",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
    return 'Competitive salary';
  };

  const getTimeAgo = (dateString?: string | null) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return <Navigate to="/jobs" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="jobbly-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center text-lg text-muted-foreground mb-4">
                      <Building2 className="w-5 h-5 mr-2" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {job.type?.replace('-', ' ').toUpperCase() || 'FULL TIME'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location || 'Remote'}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Posted {getTimeAgo(job.created_at)}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            {job.description && (
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {job.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && (
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {job.requirements.split('\n').map((requirement, index) => (
                      <p key={index} className="mb-2">
                        • {requirement}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && (
              <Card className="jobbly-card">
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {job.benefits.split('\n').map((benefit, index) => (
                      <p key={index} className="mb-2">
                        • {benefit}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="jobbly-card">
              <CardHeader>
                <CardTitle>Ready to Apply?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Salary Range:</p>
                  <p className="font-semibold text-foreground">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="text-sm text-muted-foreground">
                  <p>Job Type: <span className="text-foreground font-medium">{job.type?.replace('-', ' ') || 'Full Time'}</span></p>
                  <p>Location: <span className="text-foreground font-medium">{job.location || 'Remote'}</span></p>
                </div>
                
                {user ? (
                  <Button 
                    className="w-full jobbly-btn-primary" 
                    onClick={handleApply}
                    disabled={applying || hasApplied}
                  >
                    {applying ? 'Applying...' : hasApplied ? 'Already Applied' : 'Apply Now'}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline" onClick={() => window.location.href = '/login'}>
                      Sign In to Apply
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Create an account to apply for jobs
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="jobbly-card">
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>
                    {job.company} is actively hiring talented individuals to join their team. 
                    This is a great opportunity to work with a dynamic company.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="jobbly-card">
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Senior Frontend Developer</p>
                    <p className="text-muted-foreground">TechCorp Inc.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Full Stack Engineer</p>
                    <p className="text-muted-foreground">StartupXYZ</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">React Developer</p>
                    <p className="text-muted-foreground">WebSolutions LLC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;