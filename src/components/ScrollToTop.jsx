import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full
        bg-[#062B5B] text-white shadow-xl
        transition-all duration-500 ease-out
        hover:bg-yellow-500 hover:text-[#062B5B] hover:scale-110
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        animate-bounce`}
    >
      <ArrowUp size={22} />
    </button>
  );
}
