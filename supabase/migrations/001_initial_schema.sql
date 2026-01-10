-- Supabase Migration: Initial Schema for Portfolio
-- Run this in the Supabase SQL Editor

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    year TEXT NOT NULL,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profile table (singleton - only one row)
CREATE TABLE IF NOT EXISTS profile (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bio_title TEXT NOT NULL DEFAULT '',
    bio_description TEXT NOT NULL DEFAULT '',
    location TEXT DEFAULT '',
    experience_years INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access on profile"
    ON profile FOR SELECT
    USING (true);

-- Create policies for authenticated users (admin) to manage data
CREATE POLICY "Allow authenticated users to insert projects"
    ON projects FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects"
    ON projects FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete projects"
    ON projects FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert profile"
    ON profile FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update profile"
    ON profile FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert default profile row
INSERT INTO profile (bio_title, bio_description, location, experience_years)
VALUES (
    'I''m Elara Vance, a photographer based in the quiet corners of the Pacific Northwest.',
    'My work lives in the space between documentation and poetry. I''m drawn to the tactile quality of light—how it falls across skin, traces the edges of objects, and transforms the mundane into the extraordinary.

Working primarily with natural light and medium format film, I embrace the imperfections and organic textures that come with analog processes. Each photograph is a meditation on presence, an invitation to slow down and observe.

"Photography, for me, is less about capturing what is there and more about revealing what could be felt."',
    'Portland, Oregon',
    12
);

-- Create storage bucket for project images (run this separately in Storage section)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
