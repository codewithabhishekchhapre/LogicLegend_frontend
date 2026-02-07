import { motion } from "framer-motion";

export default function TalentLMSLanding() {
  return (
    <main className="w-full e overflow-hidden">
      <HeroSection />
      <ScaleSection />
    </main>
  );
}

/* ===================== HERO SECTION ===================== */
function HeroSection() {
  return (
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-10 h-10 mb-6 rounded-xl bg-gradient-to-br from-orange-400 to-blue-600" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Simple to start. <br /> Live 2x faster.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Sign up in seconds and build your training easily. With AI-assisted
            course creation and an intuitive setup, you’ll launch 2x faster
            than the typical LMS setup—no IT, no complex buying process.
          </p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white p-6 rounded-3xl shadow-2xl">
            <img
              src="/eba8a817239c75a97d8064db7d42e859.jpg"
              alt="Create course UI"
              className="rounded-2xl w-full"
            />
          </div>

          <FloatingTag text="Create a course about…" color="orange" position="-left-10 top-24" />
          <FloatingTag text="Create an image about…" color="purple" position="right-0 top-52" />
          <FloatingTag text="Create an outline about…" color="blue" position="-left-6 bottom-16" />
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== SCALE SECTION ===================== */
function ScaleSection() {
  return (
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className=" p-4 rounded-3xl shadow-2xl">
            <img
              src="/image.png"
              alt="Portal dashboard"
              className="rounded-2xl w-full"
            />
          </div>

          
        </motion.div>

        {/* RIGHT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-orange-400 to-blue-600" />

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Scales as you grow. <br /> Stays easy to use.
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            As teams grow, and new audiences come on board, the platform makes
            it easy to deliver tailored training at scale without adding
            complexity. Set up separate training portals for employees,
            partners, or customers while keeping everything centralized.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== FLOATING TAG ===================== */
function FloatingTag({ text, color, position }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600 border-orange-300",
    purple: "bg-purple-100 text-purple-600 border-purple-300",
    blue: "bg-blue-100 text-blue-600 border-blue-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className={`absolute ${position} px-4 py-3 rounded-xl border shadow-md text-sm font-medium ${colors[color]}`}
    >
      “{text}”
    </motion.div>
  );
}
