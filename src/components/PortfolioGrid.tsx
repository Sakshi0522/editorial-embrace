import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';

// Fallback images for when Supabase is not configured
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

const fallbackItems = [
  {
    id: '1',
    image_url: portfolio1,
    title: 'Still Life Studies',
    category: 'Fine Art',
    year: '2024',
  },
  {
    id: '2',
    image_url: portfolio2,
    title: 'Light & Architecture',
    category: 'Editorial',
    year: '2024',
  },
  {
    id: '3',
    image_url: portfolio3,
    title: 'Intimate Moments',
    category: 'Portrait',
    year: '2023',
  },
];

const PortfolioGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        setUseFallback(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        setUseFallback(true);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Use fallback data if Supabase is not configured or no projects exist
  const displayItems = useFallback ? fallbackItems : projects;

  // Loading skeleton
  if (loading) {
    return (
      <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 grain-overlay">
        <div className="mb-16 md:mb-24">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7">
            <Skeleton className="w-full aspect-[4/3] mb-4" />
            <div className="flex justify-between items-end">
              <div>
                <Skeleton className="h-7 w-40 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="md:col-span-5 md:mt-24">
            <Skeleton className="w-full aspect-[4/3] mb-4" />
            <div className="flex justify-between items-end">
              <div>
                <Skeleton className="h-7 w-40 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="md:col-start-3 md:col-span-6">
            <Skeleton className="w-full aspect-[4/3] mb-4" />
            <div className="flex justify-between items-end">
              <div>
                <Skeleton className="h-7 w-40 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 grain-overlay">
      {/* Section Header */}
      <div className="mb-16 md:mb-24">
        <span className="text-xs tracking-ultra uppercase text-muted-foreground">
          Selected Work
        </span>
        <h2 className="font-serif text-3xl md:text-4xl mt-4">
          A curated collection
        </h2>
      </div>

      {/* Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* First item - Large */}
        {displayItems[0] && (
          <div className="md:col-span-7 group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img
                src={displayItems[0].image_url || ''}
                alt={displayItems[0].title}
                className="w-full h-auto object-cover image-hover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-1">{displayItems[0].title}</h3>
                <p className="text-sm text-muted-foreground">{displayItems[0].category}</p>
              </div>
              <span className="text-sm text-muted-foreground">{displayItems[0].year}</span>
            </div>
          </div>
        )}

        {/* Second item - Offset */}
        {displayItems[1] && (
          <div className="md:col-span-5 md:mt-24 group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img
                src={displayItems[1].image_url || ''}
                alt={displayItems[1].title}
                className="w-full h-auto object-cover image-hover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-1">{displayItems[1].title}</h3>
                <p className="text-sm text-muted-foreground">{displayItems[1].category}</p>
              </div>
              <span className="text-sm text-muted-foreground">{displayItems[1].year}</span>
            </div>
          </div>
        )}

        {/* Third item - Centered */}
        {displayItems[2] && (
          <div className="md:col-start-3 md:col-span-6 group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img
                src={displayItems[2].image_url || ''}
                alt={displayItems[2].title}
                className="w-full h-auto object-cover image-hover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-1">{displayItems[2].title}</h3>
                <p className="text-sm text-muted-foreground">{displayItems[2].category}</p>
              </div>
              <span className="text-sm text-muted-foreground">{displayItems[2].year}</span>
            </div>
          </div>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-16 md:mt-24 text-center">
        <a 
          href="/work" 
          className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground elegant-underline group"
        >
          View All Projects
          <span className="transform transition-transform group-hover:translate-x-2">→</span>
        </a>
      </div>
    </section>
  );
};

export default PortfolioGrid;
