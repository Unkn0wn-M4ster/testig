import Image from "next/image";
import { Geist } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LoadingScreen from '@/components/LoadingScreen';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const mockupsRef = useRef(null);
  const darkSectionRef = useRef(null);

  useEffect(() => {
    // Disable scrolling during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      
      // Content fade in
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });

      // Mockups floating animation
      gsap.from(mockupsRef.current, {
        opacity: 0,
        x: 50,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
      });

      // Continuous floating animation for mockups
      gsap.to(mockupsRef.current, {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    // Scroll animation
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (darkSectionRef.current) {
        const opacity = Math.min(scrollPosition / windowHeight, 1);
        darkSectionRef.current.style.opacity = opacity;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className={`${geistSans.variable} min-h-[200vh] bg-[#111111] ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Header */}
        <header className="container mx-auto px-8 py-4">
          <Image
            src="/logo12.png"
            alt="Tribbe Logo"
            width={150}
            height={50}
            priority
            className="object-contain"
          />
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-24 items-center min-h-[calc(90vh-140px)]">
            {/* Left Column */}
            <div ref={contentRef} className="max-w-xl pt-6">
              <h2 className="text-base text-primary-orange mb-8">— Coming Soon</h2>
              <h1 className="text-7xl font-bold mb-14 text-white leading-[1.1]">
                Get Notified
                <br />
                When we Launch
              </h1>
              
              {/* Email Input */}
              <div className="relative max-w-md mb-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-full px-7 py-5 pr-36
                           text-white placeholder-gray-500 focus:outline-none focus:border-primary-orange/50
                           transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-orange text-white px-7 py-3 rounded-full 
                           hover:bg-primary-orange/90 transition-all duration-300 font-medium"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-20">*Don't worry we will not spam you :)</p>

              {/* Social Links */}
              <div className="flex space-x-6">
                {[
                  { name: 'github', icon: '/social/github.png' },
                  { name: 'twitter', icon: '/social/x.png' },
                  { name: 'instagram', icon: '/social/gmail.png' },
                  { name: 'youtube', icon: '/social/link.png' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={`#${social.name}`}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center
                              hover:border-primary-orange hover:bg-primary-orange/5 transform hover:scale-110
                              transition-all duration-300 group"
                  >
                    <Image 
                      src={social.icon}
                      alt={social.name}
                      width={28}
                      height={28}
                      className="opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Mockups */}
            <div ref={mockupsRef} className="relative hidden md:block">
              <div className="flex space-x-8">
                {/* Pre-registration Stats Card */}
                <div className="flex flex-col space-y-8">
                  <div className="mockup-card w-[300px] bg-[#1A1A1A]/80 backdrop-blur-lg rounded-xl p-5 border border-white/10
                                hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20">
                    <div className="flex items-center space-x-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-primary-orange/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-primary-orange animate-pulse"></div>
                      </div>
                      <div>
                        <div className="text-white font-medium">Pre-registrations</div>
                        <div className="text-sm text-primary-orange">1,234 people joined</div>
                      </div>
                    </div>
                    
                    {/* Recent Comment */}
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <div>
                          <div className="text-sm text-white">Sarah K.</div>
                          <div className="text-xs text-gray-400">2 hours ago</div>
                        </div>
                      </div>
                      <p className="text-sm text-white/80">
                        "Can't wait for the launch! The preview looks amazing! 🚀"
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Daily Signups</div>
                        <div className="text-lg text-white font-medium">+127</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Engagement</div>
                        <div className="text-lg text-white font-medium">94%</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Milestones Card */}
                  <div className="mockup-card w-[300px] bg-[#1A1A1A]/80 backdrop-blur-lg rounded-xl p-5 border border-white/10
                                hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20">
                    <div className="text-white font-medium mb-4">Project Milestones</div>
                    <div className="space-y-4">
                      {[
                        { label: 'Design', progress: 90, color: '#22C55E' },  // Green
                        { label: 'Testing', progress: 45, color: '#EAB308' }, // Yellow
                        { label: 'Launch', progress: 25, color: '#EC4899' }   // Pink
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">{item.label}</span>
                            <span className="text-white/60">{item.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${item.progress}%`,
                                backgroundColor: item.color,
                                boxShadow: `0 0 10px ${item.color}40`
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Main Product Card */}
                <div className="mockup-card w-[440px] bg-[#1A1A1A]/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10
                              hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/20">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-white/60 p-4">9:41</div>
                      <div className="text-xs text-white/60 p-4 ">Product Preview</div>
                    </div>
                    <div className="h-[340px] rounded-xl mb-6 overflow-hidden bg-white/5">
                      <Image
                        src="/placeholder.jpeg"
                        alt="Product Preview"
                        width={800}
                        height={600}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <span className="text-white font-medium text-lg">$45.99</span>
                      <button className="bg-primary-orange px-6 py-3 rounded-full text-sm text-white hover:bg-primary-orange/90 transition-colors font-medium">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Dark Section with Coming Soon */}
        <div 
          ref={darkSectionRef}
          className="fixed inset-0 bg-black flex items-center justify-center opacity-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div className="relative">
            <h2 className="text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-orange via-white to-primary-orange
                         animate-gradient-x tracking-tighter"
            >
              Coming Soon
            </h2>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/5 to-white/10
                           blur-2xl animate-pulse"
              >
                Coming Soon
              </h2>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-8 py-6">
          <div className="flex justify-end space-x-8 text-sm text-gray-500">
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-white transition-colors">Email Us</a>
          </div>
        </footer>
      </div>
    </>
  );
}