import Navigation from '@/components/Navigation';
import ScrollIndicator from '@/components/ScrollIndicator';
import HeroSection from '@/components/HeroSection';
import PortfolioGrid from '@/components/PortfolioGrid';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background page-enter">
      <Navigation />
      <ScrollIndicator />
      <HeroSection />
      <PortfolioGrid />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
