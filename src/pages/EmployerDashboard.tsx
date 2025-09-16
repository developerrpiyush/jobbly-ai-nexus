import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  Users, 
  Eye, 
  Plus, 
  MapPin, 
  Calendar,
  DollarSign,
  Building2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary_min: number | null;
  salary_max: number | null;
  created_at: string;
  applications?: { id: string }[];
};

const EmployerDashboard = () => {
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    views: 145
  });

  useEffect(() => {
    if (user) {
      fetchEmployerData();
    }
  }, [user]);

  const fetchEmployerData = async () => {
    try {
      // Fetch jobs posted by this employer
      const { data: jobsData } = await supabase
        .from('jobs')
        .select(`
          *,
          applications(id)
        `)
        .eq('posted_by', user?.id)
        .order('created_at', { ascending: false });

      if (jobsData) {
        setJobs(jobsData);
        const totalApps = jobsData.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
        setStats(prev => ({
          ...prev,
          totalJobs: jobsData.length,
          totalApplications: totalApps,
          activeJobs: jobsData.length
        }));
      }

      // Fetch recent applications for employer's jobs
      const { data: appsData } = await supabase
        .from('applications')
        .select(`
          *,
          jobs(title, company)
        `)
        .in('job_id', jobsData?.map(job => job.id) || [])
        .order('created_at', { ascending: false })
        .limit(10);

      if (appsData) {
        setApplications(appsData);
      }
    } catch (error) {
      console.error('Error fetching employer data:', error);
    }
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `₹${(min/100000).toFixed(1)}-${(max/100000).toFixed(1)} LPA`;
    if (min) return `₹${(min/100000).toFixed(1)}+ LPA`;
    if (max) return `Up to ₹${(max/100000).toFixed(1)} LPA`;
    return 'Competitive salary';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  if (loading) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Employer <span className="text-gradient-purple">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your job postings and track applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="jobbly-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                  <p className="text-2xl font-bold">{stats.totalJobs}</p>
                </div>
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="jobbly-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">{stats.totalApplications}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="jobbly-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold">{stats.activeJobs}</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="jobbly-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">{stats.views}</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">My Job Postings</TabsTrigger>
            <TabsTrigger value="applications">Recent Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Job Postings</h2>
              <Link to="/post-job">
                <Button className="jobbly-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <Card className="jobbly-card">
                  <CardContent className="p-8 text-center">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by posting your first job to attract talented candidates.
                    </p>
                    <Link to="/post-job">
                      <Button className="jobbly-btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Post Your First Job
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                jobs.map((job) => (
                  <Card key={job.id} className="jobbly-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Building2 className="w-4 h-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {getTimeAgo(job.created_at)}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="ml-4">
                          {job.type?.replace('-', ' ').toUpperCase() || 'FULL TIME'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatSalary(job.salary_min, job.salary_max)}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applications?.length || 0} applications
                          </div>
                        </div>
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            
            <div className="space-y-4">
              {applications.length === 0 ? (
                <Card className="jobbly-card">
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                    <p className="text-muted-foreground">
                      Applications will appear here once candidates apply to your jobs.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                applications.map((application) => (
                  <Card key={application.id} className="jobbly-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{application.jobs?.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Applied {getTimeAgo(application.created_at)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Application
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <Card className="jobbly-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Detailed analytics coming soon. Track job performance, application rates, and more.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployerDashboard;