
import React from "react";
import { motion } from "framer-motion";
import StudyMaterials from "../components/StudyMaterials";
import ExploreCourses from "../components/ExploreCourses";
import FindCoursesSection from "../components/FindCoursesSection";
import CoursesForKidsSection from "../components/CoursesForKidsSection";
import TestimonialSlider from "../components/TestimonialSlider";
import HeroSection from "../components/HeroSection";
import ScrollToTop from "../components/ScrollToTop";
/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = { visible: { transition: { staggerChildren: 0.18 } } };

const floatAnimation = { animate: { y: [0, -12, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };

const cards = [
  { title: "Ace your CBSE/ICSE results!", desc: "Highest personal attention, One teacher One student", price: "₹ 888/hr" },
  { title: "Your best bet to JEE / NEET!", desc: "Individual Attention, Maximum Results! One teacher One student", price: "₹ 1,049/hr" },
  { title: "Get tailored learning for IB & IGCSE board!", desc: "Your path to Academic Excellence!", price: "₹ 1,249/hr" },
  { title: "Learn Java & Python with Vedantu!", desc: "From Good to Great: Improve your skills!", price: "₹ 999/hr" },
];

export default function App() {
  return (
    <>
     
    <div className="w-full font-sans bg-gradient-to-b from-white to-gray-50 text-gray-900 overflow-hidden">


        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[360px] h-[360px] bg-gradient-to-tr from-yellow-300 via-orange-200 to-pink-300 rounded-full blur-3xl opacity-70 animate-float-slow" />
          <div className="absolute -bottom-28 -right-20 w-[460px] h-[460px] bg-gradient-to-tr from-pink-300 via-purple-200 to-blue-200 rounded-full blur-3xl opacity-60 animate-float-slow-slower" />

          <div className="max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 py-14 gap-6 relative z-10">
            {/* LEFT HERO TEXT */}
            <motion.div className="flex flex-col items-start gap-3" variants={stagger} initial="hidden" animate="visible">
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-snug tracking-tight">
                Modern <br />
                Education for <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">the Future</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-gray-600 text-base sm:text-lg max-w-md">
                Empower your learning journey with interactive tools, real-time insights, and smarter learning experiences.
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-4 mt-4 flex-wrap">
                <motion.button whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(255,165,0,0.25)" }} whileTap={{ scale: 0.95 }} className="bg-yellow-400 text-white px-6 py-3 rounded-full shadow-lg transition-all font-medium text-sm sm:text-base">
                  Get Started
                </motion.button>
                <motion.button whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(255,200,100,0.25)" }} whileTap={{ scale: 0.95 }} className="bg-white text-yellow-500 border border-yellow-400 px-6 py-3 rounded-full shadow hover:shadow-md transition-all font-medium text-sm sm:text-base">
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT HERO IMAGE */}
            <motion.div className="relative flex justify-center items-center w-full" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <motion.div animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute rounded-full bg-gradient-to-tr from-yellow-200 via-orange-100 to-pink-200 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] blur-2xl opacity-50" />
              {[{ icon: "🎓", top: "20%", left: "-8%" }, { icon: "💡", top: "60%", left: "5%" }, { icon: "📚", top: "35%", right: "-10%" }, { icon: "🤖", bottom: "15%", right: "5%" }].map((item, i) => (
                <motion.div key={i} animate={{ y: [0, -8, 0], x: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 + i }} className="absolute bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold" style={{ top: item.top, left: item.left, right: item.right }}>
                  {item.icon}
                </motion.div>
              ))}
              <motion.img animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} src="/portrait-schoolgirl-yellow-background 2.png" className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[440px] lg:h-[440px] object-contain drop-shadow-xl rounded-xl" alt="student" />
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-[80%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ title: "Live Chat", desc: "Instant help from our expert tutors", icon: "💬" }, { title: "Examination", desc: "Prepare and test your skills efficiently", icon: "📝" }, { title: "Competition", desc: "Engage in fun learning challenges", icon: "🏆" }].map((f, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, scale: 1.04 }} className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h4 className="font-semibold text-lg mb-1">{f.title}</h4>
              <p className="text-gray-500 text-sm sm:text-base">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= CTA ================= */}
        <section className="max-w-[80%] mx-auto px-6 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0f172a]">
            Achieve more with eduvion, get <span className="text-[#ff6b3d] font-bold">Free</span> online counselling now
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition transform hover:scale-105 text-white text-[16px] font-semibold rounded-xl">Book a demo</button>
            <button className="bg-white text-yellow-500 border border-yellow-400 px-6 py-3 rounded-full shadow hover:shadow-md transition-all font-medium text-sm sm:text-base">Learn LIVE</button>
          </div>
        </section>

        {/* ================= AI CARD ================= */}
        <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full flex justify-center py-16">
          
          <div className="w-[80%] bg-[#1c1f2e] rounded-2xl px-8 lg:px-16 py-10 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-[45%] text-white">
              
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">Reimagine your career in the AI era</h2>
              <p className="text-gray-300 mb-6 leading-[26px]">Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts.</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 text-sm">
                {[{ icon: "🤖", text: "Learn AI and more" }, { icon: "🎓", text: "Prep for a certification" }, { icon: "🧠", text: "Practice with AI coaching" }, { icon: "🚀", text: "Advance your career" }].map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-full bg-[#2a2e45] flex items-center justify-center">{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }} className="bg-yellow-500 rounded-full hover:bg-yellow-600 transition transform hover:scale-105 text-black px-8 py-2.5 rounded-xl font-medium">Learn more</motion.button>
              <p className="text-gray-400 text-sm mt-2">Starting at ₹500/month</p>
            </div>
            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-[55%] flex justify-center">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src="/ai-career@2x.webp" className="h-[400px] w-full max-w-[90%] rounded-xl object-cover shadow-2xl" alt="AI visual" />
            </div>
            
          </div>
         
        </motion.section>

        {/* ================= Find the Course (real LMS courses) ================= */}
        <FindCoursesSection />

        {/* ================= Explore Courses ================= */}
        <div className="max-w-[90%] mx-auto">
           <HeroSection/>
           <ExploreCourses />
        </div>
        {/* ================= COURSES FOR KIDS ================= */}
        <CoursesForKidsSection />

        {/* ================= ONE-TO-ONE TUTORING ================= */}
       <div className="max-w-[90%] mx-auto px-6 lg:px-20">

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10"
      >

        {/* LEFT CONTENT */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-orange-500">One-to-One</span>{" "}
            <span className="text-[#002333]">Tutoring</span>
          </h2>

          <p className="text-lg text-[#002333] mt-2 font-medium relative inline-block">
            Highest Personal Attention

            {/* Animated underline */}
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block h-[3px] bg-purple-500 mt-1 rounded"
            />
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.img
          src="/c43608bf-9b88-4fd3-a887-45f35bf0e07b-1733407733746-4102608225532275.png"
          alt="tutor"
          className="w-[260px] mt-6 md:mt-0"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          animate={{ y: [0, -8, 0] }}
        />

      </motion.div>
    </div>

        {/* ================= CARDS ================= */}
        <div className="max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-0 lg:px-0 mb-12">
          {cards.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-3"><span className="text-orange-500 font-bold">🎓</span></div>
              <div>
                <h3 className="text-lg font-semibold text-[#002333] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
              <hr className="my-3" />
              <p className="text-green-600 font-semibold mb-2">Starts At {item.price}</p>
              <button className="w-full bg-yellow-500 rounded-full hover:bg-yellow-600 transition transform hover:scale-105  text-white py-2.5 rounded-lg font-semibold text-sm">Find personal tutor &gt;</button>
            </motion.div>
          ))}
        </div>



<section className="relative bg-[#062B5B] py-24 overflow-hidden">
      {/* TOP CURVE */}
      <div className="absolute top-0 left-0 w-full h-16 bg-white rounded-b-[100%]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
          Training built for every audience
        </h2>

        <p className="max-w-3xl mx-auto text-sm md:text-base text-white/80 mb-16 leading-relaxed">
          Whether you're training staff, onboarding partners, or educating
          customers, TalentLMS helps you deliver the right training to the right
          people. No extra platforms. No back and forth.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Card 1 */}
          <div className="text-center">
            <div className="bg-[#D9EEFF] rounded-2xl p-4 mb-5">
              <img
                src="/WhatsApp Image 2026-02-03 at 4.20.23 PM.jpeg"
                alt="Employee training"
                className="rounded-xl w-full h-[180px] object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">Employee training</h3>
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <div className="bg-[#D9EEFF] rounded-2xl p-4 mb-5">
              <img
                src="/WhatsApp Image 2026-02-03 at 4.20.03 PM.jpeg"
                alt="Onboarding training"
                className="rounded-xl w-full h-[180px] object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">Onboarding training</h3>
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <div className="bg-[#D9EEFF] rounded-2xl p-4 mb-5">
              <img
                src="/WhatsApp Image 2026-02-03 at 4.19.47 PM.jpeg"
                alt="Partner training"
                className="rounded-xl w-full h-[180px] object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">Partner training</h3>
          </div>

          {/* Card 4 */}
          <div className="text-center">
            <div className="bg-[#D9EEFF] rounded-2xl p-4 mb-5">
              <img
                src="/WhatsApp Image 2026-02-03 at 4.20.11 PM.jpeg"
                alt="Customer training"
                className="rounded-xl w-full h-[180px] object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">Customer training</h3>
          </div>
        </div>

        {/* BUTTON */}
        <button className="bg-yellow-500 text-white px-11 py-3 rounded-full font-medium shadow-md transition-all 
  duration-300 
 hover:bg-yellow-400 hover:text-[#062B5B]
  hover:scale-105 ">
          See all solutions
        </button>
      </div>

      {/* BOTTOM CURVE */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[100%]" />
    </section>



        {/* ================= STUDY MATERIALS ================= */}
        <div className="max-w-[90%] mx-auto">
          <TestimonialSlider/>
          <StudyMaterials />
        </div>

        {/* ================= FOOTER ================= */}
       
        <ScrollToTop/>
      </div>
    </>
  );
}
