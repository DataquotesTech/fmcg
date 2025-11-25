import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | FMCG Influencers",
  description:
    "Connecting India's FMCG talent, knowledge, and influence under one trusted platform. Learn about FMCG Influencers and our mission.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About FMCG Influencers
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Connecting India&apos;s FMCG talent, knowledge, and influence
              under one trusted platform.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12 md:mb-16">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              FMCG Influencers is India&apos;s emerging platform dedicated to
              connecting FMCG professionals, brand teams, distribution partners,
              and ambitious young talent. We exist to make the FMCG ecosystem
              more transparent, more connected, and more rewarding for everyone
              who works in it.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              In an industry driven by speed, trust, and execution excellence,
              our mission is simple — to bring the entire FMCG community onto
              one credible digital platform.
            </p>
          </section>

          {/* Our Mission */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              To empower FMCG professionals, creators, and companies by
              providing insights, opportunities, and meaningful connections that
              accelerate careers and strengthen the industry.
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              What We Do
            </h2>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  1. Build a Community of FMCG Professionals
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  From sales officers and merchandisers to brand managers and
                  supply-chain talent — we bring together people who live and
                  breathe FMCG.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  2. Spotlight Influencers & Rising Talent
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  We identify creators, sales professionals, marketers, and
                  retail experts who are shaping conversations and driving
                  influence within the industry.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  3. Share Practical FMCG Knowledge
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Real-time insights on retail execution, shopper marketing,
                  brand building, distribution, and modern trade — explained in
                  simple and usable formats.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  4. Connect Companies with the Right Talent
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  We help brands discover professionals, micro-influencers, and
                  people with deep market understanding.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  5. Celebrate the People Behind the Products
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  FMCG is not just products — it&apos;s people waking up at 6 AM
                  to hit the market, it&apos;s distributors keeping the supply
                  chain running, and it&apos;s marketers designing growth
                  playbooks.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-3">
                  Our platform exists to tell their stories.
                </p>
              </div>
            </div>
          </section>

          {/* Why We Started */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why We Started
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Even though FMCG is one of the largest industries in India, there
              has never been a single digital home for professionals, experts,
              and aspirants. Most conversations stay offline — in sales
              meetings, review rooms, market visits, and trade discussions.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              We started FMCGInfluencers.com to change that. To bring the
              industry online, to recognize the people who make things happen,
              and to help young talent learn directly from real practitioners.
            </p>
          </section>

          {/* Who We Are */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              A passionate team of FMCG professionals, marketers, product
              builders, and storytellers — all united by one belief: FMCG
              deserves its own platform.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              We come with real market experience, real challenges, and real
              stories.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
              And that&apos;s why everything we build is practical, relevant,
              and rooted in the actual working reality of the FMCG world.
            </p>
          </section>

          {/* Our Vision */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              To create a collaborative ecosystem where people thrive, brands
              advance, and every stakeholder experiences meaningful progress.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
