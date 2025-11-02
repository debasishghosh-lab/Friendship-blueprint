import React, { useState } from "react";
import AboutImage from "./assets/About-section.png";

function About() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="md:w-1/2 w-full flex justify-center mb-10 md:mb-0">
          <img
            src={AboutImage}
            alt="Illustration of building friendship blueprint"
            className="rounded-2xl shadow-2xl w-4/5 md:w-3/4 transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-blue-800 mb-6">
            Build Meaningful Connections
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold text-blue-600">Friendship Blueprint</span> helps
            you understand and strengthen your social connections through data-driven insights.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Discover shared interests, visualize social patterns, and enhance your teamwork
            experiences — all designed to foster genuine, long-lasting friendships.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">✓</span>
              <span>Smart clustering based on interests and hobbies</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">✓</span>
              <span>Teamwork compatibility analysis</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-blue-600 font-bold text-xl">✓</span>
              <span>Visual friendship group mapping</span>
            </div>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-blue-800">How It Works</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>Step 1: Upload Your Data</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Upload a CSV file containing information about people's interests, hobbies, clubs, 
                    and teamwork preferences. Our system accepts standardized data formats for easy processing.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <span>🤖</span>
                    <span>Step 2: AI-Powered Analysis</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Our advanced clustering algorithm analyzes the data to identify patterns and similarities. 
                    It considers multiple factors like shared interests, compatible hobbies, and teamwork styles.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>Step 3: Discover Groups</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    View your personalized friendship groups! Each cluster represents people who share 
                    common interests and are likely to form strong connections. Use these insights for 
                    team building, event planning, or social activities.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <span>💡</span>
                    <span>Why Use Friendship Blueprint?</span>
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Perfect for schools, organizations, and community groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Create balanced teams with compatible members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Foster meaningful connections based on shared interests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Data-driven insights for better social dynamics</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default About;