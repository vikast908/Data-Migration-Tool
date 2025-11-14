export interface UserProfile {
  id: string;
  user_id: string;
  resume_url: string | null;
  resume_filename: string | null;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface BasicInfo {
  id?: string;
  profile_id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  headline?: string;
}

export interface WorkExperience {
  id?: string;
  profile_id: string;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  display_order: number;
}

export interface Project {
  id?: string;
  profile_id: string;
  project_title: string;
  client: string;
  status: 'in_progress' | 'finished';
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

export interface Skill {
  id?: string;
  profile_id: string;
  skill_name: string;
  category?: string;
  display_order: number;
}

export interface Education {
  id?: string;
  profile_id: string;
  degree: string;
  institution: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  display_order: number;
}

export interface SelectedText {
  text: string;
  sourceId: string;
}

export type FieldStatus = 'empty' | 'focused' | 'filled' | 'error';
