const AboutSection = () => {
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
              I'm Elara Vance, a photographer based in the quiet corners of the Pacific Northwest.
            </h2>
            
            <div className="space-y-6 text-espresso-light leading-relaxed">
              <p>
                My work lives in the space between documentation and poetry. I'm drawn to the tactile quality of light—how it falls across skin, traces the edges of objects, and transforms the mundane into the extraordinary.
              </p>
              
              <p>
                Working primarily with natural light and medium format film, I embrace the imperfections and organic textures that come with analog processes. Each photograph is a meditation on presence, an invitation to slow down and observe.
              </p>
              
              <p className="font-serif italic text-lg">
                "Photography, for me, is less about capturing what is there and more about revealing what could be felt."
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-2 uppercase tracking-widest text-xs">Location</span>
                  <span>Portland, Oregon</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-2 uppercase tracking-widest text-xs">Experience</span>
                  <span>12 Years</span>
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
