import heroPortrait from '@/assets/hero-portrait.jpg';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center grain-overlay">
      <div className="w-full px-6 md:px-12 lg:px-24 py-24 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Hero Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden">
              <img
                src={heroPortrait}
                alt="Editorial portrait photography"
                className="w-full max-w-md mx-auto lg:mx-0 h-auto object-cover image-hover opacity-0 animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              />
              {/* Film grain overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Image caption */}
            <p className="mt-4 text-xs tracking-widest text-muted-foreground uppercase opacity-0 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              Self Portrait, 2024
            </p>
          </div>

          {/* Right: Poetic Bio */}
          <div className="order-1 lg:order-2 flex flex-col justify-center lg:pl-12">
            <span className="text-xs tracking-ultra uppercase text-muted-foreground mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Photography
            </span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Capturing the poetry<br />
              of light and shadow
            </h1>
            
            <p className="font-serif text-lg md:text-xl text-espresso-light leading-relaxed max-w-md mb-8 opacity-0 animate-slide-up italic" style={{ animationDelay: '0.4s' }}>
              I believe every frame holds a story waiting to be told. Through the lens, I seek the quiet moments—the interplay of warmth and texture, the grace in stillness.
            </p>
            
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <a 
                href="#work" 
                className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground elegant-underline group"
              >
                View Selected Work
                <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
