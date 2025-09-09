import React from "react";
import styles from "../style";
import { FaShieldAlt, FaAward, FaUniversity, FaHandshake, FaArrowLeft } from "react-icons/fa";

const Partners = () => {
  // Placeholder logo data - replace with actual partner logos later
  const partnerLogos = [
    { name: "Mining Corp", category: "client", placeholder: "MC" },
    { name: "Logistics SA", category: "client", placeholder: "LSA" },
    { name: "Port Authority", category: "client", placeholder: "PA" },
    { name: "Security Plus", category: "client", placeholder: "SP" },
  ];

  const advisoryLogos = [
    { name: "Innovation Hub", category: "advisor", placeholder: "IH" },
    { name: "CSIR", category: "research", placeholder: "CSIR" },
    { name: "UCT", category: "academic", placeholder: "UCT" },
    { name: "Paystack", category: "network", placeholder: "PS" },
  ];

  const certifications = [
    {
      icon: FaShieldAlt,
      title: "POPIA Compliant",
      description: "Data protection certified",
      color: "green"
    },
    {
      icon: FaAward,
      title: "CSIR AI Award",
      description: "Recognition for innovation",
      color: "blue"
    },
    {
      icon: FaUniversity,
      title: "UCT Graduate",
      description: "Computer Science excellence",
      color: "purple"
    },
    {
      icon: FaHandshake,
      title: "Enterprise Ready",
      description: "Business-grade solutions",
      color: "orange"
    }
  ];

  const LogoPlaceholder = ({ logo }) => {
    const colorClasses = {
      client: "bg-blue-500/20 border-blue-500/30 text-blue-300",
      advisor: "bg-green-500/20 border-green-500/30 text-green-300",
      research: "bg-purple-500/20 border-purple-500/30 text-purple-300",
      academic: "bg-orange-500/20 border-orange-500/30 text-orange-300",
      network: "bg-gray-500/20 border-gray-500/30 text-gray-300"
    };

    return (
      <div className={`flex items-center justify-center h-16 px-6 rounded-lg border transition-all hover:scale-105 ${colorClasses[logo.category]}`}>
        <div className="text-center">
          <div className="font-bold text-lg">{logo.placeholder}</div>
          <div className="text-xs opacity-75">{logo.name}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.paddingX} bg-primary min-h-screen text-white py-16`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        
        {/* Back Navigation */}
        <div className="mb-8">
          <a 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Our <span className="text-gradient">Partners & Network</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            EdgeBox is backed by industry partnerships, academic research, and proven expertise 
            in enterprise-grade AI solutions. Meet our network of advisors, clients, and research partners.
          </p>
        </div>

        {/* Certifications & Credentials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Credentials & Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              const colorClasses = {
                green: "text-green-400 bg-green-500/10 border-green-500/30",
                blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
                purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
                orange: "text-orange-400 bg-orange-500/10 border-orange-500/30"
              };
              
              return (
                <div key={index} className={`p-6 rounded-lg border text-center transition-all hover:scale-105 ${colorClasses[cert.color]}`}>
                  <Icon className={`text-3xl mx-auto mb-3 ${cert.color === 'green' ? 'text-green-400' : cert.color === 'blue' ? 'text-blue-400' : cert.color === 'purple' ? 'text-purple-400' : 'text-orange-400'}`} />
                  <h3 className="font-semibold text-white text-lg mb-2">{cert.title}</h3>
                  <p className="text-gray-300 text-sm">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Early Clients & Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Early Clients & Pilot Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnerLogos.map((logo, index) => (
              <LogoPlaceholder key={index} logo={logo} />
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-400">
              * Pilot partnerships - full case studies coming soon
            </p>
          </div>
        </div>

        {/* Advisory & Network */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Advisory Network & Research Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {advisoryLogos.map((logo, index) => (
              <LogoPlaceholder key={index} logo={logo} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">What Early Users Say</h2>
          <div className="bg-gray-800/50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <p className="text-gray-300 italic mb-4 text-lg">
                  "EdgeBox kept our security systems running through 12-hour load-shedding. 
                  The local processing is a game-changer for South African operations."
                </p>
                <div className="text-gray-400">
                  <strong>Security Manager</strong><br />
                  Major Logistics Company
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <p className="text-gray-300 italic mb-4 text-lg">
                  "Finally, an AI solution that works offline. Our mine operations no longer 
                  depend on unreliable connectivity for critical safety monitoring."
                </p>
                <div className="text-gray-400">
                  <strong>Operations Director</strong><br />
                  Mining Corporation
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                * Testimonials from pilot program participants (identities protected for confidentiality)
              </p>
            </div>
          </div>
        </div>

        {/* Press & Recognition */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Recognition & Awards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-lg border border-gray-600">
              <FaAward className="text-blue-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-3 text-xl">CSIR AI Scholarship</h3>
              <p className="text-gray-300">Recognition for outstanding AI research and innovation</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-8 rounded-lg border border-gray-600">
              <FaUniversity className="text-green-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-3 text-xl">UCT Computer Science</h3>
              <p className="text-gray-300">Graduate from South Africa's leading technical university</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-8 rounded-lg border border-gray-600">
              <FaHandshake className="text-orange-400 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-3 text-xl">Enterprise Experience</h3>
              <p className="text-gray-300">FinTech expertise from Paystack and cloud infrastructure knowledge</p>
            </div>
          </div>
        </div>

        {/* Talk to Our Team - Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-12 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Talk to Our Team</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Become part of South Africa's edge AI pioneer network. Get early access to cutting-edge 
            technology and help shape the future of local AI processing.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href="/pilot-program" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-lg"
            >
              Join Pilot Program
            </a>
            <a 
              href="/#early-access" 
              className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold text-lg"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
