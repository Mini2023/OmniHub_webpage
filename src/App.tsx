import { motion, useSpring, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Download, Sparkles, Zap, Rocket, Github, FileText, LucideIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden text-slate-50 selection:bg-indigo-500/30">
      <MeshBackground />
      <HeroSection />
      <InteractiveShowcase />
      <CoreFeatures />
      <Footer />
    </div>
  );
}

function MeshBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-zinc-950">
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        animate={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.15), transparent 40%)`,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        animate={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.8 }}
      />

      {/* Floating Animated Orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/20 blur-[150px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[100px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Complex Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resize);

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        const colors = [
          'rgba(56, 189, 248, 0.8)', // sky
          'rgba(139, 92, 246, 0.8)', // violet
          'rgba(168, 85, 247, 0.8)'  // purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const pushX = (dx / distance) * force * 4;
          const pushY = (dy / distance) * force * 4;

          this.x -= pushX;
          this.y -= pushY;

          this.size = Math.min(this.size + 0.2, 4);
        } else {
          this.size = Math.max(this.size - 0.1, 1);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
      }
    }

    function initParticles() {
      particles = [];
      const numberOfParticles = Math.min((canvas!.width * canvas!.height) / 8000, 150);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize layout before starting
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}

function HeroSection() {
  const text = 'OmniHub';
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  const xTransform = useSpring(mousePosition.x * 0.05, { stiffness: 100, damping: 30 });
  const yTransform = useSpring(mousePosition.y * 0.05, { stiffness: 100, damping: 30 });

  useEffect(() => {
    xTransform.set(mousePosition.x * 0.05);
    yTransform.set(mousePosition.y * 0.05);
  }, [mousePosition, xTransform, yTransform]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
      style={{ perspective: 1000 }}
    >
      <HeroParticles />
      <motion.div
        className="max-w-5xl mx-auto text-center"
        style={{ x: xTransform, y: yTransform }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block py-2">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 relative z-20" style={{ filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))' }}>
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 100, rotateX: -90, filter: 'blur(20px) brightness(0)' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px) brightness(1.2)',
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: index * 0.1 },
                    y: { duration: 1, delay: index * 0.1, type: "spring", stiffness: 50 },
                    rotateX: { duration: 1, delay: index * 0.1, type: "spring", stiffness: 50 },
                    filter: { duration: 0.8, delay: index * 0.1 },
                    backgroundPosition: { duration: 10, repeat: Infinity, ease: 'linear' }
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500"
                  style={{ transformOrigin: 'bottom', display: 'inline-block', position: 'relative', backgroundSize: '200% auto' }}
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
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Der ultimative Hub für alle nervigen Alltagstasks. Drag and Drop und fertig. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: 'spring', stiffness: 100 }}
        >
          <GlowButton mousePosition={mousePosition} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-indigo-400 rounded-full mt-2 shadow-[0_0_10px_rgba(129,140,248,0.8)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function GlowButton({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const rotateX = useSpring(0, { stiffness: 300, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = mousePosition.x - (rect.left - window.innerWidth / 2);
      const y = mousePosition.y - (rect.top - window.innerHeight / 2);

      rotateX.set(-y * 0.2);
      rotateY.set(x * 0.2);
    } else {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [mousePosition, isHovered, rotateX, rotateY]);

  const DOWNLOAD_URL = "https://github.com/Mini2023/OmniHub/releases/download/public/OmniHub_v4.5.1_Setup.exe";

  return (
    <motion.a
      ref={buttonRef}
      href={DOWNLOAD_URL}
      download
      className="relative inline-flex px-12 py-5 text-lg font-bold rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white overflow-visible group items-center justify-center no-underline cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(150px circle at 50% 50%, rgba(139, 92, 246, 0.4), transparent)`,
        }}
      />
      <div className="absolute inset-[-1px] rounded-[17px] bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 -z-10 blur-md transition-all duration-500 group-hover:duration-200" />
      <div className="absolute inset-[1px] rounded-2xl bg-zinc-900 -z-10" />

      <span
        className="relative flex items-center gap-3 pointer-events-none"
        style={{ transform: "translateZ(20px)" }}
      >
        <Download className="w-6 h-6 text-sky-400 group-hover:text-indigo-400 transition-colors" />
        Download für Windows
      </span>
    </motion.a>
  );
}

function InteractiveShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <section ref={containerRef} className="py-32 px-6 perspective-1000 relative z-20">
      <motion.div
        className="max-w-6xl mx-auto"
        style={{ scale, opacity, rotateX, transformStyle: 'preserve-3d' }}
      >
        <div className="text-center mb-20" style={{ transform: 'translateZ(50px)' }}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-300 to-purple-300">
            Universal Converter
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Konvertiere jedes Format in jedes andere. MP4, PNG, MP3, PDF - alles mit einem Klick.
          </p>
        </div>

        <div
          className="relative h-[500px] rounded-[3rem] border border-white/10 bg-zinc-900/50 backdrop-blur-2xl overflow-visible shadow-2xl"
          style={{
            boxShadow: '0 0 100px rgba(99, 102, 241, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)',
            transform: 'translateZ(100px)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-[3rem]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ConverterAnimation />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ConverterAnimation() {
  return (
    <div className="relative w-full max-w-md h-96" style={{ transformStyle: 'preserve-3d' }}>
      <motion.div
        className="absolute top-1/4 left-0 w-32 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(225,29,72,0.4)] border border-white/20"
        initial={{ x: -100, y: 0, opacity: 0, rotateY: -30, rotateX: 10 }}
        animate={{
          x: [0, 100, 150, 100, 0],
          y: [0, 50, 80, 50, 0],
          opacity: [1, 0.8, 0, 0, 1],
          rotateY: [-30, 0, 30, 0, -30],
          rotateX: [10, 0, -10, 0, 10],
          scale: [1, 0.8, 0.5, 0.8, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: 'center right' }}
      >
        MP4
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-40 h-40 rounded-full border border-indigo-500/30 flex items-center justify-center bg-indigo-500/10 backdrop-blur-md shadow-[0_0_50px_rgba(99,102,241,0.2)]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          >
            <Sparkles className="w-16 h-16 text-indigo-300" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-0 w-32 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-white/20"
        initial={{ x: 100, y: 0, opacity: 0, scale: 0.5, rotateY: 30, rotateX: -10 }}
        animate={{
          x: [0, -100, -150, -100, 0],
          y: [0, -50, -80, -50, 0],
          opacity: [0, 0, 1, 0.8, 0],
          scale: [0.5, 0.8, 1, 0.8, 0.5],
          rotateY: [30, 0, -30, 0, 30],
          rotateX: [-10, 0, 10, 0, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{ transformOrigin: 'center left' }}
      >
        GIF
      </motion.div>

      <motion.div
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"
          />
        ))}
      </motion.div>
    </div>
  );
}

function CoreFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const mainFeatures = [
    {
      icon: Zap,
      title: 'Universal Converter',
      description: 'Konvertiere jedes Format. MP4, PNG, MP3, PDF - alle Formate unterstützt.',
      color: 'from-amber-500/20 via-orange-500/10 to-transparent',
      glow: 'rgba(245, 158, 11, 0.15)',
      span: 'col-span-1 md:col-span-2',
    },
    {
      icon: Sparkles,
      title: 'Encryption',
      description: 'Verschlüssele deine Dateien mit 256-bit AES. Absolute Sicherheit.',
      color: 'from-purple-500/20 via-pink-500/10 to-transparent',
      glow: 'rgba(168, 85, 247, 0.15)',
      span: 'col-span-1',
    },
    {
      icon: Download,
      title: 'Global Drop-Hub',
      description: 'Ziehe Dateien von überall. OmniHub erscheint sofort.',
      color: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      glow: 'rgba(59, 130, 246, 0.15)',
      span: 'col-span-1',
    },
    {
      icon: Rocket,
      title: 'Image Processing',
      description: 'Automatische Bildoptimierung, Zuschnitt, Filter - alles in Sekunden.',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      glow: 'rgba(16, 185, 129, 0.15)',
      span: 'col-span-1 md:col-span-2',
    },
    {
      icon: FileText,
      title: 'Und vieles mehr...',
      description: 'App Launcher • KI-Assistent • System-Health • Batch Processing • Optimierung',
      color: 'from-indigo-500/20 via-slate-500/10 to-transparent',
      glow: 'rgba(99, 102, 241, 0.15)',
      span: 'col-span-1 md:col-span-3',
      isMore: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <section ref={ref} className="py-32 px-6 bg-zinc-950 relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">The Core</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Alles, was du brauchst, in einer Anwendung. High-End Performance.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 auto-rows-max"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {mainFeatures.map((feature, index) => (
            <BentoFeatureCard key={index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  glow: string;
  span: string;
  isMore?: boolean;
}

function BentoFeatureCard({ feature }: { feature: Feature }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`${feature.span} relative group cursor-pointer perspective-1000`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={cardRef}
        className={`relative p-8 rounded-[2rem] backdrop-blur-xl overflow-hidden h-full flex flex-col justify-between min-h-64 transition-transform duration-500 ease-out bg-zinc-900/40 border border-white/10`}
        style={{
          boxShadow: isHovered ? `0 20px 60px ${feature.glow}, inset 0 0 20px rgba(255,255,255,0.05)` : '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0px rgba(255,255,255,0)',
          transform: isHovered ? `translateZ(20px) scale(1.02)` : 'translateZ(0px) scale(1)'
        }}
      >
        {/* Spotlight Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
          animate={{
            background: isHovered ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)` : ''
          }}
        />

        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />

        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          <motion.div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-zinc-800 border border-white/5 shadow-inner`}
            whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <feature.icon className={`w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
          </motion.div>

          <h3 className={`text-2xl font-bold mb-3 text-white drop-shadow-md`}>
            {feature.title}
          </h3>
          <p className={`leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors duration-300`}>
            {feature.description}
          </p>
        </div>

        {feature.isMore && (
          <motion.div
            className="absolute top-6 right-6 z-10"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-zinc-950 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-white tracking-wider"
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
            className="p-3 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-white/20 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] transition-all duration-300 text-slate-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://raw.githubusercontent.com/Mini2023/OmniHub/refs/heads/main/changelog.txt"
            className="p-3 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-white/20 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] transition-all duration-300 text-slate-300"
          >
            <FileText className="w-6 h-6" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-500"
        >
          © 2024 OmniHub. Alle Rechte vorbehalten.
        </motion.p>
      </div>
    </footer>
  );
}

export default App;
