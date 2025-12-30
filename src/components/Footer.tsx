const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © {currentYear} Elara Vance. All rights reserved.
        </p>
        
        {/* Social Links */}
        <nav className="flex gap-8 text-sm">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors elegant-underline"
          >
            Instagram
          </a>
          <a 
            href="https://pinterest.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors elegant-underline"
          >
            Pinterest
          </a>
          <a 
            href="mailto:hello@elaravance.com"
            className="text-muted-foreground hover:text-foreground transition-colors elegant-underline"
          >
            Email
          </a>
        </nav>
        
        {/* Back to top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors elegant-underline"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
