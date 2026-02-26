import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Download, Sparkles, Zap, Rocket, Github, FileText } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <MeshBackground />
      <HeroSection />
      <InteractiveShowcase />
      <CoreFeatures />
      <Footer />
    </div>
  );
}

function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
            'linear-gradient(225deg, #e0f2fe 0%, #f0f9ff 50%, #e0f2fe 100%)',
            'linear-gradient(315deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
            'linear-gradient(45deg, #e0f2fe 0%, #f0f9ff 50%, #e0f2fe 100%)',
            'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="wave-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <motion.path
          d="M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z"
          fill="rgba(240, 249, 255, 0.1)"
          filter="url(#wave-blur)"
          animate={{
            d: [
              'M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z',
              'M0,400 Q300,450 600,400 T1200,400 L1200,800 L0,800 Z',
              'M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.path
          d="M0,500 Q300,480 600,500 T1200,500 L1200,800 L0,800 Z"
          fill="rgba(224, 242, 254, 0.08)"
          filter="url(#wave-blur)"
          animate={{
            d: [
              'M0,500 Q300,480 600,500 T1200,500 L1200,800 L0,800 Z',
              'M0,500 Q300,520 600,500 T1200,500 L1200,800 L0,800 Z',
              'M0,500 Q300,480 600,500 T1200,500 L1200,800 L0,800 Z',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
}

function HeroSection() {
  const text = 'OmniHub';
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <motion.stop
                    offset="0%"
                    animate={{
                      stopColor: ['#f0f9ff', '#e0f2fe', '#f0f9ff'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.stop
                    offset="100%"
                    animate={{
                      stopColor: ['#e0f2fe', '#f0f9ff', '#e0f2fe'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </linearGradient>
                <mask id="textMask">
                  <text
                    x="400"
                    y="150"
                    textAnchor="middle"
                    fontSize="180"
                    fontWeight="bold"
                    fill="white"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    letterSpacing="-0.02em"
                  >
                    {text}
                  </text>
                </mask>
              </defs>
              <rect
                width="800"
                height="200"
                fill="url(#titleGradient)"
                mask="url(#textMask)"
              />
            </svg>

            <h1 className="text-8xl md:text-9xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.6, 0.01, 0.05, 0.95],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Der ultimative Hub für alle nervigen Alltagstasks. Drag and Drop und fertig. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <GlowButton onMouseMove={handleMouseMove} mousePosition={mousePosition} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function GlowButton({ onMouseMove, mousePosition }: { onMouseMove: (e: React.MouseEvent) => void; mousePosition: { x: number; y: number } }) {
  const [isHovered, setIsHovered] = useState(false);

  // PLATZHALTER: Hier einfach deinen GitHub-Link einfügen
  const DOWNLOAD_URL = "https://github.com/Mini2023/OmniHub/releases/download/public/OmniHub_v4.5.1_Setup.exe";

  return (
    <motion.a
      href={DOWNLOAD_URL}
      download
      className="relative inline-flex px-12 py-5 text-lg font-semibold rounded-2xl bg-gray-900 text-white overflow-hidden group items-center justify-center no-underline cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={onMouseMove}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(240, 249, 255, 0.3), transparent)`,
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={isHovered ? {
          boxShadow: [
            '0 0 20px 5px rgba(96, 165, 250, 0.4)',
            '0 0 40px 15px rgba(96, 165, 250, 0.6)',
            '0 0 20px 5px rgba(96, 165, 250, 0.4)',
          ],
        } : {
          boxShadow: '0 0 0px 0px rgba(96, 165, 250, 0)',
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        style={{ pointerEvents: 'none' }}
      />

      <span className="relative flex items-center gap-3 pointer-events-none">
        <Download className="w-5 h-5" />
        Download für Windows
      </span>
    </motion.a>
  );
}

function InteractiveShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Universal Converter
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Konvertiere jedes Format in jedes andere. MP4, PNG, MP3, PDF - alles mit einem Klick.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 80 }}
          className="relative h-[400px] rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white backdrop-blur-xl overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <ConverterAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ConverterAnimation() {
  return (
    <div className="relative w-80 h-80">
      <motion.div
        className="absolute top-12 left-12 w-24 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white text-4xl shadow-lg"
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{
          x: [0, 40, 60, 40, 0],
          y: [0, 40, 60, 40, 0],
          opacity: [1, 0.8, 0, 0, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
        }}
      >
        MP4
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-28 h-28 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            ✨
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-12 right-12 w-24 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-3xl shadow-lg"
        initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
        animate={{
          x: [0, -40, -60, -40, 0],
          y: [0, -40, -60, -40, 0],
          opacity: [0, 0, 1, 0.8, 0],
          scale: [0.8, 0.9, 1, 0.9, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      >
        GIF
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-sky-400 rounded-full" />
        <div className="w-2 h-2 bg-sky-400 rounded-full" />
        <div className="w-2 h-2 bg-sky-400 rounded-full" />
      </motion.div>
    </div>
  );
}

function CoreFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const mainFeatures = [
    {
      icon: Zap,
      title: 'Universal Converter',
      description: 'Konvertiere jedes Format. MP4, PNG, MP3, PDF - alle Formate unterstützt.',
      color: 'from-amber-500/20 to-orange-500/20',
      span: 'col-span-2',
      delay: 0,
    },
    {
      icon: Sparkles,
      title: 'Encryption',
      description: 'Verschlüssele deine Dateien mit 256-bit AES. Absolute Sicherheit.',
      color: 'from-purple-500/20 to-pink-500/20',
      span: 'col-span-1',
      delay: 0.1,
    },
    {
      icon: Download,
      title: 'Global Drop-Hub',
      description: 'Ziehe Dateien von überall. OmniHub erscheint sofort.',
      color: 'from-blue-500/20 to-cyan-500/20',
      span: 'col-span-1',
      delay: 0.2,
    },
    {
      icon: Rocket,
      title: 'Image Processing',
      description: 'Automatische Bildoptimierung, Zuschnitt, Filter - alles in Sekunden.',
      color: 'from-green-500/20 to-emerald-500/20',
      span: 'col-span-2',
      delay: 0.3,
    },
    {
      icon: FileText,
      title: 'Und vieles mehr...',
      description: 'App Launcher • KI-Assistent • System-Health • Batch Processing • Optimierung',
      color: 'from-gray-500/20 to-slate-500/20',
      span: 'col-span-3',
      delay: 0.4,
      isMore: true,
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">The Core</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Alles, was du brauchst, in einer Anwendung.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 auto-rows-max">
          {mainFeatures.map((feature, index) => (
            <BentoFeatureCard key={index} feature={feature} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoFeatureCard({ feature, isInView }: { feature: any; isInView: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 25,
      y: (e.clientY - rect.top - rect.height / 2) / 25,
    });
  };

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (isHovered) {
      rotateX.set(-mousePosition.y);
      rotateY.set(mousePosition.x);
    } else {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [mousePosition, isHovered, rotateX, rotateY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: feature.delay, type: 'spring', stiffness: 80 }}
      className={`${feature.span} relative group cursor-pointer`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative p-8 rounded-3xl backdrop-blur-xl overflow-hidden h-full flex flex-col justify-between min-h-64 ${
          feature.isMore ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80' : 'bg-white/40'
        }`}
        style={{
          border: '0.5px solid rgba(229, 231, 235, 0.5)',
          boxShadow: isHovered ? '0 20px 60px rgba(96, 165, 250, 0.15)' : '0 20px 60px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10">
          <motion.div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
              feature.isMore ? 'bg-gray-700' : 'bg-gray-900'
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <feature.icon className={`w-7 h-7 ${feature.isMore ? 'text-gray-200' : 'text-white'}`} />
          </motion.div>

          <h3 className={`text-2xl font-bold mb-3 ${feature.isMore ? 'text-white' : 'text-gray-900'}`}>
            {feature.title}
          </h3>
          <p className={`leading-relaxed ${feature.isMore ? 'text-gray-300' : 'text-gray-600'}`}>
            {feature.description}
          </p>
        </div>

        {feature.isMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4"
          >
            <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.5, repeat: Infinity }}>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold"
        >
          OmniHub
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-6"
        >
          <a
            href="https://github.com/Mini2023/OmniHub"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://raw.githubusercontent.com/Mini2023/OmniHub/refs/heads/main/changelog.txt"
            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <FileText className="w-6 h-6" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-600"
        >
          © 2024 OmniHub. Alle Rechte vorbehalten.
        </motion.p>
      </div>
    </footer>
  );
}

export default App;
