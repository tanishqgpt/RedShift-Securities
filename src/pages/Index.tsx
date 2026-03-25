import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, BarChart3, Globe, Users, Cpu, Target, TrendingUp } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';
import ChartNarrative from '@/components/ChartNarrative';

const CosmicScene = lazy(() => import('@/components/CosmicScene'));

const services = [
  { icon: TrendingUp, title: 'Proprietary Trading', desc: 'Deploying firm capital in Indian markets using systematic, ML-driven strategies with disciplined risk management.' },
  { icon: Cpu, title: 'ML & AI Research', desc: 'Developing and deploying machine learning models to identify patterns, optimize execution, and adapt to evolving market regimes.' },
  { icon: Zap, title: 'Medium Frequency Execution', desc: 'Purpose-built execution systems operating at medium frequency — balancing speed with signal quality across Indian exchanges.' },
  { icon: Target, title: 'Quantitative Research', desc: 'Data-driven research combining statistical methods with AI to uncover structural opportunities in Indian equities and derivatives.' },
];

const markets = [
  { name: 'Indian Equities', desc: 'NSE and BSE — cash equities across large, mid, and small cap segments' },
  { name: 'Equity Derivatives', desc: 'Index and stock futures & options on NSE — Nifty, Bank Nifty, and single stocks' },
  { name: 'Commodity Derivatives', desc: 'MCX-listed contracts — metals, energy, and agricultural commodities' },
  { name: 'Currency Derivatives', desc: 'INR currency pairs on NSE and BSE currency segments' },
];

const founder = {
  name: 'Tanishq Gupta',
  role: 'Founder & Partner',
  area: 'Strategy, Technology & Operations',
  linkedin: 'https://www.linkedin.com/in/tanishq-gupta-140824133',
};

export default function Index() {
  return (
    <main>
      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Suspense fallback={null}>
          <CosmicScene />
        </Suspense>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(230, 15%, 5%) 80%)',
        }} />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="mono-text text-xs md:text-sm tracking-[0.3em] text-muted-foreground mb-6 uppercase">
              AI-Driven Medium Frequency Trading
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              <span className="text-gradient-redshift">Redshift</span>
              <br />
              <span className="text-foreground font-light">Securities</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-body">
              Machine learning-powered trading systems. Disciplined risk management.
              Systematic capital deployment across Indian markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Institutional Inquiry <ArrowRight size={16} />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-display font-semibold text-sm rounded-md hover:bg-secondary transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
        </motion.div>
      </section>

      {/* ====== ABOUT ====== */}
      <ScrollSection id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">About</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Built for the<br />
              <span className="text-gradient-redshift">long wavelength</span>
            </h2>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Redshift Securities is a medium frequency proprietary trading firm focused exclusively on
              Indian financial markets. We combine machine learning and artificial intelligence with
              robust infrastructure to deploy systematic, risk-managed strategies across NSE, BSE, and MCX.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded on the principle that sustainable edge comes from adaptive intelligence — not static rules — we
              invest heavily in ML research, systems engineering, and a culture of intellectual rigor. Our name reflects
              our perspective: the most meaningful signals emerge when you look deeper than the surface.
            </p>
            <div className="pt-4 flex gap-8 border-t border-border">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">[YEAR]</p>
                <p className="text-xs text-muted-foreground mono-text">Founded</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">India</p>
                <p className="text-xs text-muted-foreground mono-text">Markets</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">ML/AI</p>
                <p className="text-xs text-muted-foreground mono-text">Technology</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* ====== CHART NARRATIVE ====== */}
      <div className="border-t border-border">
        <div className="text-center pt-20 px-6">
          <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Our Process</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            From noise to <span className="text-gradient-redshift">resolution</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
            Scroll to explore how disciplined process transforms market uncertainty.
          </p>
        </div>
        <ChartNarrative />
      </div>

      {/* ====== SERVICES ====== */}
      <ScrollSection id="services" className="border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">What We Do</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            Core <span className="text-gradient-redshift">capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="group glass-panel rounded-lg p-8 hover:border-primary/30 transition-all duration-300"
              >
                <s.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* ====== MARKETS ====== */}
      <ScrollSection id="markets" className="border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Markets</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Indian markets,<br />
                <span className="text-gradient-redshift">deep expertise</span>
              </h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                We focus exclusively on Indian financial markets, operating across equities,
                derivatives, commodities, and currencies on NSE, BSE, and MCX.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {markets.map((m, i) => (
                <div key={i} className="glass-panel rounded-lg p-6 hover:border-primary/20 transition-colors">
                  <Globe className="text-primary/60 mb-3" size={18} />
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">{m.name}</h3>
                  <p className="text-muted-foreground text-xs">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* ====== TECHNOLOGY ====== */}
      <ScrollSection id="technology" className="border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Technology & Risk</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Systems-first <span className="text-gradient-redshift">mindset</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Cpu className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">ML-Powered Infrastructure</h3>
                  <p className="text-muted-foreground text-sm">Machine learning pipelines from data ingestion to live execution. Our models continuously learn and adapt to evolving market microstructure across Indian exchanges.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">Risk Culture</h3>
                  <p className="text-muted-foreground text-sm">Risk management is not a department — it's embedded in every layer of our technology and decision-making. Position limits, drawdown controls, and real-time monitoring are always active.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <BarChart3 className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">AI-First Research</h3>
                  <p className="text-muted-foreground text-sm">Deep learning, reinforcement learning, and classical ML methods drive our alpha research. We combine AI with domain expertise in Indian market microstructure.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="glass-panel rounded-xl p-10 w-full max-w-sm text-center">
              <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 animate-pulse-glow" />
              </div>
              <p className="mono-text text-xs text-muted-foreground mb-2">SYSTEM STATUS</p>
              <p className="font-display text-lg font-semibold text-foreground">Operational</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <p className="font-display text-lg font-bold text-foreground">99.9%</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground">ML/AI</p>
                  <p className="text-xs text-muted-foreground">Core Tech</p>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground">MFT</p>
                  <p className="text-xs text-muted-foreground">Frequency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* ====== TEAM ====== */}
      <ScrollSection id="team" className="border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Leadership</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-16">
            Our <span className="text-gradient-redshift">team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <div key={i} className="glass-panel rounded-lg p-6 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Users className="text-muted-foreground" size={18} />
                </div>
                <h3 className="font-display font-semibold text-foreground">{t.name}</h3>
                <p className="text-primary text-sm">{t.role}</p>
                <p className="text-muted-foreground text-xs mt-1">{t.area}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* ====== CTA ====== */}
      <ScrollSection className="border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to <span className="text-gradient-redshift">connect</span>?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Whether you're an institutional counterparty, prospective team member, or regulatory body,
            we welcome your inquiry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-display font-semibold text-sm rounded-md hover:bg-secondary transition-colors"
            >
              View Careers
            </Link>
          </div>
        </div>
      </ScrollSection>
    </main>
  );
}
