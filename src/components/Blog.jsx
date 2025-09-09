import React from "react";
import styles from "../style";
import { FaClock, FaUser, FaArrowRight, FaLightbulb } from "react-icons/fa";

const Blog = () => {
  const blogPosts = [
    {
      id: "edge-ai-vs-cloud-loadshedding",
      title: "Why Edge AI Beats Cloud During Load-Shedding: A South African Reality Check",
      excerpt: "How local processing saves businesses when the lights go out and internet fails. Real-world case studies from mining and logistics operations.",
      author: "Bongani Dube",
      readTime: "8 min read",
      date: new Date().toLocaleDateString('en-ZA'),
      category: "Case Study",
      featured: true
    },
    {
      id: "popia-compliance-edge-computing",
      title: "POPIA Compliance and Edge Computing: Keeping Data Local",
      excerpt: "How edge processing helps South African businesses maintain data sovereignty and privacy compliance while improving performance.",
      author: "Bongani Dube", 
      readTime: "5 min read",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-ZA'),
      category: "Technical",
      featured: false,
      comingSoon: true
    },
    {
      id: "roi-edge-ai-south-africa",
      title: "Calculating Edge AI ROI in South African Business Context",
      excerpt: "Comprehensive analysis of cost savings, efficiency gains, and business impact when deploying edge AI solutions in SA.",
      author: "Bongani Dube",
      readTime: "10 min read", 
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-ZA'),
      category: "Business",
      featured: false,
      comingSoon: true
    }
  ];

  return (
    <section id="blog" className={`${styles.paddingY} ${styles.paddingX} bg-black-gradient-2`}>
      <div className={`${styles.boxWidth} mx-auto`}>
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Insights & <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Real-world insights from deploying edge AI in South African business environments. 
            Learn from our experiences and industry research.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="mb-16">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-lg border border-gray-600">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                  Featured
                </span>
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h3>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <FaLightbulb className="mr-2" />
                    {post.date}
                  </div>
                </div>
                
                <a 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group"
                >
                  Read Full Article
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Other Posts */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <div key={post.id} className="bg-gray-800/50 p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
              <div className="flex items-center mb-4">
                <span className="bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                {post.comingSoon && (
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm ml-2">
                    Coming Soon
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {post.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    {post.readTime}
                  </div>
                  <div>{post.date}</div>
                </div>
                
                {post.comingSoon ? (
                  <span className="text-gray-500 text-sm">Coming Soon</span>
                ) : (
                  <a 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    Read More
                    <FaArrowRight className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get notified when we publish new insights, case studies, and technical deep-dives 
            on edge AI deployment in African business contexts.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            POPIA compliant • No spam • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
