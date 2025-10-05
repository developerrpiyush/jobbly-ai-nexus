-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('job_seeker', 'employer');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role::app_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Create companies table
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo TEXT,
    description TEXT,
    industry TEXT,
    size TEXT,
    location TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Companies are viewable by everyone"
ON public.companies
FOR SELECT
USING (true);

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Insert sample companies
INSERT INTO public.companies (name, logo, description, industry, size, location, website) VALUES
('Tata Consultancy Services', NULL, 'Leading IT services and consulting company', 'IT Services', '500,000+', 'Mumbai, India', 'https://www.tcs.com'),
('Infosys', NULL, 'Global leader in next-generation digital services', 'IT Services', '250,000+', 'Bangalore, India', 'https://www.infosys.com'),
('Wipro', NULL, 'Information technology, consulting and business services', 'IT Services', '200,000+', 'Bangalore, India', 'https://www.wipro.com'),
('HCL Technologies', NULL, 'Next-generation global technology company', 'IT Services', '150,000+', 'Noida, India', 'https://www.hcltech.com'),
('Tech Mahindra', NULL, 'IT services and business process outsourcing', 'IT Services', '125,000+', 'Pune, India', 'https://www.techmahindra.com');

-- Update jobs table to reference companies
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);

-- Update RLS policies for jobs to check user roles
DROP POLICY IF EXISTS "Authenticated users can create jobs" ON public.jobs;

CREATE POLICY "Employers can create jobs"
ON public.jobs
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'employer'));

CREATE POLICY "Employers can update their own jobs"
ON public.jobs
FOR UPDATE
USING (public.has_role(auth.uid(), 'employer') AND posted_by = auth.uid());