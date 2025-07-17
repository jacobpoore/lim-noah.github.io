"use client"
import { useState, useEffect } from "react"
import { FaLinkedinIn, FaWater, FaFish } from "react-icons/fa"
import { GiSubmarine } from "react-icons/gi"
import { GiWaveSurfer, GiSailboat } from "react-icons/gi"
import Darkmode from "./Darkmode"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      setScrolled(window.scrollY > 10)

      for (const section of sections) {
        const element = section === "home" ? document.body : document.getElementById(section)

        if (element) {
          const offsetTop = section === "home" ? 0 : element.offsetTop
          const offsetBottom = offsetTop + (section === "home" ? window.innerHeight : element.offsetHeight)

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    setMenuOpen(false)

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({ top: offsetTop, behavior: "smooth" })
      }
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: <GiSailboat className="inline mr-2" /> },
    { id: "about", label: "About", icon: <FaWater className="inline mr-2" /> },
    { id: "projects", label: "Projects", icon: <GiSubmarine className="inline mr-2" /> },
    { id: "contact", label: "Contact", icon: <GiWaveSurfer className="inline mr-2" /> },
  ]

  return (
    <nav className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? "bg-white/90 dark:bg-blue-950/90 border-blue-200/50 dark:border-blue-900/50 shadow-lg dark:shadow-blue-900/20"
        : "bg-white/80 dark:bg-blue-950/80 border-transparent"
    }`}>
      {/* Ocean wave decorative element */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 dark:from-blue-600 dark:via-teal-600 dark:to-emerald-600 opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with ocean theme */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent hover:from-blue-700 hover:to-teal-600 dark:hover:from-blue-300 dark:hover:to-teal-200 transition-all duration-300 transform hover:scale-105 focus:outline-none rounded-lg px-3 py-1 flex items-center"
          >
            <FaFish className="mr-2 text-blue-500 dark:text-teal-300" />
            <span className="font-mono">N.Lim</span>
          </button>

          {/* Mobile menu button with darkmode toggle */}
          <div className="flex md:hidden items-center">
            <Darkmode className="mr-3 text-blue-600 dark:text-teal-400 hover:text-blue-800 dark:hover:text-teal-300" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 dark:text-teal-400 hover:text-blue-800 dark:hover:text-teal-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${menuOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <ul className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-teal-300 shadow-inner shadow-blue-200/50 dark:shadow-blue-900/30"
                      : "text-blue-800/90 dark:text-teal-200/90 hover:bg-blue-50/70 dark:hover:bg-blue-900/30 hover:text-blue-900 dark:hover:text-teal-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}

            {/* Social icon */}
            <li>
              <a
                href="https://linkedin.com/in/lim-noah"
                target="_blank"
                rel="noopener noreferrer"f
                className="flex items-center justify-center p-2 rounded-full text-blue-700 dark:text-teal-300 hover:text-blue-900 dark:hover:text-teal-100 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-all duration-200 focus:outline-none"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </li>

            {/* Darkmode toggle - desktop */}
            <li>
              <Darkmode className="hidden md:block text-blue-600 dark:text-teal-400 hover:text-blue-800 dark:hover:text-teal-300" />
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-6 border-t border-blue-200/50 dark:border-blue-900/50 pt-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center w-full text-left py-3 px-6 rounded-full transition-all duration-200 font-medium ${
                  activeSection === item.id 
                    ? "bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-teal-300"
                    : "text-blue-800/90 dark:text-teal-200/90 hover:bg-blue-50/70 dark:hover:bg-blue-900/30"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Social Link */}
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-3 px-6 rounded-full text-blue-800/90 dark:text-teal-200/90 hover:bg-blue-50/70 dark:hover:bg-blue-900/30 transition-all duration-200"
            >
              <FaLinkedinIn className="w-5 h-5 mr-3" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}