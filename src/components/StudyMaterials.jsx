import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ================= CLASSES ================= */
const classes = [
  "Class 12 pass",
  "Class 12",
  "Class 11",
  "Class 10",
  "Class 9",
  "Class 8",
  "Class 7",
  "Class 6",
  "Class 1 - 5",
  "LKG - UKG",
];

/* ================= COMMON CARDS ================= */
const commonCards = [
  {
    title: "NCERT",
    subtitle: "solutions",
    img: "https://cdn-icons-png.flaticon.com/512/2436/2436636.png",
    bg: "bg-[#FFF2CC]",
  },
  {
    title: "Previous year",
    subtitle: "question papers",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png",
    bg: "bg-[#EEE6FF]",
  },
  {
    title: "NCERT",
    subtitle: "Books",
    img: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    bg: "bg-[#C8FFF1]",
  },
  {
    title: "Important",
    subtitle: "question papers",
    img: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
    bg: "bg-[#EDE6FF]",
  },
  {
    title: "Revision",
    subtitle: "notes",
    img: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png",
    bg: "bg-[#FFE2DC]",
  },
];

/* ================= MATERIAL DATA ================= */
const materials = classes.reduce((acc, cls) => {
  acc[cls] = commonCards;
  return acc;
}, {});

/* ================= COMPONENT ================= */
export default function StudyMaterials() {
  const [activeClass, setActiveClass] = useState("Class 11");
  const sliderRef = useRef(null);

  /* SCROLL HANDLER */
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      scroll("right");
    }, 4000);
    return () => clearInterval(timer);
  }, [activeClass]);

  return (
    <section className="  w-full  px-6 md:px-20 py-16">
      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Explore all our{" "}
        <span className="text-orange-500 relative">
          offerings
          <span className="absolute left-0 -bottom-1 w-full h-1 bg-yellow-300 -z-10" />
        </span>
      </h2>

      {/* CLASS TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => setActiveClass(cls)}
            className={`px-5 py-2 rounded-xl border text-sm font-medium transition
              ${
                activeClass === cls
                  ? "bg-[#001F2D] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-semibold mb-10">Study Materials</h3>

      {/* SLIDER */}
      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg h-10 w-10 rounded-full items-center justify-center"
        >
          <ChevronLeft />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg h-10 w-10 rounded-full items-center justify-center"
        >
          <ChevronRight />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6"
        >
          <AnimatePresence mode="wait">
            {materials[activeClass].map((item, i) => (
              <motion.div
                key={activeClass + i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className={`min-w-[260px] md:min-w-[280px] h-[300px] rounded-[24px] p-6 ${item.bg} flex flex-col justify-between`}
              >
                {/* TEXT */}
                <div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-lg">{item.subtitle}</p>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center">
                  <div className="h-[170px] w-[170px] rounded-full bg-white flex items-center justify-center shadow">
                    <img
                      src={item.img}
                      alt=""
                      className="h-[110px] object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* SCROLLBAR HIDE */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

          
            <div className="max-w-[110%] mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8">

  {/* LEFT CONTENT */}
  <div className="flex flex-col justify-center">
    <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#0f172a] leading-tight">
      Book your{" "}
      <span className="relative text-[#ff6b3d] inline-block">
        Free Demo
        <span className="absolute left-0 -bottom-2 w-full h-[6px] bg-[#ffe066] rounded-full"></span>
      </span>{" "}
      session
    </h1>

    <p className="mt-4 text-[16px] sm:text-[17px] text-[#475569] max-w-md">
      Get a free academic counselling session and discover the best learning plan for you.
    </p>

    <button className="mt-8 px-12 py-4 bg-yellow-500 rounded-full hover:bg-yellow-600 transition transform hover:scale-105 text-white text-[16px] font-semibold rounded-xl transition-all duration-300">
      Book a free demo
    </button>
  </div>

  {/* RIGHT IMAGE */}
  <div className="relative flex justify-center md:justify-end mt-12 md:mt-0">
    {/* OPTIONAL: Orange Circle Background */}
    <div className="absolute w-[360px] h-[360px] bg-[#ff6b3d] rounded-full opacity-20 -z-10"></div>

    {/* Demo Image */}
    <img
      src="/demo-open-form.webp" // replace with your actual image path
      alt="Free Demo"
      className="relative z-10 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px]"
    />
  </div>

</div>

       
    </section>
  );
}