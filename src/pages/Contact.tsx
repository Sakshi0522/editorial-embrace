import Navigation from '@/components/Navigation';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <main className="min-h-screen bg-background page-enter">
      <Navigation />
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide mb-16">
          Get In Touch
        </h1>
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Contact;