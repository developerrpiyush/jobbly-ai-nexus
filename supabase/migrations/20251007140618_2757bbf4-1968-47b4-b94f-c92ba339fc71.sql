-- Insert 60 sample Indian jobs with realistic data
INSERT INTO public.jobs (title, company, location, type, salary_min, salary_max, description, requirements, benefits, company_id) VALUES
-- Tech Jobs
('Senior Full Stack Developer', 'TCS', 'Bangalore, Karnataka', 'full-time', 1200000, 2000000, 'Lead the development of enterprise web applications using modern tech stack', 'React, Node.js, 5+ years experience', 'Health insurance, Flexible work hours', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('DevOps Engineer', 'Infosys', 'Pune, Maharashtra', 'full-time', 1000000, 1600000, 'Manage cloud infrastructure and CI/CD pipelines', 'AWS, Kubernetes, Docker, 4+ years', 'Work from home, Learning budget', (SELECT id FROM companies WHERE name = 'Infosys' LIMIT 1)),
('Data Scientist', 'Wipro', 'Hyderabad, Telangana', 'full-time', 1500000, 2500000, 'Build ML models and analyze large datasets', 'Python, Machine Learning, Statistics', 'Stock options, Annual bonus', (SELECT id FROM companies WHERE name = 'Wipro' LIMIT 1)),
('Frontend Developer', 'HCL Technologies', 'Noida, Uttar Pradesh', 'full-time', 800000, 1400000, 'Create responsive and intuitive user interfaces', 'React, TypeScript, 3+ years experience', 'Health insurance, Gym membership', (SELECT id FROM companies WHERE name = 'HCL Technologies' LIMIT 1)),
('Backend Developer', 'Tech Mahindra', 'Chennai, Tamil Nadu', 'full-time', 900000, 1500000, 'Develop scalable APIs and microservices', 'Java, Spring Boot, PostgreSQL', 'Flexible hours, Training programs', (SELECT id FROM companies WHERE name = 'Tech Mahindra' LIMIT 1)),
('Mobile App Developer', 'Cognizant', 'Bangalore, Karnataka', 'full-time', 1000000, 1800000, 'Build native mobile applications for iOS and Android', 'React Native, Flutter, Swift', 'Remote work, Performance bonus', (SELECT id FROM companies WHERE name = 'Cognizant' LIMIT 1)),
('Cloud Architect', 'Accenture', 'Mumbai, Maharashtra', 'full-time', 2000000, 3500000, 'Design and implement cloud solutions', 'AWS/Azure, Terraform, 8+ years', 'Stock options, Premium health insurance', (SELECT id FROM companies WHERE name = 'Accenture' LIMIT 1)),
('QA Automation Engineer', 'TCS', 'Kolkata, West Bengal', 'full-time', 700000, 1200000, 'Develop and maintain automated test suites', 'Selenium, TestNG, CI/CD', 'Work from home, Annual trips', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('UI/UX Designer', 'Flipkart', 'Bangalore, Karnataka', 'full-time', 1200000, 2200000, 'Design user experiences for e-commerce platform', 'Figma, User Research, Prototyping', 'Employee discounts, Health insurance', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),
('Product Manager', 'Paytm', 'Noida, Uttar Pradesh', 'full-time', 2500000, 4000000, 'Lead product strategy and roadmap', 'Product Management, Agile, 6+ years', 'ESOPs, Performance bonus', (SELECT id FROM companies WHERE name = 'Paytm' LIMIT 1)),

-- More Tech Jobs
('Java Developer', 'Infosys', 'Bangalore, Karnataka', 'full-time', 800000, 1300000, 'Develop enterprise Java applications', 'Java, Spring, Hibernate, 3+ years', 'Health insurance, Training budget', (SELECT id FROM companies WHERE name = 'Infosys' LIMIT 1)),
('Python Developer', 'Wipro', 'Pune, Maharashtra', 'full-time', 900000, 1500000, 'Build backend services using Python', 'Python, Django, FastAPI', 'Flexible work, Annual bonus', (SELECT id FROM companies WHERE name = 'Wipro' LIMIT 1)),
('AI/ML Engineer', 'TCS', 'Hyderabad, Telangana', 'full-time', 1800000, 3000000, 'Develop AI solutions and ML models', 'TensorFlow, PyTorch, NLP', 'Remote work, Stock options', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('Cybersecurity Analyst', 'HCL Technologies', 'Delhi, NCR', 'full-time', 1200000, 2000000, 'Protect systems from security threats', 'Network Security, Ethical Hacking', 'Health insurance, Certifications', (SELECT id FROM companies WHERE name = 'HCL Technologies' LIMIT 1)),
('Blockchain Developer', 'Tech Mahindra', 'Mumbai, Maharashtra', 'full-time', 1500000, 2500000, 'Build decentralized applications', 'Solidity, Web3, Smart Contracts', 'Remote work, Innovation bonus', (SELECT id FROM companies WHERE name = 'Tech Mahindra' LIMIT 1)),
('React Native Developer', 'Cognizant', 'Chennai, Tamil Nadu', 'full-time', 1000000, 1700000, 'Create cross-platform mobile apps', 'React Native, Redux, 4+ years', 'Flexible hours, Health benefits', (SELECT id FROM companies WHERE name = 'Cognizant' LIMIT 1)),
('Business Analyst', 'Accenture', 'Bangalore, Karnataka', 'full-time', 1100000, 1900000, 'Analyze business requirements', 'SQL, Business Intelligence, Agile', 'Training, Performance bonus', (SELECT id FROM companies WHERE name = 'Accenture' LIMIT 1)),
('Scrum Master', 'Flipkart', 'Bangalore, Karnataka', 'full-time', 1500000, 2500000, 'Lead agile teams and ceremonies', 'Agile, Scrum, 5+ years', 'Remote flexibility, ESOPs', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),
('Technical Writer', 'Amazon', 'Hyderabad, Telangana', 'full-time', 800000, 1400000, 'Create technical documentation', 'Technical Writing, API docs', 'Health insurance, Work from home', (SELECT id FROM companies WHERE name = 'Amazon' LIMIT 1)),
('Site Reliability Engineer', 'Google', 'Bangalore, Karnataka', 'full-time', 2500000, 4000000, 'Ensure system reliability and uptime', 'Linux, Kubernetes, Monitoring', 'Stock options, Premium benefits', (SELECT id FROM companies WHERE name = 'Google' LIMIT 1)),

-- Finance & Banking
('Financial Analyst', 'HDFC Bank', 'Mumbai, Maharashtra', 'full-time', 600000, 1000000, 'Analyze financial data and market trends', 'Finance, Excel, SQL', 'Loan benefits, Health insurance', (SELECT id FROM companies WHERE name = 'HDFC Bank' LIMIT 1)),
('Credit Risk Analyst', 'ICICI Bank', 'Mumbai, Maharashtra', 'full-time', 700000, 1200000, 'Assess credit risk and loan applications', 'Risk Analysis, Credit Modeling', 'Performance bonus, Medical insurance', (SELECT id FROM companies WHERE name = 'ICICI Bank' LIMIT 1)),
('Investment Banker', 'HDFC Bank', 'Mumbai, Maharashtra', 'full-time', 1500000, 2500000, 'Advise on investments and mergers', 'Finance, MBA, 5+ years', 'High bonus, Stock options', (SELECT id FROM companies WHERE name = 'HDFC Bank' LIMIT 1)),
('Relationship Manager', 'ICICI Bank', 'Delhi, NCR', 'full-time', 500000, 900000, 'Manage client relationships and portfolio', 'Sales, Customer Service', 'Incentives, Health insurance', (SELECT id FROM companies WHERE name = 'ICICI Bank' LIMIT 1)),
('Compliance Officer', 'HDFC Bank', 'Bangalore, Karnataka', 'full-time', 900000, 1500000, 'Ensure regulatory compliance', 'Banking Regulations, Auditing', 'Annual bonus, Health benefits', (SELECT id FROM companies WHERE name = 'HDFC Bank' LIMIT 1)),

-- Consulting
('Management Consultant', 'Accenture', 'Mumbai, Maharashtra', 'full-time', 1800000, 3000000, 'Provide strategic business advice', 'MBA, Strategy, 6+ years', 'Travel allowance, Stock options', (SELECT id FROM companies WHERE name = 'Accenture' LIMIT 1)),
('IT Consultant', 'Cognizant', 'Pune, Maharashtra', 'full-time', 1200000, 2000000, 'Advise on IT solutions', 'Enterprise IT, Cloud, 5+ years', 'Project bonus, Certifications', (SELECT id FROM companies WHERE name = 'Cognizant' LIMIT 1)),
('Strategy Consultant', 'Accenture', 'Bangalore, Karnataka', 'full-time', 2000000, 3500000, 'Develop business strategies', 'MBA, Consulting, 7+ years', 'Performance bonus, Premium insurance', (SELECT id FROM companies WHERE name = 'Accenture' LIMIT 1)),
('HR Consultant', 'Wipro', 'Hyderabad, Telangana', 'full-time', 800000, 1400000, 'Provide HR advisory services', 'HR Management, Recruitment', 'Flexible work, Annual bonus', (SELECT id FROM companies WHERE name = 'Wipro' LIMIT 1)),
('Digital Marketing Consultant', 'TCS', 'Mumbai, Maharashtra', 'full-time', 1000000, 1800000, 'Advise on digital marketing strategies', 'SEO, SEM, Analytics', 'Remote work, Performance bonus', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),

-- E-commerce & Retail
('E-commerce Manager', 'Flipkart', 'Bangalore, Karnataka', 'full-time', 1200000, 2000000, 'Manage online store operations', 'E-commerce, Analytics, 5+ years', 'Employee discounts, Stock options', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),
('Category Manager', 'Amazon', 'Bangalore, Karnataka', 'full-time', 1500000, 2500000, 'Manage product categories', 'Merchandising, Analytics', 'ESOPs, Health insurance', (SELECT id FROM companies WHERE name = 'Amazon' LIMIT 1)),
('Supply Chain Manager', 'Flipkart', 'Bangalore, Karnataka', 'full-time', 1300000, 2200000, 'Optimize supply chain operations', 'Logistics, Supply Chain, 6+ years', 'Performance bonus, Health benefits', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),
('Customer Experience Manager', 'Amazon', 'Hyderabad, Telangana', 'full-time', 1000000, 1800000, 'Improve customer satisfaction', 'Customer Service, Analytics', 'Work from home, Annual bonus', (SELECT id FROM companies WHERE name = 'Amazon' LIMIT 1)),
('Marketplace Manager', 'Flipkart', 'Mumbai, Maharashtra', 'full-time', 1400000, 2400000, 'Manage marketplace partnerships', 'Partnership Management, 5+ years', 'Stock options, Health insurance', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),

-- Healthcare & Pharma
('Data Analyst', 'TCS', 'Chennai, Tamil Nadu', 'full-time', 700000, 1200000, 'Analyze business data and trends', 'SQL, Python, Tableau', 'Health insurance, Work from home', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('Business Intelligence Developer', 'Infosys', 'Bangalore, Karnataka', 'full-time', 1000000, 1700000, 'Build BI dashboards and reports', 'Power BI, SQL, ETL', 'Training budget, Flexible hours', (SELECT id FROM companies WHERE name = 'Infosys' LIMIT 1)),
('Network Engineer', 'HCL Technologies', 'Mumbai, Maharashtra', 'full-time', 800000, 1400000, 'Design and maintain network infrastructure', 'Networking, Cisco, Routing', 'Certifications, Health insurance', (SELECT id FROM companies WHERE name = 'HCL Technologies' LIMIT 1)),
('System Administrator', 'Tech Mahindra', 'Pune, Maharashtra', 'full-time', 600000, 1100000, 'Manage servers and infrastructure', 'Linux, Windows Server, Scripting', 'Annual bonus, Medical coverage', (SELECT id FROM companies WHERE name = 'Tech Mahindra' LIMIT 1)),
('Database Administrator', 'Cognizant', 'Bangalore, Karnataka', 'full-time', 1000000, 1700000, 'Manage and optimize databases', 'Oracle, MySQL, PostgreSQL', 'Flexible work, Performance bonus', (SELECT id FROM companies WHERE name = 'Cognizant' LIMIT 1)),

-- Sales & Marketing
('Sales Manager', 'Paytm', 'Mumbai, Maharashtra', 'full-time', 1000000, 1800000, 'Lead sales team and strategy', 'B2B Sales, Team Management', 'High incentives, Health insurance', (SELECT id FROM companies WHERE name = 'Paytm' LIMIT 1)),
('Marketing Manager', 'Flipkart', 'Bangalore, Karnataka', 'full-time', 1200000, 2000000, 'Plan and execute marketing campaigns', 'Digital Marketing, Brand Management', 'Stock options, Annual bonus', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),
('Content Marketing Manager', 'Amazon', 'Bangalore, Karnataka', 'full-time', 1100000, 1900000, 'Create content marketing strategies', 'Content Strategy, SEO, 5+ years', 'Remote flexibility, ESOPs', (SELECT id FROM companies WHERE name = 'Amazon' LIMIT 1)),
('SEO Specialist', 'Paytm', 'Noida, Uttar Pradesh', 'full-time', 600000, 1100000, 'Optimize website for search engines', 'SEO, Analytics, Link Building', 'Work from home, Performance bonus', (SELECT id FROM companies WHERE name = 'Paytm' LIMIT 1)),
('Social Media Manager', 'Flipkart', 'Bangalore, Karnataka', 'full-time', 700000, 1300000, 'Manage social media presence', 'Social Media, Content Creation', 'Flexible hours, Health benefits', (SELECT id FROM companies WHERE name = 'Flipkart' LIMIT 1)),

-- Remote & Contract Jobs
('Remote Frontend Developer', 'TCS', 'Remote', 'remote', 900000, 1600000, 'Build UI components remotely', 'React, TypeScript, Remote experience', 'Fully remote, Flexible hours', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('Remote Backend Engineer', 'Infosys', 'Remote', 'remote', 1000000, 1800000, 'Develop APIs remotely', 'Node.js, Express, MongoDB', 'Work from anywhere, Annual trips', (SELECT id FROM companies WHERE name = 'Infosys' LIMIT 1)),
('Freelance Designer', 'Wipro', 'Remote', 'contract', 500000, 900000, 'Design UI/UX on contract basis', 'Figma, Adobe XD, Portfolio', 'Contract flexibility, Per project pay', (SELECT id FROM companies WHERE name = 'Wipro' LIMIT 1)),
('Contract DevOps', 'HCL Technologies', 'Remote', 'contract', 800000, 1400000, 'Manage infrastructure on contract', 'AWS, Docker, Kubernetes', 'Hourly rate, Remote work', (SELECT id FROM companies WHERE name = 'HCL Technologies' LIMIT 1)),
('Part-time Content Writer', 'Tech Mahindra', 'Remote', 'part-time', 300000, 600000, 'Write technical content', 'Writing, SEO, Technical knowledge', 'Flexible hours, Remote', (SELECT id FROM companies WHERE name = 'Tech Mahindra' LIMIT 1)),

-- Junior Positions
('Junior Developer', 'Cognizant', 'Bangalore, Karnataka', 'full-time', 400000, 700000, 'Entry-level software development', 'Computer Science degree, Coding skills', 'Training program, Health insurance', (SELECT id FROM companies WHERE name = 'Cognizant' LIMIT 1)),
('Graduate Engineer Trainee', 'TCS', 'Multiple locations', 'full-time', 350000, 500000, 'Engineering training program', 'Engineering degree, Fresh graduate', 'Comprehensive training, Career growth', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('Junior Data Analyst', 'Accenture', 'Bangalore, Karnataka', 'full-time', 450000, 750000, 'Analyze data and create reports', 'SQL, Excel, Statistics basics', 'Mentorship, Learning budget', (SELECT id FROM companies WHERE name = 'Accenture' LIMIT 1)),
('Trainee QA Engineer', 'Infosys', 'Pune, Maharashtra', 'full-time', 400000, 650000, 'Learn and execute test cases', 'Computer Science, Testing basics', 'Training, Health insurance', (SELECT id FROM companies WHERE name = 'Infosys' LIMIT 1)),
('Associate Software Engineer', 'Wipro', 'Chennai, Tamil Nadu', 'full-time', 380000, 600000, 'Assist in software development', 'Programming, Problem solving', 'Mentorship program, Medical coverage', (SELECT id FROM companies WHERE name = 'Wipro' LIMIT 1)),

-- Specialized Roles
('IoT Developer', 'Tech Mahindra', 'Bangalore, Karnataka', 'full-time', 1200000, 2000000, 'Build IoT solutions', 'IoT, Embedded Systems, Python', 'Innovation bonus, Stock options', (SELECT id FROM companies WHERE name = 'Tech Mahindra' LIMIT 1)),
('AR/VR Developer', 'HCL Technologies', 'Noida, Uttar Pradesh', 'full-time', 1300000, 2200000, 'Create augmented reality apps', 'Unity, C#, AR/VR', 'Project bonus, Health insurance', (SELECT id FROM companies WHERE name = 'HCL Technologies' LIMIT 1)),
('Game Developer', 'TCS', 'Pune, Maharashtra', 'full-time', 1000000, 1800000, 'Develop gaming applications', 'Unity, Unreal Engine, C++', 'Creative freedom, Flexible hours', (SELECT id FROM companies WHERE name = 'Tata Consultancy Services' LIMIT 1)),
('ERP Consultant', 'Cognizant', 'Mumbai, Maharashtra', 'full-time', 1100000, 1900000, 'Implement ERP solutions', 'SAP, Oracle ERP, 4+ years', 'Certifications, Annual bonus', (SELECT id FROM companies WHERE name = 'Cognizant' LIMIT 1)),
('Salesforce Developer', 'Accenture', 'Bangalore, Karnataka', 'full-time', 1200000, 2000000, 'Customize Salesforce platform', 'Salesforce, Apex, Lightning', 'Certifications, Stock options', (SELECT id FROM companies WHERE name = 'Accenture' LIMIT 1)),
('SAP Consultant', 'Infosys', 'Hyderabad, Telangana', 'full-time', 1400000, 2400000, 'Implement SAP modules', 'SAP, ABAP, 5+ years', 'Project bonus, Premium insurance', (SELECT id FROM companies WHERE name = 'Infosys' LIMIT 1)),
('Automation Engineer', 'Wipro', 'Bangalore, Karnataka', 'full-time', 900000, 1500000, 'Automate business processes', 'RPA, UiPath, Python', 'Work from home, Annual bonus', (SELECT id FROM companies WHERE name = 'Wipro' LIMIT 1));