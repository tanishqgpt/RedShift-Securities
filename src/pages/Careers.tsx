import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';

const values = [
  { title: 'Intellectual Rigor', desc: 'We question assumptions, test hypotheses, and let evidence guide decisions.' },
  { title: 'Systems Thinking', desc: 'Great outcomes emerge from great processes. We invest in infrastructure and repeatability.' },
  { title: 'Ownership', desc: 'Everyone owns their domain end-to-end — from research to production to monitoring.' },
  { title: 'Transparency', desc: 'Open communication, honest post-mortems, and a culture where challenge is welcome.' },
];

export default function Careers() {
  return (
    <main className="pt-20">
      <ScrollSection>
        <div className="max-w-4xl mx-auto">
          <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Careers</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Build what <span className="text-gradient-redshift">matters</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-16 text-lg">
            Redshift Securities is built by people who care deeply about Indian markets, machine learning, and
            doing hard things well. We're always looking for exceptional individuals who want to
            work at the intersection of AI, quantitative finance, and systems engineering.
          </p>

          {/* Values */}
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {values.map((v, i) => (
              <div key={i} className="glass-panel rounded-lg p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Open Roles */}
          <div className="glass-panel rounded-lg p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Open Roles</h2>
            <p className="text-muted-foreground mb-6">
              We're selectively hiring across ML research, quantitative development, software engineering,
              and trading operations. If you think you'd be a good fit, we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollSection>
    </main>
  );
}
