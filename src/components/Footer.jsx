import {
  ShieldCheck,
  Lock,
  Accessibility,
  Twitter,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#062B5B] text-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Brand + Logo + Trust */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            {/* <img
              src="/eduvion-logo.png"
              alt="Eduvion Logo"
              className="h-10 w-10 object-contain"
            /> */}
            <h2 className="text-2xl font-bold text-yellow-500">
              Eduvion 
            </h2>
          </div>

          <p className="text-blue-200 text-sm mb-6 leading-relaxed">
            A modern learning management system designed to empower
            institutions, educators, and learners with smart digital education.
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
              <span>ISO/IEC 27001:2022</span>
            </li>
            <li className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
              <span>ISO 9001:2015</span>
            </li>
            <li className="flex items-center space-x-3">
              <Accessibility className="w-5 h-5 text-blue-300" />
              <span>Accessible & Inclusive</span>
            </li>
            <li className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-blue-300" />
              <span>GDPR Compliant</span>
            </li>
          </ul>
        </div>

        {/* Platform */}
        <FooterColumn
          title="Platform"
          items={[
            "Overview",
            "Features",
            "Integrations",
            "Mobile apps",
            "Pricing",
            "Why Eduvion LMS",
            "Get Eduvion LMS free",
            "Roadmap",
          ]}
        />

        {/* Solutions */}
        <FooterColumn
          title="Solutions"
          items={[
            "Use cases",
            "Industries",
            "Eduvion AI",
            "TalentCraft",
            "Skills",
            "Eduvion Library",
            "Course Solutions",
          ]}
        />

        {/* Resources */}
        <FooterColumn
          title="Resources"
          items={[
            "Blog",
            "Webinars",
            "Podcast",
            "eBooks",
            "Research",
            "What is an LMS?",
            "ROI Calculator",
          ]}
        />

        {/* Company + Social */}
        <div>
          <h3 className="font-semibold mb-6 text-white">Company</h3>
          <ul className="space-y-2 text-blue-200 mb-6">
            {[
              "About us",
              "Our customers",
              "Customer awards",
              "Support services",
              "Innovation hub",
              "Affiliates",
              "Contact us",
            ].map((item) => (
              <li
                key={item}
                className="cursor-pointer transition transform hover:text-yellow-500 hover:scale-105"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <SocialIcon Icon={Twitter} />
            <SocialIcon Icon={Linkedin} />
            <SocialIcon Icon={Instagram} />
            <SocialIcon Icon={Github} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 mt-12 py-6 text-blue-200 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Eduvion. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            {[
              "Knowledge Base",
              "FAQ",
              "Privacy",
              "Security",
              "Terms of Service",
            ].map((item) => (
              <span
                key={item}
                className="cursor-pointer transition transform hover:text-yellow-500 hover:scale-105"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* 🔹 Reusable Components */

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="font-semibold mb-6 text-white">{title}</h3>
      <ul className="space-y-2 text-blue-200">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-pointer transition transform hover:text-yellow-500 hover:scale-105"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ Icon }) {
  return (
    <a
      href="#"
      className="p-2 rounded-full bg-blue-800 hover:bg-yellow-500 transition transform hover:scale-110 shadow-md"
    >
      <Icon className="w-5 h-5 text-white" />
    </a>
  );
}
