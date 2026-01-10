-- Storage Setup for Project Images
-- Run this after creating the storage bucket in Supabase Dashboard

-- First, create the bucket via Supabase Dashboard:
-- 1. Go to Storage in your Supabase project
-- 2. Create a new bucket named "project-images"
-- 3. Make it public

-- Then run these policies:

-- Allow public read access to project images
CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'project-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'project-images');

-- Allow authenticated users to update their images
CREATE POLICY "Authenticated users can update images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'project-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'project-images');
