import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    console.log('Generating AI content for type:', type);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let prompt = '';
    let systemPrompt = 'You are a professional career advisor and content generator.';

    switch (type) {
      case 'resume':
        systemPrompt = 'You are an expert resume writer with years of experience in crafting professional, ATS-friendly resumes.';
        prompt = `Generate a professional ATS-friendly resume in plain text format based on the following information:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location}
LinkedIn: ${data.linkedin}
Portfolio: ${data.portfolio}

Professional Summary: ${data.summary}

Experience:
${data.experiences.map((exp: any) => `
- ${exp.position} at ${exp.company} (${exp.duration})
  Responsibilities: ${exp.responsibilities}
`).join('\n')}

Education:
${data.educations.map((edu: any) => `
- ${edu.degree} from ${edu.institution} (${edu.year})
  Score: ${edu.score}
`).join('\n')}

Technical Skills: ${data.technicalSkills}
Soft Skills: ${data.softSkills}

Projects:
${data.projects.map((proj: any) => `
- ${proj.name}: ${proj.description}
  Technologies: ${proj.technologies}
`).join('\n')}

Certifications: ${data.certifications}
Languages: ${data.languages}

Please format this into a professional, well-structured resume with clear sections, bullet points, and proper formatting. Use separators and make it visually appealing.`;
        break;

      case 'cover_letter':
        systemPrompt = 'You are an expert at writing compelling cover letters that help candidates stand out.';
        prompt = `Write a professional cover letter for the following:

Job Title: ${data.jobTitle}
Company Name: ${data.companyName}
Hiring Manager: ${data.hiringManager}
Your Name: ${data.yourName}
Your Experience: ${data.yourExperience}
Why Interested: ${data.whyInterested}
Key Skills: ${data.keySkills}

Write a compelling cover letter that highlights the candidate's qualifications and enthusiasm for the role.`;
        break;

      case 'interview':
        systemPrompt = 'You are an experienced technical interviewer and career coach.';
        prompt = `Generate 15 relevant interview questions for the following profile:

Job Role: ${data.jobRole}
Experience Level: ${data.experience}
Industry: ${data.industry}

Provide a mix of technical, behavioral, and situational questions that would be asked in a real interview. Make them specific to the role and industry.`;
        break;

      case 'salary':
        systemPrompt = 'You are a salary negotiation expert with deep knowledge of compensation strategies.';
        prompt = `Provide detailed salary negotiation advice for:

Current Salary: ${data.currentSalary}
Desired Salary: ${data.desiredSalary}
Experience: ${data.experience}
Skills: ${data.skills}
Location: ${data.location}

Include:
1. Market analysis
2. Negotiation strategies
3. Power phrases to use
4. Benefits to negotiate beyond salary
5. Red flags to avoid
6. Recommended target range

Format the response with clear sections and actionable advice.`;
        break;

      case 'career_path':
        systemPrompt = 'You are a career development specialist helping professionals plan their career trajectory.';
        prompt = `Create a detailed career roadmap for:

Current Role: ${data.currentRole}
Years of Experience: ${data.yearsOfExperience}
Current Skills: ${data.skills}
Interests: ${data.interests}

Provide:
1. Short-term career goals (1-2 years)
2. Mid-term progression (3-5 years)
3. Long-term vision (5-10 years)
4. Alternative career paths
5. Recommended actions and skill development
6. Networking strategies

Make it personalized and actionable.`;
        break;

      case 'skills_gap':
        systemPrompt = 'You are a skills assessment expert who helps identify learning opportunities.';
        prompt = `Analyze the skills gap for:

Current Skills: ${data.currentSkills}
Target Role: ${data.targetRole}
Industry: ${data.industry}

Provide:
1. Assessment of current skills
2. Required skills for target role (technical, soft skills, industry-specific)
3. Detailed learning roadmap with timeline
4. Recommended resources (courses, certifications, books)
5. Practice strategies
6. Timeline for skill acquisition

Be specific and actionable.`;
        break;

      default:
        throw new Error('Invalid type specified');
    }

    console.log('Sending request to Lovable AI Gateway...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 402) {
        throw new Error('Payment required. Please add credits to your workspace.');
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const result = await response.json();
    const generatedText = result.choices[0].message.content;

    console.log('Successfully generated content');

    return new Response(
      JSON.stringify({ content: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
