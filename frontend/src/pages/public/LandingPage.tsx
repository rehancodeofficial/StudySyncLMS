import { Link } from 'react-router-dom'
import { ArrowRight, Play, CheckCircle, GraduationCap, BarChart2, BookOpen, CreditCard, Shield, Smartphone, ChevronDown, Check, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = ['Features', 'Solutions', 'Resources', 'Pricing', 'About']

const UNIVERSITIES = [
  { name: 'Greenfield University', abbr: 'G' },
  { name: 'Riverdale University', abbr: 'R' },
  { name: 'Lakeside College', abbr: 'L' },
  { name: 'Northwood University', abbr: 'N' },
  { name: 'Eastern State University', abbr: 'E' },
  { name: 'Summit College', abbr: 'S' },
]

const PRICING = [
  { name: 'Starter', price: '$299', period: '/month', desc: 'Perfect for small colleges (up to 500 students)', features: ['Student & Faculty portals', 'LMS basics', 'Attendance tracking', 'Email support', '5 admin users'] },
  { name: 'Professional', price: '$799', period: '/month', desc: 'For growing universities (up to 2,500 students)', features: ['All Starter features', 'Finance & Fees module', 'Library & Transport', 'Analytics & Reports', 'Priority support', '25 admin users'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large institutions (unlimited students)', features: ['All Professional features', 'Custom integrations', 'Dedicated SLA', 'White-labeling', 'On-premise option', 'Unlimited admins'] },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 overflow-x-hidden selection:bg-blue-600/30 font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#020817]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-white text-xl tracking-tight">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            StudySync<span className="text-blue-500">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_LINKS.map(link => (
              <button key={link} className="flex items-center gap-1 hover:text-white transition-colors">
                {link}
                {(link === 'Solutions' || link === 'Resources') && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">Log in</Link>
            <Link to="/login" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></span>
              <div className="relative bg-[#020817] flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 group-hover:bg-[#020817]/50 transition-colors">
                <span className="text-sm font-semibold text-white">Get Started</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            StudySync 2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
            The intelligent OS for <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
              modern universities.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
            Unify admissions, academics, LMS, finance, and operations in one beautiful, enterprise-grade platform. Built for the future of education.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5">
              Start Free Trial
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-base font-bold px-8 py-4 rounded-full backdrop-blur-md transition-all">
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </button>
          </div>

          {/* Trusted By */}
          <div className="pt-10 border-t border-white/5 w-full max-w-3xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Trusted by innovative institutions worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale">
              {UNIVERSITIES.map(u => (
                <div key={u.name} className="flex items-center gap-2 font-bold text-lg text-white">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    {u.abbr}
                  </div>
                  <span className="hidden sm:block">{u.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Mockup (Abstract representation) */}
        <section className="max-w-6xl mx-auto px-6 mb-32 relative perspective-1000">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 bg-[#0a0f1e]/80 backdrop-blur-2xl transform rotate-x-2 scale-95 hover:scale-100 hover:rotate-x-0 transition-all duration-700 ease-out">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="h-48 rounded-xl bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-white/5 p-6 flex flex-col justify-end">
                   <div className="w-1/2 h-4 bg-white/20 rounded-full mb-3"></div>
                   <div className="w-3/4 h-8 bg-white/30 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-24 rounded-xl bg-indigo-500/20 border border-indigo-500/20"></div>
                <div className="h-56 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col gap-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 rounded-lg bg-white/5 flex items-center px-3 gap-3">
                       <div className="w-6 h-6 rounded-full bg-white/10"></div>
                       <div className="flex-1 h-3 rounded-full bg-white/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Box Features */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Everything you need, <br/>beautifully integrated.</h2>
            <p className="text-slate-400 text-lg">A truly unified experience that removes data silos and accelerates learning outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {/* Main Feature 1 */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-linear-to-br from-blue-900/40 to-indigo-900/40 border border-white/10 p-10 flex flex-col relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 backdrop-blur-md">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 mt-auto">Next-Gen LMS</h3>
              <p className="text-slate-400 text-lg max-w-md">Deliver engaging, interactive content with our modern learning management system. Real-time collaboration, auto-grading, and rich media support built-in.</p>
            </div>

            {/* Minor Feature 1 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col group hover:bg-white/10 transition-colors relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-6 border border-teal-500/20">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 mt-auto">Smart Analytics</h3>
              <p className="text-slate-400 text-sm">Real-time insights and predictive modeling to track student success and institutional health.</p>
            </div>

            {/* Minor Feature 2 */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col group hover:bg-white/10 transition-colors relative overflow-hidden">
               <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-6 border border-orange-500/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 mt-auto">Financial Management</h3>
              <p className="text-slate-400 text-sm">Automated fee collection, transparent invoicing, and seamless payment gateways.</p>
            </div>

            {/* Wide Feature */}
            <div className="md:col-span-3 rounded-3xl bg-linear-to-r from-purple-900/40 to-pink-900/40 border border-white/10 p-10 flex flex-col sm:flex-row items-center gap-10 group hover:border-purple-500/30 transition-colors relative overflow-hidden">
              <div className="absolute left-0 bottom-0 w-full h-32 bg-purple-500/10 blur-3xl"></div>
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20 backdrop-blur-md">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Enterprise Grade Security</h3>
                <p className="text-slate-400 text-lg max-w-xl">Your institution's data is secured with state-of-the-art encryption, multi-tenant isolation, and strict role-based access control (RBAC).</p>
              </div>
              <div className="hidden md:flex flex-1 justify-end">
                 <div className="w-48 h-48 border-[16px] border-white/5 rounded-full flex items-center justify-center border-t-purple-500 border-r-pink-500 rotate-45">
                   <div className="w-32 h-32 border-[12px] border-white/5 rounded-full border-l-blue-500 -rotate-90"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-7xl mx-auto px-6 py-24">
           <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Simple, transparent pricing.</h2>
            <p className="text-slate-400 text-lg">Scalable plans tailored for institutions of every size.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PRICING.map((plan, i) => (
              <div key={plan.name} className={`relative rounded-3xl p-8 backdrop-blur-xl transition-transform hover:-translate-y-2 ${plan.popular ? 'bg-blue-600/10 border border-blue-500/50 shadow-2xl shadow-blue-900/20 transform md:scale-105 z-10' : 'bg-white/5 border border-white/10'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6 h-10">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                
                <Link to="/login" className={`w-full py-3 rounded-full font-bold flex items-center justify-center transition-colors ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  Get Started
                </Link>

                <div className="mt-8 space-y-4">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-slate-300'}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="rounded-[3rem] bg-linear-to-br from-blue-600 to-indigo-800 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your campus?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join hundreds of universities moving to the modern standard of educational management.</p>
              <Link to="/login" className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 text-lg font-bold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105">
                Start your free trial <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020817] pt-16 pb-8 text-slate-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-white text-lg mb-6">
                <GraduationCap className="w-5 h-5 text-blue-500" />
                StudySync.
              </div>
              <p className="text-sm">The OS for modern universities.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 StudySync Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
