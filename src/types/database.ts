export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  bio_title: string;
  bio_description: string;
  location: string;
  experience_years: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  title: string;
  category: string;
  year: string;
  image_url?: string | null;
  display_order?: number;
}

export interface ProjectUpdate {
  title?: string;
  category?: string;
  year?: string;
  image_url?: string | null;
  display_order?: number;
}

export interface ProfileUpdate {
  bio_title?: string;
  bio_description?: string;
  location?: string;
  experience_years?: number;
}
