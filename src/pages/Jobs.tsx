import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Building2, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import Header from '@/components/Header';

type Job = Tables<'jobs'>;

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [workMode, setWorkMode] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState([0, 20]);
  const [salaryRange, setSalaryRange] = useState([0, 50]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [freshness, setFreshness] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    
    if (search) setSearchTerm(search);
    if (location) setLocationFilter(location);
    
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

  // Get unique values for filters
  const uniqueCompanies = Array.from(new Set(jobs.map(j => j.company).filter(Boolean))) as string[];
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !locationFilter || 
      job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesWorkMode = workMode.length === 0 || 
      workMode.some(mode => job.type?.toLowerCase().includes(mode.toLowerCase()));
    
    const matchesDepartment = departments.length === 0 || 
      departments.some(dept => job.title?.toLowerCase().includes(dept.toLowerCase()));
    
    const matchesCompany = selectedCompanies.length === 0 || 
      selectedCompanies.includes(job.company || '');
    
    const jobSalary = job.salary_min ? job.salary_min / 100000 : 0;
    const matchesSalary = jobSalary >= salaryRange[0] && jobSalary <= salaryRange[1];
    
    const matchesFreshness = (() => {
      if (freshness === 'all') return true;
      if (!job.created_at) return false;
      const jobDate = new Date(job.created_at);
      const now = new Date();
      const diffHours = (now.getTime() - jobDate.getTime()) / (1000 * 60 * 60);
      
      if (freshness === '24h') return diffHours <= 24;
      if (freshness === '7d') return diffHours <= 168;
      if (freshness === '30d') return diffHours <= 720;
      return true;
    })();

    return matchesSearch && matchesLocation && matchesWorkMode && 
           matchesDepartment && matchesCompany && matchesSalary && matchesFreshness;
  });

  // Apply sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
    if (sortBy === 'salary-high') {
      return (b.salary_max || 0) - (a.salary_max || 0);
    }
    if (sortBy === 'salary-low') {
      return (a.salary_max || 0) - (b.salary_max || 0);
    }
    return 0;
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

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setWorkMode([]);
    setDepartments([]);
    setExperienceRange([0, 20]);
    setSalaryRange([0, 50]);
    setSelectedCompanies([]);
    setIndustries([]);
    setRoles([]);
    setEducation([]);
    setFreshness('all');
    setSortBy('recent');
  };

  const activeFiltersCount = [
    workMode.length > 0,
    departments.length > 0,
    selectedCompanies.length > 0,
    experienceRange[0] > 0 || experienceRange[1] < 20,
    salaryRange[0] > 0 || salaryRange[1] < 50,
    freshness !== 'all'
  ].filter(Boolean).length;

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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Advanced Filters</SheetTitle>
                  <SheetDescription>
                    Refine your job search with detailed filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Sort By */}
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                        <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Freshness */}
                  <div className="space-y-2">
                    <Label>Job Freshness</Label>
                    <Select value={freshness} onValueChange={setFreshness}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Work Mode */}
                  <div className="space-y-3">
                    <Label>Work Mode</Label>
                    {['Remote', 'Hybrid', 'On-site', 'Full-time', 'Part-time', 'Contract'].map((mode) => (
                      <div key={mode} className="flex items-center space-x-2">
                        <Checkbox
                          id={mode}
                          checked={workMode.includes(mode)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setWorkMode([...workMode, mode]);
                            } else {
                              setWorkMode(workMode.filter(m => m !== mode));
                            }
                          }}
                        />
                        <Label htmlFor={mode} className="font-normal cursor-pointer">
                          {mode}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Department */}
                  <div className="space-y-3">
                    <Label>Department</Label>
                    {['Engineering', 'Marketing', 'Sales', 'Design', 'Product', 'HR', 'Finance', 'Operations'].map((dept) => (
                      <div key={dept} className="flex items-center space-x-2">
                        <Checkbox
                          id={dept}
                          checked={departments.includes(dept)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDepartments([...departments, dept]);
                            } else {
                              setDepartments(departments.filter(d => d !== dept));
                            }
                          }}
                        />
                        <Label htmlFor={dept} className="font-normal cursor-pointer">
                          {dept}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Companies */}
                  {uniqueCompanies.length > 0 && (
                    <div className="space-y-3">
                      <Label>Companies</Label>
                      {uniqueCompanies.slice(0, 10).map((company) => (
                        <div key={company} className="flex items-center space-x-2">
                          <Checkbox
                            id={`company-${company}`}
                            checked={selectedCompanies.includes(company)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCompanies([...selectedCompanies, company]);
                              } else {
                                setSelectedCompanies(selectedCompanies.filter(c => c !== company));
                              }
                            }}
                          />
                          <Label htmlFor={`company-${company}`} className="font-normal cursor-pointer">
                            {company}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Experience Range */}
                  <div className="space-y-3">
                    <Label>Experience (Years): {experienceRange[0]} - {experienceRange[1]}+</Label>
                    <Slider
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                      min={0}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Salary Range */}
                  <div className="space-y-3">
                    <Label>Salary (LPA): ₹{salaryRange[0]} - ₹{salaryRange[1]}+</Label>
                    <Slider
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      min={0}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <Label>Education</Label>
                    {['Any', '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Post Graduate', 'Doctorate'].map((edu) => (
                      <div key={edu} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edu-${edu}`}
                          checked={education.includes(edu)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setEducation([...education, edu]);
                            } else {
                              setEducation(education.filter(e => e !== edu));
                            }
                          }}
                        />
                        <Label htmlFor={`edu-${edu}`} className="font-normal cursor-pointer">
                          {edu}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={clearAllFilters}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                    <Button 
                      className="flex-1 jobbly-btn-primary"
                      onClick={() => setFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Count and Active Filters */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-muted-foreground">
            Showing {sortedJobs.length} of {jobs.length} jobs
          </p>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear all filters ({activeFiltersCount})
            </Button>
          )}
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
        ) : sortedJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-2">No jobs found matching your criteria.</p>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
            <Button 
              onClick={clearAllFilters}
              className="mt-4"
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJobs.map((job) => (
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
        {sortedJobs.length > 0 && (
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