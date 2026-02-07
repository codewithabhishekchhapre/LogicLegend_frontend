import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text:
      "My name is Sushant Padha. I secured an AIR 52 in JEE Advanced 2024. I started my preparation with Physics Wallah in 11th grade by joining the Arjuna batch...",
    name: "Sushant Padha",
    meta: "JEE Advanced 2024 - AIR 52 | IIT JEE",
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    text:
      "My name is Karan Garg, and I secured 710 marks in the NEET UG 2024 exam, achieving an All India Rank of 429...",
    name: "Karan Garg",
    meta: "AIR 429 | NEET",
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    text:
      "Thanks to  faculties teach from basic and they are very supportive because of which I am able to secure AIR 99 in JEE Advanced 2024...",
    name: "Tanay",
    meta: "JEE Advanced 2024 - AIR 99 | IIT JEE",
    img: "https://i.pravatar.cc/100?img=3",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  // Auto slide
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full  py-20 px-4">
      <div className="max-w-6xl mx-auto relative">

        {/* Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto"
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              “{testimonials[index].text}”
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[index].img}
                alt={testimonials[index].name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {testimonials[index].name}
                </h4>
                <p className="text-sm text-indigo-600">
                  {testimonials[index].meta}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:scale-105 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:scale-105 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
