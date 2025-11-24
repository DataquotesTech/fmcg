"use client";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-16 md:space-y-20">
          {/* Vision */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              VISION
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To create a collaborative ecosystem where people thrive, brands
              advance, and every stakeholder experiences meaningful progress.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              MISSION
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our mission is to empower the industry through knowledge,
              connections, and solutions that create longterm value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
