import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

const portfolioItems = [
  {
    id: 1,
    image: portfolio1,
    title: 'Still Life Studies',
    category: 'Fine Art',
    year: '2024',
  },
  {
    id: 2,
    image: portfolio2,
    title: 'Light & Architecture',
    category: 'Editorial',
    year: '2024',
  },
  {
    id: 3,
    image: portfolio3,
    title: 'Intimate Moments',
    category: 'Portrait',
    year: '2023',
  },
];

const PortfolioGrid = () => {
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
        <div className="md:col-span-7 group cursor-pointer">
          <div className="relative overflow-hidden mb-4">
            <img
              src={portfolioItems[0].image}
              alt={portfolioItems[0].title}
              className="w-full h-auto object-cover image-hover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-1">{portfolioItems[0].title}</h3>
              <p className="text-sm text-muted-foreground">{portfolioItems[0].category}</p>
            </div>
            <span className="text-sm text-muted-foreground">{portfolioItems[0].year}</span>
          </div>
        </div>

        {/* Second item - Offset */}
        <div className="md:col-span-5 md:mt-24 group cursor-pointer">
          <div className="relative overflow-hidden mb-4">
            <img
              src={portfolioItems[1].image}
              alt={portfolioItems[1].title}
              className="w-full h-auto object-cover image-hover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-1">{portfolioItems[1].title}</h3>
              <p className="text-sm text-muted-foreground">{portfolioItems[1].category}</p>
            </div>
            <span className="text-sm text-muted-foreground">{portfolioItems[1].year}</span>
          </div>
        </div>

        {/* Third item - Centered */}
        <div className="md:col-start-3 md:col-span-6 group cursor-pointer">
          <div className="relative overflow-hidden mb-4">
            <img
              src={portfolioItems[2].image}
              alt={portfolioItems[2].title}
              className="w-full h-auto object-cover image-hover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-1">{portfolioItems[2].title}</h3>
              <p className="text-sm text-muted-foreground">{portfolioItems[2].category}</p>
            </div>
            <span className="text-sm text-muted-foreground">{portfolioItems[2].year}</span>
          </div>
        </div>
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
