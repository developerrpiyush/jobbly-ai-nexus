-- Add role check constraint to profiles
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('job_seeker', 'employer'));

-- Insert sample Indian job postings
INSERT INTO public.jobs (title, company, location, type, description, requirements, benefits, salary_min, salary_max, posted_by) VALUES
(
  'Senior Software Engineer',
  'TechCorp India',
  'Bangalore, Karnataka',
  'full-time',
  'Join our engineering team to build scalable web applications using modern technologies. Work on cutting-edge projects that impact millions of users across India.',
  'Bachelor''s degree in Computer Science or equivalent. 5+ years of experience with React, Node.js, and cloud technologies. Strong problem-solving skills.',
  'Health insurance, flexible work hours, stock options, annual bonuses, learning stipend',
  1200000,
  2000000,
  NULL
),
(
  'Data Scientist',
  'Analytics Hub',
  'Mumbai, Maharashtra',
  'full-time',
  'Analyze large datasets to drive business insights and build machine learning models for our fintech platform serving Indian markets.',
  'Masters in Statistics/Computer Science. Experience with Python, SQL, machine learning frameworks. Knowledge of financial markets preferred.',
  'Competitive salary, health benefits, work from home options, professional development',
  1500000,
  2500000,
  NULL
),
(
  'Digital Marketing Manager',
  'StartupX',
  'Gurgaon, Haryana',
  'full-time',
  'Lead digital marketing initiatives for our e-commerce platform. Manage campaigns across multiple channels targeting Indian consumers.',
  '3-5 years digital marketing experience. Expertise in Google Ads, Facebook Ads, SEO. Understanding of Indian market dynamics.',
  'Performance bonuses, health insurance, team outings, career growth opportunities',
  800000,
  1400000,
  NULL
),
(
  'Product Manager',
  'InnovateNow',
  'Pune, Maharashtra',
  'full-time',
  'Drive product strategy and roadmap for our SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.',
  'MBA or equivalent experience. 4+ years product management experience. Strong analytical and communication skills.',
  'Stock options, health coverage, flexible hours, learning budget',
  1800000,
  2800000,
  NULL
),
(
  'DevOps Engineer',
  'CloudTech Solutions',
  'Hyderabad, Telangana',
  'remote',
  'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure high availability of our applications serving Indian enterprises.',
  'Experience with AWS/Azure, Docker, Kubernetes, Jenkins. Strong scripting skills in Python/Bash.',
  'Remote work, health insurance, annual trips, certification reimbursements',
  1000000,
  1800000,
  NULL
);