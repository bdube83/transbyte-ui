import React from "react";
import styles from "../style";

const PrivacyPolicy = () => {
  return (
    <section className={`${styles.paddingY} ${styles.paddingX} bg-primary`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${styles.heading2} text-white mb-4`}>Privacy Policy</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            EdgeBox Technologies is committed to protecting your privacy. This policy explains how we collect, 
            use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-white space-y-8">
          
          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and job title</li>
                  <li>Messages and inquiries you send us</li>
                  <li>Information provided during pilot program registration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referral sources</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">2. How We Use Your Information</h2>
            <div className="text-gray-300 space-y-2">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Process pilot program applications and site assessments</li>
                <li>Send you information about EdgeBox products and services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </div>

          {/* Data Protection */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">3. Data Protection & Security</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS</li>
                <li><strong>Cloudflare Protection:</strong> Our forms are protected by Cloudflare security</li>
                <li><strong>Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
                <li><strong>Regular Audits:</strong> We regularly review our security practices</li>
              </ul>
              <p className="mt-3 p-3 bg-gray-800 rounded-lg border-l-4 border-blue-500">
                🔒 <strong>Note:</strong> We never sell, rent, or trade your personal information to third parties.
              </p>
            </div>
          </div>

          {/* Data Sharing */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">4. Data Sharing</h2>
            <div className="text-gray-300 space-y-3">
              <p>We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>With service providers who help us operate our business (email services, analytics)</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In the event of a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
              <p className="mt-3 text-sm text-gray-400">
                All third-party service providers are contractually obligated to protect your information.
              </p>
            </div>
          </div>

          {/* Cookies & Tracking */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">5. Cookies & Tracking</h2>
            <div className="text-gray-300 space-y-3">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Remember your preferences</li>
                <li>Analyze website usage with Google Analytics</li>
                <li>Protect against spam and abuse</li>
                <li>Improve user experience</li>
              </ul>
              <p className="mt-3 text-sm">
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">6. Your Rights</h2>
            <div className="text-gray-300 space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correct:</strong> Update or correct inaccurate information</li>
                <li><strong>Delete:</strong> Request deletion of your personal data</li>
                <li><strong>Withdraw consent:</strong> Opt out of marketing communications</li>
                <li><strong>Data portability:</strong> Receive your data in a portable format</li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">7. Data Retention</h2>
            <div className="text-gray-300 space-y-3">
              <p>We retain your personal information for as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide our services and support</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="mt-3">
                Typically, we retain contact information for 3 years after last contact, unless you request deletion.
              </p>
            </div>
          </div>

          {/* International Transfers */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">8. International Data Transfers</h2>
            <div className="text-gray-300">
              <p>
                EdgeBox Technologies is based in South Africa. If you are located outside South Africa, 
                your information may be transferred to and processed in South Africa. We ensure appropriate 
                safeguards are in place for international data transfers.
              </p>
            </div>
          </div>

          {/* Updates to Policy */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">9. Policy Updates</h2>
            <div className="text-gray-300">
              <p>
                We may update this privacy policy from time to time. We will notify you of significant 
                changes by posting the updated policy on our website with a new "Last updated" date. 
                Your continued use of our services after such updates constitutes acceptance of the revised policy.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Contact Us</h2>
            <div className="text-gray-300 space-y-2">
              <p>If you have questions about this privacy policy or our data practices, contact us:</p>
              <div className="mt-4 space-y-2">
                <p><strong>EdgeBox Technologies</strong></p>
                <p>📧 General: <a href="mailto:support@edgebox.africa" className="text-blue-400 hover:text-blue-300 underline">support@edgebox.africa</a></p>
                <p>🌐 Website: <a href="https://edgebox.africa" className="text-blue-400 hover:text-blue-300 underline">edgebox.africa</a></p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-8">
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Home
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
