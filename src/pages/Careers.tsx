import { useState } from 'react';
import { ArrowRight, Send, Briefcase, GraduationCap, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';
import PageMeta from '@/components/PageMeta';

const values = [
  { title: 'Intellectual Rigor', desc: 'We question assumptions, test hypotheses, and let evidence guide decisions.' },
  { title: 'Systems Thinking', desc: 'Great outcomes emerge from great processes. We invest in infrastructure and repeatability.' },
  { title: 'Ownership', desc: 'Everyone owns their domain end-to-end — from research to production to monitoring.' },
  { title: 'Transparency', desc: 'Open communication, honest post-mortems, and a culture where challenge is welcome.' },
];

const jobDescription = {
  title: 'Quantitative Researcher',
  type: 'Full-time',
  location: 'India (Hybrid / Remote)',
  experience: '1+ years',
  overview:
    'We are looking for an exceptional Quantitative Researcher to join our ML-driven quantitative trading team. You will research, design, and validate alpha-generating strategies across Indian equity and derivatives markets using advanced statistical and machine learning techniques.',
  responsibilities: [
    'Research and develop novel quantitative trading strategies for Indian markets (NSE, BSE, MCX)',
    'Apply machine learning, statistical modelling, and time-series analysis to large financial datasets',
    'Backtest and validate signals with rigorous out-of-sample testing and walk-forward analysis',
    'Collaborate with engineers to deploy research into production trading systems',
    'Continuously monitor live strategy performance and iterate on model improvements',
    'Stay current with academic literature in quantitative finance, ML, and market microstructure',
  ],
  requirements: [
    'B.Tech / M.Tech / MS / PhD from a top-tier institution (IITs, IISc, BITS Pilani, ISI, CMI, or equivalent global institutions)',
    'Minimum 1 year of professional experience in quantitative research, algorithmic trading, or a closely related field',
    'Strong foundation in probability, statistics, linear algebra, and optimisation',
    'Proficiency in Python; experience with libraries such as NumPy, pandas, scikit-learn, PyTorch, or TensorFlow',
    'Hands-on experience with financial data analysis and backtesting frameworks',
    'Excellent problem-solving ability and a track record of independent, rigorous research',
  ],
  niceToHave: [
    'Experience trading Indian markets (equities, derivatives, commodities)',
    'Publications or competition results in ML, statistics, or quantitative finance (Kaggle, quantitative challenges)',
    'Familiarity with order book data, market microstructure, and execution algorithms',
    'Experience with cloud infrastructure (AWS / GCP) and distributed computing',
  ],
};

const initialForm = {
  name: '',
  email: '',
  phone: '',
  college: '',
  degree: '',
  experience: '',
  currentRole: '',
  linkedin: '',
  resumeLink: '',
  coverNote: '',
};

export default function Careers() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('responsibilities');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '5cb86383-5811-4f46-864b-a704f40a494c',
          subject: `Quant Researcher Application — ${form.name}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          'College / University': form.college,
          Degree: form.degree,
          'Years of Experience': form.experience,
          'Current Role': form.currentRole || 'N/A',
          LinkedIn: form.linkedin || 'N/A',
          'Resume Link': form.resumeLink,
          'Cover Note': form.coverNote,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setSending(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionToggle = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-secondary/50 transition-colors"
      >
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        {expandedSection === id ? (
          <ChevronUp size={18} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={18} className="text-muted-foreground" />
        )}
      </button>
      {expandedSection === id && <div className="px-6 pb-5">{children}</div>}
    </div>
  );

  return (
    <main className="pt-20">
      <PageMeta
        title="Careers"
        description="Join Redshift Trading LLP — we're hiring quantitative researchers and engineers to build ML-driven quantitative trading systems for Indian markets."
        path="/careers"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: jobDescription.title,
          description: jobDescription.overview,
          employmentType: 'FULL_TIME',
          hiringOrganization: {
            '@type': 'Organization',
            name: 'Redshift Trading LLP',
            sameAs: 'https://redshiftsecurities.com',
          },
          jobLocation: {
            '@type': 'Place',
            address: { '@type': 'PostalAddress', addressCountry: 'IN' },
          },
          datePosted: '2025-01-01',
        }}
      />
      {/* Hero */}
      <ScrollSection>
        <div className="max-w-4xl mx-auto">
          <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Careers</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Build what <span className="text-gradient-redshift">matters</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-16 text-lg">
            Redshift Trading LLP is a quantitative trading firm built by people who care deeply about Indian markets,
            machine learning, and doing hard things well. We're looking for exceptional individuals who want to
            work at the intersection of AI, quantitative finance, and systems engineering.
          </p>

          {/* Values */}
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {values.map((v, i) => (
              <div key={i} className="glass-panel rounded-lg p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Job Listing */}
      <ScrollSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8">Open Positions</h2>

          <div className="glass-panel rounded-lg overflow-hidden">
            {/* Job Header */}
            <div className="p-8 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">{jobDescription.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs mono-text text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                      <Briefcase size={12} /> {jobDescription.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs mono-text text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                      <MapPin size={12} /> {jobDescription.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs mono-text text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                      <Clock size={12} /> {jobDescription.experience} experience
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs mono-text text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                      <GraduationCap size={12} /> Top-tier college
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowForm(true);
                    setTimeout(() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
                >
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">{jobDescription.overview}</p>
            </div>

            {/* Accordion Sections */}
            <div className="p-8 space-y-4">
              <SectionToggle id="responsibilities" title="Key Responsibilities">
                <ul className="space-y-3">
                  {jobDescription.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionToggle>

              <SectionToggle id="requirements" title="Requirements">
                <ul className="space-y-3">
                  {jobDescription.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionToggle>

              <SectionToggle id="niceToHave" title="Nice to Have">
                <ul className="space-y-3">
                  {jobDescription.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionToggle>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Application Form */}
      {showForm && (
        <ScrollSection>
          <div id="application-form" className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Apply for <span className="text-gradient-redshift">Quantitative Researcher</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              All fields marked with * are required. Your application will be sent to our hiring team.
            </p>

            <div className="glass-panel rounded-lg p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <Send className="text-primary" size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Application Submitted</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Your application has been sent successfully. We'll review and respond within 5–7 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">FULL NAME *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">EMAIL *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">PHONE *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">COLLEGE / UNIVERSITY *</label>
                      <input
                        required
                        type="text"
                        value={form.college}
                        onChange={e => setForm({ ...form, college: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="e.g. IIT Bombay"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">DEGREE *</label>
                      <input
                        required
                        type="text"
                        value={form.degree}
                        onChange={e => setForm({ ...form, degree: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="e.g. B.Tech Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">YEARS OF EXPERIENCE *</label>
                      <input
                        required
                        type="text"
                        value={form.experience}
                        onChange={e => setForm({ ...form, experience: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="e.g. 2 years"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">CURRENT ROLE</label>
                      <input
                        type="text"
                        value={form.currentRole}
                        onChange={e => setForm({ ...form, currentRole: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="e.g. Quant Analyst at XYZ"
                      />
                    </div>
                    <div>
                      <label className="block mono-text text-xs text-muted-foreground mb-2">LINKEDIN PROFILE</label>
                      <input
                        type="url"
                        value={form.linkedin}
                        onChange={e => setForm({ ...form, linkedin: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mono-text text-xs text-muted-foreground mb-2">RESUME / CV LINK *</label>
                    <input
                      required
                      type="url"
                      value={form.resumeLink}
                      onChange={e => setForm({ ...form, resumeLink: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      placeholder="Google Drive / Dropbox link to your resume"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">Upload your resume to Google Drive or Dropbox and paste the link here.</p>
                  </div>

                  <div>
                    <label className="block mono-text text-xs text-muted-foreground mb-2">COVER NOTE *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.coverNote}
                      onChange={e => setForm({ ...form, coverNote: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"
                      placeholder="Tell us about your research interests, relevant experience, and why you want to join Redshift Trading LLP..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-primary text-primary-foreground font-display font-semibold text-sm py-3.5 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {sending ? 'Preparing...' : 'Submit Application'} <Send size={16} />
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you consent to Redshift Trading LLP processing your personal data for recruitment purposes.
                  </p>
                </form>
              )}
            </div>
          </div>
        </ScrollSection>
      )}
    </main>
  );
}
