import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile, ProfileUpdate } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Save } from 'lucide-react';

const ProfileEditor = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<ProfileUpdate>({
    bio_title: '',
    bio_description: '',
    location: '',
    experience_years: 0,
  });

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows found
      toast({
        title: 'Error',
        description: 'Failed to fetch profile',
        variant: 'destructive',
      });
    }

    if (data) {
      setProfile(data);
      setFormData({
        bio_title: data.bio_title,
        bio_description: data.bio_description,
        location: data.location,
        experience_years: data.experience_years,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updateData: ProfileUpdate = {
      bio_title: formData.bio_title,
      bio_description: formData.bio_description,
      location: formData.location,
      experience_years: formData.experience_years,
    };

    if (profile) {
      // Update existing profile
      const { error } = await supabase
        .from('profile')
        .update(updateData)
        .eq('id', profile.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update profile',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
        fetchProfile();
      }
    } else {
      // Create new profile (shouldn't happen normally as we seed one)
      const { error } = await supabase.from('profile').insert({
        bio_title: formData.bio_title || '',
        bio_description: formData.bio_description || '',
        location: formData.location || '',
        experience_years: formData.experience_years || 0,
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create profile',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Profile created successfully',
        });
        fetchProfile();
      }
    }

    setIsSaving(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
        <CardDescription>
          Update your profile information displayed in the About section of your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bio_title">Bio Title</Label>
            <Textarea
              id="bio_title"
              value={formData.bio_title || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio_title: e.target.value }))
              }
              placeholder="e.g., I'm Elara Vance, a photographer based in..."
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              This appears as the main heading in your About section.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio_description">Bio Description</Label>
            <Textarea
              id="bio_description"
              value={formData.bio_description || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio_description: e.target.value }))
              }
              placeholder="Tell your story..."
              rows={8}
            />
            <p className="text-sm text-muted-foreground">
              The detailed description of your work and philosophy. You can include multiple paragraphs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g., Portland, Oregon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_years">Years of Experience</Label>
              <Input
                id="experience_years"
                type="number"
                value={formData.experience_years || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience_years: parseInt(e.target.value) || 0,
                  }))
                }
                min={0}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
