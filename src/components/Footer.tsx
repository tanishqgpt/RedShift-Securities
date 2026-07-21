import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-space-deep">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-xl mb-4">
              <span className="text-gradient-redshift">Redshift</span>{' '}
              <span className="font-light text-foreground">Trading LLP</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            AI-powered medium frequency trading across Indian markets. Operating with
            discipline, transparency, and a machine learning-first approach.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
              <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-3">
              <Link to="/compliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compliance</Link>
              <Link to="/compliance#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/compliance#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
            Trading in financial instruments involves substantial risk of loss and is not suitable
            for all investors. Past performance is not indicative of future results. The information
            on this website is for general informational purposes only and does not constitute
            investment advice, a solicitation, or an offer to buy or sell any securities or financial
            instruments. Redshift Trading LLP operates exclusively in Indian markets and is registered
            with [REGULATORY_BODY] under registration number [LICENSE_NUMBER].
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Redshift Trading LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
