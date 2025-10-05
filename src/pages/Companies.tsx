import { useState, useEffect } from 'react';
import { Search, Building2, MapPin, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';

interface Company {
  name: string;
  logo: string;
  jobCount: number;
  location: string;
  description: string;
  size: string;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Get companies from the companies table
      const { data, error } = await supabase
        .from('companies')
        .select('*');

      if (error) throw error;

      // Transform data to match our interface
      const transformedData = data?.map(company => ({
        name: company.name,
        logo: company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=6a0dad&color=fff&size=200`,
        jobCount: 0, // Will be updated with actual count
        location: company.location || 'India',
        description: company.description || `Join ${company.name} and be part of an innovative team.`,
        size: company.size || 'Growing Company'
      })) || [];

      // Get job counts for each company
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('company');

      if (jobsData) {
        const jobCounts = jobsData.reduce((acc: any, job) => {
          acc[job.company || ''] = (acc[job.company || ''] || 0) + 1;
          return acc;
        }, {});

        transformedData.forEach(company => {
          company.jobCount = jobCounts[company.name] || 0;
        });
      }

      setCompanies(transformedData);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    !searchTerm || 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing <span className="text-gradient-purple">Companies</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore top companies and find your next opportunity with organizations that value talent and innovation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="jobbly-card p-6 mb-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="jobbly-btn-primary px-8">
              Search
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCompanies.length} companies
          </p>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="jobbly-card animate-pulse">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded w-32"></div>
                      <div className="h-4 bg-muted rounded w-24"></div>
                    </div>
                  </div>
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
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No companies found matching your criteria.</p>
            <Button 
              onClick={() => setSearchTerm('')}
              className="mt-4"
              variant="outline"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <Card key={index} className="jobbly-card hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{company.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {company.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{company.size}</span>
                    </div>
                    <Badge variant="secondary">
                      {company.jobCount} open position{company.jobCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardContent>
                
                <CardFooter className="space-y-2">
                  <Button className="w-full jobbly-btn-primary">
                    View Company
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Jobs ({company.jobCount})
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Companies
            </Button>
          </div>
        )}

        {/* Featured Companies Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured <span className="text-gradient-purple">Companies</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredCompanies.slice(0, 6).map((company, index) => (
              <div key={index} className="jobbly-card p-4 text-center hover:scale-105 transition-transform">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="w-16 h-16 rounded-lg object-cover mx-auto mb-2"
                />
                <h4 className="font-medium text-sm">{company.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {company.jobCount} jobs
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Companies;