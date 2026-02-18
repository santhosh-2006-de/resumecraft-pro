export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 or 1-100
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    summary: string;
    website: string;
    avatarUrl?: string; // Optional for image upload
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

export type TemplateType = 'modern' | 'classic' | 'creative';

export const INITIAL_DATA: ResumeData = {
  personal: {
    fullName: 'Alex Morgan',
    role: 'Senior Product Designer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    website: 'www.alexmorgan.design',
    summary: 'Creative and detail-oriented Product Designer with over 6 years of experience in building user-centric digital products. Proficient in translating complex requirements into intuitive and visually appealing designs. Passionate about creating seamless user experiences and driving business growth through design innovation.',
  },
  experience: [
    {
      id: '1',
      company: 'TechFlow Solutions',
      role: 'Senior UI/UX Designer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      responsibilities: '• Led the redesign of the core SaaS platform, increasing user engagement by 40%.\n• Mentored a team of 3 junior designers and established a unified design system.\n• Collaborated with product managers and engineers to deliver high-quality features on time.'
    },
    {
      id: '2',
      company: 'Creative Pulse Agency',
      role: 'UI Designer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      responsibilities: '• Designed responsive websites and mobile apps for diverse clients in fintech and healthcare.\n• Conducted user research and usability testing to iterate on design prototypes.\n• Created interactive high-fidelity mockups using Figma and Prototyping tools.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'California College of the Arts',
      degree: 'BFA in Interaction Design',
      startDate: '2014-09',
      endDate: '2018-05',
      current: false,
      description: 'Graduated with Honors. Focused on Human-Computer Interaction and Visual Design.'
    }
  ],
  skills: [
    { id: '1', name: 'Figma', level: 95 },
    { id: '2', name: 'Adobe Creative Suite', level: 90 },
    { id: '3', name: 'Prototyping', level: 85 },
    { id: '4', name: 'HTML/CSS', level: 75 },
    { id: '5', name: 'User Research', level: 80 },
  ]
};