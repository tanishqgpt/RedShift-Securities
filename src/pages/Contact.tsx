import { useState } from 'react';
import { Send } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';

const WEB3FORMS_KEY = '5cb86383-5811-4f46-864b-a704f40a494c';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          subject: `Contact Inquiry — ${form.name}`,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20">
      <ScrollSection>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Contact</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient-redshift">touch</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-10">
              For institutional inquiries, partnership discussions, or regulatory matters,
              please reach out using the form or contact details below.
            </p>

            <div className="space-y-6">
              <div>
                <p className="mono-text text-xs text-muted-foreground mb-1">EMAIL</p>
                <a href="mailto:tanishqgpt3@gmail.com" className="text-foreground font-display hover:text-primary transition-colors">tanishqgpt3@gmail.com</a>
              </div>
              <div>
                <p className="mono-text text-xs text-muted-foreground mb-1">PHONE</p>
                <p className="text-foreground font-display">[PHONE]</p>
              </div>
              <div>
                <p className="mono-text text-xs text-muted-foreground mb-1">REGISTERED ADDRESS</p>
                <p className="text-foreground font-display">[REGISTERED_ADDRESS]</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-lg p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <Send className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Message Sent</h3>
                <p className="text-muted-foreground text-sm">We'll respond within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mono-text text-xs text-muted-foreground mb-2">NAME *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
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
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block mono-text text-xs text-muted-foreground mb-2">COMPANY</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block mono-text text-xs text-muted-foreground mb-2">MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-display font-semibold text-sm py-3.5 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'} {!loading && <Send size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollSection>
    </main>
  );
}
