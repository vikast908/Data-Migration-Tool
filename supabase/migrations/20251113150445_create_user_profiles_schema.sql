/*
  # User Profiles Schema for Data Migration Tool
  
  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `resume_url` (text) - URL to uploaded resume
      - `resume_filename` (text) - Original filename
      - `completion_percentage` (integer) - Profile completion tracking
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `basic_info`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references user_profiles)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `headline` (text) - Professional headline
    
    - `work_experiences`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references user_profiles)
      - `job_title` (text)
      - `company_name` (text)
      - `start_date` (date)
      - `end_date` (date, nullable)
      - `is_current` (boolean)
      - `description` (text)
      - `display_order` (integer)
    
    - `skills`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references user_profiles)
      - `skill_name` (text)
      - `category` (text, nullable)
      - `display_order` (integer)
    
    - `education`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references user_profiles)
      - `degree` (text)
      - `institution` (text)
      - `field_of_study` (text, nullable)
      - `start_date` (date, nullable)
      - `end_date` (date, nullable)
      - `display_order` (integer)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_url text,
  resume_filename text,
  completion_percentage integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON user_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create basic_info table
CREATE TABLE IF NOT EXISTS basic_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  full_name text,
  email text,
  phone text,
  location text,
  headline text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(profile_id)
);

ALTER TABLE basic_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own basic info"
  ON basic_info FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = basic_info.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own basic info"
  ON basic_info FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = basic_info.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own basic info"
  ON basic_info FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = basic_info.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = basic_info.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own basic info"
  ON basic_info FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = basic_info.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Create work_experiences table
CREATE TABLE IF NOT EXISTS work_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  job_title text,
  company_name text,
  start_date date,
  end_date date,
  is_current boolean DEFAULT false,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE work_experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own work experiences"
  ON work_experiences FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own work experiences"
  ON work_experiences FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own work experiences"
  ON work_experiences FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own work experiences"
  ON work_experiences FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name text NOT NULL,
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own skills"
  ON skills FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own skills"
  ON skills FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  degree text,
  institution text,
  field_of_study text,
  start_date date,
  end_date date,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own education"
  ON education FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = education.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own education"
  ON education FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = education.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own education"
  ON education FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = education.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = education.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own education"
  ON education FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = education.profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_basic_info_profile_id ON basic_info(profile_id);
CREATE INDEX IF NOT EXISTS idx_work_experiences_profile_id ON work_experiences(profile_id);
CREATE INDEX IF NOT EXISTS idx_skills_profile_id ON skills(profile_id);
CREATE INDEX IF NOT EXISTS idx_education_profile_id ON education(profile_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_basic_info_updated_at BEFORE UPDATE ON basic_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_experiences_updated_at BEFORE UPDATE ON work_experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();