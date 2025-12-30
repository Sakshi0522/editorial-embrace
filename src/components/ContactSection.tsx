const ContactSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 grain-overlay">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs tracking-ultra uppercase text-muted-foreground mb-6 block">
          Let's Create Together
        </span>
        
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
          Available for select<br />
          projects in 2025
        </h2>
        
        <p className="text-espresso-light max-w-lg mx-auto mb-12">
          I work with brands, publications, and individuals who value intentionality and craftsmanship. If that resonates with you, I'd love to hear about your vision.
        </p>

        <a 
          href="mailto:hello@elaravance.com"
          className="inline-flex items-center gap-3 font-serif text-xl md:text-2xl elegant-underline group"
        >
          hello@elaravance.com
          <span className="transform transition-transform group-hover:translate-x-2">→</span>
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
