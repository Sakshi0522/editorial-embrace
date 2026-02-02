import Navigation from '@/components/Navigation';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';

const Work = () => {
  return (
    <main className="min-h-screen bg-background page-enter">
      <Navigation />
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide mb-16">
          Selected Work
        </h1>
      </section>
      <PortfolioGrid />
      <Footer />
    </main>
  );
};

export default Work;