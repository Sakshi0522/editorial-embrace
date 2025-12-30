import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <Link 
          to="/" 
          className="font-serif text-lg tracking-wider text-foreground hover:opacity-70 transition-opacity"
        >
          Elara Vance
        </Link>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-8 h-8 flex items-center justify-center transition-all duration-300 ${isOpen ? 'menu-open' : ''}`}
          aria-label="Toggle menu"
        >
          <span className={`menu-line absolute w-5 h-[1px] bg-foreground transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-1'}`} />
          <span className={`menu-line absolute w-5 h-[1px] bg-foreground transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-1'}`} />
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center gap-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/work', label: 'Work' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="font-serif text-4xl md:text-6xl tracking-wide text-foreground elegant-underline opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-12 flex gap-8 text-sm tracking-widest text-muted-foreground">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="elegant-underline">
              Instagram
            </a>
            <a href="mailto:hello@elaravance.com" className="elegant-underline">
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
