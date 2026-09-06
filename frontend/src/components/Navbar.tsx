import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'AI Capabilities', href: '#ai-section' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3.5">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-6 py-2.5 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#FCFDFC]/90 backdrop-blur-md shadow-sm shadow-[#37292B]/5 border border-[#AEA1D0]/30'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Left: Brand Identity */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#37292B] via-[#4866A4] to-[#9579AE] flex items-center justify-center shadow-sm text-white transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-[#AEA1D0]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-[#37292B]">
              StudySync
            </span>
            <span className="text-[9px] uppercase tracking-widest font-semibold text-[#9579AE] -mt-1 hidden sm:block">
              Learning in sync
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-3.5 py-1.5 rounded-full text-[13.5px] font-medium text-[#37292B]/80 hover:text-[#37292B] hover:bg-[#AEA1D0]/15 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="text-[13.5px] font-semibold text-[#37292B] hover:text-[#4866A4] px-3.5 py-1.5 transition-colors"
          >
            Sign in
          </Link>
          <a
            href="#pricing"
            onClick={(e) => scrollToSection(e, '#pricing')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-[#37292B] hover:bg-[#4866A4] shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Book a demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/login"
            className="text-xs font-semibold text-[#37292B] px-2.5 py-1"
          >
            Sign in
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#37292B] hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#FCFDFC] border border-[#AEA1D0]/30 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#37292B] hover:bg-[#AEA1D0]/10"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="#pricing"
                  onClick={(e) => scrollToSection(e, '#pricing')}
                  className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-white bg-[#37292B]"
                >
                  Book a demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
