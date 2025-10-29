import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "10 Tips to Ace Your Next Job Interview",
      excerpt: "Master the art of interviewing with these proven strategies that will help you stand out from the competition.",
      author: "Sarah Johnson",
      date: "Jan 15, 2025",
      category: "Career Advice",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
    },
    {
      id: 2,
      title: "How AI is Transforming Job Searches",
      excerpt: "Discover how artificial intelligence is revolutionizing the way job seekers find opportunities and employers find talent.",
      author: "Michael Chen",
      date: "Jan 12, 2025",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      id: 3,
      title: "Building a Resume That Gets Noticed",
      excerpt: "Learn the key elements that make a resume stand out to recruiters and ATS systems.",
      author: "Emily Davis",
      date: "Jan 10, 2025",
      category: "Career Advice",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
    },
    {
      id: 4,
      title: "Remote Work: The Future of Employment",
      excerpt: "Explore the trends, benefits, and challenges of remote work in the modern job market.",
      author: "David Martinez",
      date: "Jan 8, 2025",
      category: "Workplace Trends",
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80"
    },
    {
      id: 5,
      title: "Salary Negotiation Strategies for 2025",
      excerpt: "Master the art of negotiating your salary with confidence and data-backed strategies.",
      author: "Lisa Anderson",
      date: "Jan 5, 2025",
      category: "Career Development",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    },
    {
      id: 6,
      title: "Top Skills Employers Look for in 2025",
      excerpt: "Stay ahead of the curve by developing the most in-demand skills in today's job market.",
      author: "Robert Taylor",
      date: "Jan 3, 2025",
      category: "Skills Development",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Career <span className="text-gradient-purple">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Expert insights, career tips, and industry trends to help you navigate your professional journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="jobbly-card overflow-hidden group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-jobbly-purple text-white px-3 py-1 rounded-full text-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-jobbly-purple transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4">
                      {article.excerpt}
                    </p>
                    
                    <button className="text-jobbly-purple font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
