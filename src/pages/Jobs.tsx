import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Building2, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import Header from '@/components/Header';

type Job = Tables<'jobs'>;

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !locationFilter || 
      job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesType = !typeFilter || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `₹${(min/100000).toFixed(1)}-${(max/100000).toFixed(1)} LPA`;
    if (min) return `₹${(min/100000).toFixed(1)}+ LPA`;
    if (max) return `Up to ₹${(max/100000).toFixed(1)} LPA`;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your <span className="text-gradient-purple">Dream Job</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities from top companies worldwide. AI-powered matching ensures you find the perfect fit.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="jobbly-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Button className="jobbly-btn-primary">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="jobbly-card animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No jobs found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setTypeFilter('');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="jobbly-card hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {job.type?.replace('-', ' ').toUpperCase() || 'FULL TIME'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location || 'Remote'}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{getTimeAgo(job.created_at)}</span>
                  </div>
                  {job.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to={`/jobs/${job.id}`} className="w-full">
                    <Button className="w-full jobbly-btn-primary">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;