import React from "react";
import styles from "../style";
import { FaArrowLeft, FaClock, FaUser, FaLightbulb, FaCloudRain, FaBolt } from "react-icons/fa";

const BlogPost = () => {
  return (
    <div className={`${styles.paddingX} bg-primary min-h-screen text-white py-16`}>
      <div className={`${styles.boxWidth} mx-auto max-w-4xl`}>
        
        {/* Header */}
        <div className="mb-8">
          <a 
            href="/#blog"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </a>
          
          <div className="mb-6">
            <span className="inline-block bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Case Study
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient leading-tight">
              Why Edge AI Beats Cloud During Load-Shedding: A South African Reality Check
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              How local processing saves businesses when the lights go out and internet fails
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center space-x-6 text-sm text-gray-400 border-b border-gray-700 pb-6">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              Bongani Dube, Founder
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              8 min read
            </div>
            <div className="flex items-center">
              <FaLightbulb className="mr-2" />
              Published: {new Date().toLocaleDateString('en-ZA')}
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              <strong>3:47 PM. Stage 6 load-shedding hits.</strong> Your security cameras go offline. 
              Your cloud-based analytics stop working. Your operations team is flying blind for the next 4 hours.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              This isn't a hypothetical scenario—it's the daily reality for South African businesses. 
              While cloud computing promises unlimited scalability, it has a fatal flaw in our context: 
              <em>it requires constant internet connectivity</em>.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <FaCloudRain className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-300 mb-2">The Cloud Dependency Problem</h3>
                  <p className="text-gray-300 text-sm">
                    When load-shedding takes down cellular towers or your fiber connection fails, 
                    cloud-dependent systems become expensive paperweights. Your R50,000/month cloud analytics 
                    platform can't help you if it can't receive data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-world scenario */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Real-World Impact: Mining Site Case Study</h2>
            <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-4">Before EdgeBox: Cloud-Dependent Nightmare</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li><strong>Stage 4+ load-shedding:</strong> 6-12 hours of blind operation daily</li>
                <li><strong>Data upload backlog:</strong> 48-72 hours to process offline footage</li>
                <li><strong>Bandwidth costs:</strong> R15,000/month for 4G backup connectivity</li>
                <li><strong>Security incidents:</strong> 3 missed intrusions during connectivity gaps</li>
                <li><strong>Manual monitoring:</strong> Security guards watching 24 camera feeds</li>
              </ul>
              
              <h3 className="font-semibold mb-4 text-green-400">After EdgeBox: Offline-First Reality</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>100% uptime:</strong> Analytics continue during 12+ hour outages</li>
                <li><strong>Real-time alerts:</strong> Immediate notifications via local network</li>
                <li><strong>Bandwidth savings:</strong> 70% reduction in cloud data transfer</li>
                <li><strong>Response time:</strong> Sub-100ms vs 2-5 second cloud latency</li>
                <li><strong>Cost savings:</strong> 60% reduction in connectivity requirements</li>
              </ul>
            </div>
          </section>

          {/* Technical comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Technical Reality: Edge vs Cloud Performance</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Cloud Performance */}
              <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FaCloudRain className="mr-2 text-red-400" />
                  Cloud Processing
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Latency:</strong> 200ms - 5s (network dependent)</li>
                  <li>• <strong>Uptime:</strong> 0% during connectivity loss</li>
                  <li>• <strong>Bandwidth:</strong> 2-5 Mbps per camera</li>
                  <li>• <strong>Data costs:</strong> R8-15k/month</li>
                  <li>• <strong>Privacy:</strong> Data leaves premises</li>
                  <li>• <strong>Scalability:</strong> Excellent (when connected)</li>
                </ul>
              </div>

              {/* Edge Performance */}
              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FaBolt className="mr-2 text-green-400" />
                  Edge Processing
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Latency:</strong> &lt;100ms (local processing)</li>
                  <li>• <strong>Uptime:</strong> 99%+ (offline-capable)</li>
                  <li>• <strong>Bandwidth:</strong> 0.5-1.5 Mbps (summaries only)</li>
                  <li>• <strong>Data costs:</strong> R2-5k/month</li>
                  <li>• <strong>Privacy:</strong> Data stays on-premises</li>
                  <li>• <strong>Scalability:</strong> Horizontal (add more boxes)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Load-shedding specific benefits */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Why Edge AI Thrives During Load-Shedding</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">1. Battery-Powered Independence</h3>
                <p className="text-gray-300 mb-3">
                  EdgeBox runs on 12V DC power, easily sustained by UPS systems or solar setups. 
                  While your router and cameras stay online with backup power, cloud services 
                  become unreachable when cellular towers lose power.
                </p>
                <div className="text-sm text-blue-300">
                  <strong>Power consumption:</strong> 15-25W vs 200W+ for equivalent cloud infrastructure
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">2. Local Network Resilience</h3>
                <p className="text-gray-300 mb-3">
                  Your security cameras, access controls, and monitoring systems communicate 
                  through local ethernet networks. EdgeBox processes everything locally, 
                  sending alerts via local notification systems or backup cellular connections.
                </p>
                <div className="text-sm text-purple-300">
                  <strong>Network requirement:</strong> Local LAN only vs constant internet for cloud
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">3. Intelligent Data Sync</h3>
                <p className="text-gray-300 mb-3">
                  When connectivity returns, EdgeBox intelligently syncs only critical events 
                  and compressed summaries—not hours of raw footage. This prevents the 
                  "catch-up backlog" that overwhelms recovering networks.
                </p>
                <div className="text-sm text-green-300">
                  <strong>Sync efficiency:</strong> 95% data reduction vs raw video upload
                </div>
              </div>
            </div>
          </section>

          {/* Business impact */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">The Business Case: ROI During Crisis</h2>
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-8 rounded-lg">
              <h3 className="font-semibold mb-4 text-2xl">Conservative ROI Calculation</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-red-300">Cloud System Costs (Annual)</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Cloud analytics platform: R600,000</li>
                    <li>• Data transfer charges: R180,000</li>
                    <li>• Backup connectivity: R120,000</li>
                    <li>• Downtime losses: R200,000</li>
                    <li>• Manual monitoring: R150,000</li>
                    <li className="font-semibold text-red-300 pt-2 border-t border-gray-600">
                      Total: R1,250,000/year
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-300">EdgeBox System Costs (Annual)</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• EdgeBox license: R240,000</li>
                    <li>• Reduced connectivity: R50,000</li>
                    <li>• Maintenance: R36,000</li>
                    <li>• Downtime losses: R0</li>
                    <li>• Manual monitoring: R0</li>
                    <li className="font-semibold text-green-300 pt-2 border-t border-gray-600">
                      Total: R326,000/year
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-500/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-300">Annual Savings: R924,000</div>
                <div className="text-sm text-gray-300 mt-1">74% cost reduction with improved reliability</div>
              </div>
            </div>
          </section>

          {/* Future considerations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Looking Forward: Infrastructure Independence</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Load-shedding isn't going away in 2024. If anything, extreme weather events and 
              aging infrastructure make local processing more critical than ever. The businesses 
              that thrive will be those that can operate independently of external dependencies.
            </p>
            
            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">EdgeBox enables true infrastructure independence:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Solar-powered operation in remote locations</li>
                <li>Mesh networking between multiple sites</li>
                <li>Offline AI training on local data patterns</li>
                <li>Automatic failover to satellite connectivity</li>
                <li>Local data sovereignty and POPIA compliance</li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Conclusion: Edge First, Cloud Second</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The question isn't whether edge computing will replace the cloud—it's about 
              choosing the right architecture for South African realities. Cloud computing 
              excels at tasks requiring massive scale and global coordination. 
              But for real-time, mission-critical operations in unreliable environments, 
              <strong> edge-first architecture isn't just better—it's essential</strong>.
            </p>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Ready to Test Edge AI in Your Environment?</h3>
              <p className="text-gray-300 mb-4">
                Join our pilot program and experience the difference edge computing makes 
                during your next load-shedding cycle.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="/pilot-program" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View Pilot Program
                </a>
                <a 
                  href="#early-access" 
                  className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Get Early Access
                </a>
              </div>
            </div>
          </section>

        </article>

        {/* Author bio */}
        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bongani Dube</h3>
              <p className="text-gray-300 text-sm mb-2">
                Founder of EdgeBox Technologies. CSIR AI award recipient with expertise in 
                fintech and AWS infrastructure. Currently building the future of edge computing in Africa.
              </p>
              <div className="flex space-x-4 text-sm">
                <a href="mailto:bongani@edgebox.africa" className="text-blue-400 hover:underline">
                  Email
                </a>
                <a href="https://www.linkedin.com/in/bongani-dube-86944479/" className="text-blue-400 hover:underline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
