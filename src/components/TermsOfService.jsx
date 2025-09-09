import React from "react";
import styles from "../style";

const TermsOfService = () => {
  return (
    <div className={`${styles.paddingX} bg-primary min-h-screen text-white py-16`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Terms of Service</h1>
          <p className="text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-ZA')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using EdgeBox Technologies' services, website, or products ("Services"), 
              you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part 
              of these terms, you may not access the Services.
            </p>
          </section>

          {/* 2. Prototype and Beta Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Prototype and Beta Services</h2>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
              <p className="text-orange-300 font-semibold">⚠️ Important Disclaimer</p>
              <p className="text-gray-300 mt-2">
                <strong>EdgeBox devices and software are prototype/beta products. Results may vary.</strong> 
                Performance metrics, bandwidth savings, and uptime statistics are estimates based on controlled 
                testing environments and may not reflect real-world deployment conditions.
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              As prototype technology, EdgeBox systems are provided "as-is" for evaluation and pilot 
              testing purposes. While we strive for reliability, users should not deploy these systems 
              in mission-critical environments without appropriate backup solutions.
            </p>
          </section>

          {/* 3. Pilot Program Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Pilot Program Terms</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Pilot programs require a refundable deposit (R2,500 - R10,000 depending on scope)</li>
              <li>Deposits are fully refundable upon equipment return in working condition</li>
              <li>Pilot duration typically ranges from 30-90 days as agreed</li>
              <li>Success metrics and KPIs will be defined in individual pilot agreements</li>
              <li>EdgeBox Technologies reserves the right to collect anonymized performance data</li>
            </ul>
          </section>

          {/* 4. POPIA Compliance */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Privacy and Data Protection (POPIA Compliance)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              EdgeBox Technologies is committed to protecting your privacy in accordance with the 
              Protection of Personal Information Act (POPIA) of South Africa.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>We collect only necessary personal information for service delivery</li>
              <li>Your data is processed lawfully, fairly, and transparently</li>
              <li>Data is stored securely and retained only as long as necessary</li>
              <li>You have the right to access, correct, or delete your personal information</li>
              <li>We do not sell or share personal data with third parties without consent</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              For detailed privacy practices, please review our <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All EdgeBox hardware designs, software, algorithms, and documentation remain the intellectual 
              property of EdgeBox Technologies. Pilot participants receive limited usage rights during 
              the evaluation period but may not reverse engineer, copy, or distribute our technology.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              Given the prototype nature of our products, EdgeBox Technologies' liability is limited to 
              the pilot program deposit amount. We are not liable for indirect, consequential, or 
              incidental damages arising from use of our prototype systems.
            </p>
          </section>

          {/* 7. Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Service Availability</h2>
            <p className="text-gray-300 leading-relaxed">
              While EdgeBox devices are designed for offline-first operation, certain features may 
              require internet connectivity. We make no guarantees regarding uptime or availability 
              of cloud-dependent features during the prototype phase.
            </p>
          </section>

          {/* 8. South African Law */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms are governed by South African law. Any disputes will be resolved in 
              South African courts with jurisdiction over EdgeBox Technologies' registered address.
            </p>
          </section>

          {/* 9. Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Contact Information</h2>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-300">
                <strong>EdgeBox Technologies (Pty) Ltd</strong><br />
                Email: <a href="mailto:legal@edgebox.africa" className="text-blue-400 hover:underline">legal@edgebox.africa</a><br />
                Support: <a href="mailto:support@edgebox.africa" className="text-blue-400 hover:underline">support@edgebox.africa</a><br />
                Privacy Officer: <a href="mailto:privacy@edgebox.africa" className="text-blue-400 hover:underline">privacy@edgebox.africa</a>
              </p>
            </div>
          </section>

          {/* 10. Updates to Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">10. Updates to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these Terms periodically. Material changes will be communicated via 
              email to registered users. Continued use of our Services after updates constitutes 
              acceptance of revised Terms.
            </p>
          </section>

        </div>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
