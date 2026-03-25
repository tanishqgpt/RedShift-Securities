import ScrollSection from '@/components/ScrollSection';

export default function Compliance() {
  return (
    <main className="pt-20">
      <ScrollSection>
        <div className="max-w-4xl mx-auto">
          <p className="mono-text text-xs tracking-[0.3em] text-primary mb-4 uppercase">Legal & Compliance</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12">
            Regulatory <span className="text-gradient-redshift">information</span>
          </h1>

          <div className="space-y-12">
            {/* Regulatory Status */}
            <div className="glass-panel rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Regulatory Status</h2>
              <p className="text-muted-foreground leading-relaxed">
                Redshift Securities is a proprietary trading firm operating in Indian financial markets.
                The firm is registered with [REGULATORY_BODY] (e.g., SEBI) under registration
                number [LICENSE_NUMBER]. Our registered office is located at [REGISTERED_ADDRESS].
              </p>
            </div>

            {/* Risk Disclosure */}
            <div className="glass-panel rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Risk Disclosure</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  Trading in financial instruments involves a high degree of risk and may result in the
                  loss of some or all of your investment. The value of investments can go down as well as
                  up, and you may not get back the amount originally invested.
                </p>
                <p>
                  Past performance is not indicative of future results. Any projections, forecasts, or
                  estimates contained herein are for illustrative purposes only and should not be regarded
                  as a guarantee, prediction, or definitive statement of fact or probability.
                </p>
                <p>
                  Leveraged products carry a high level of risk. The use of leverage can magnify both
                  profits and losses, and losses can exceed deposits. You should carefully consider
                  whether trading is suitable for you in light of your financial situation and risk tolerance.
                </p>
              </div>
            </div>

            {/* No Investment Advice */}
            <div className="glass-panel rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">No Investment Advice</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                The information provided on this website is for general informational purposes only and does
                not constitute investment advice, a personal recommendation, or a solicitation to buy or sell
                any financial instruments. Nothing on this website should be construed as personalized
                investment, legal, or tax advice. You should consult with qualified professionals before
                making any investment decisions.
              </p>
            </div>

            {/* Conflicts of Interest */}
            <div className="glass-panel rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Conflicts of Interest</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Redshift Securities maintains a Conflicts of Interest Policy designed to identify, manage,
                and where necessary, disclose conflicts of interest that may arise in the course of our
                business. As a proprietary trading firm, we trade for our own account and our trading
                activity may, at times, be in the same instruments as those referenced in our communications.
                We take reasonable steps to ensure that conflicts are managed fairly and transparently.
              </p>
            </div>

            {/* Privacy & Terms */}
            <div id="privacy" className="glass-panel rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Redshift Securities is committed to protecting your privacy. We collect and process personal
                data in accordance with applicable data protection laws. Personal information submitted
                through our website (e.g., contact forms) will be used solely for the purpose of responding
                to your inquiry. We do not sell or share personal data with third parties except as required
                by law or regulation. For full details, contact tanishqgpt3@gmail.com.
              </p>
            </div>

            <div id="terms" className="glass-panel rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Terms of Use</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                By accessing this website, you agree to be bound by these Terms of Use. All content on this
                website is the property of Redshift Securities and is protected by copyright. You may not
                reproduce, distribute, or create derivative works from any content without prior written
                consent. Redshift Securities reserves the right to modify these terms at any time.
              </p>
            </div>
          </div>
        </div>
      </ScrollSection>
    </main>
  );
}
