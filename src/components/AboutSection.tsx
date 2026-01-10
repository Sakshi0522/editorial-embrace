import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';

const fallbackProfile = {
  bio_title: "I'm Elara Vance, a photographer based in the quiet corners of the Pacific Northwest.",
  bio_description: `My work lives in the space between documentation and poetry. I'm drawn to the tactile quality of light—how it falls across skin, traces the edges of objects, and transforms the mundane into the extraordinary.

Working primarily with natural light and medium format film, I embrace the imperfections and organic textures that come with analog processes. Each photograph is a meditation on presence, an invitation to slow down and observe.

"Photography, for me, is less about capturing what is there and more about revealing what could be felt."`,
  location: 'Portland, Oregon',
  experience_years: 12,
};

const AboutSection = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        setUseFallback(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .single();

      if (error || !data) {
        setUseFallback(true);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const displayProfile = useFallback ? fallbackProfile : profile;

  // Split description into paragraphs for rendering
  const descriptionParagraphs = displayProfile?.bio_description?.split('\n\n') || [];

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-cream-dark grain-overlay">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="md:col-span-8">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-3/4 mb-8" />
              <div className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-3/4" />
              </div>
              <div className="mt-12 pt-8 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-cream-dark grain-overlay">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:col-span-4">
            <span className="text-xs tracking-ultra uppercase text-muted-foreground">
              About
            </span>
          </div>

          {/* Right column - Bio */}
          <div className="md:col-span-8">
            <h2 className="font-serif text-3xl md:text-4xl leading-relaxed mb-8">
              {displayProfile?.bio_title}
            </h2>
            
            <div className="space-y-6 text-espresso-light leading-relaxed">
              {descriptionParagraphs.map((paragraph, index) => {
                // Check if paragraph looks like a quote (starts with ")
                const isQuote = paragraph.trim().startsWith('"');
                return isQuote ? (
                  <p key={index} className="font-serif italic text-lg">
                    {paragraph}
                  </p>
                ) : (
                  <p key={index}>{paragraph}</p>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-2 uppercase tracking-widest text-xs">Location</span>
                  <span>{displayProfile?.location}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-2 uppercase tracking-widest text-xs">Experience</span>
                  <span>{displayProfile?.experience_years} Years</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-2 uppercase tracking-widest text-xs">Focus</span>
                  <span>Editorial & Fine Art</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
