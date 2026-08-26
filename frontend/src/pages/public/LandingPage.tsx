import { Link } from 'react-router-dom'
import { ArrowRight, Play, CheckCircle, GraduationCap, BarChart2, BookOpen, CreditCard, Shield, Smartphone, ChevronDown } from 'lucide-react'

const NAV_LINKS = ['Features', 'Solutions', 'Resources', 'Pricing', 'About']

const FEATURES = [
  { icon: <GraduationCap className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-50', title: 'Unified Platform', desc: 'All-in-one solution for admissions, academics, LMS, finance, and operations.' },
  { icon: <BarChart2 className="w-6 h-6 text-teal-600" />, bg: 'bg-teal-50', title: 'Smart Analytics', desc: 'Real-time insights and data-driven decisions with advanced analytics dashboard.' },
  { icon: <BookOpen className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-50', title: 'Modern LMS', desc: 'Engaging learning experience with powerful LMS and collaboration tools.' },
  { icon: <CreditCard className="w-6 h-6 text-orange-600" />, bg: 'bg-orange-50', title: 'Financial Management', desc: 'Streamlined fee collection, invoicing, and financial reporting made simple.' },
  { icon: <Shield className="w-6 h-6 text-green-600" />, bg: 'bg-green-50', title: 'Secure & Scalable', desc: 'Enterprise-grade security with scalable architecture for growing institutions.' },
  { icon: <Smartphone className="w-6 h-6 text-pink-600" />, bg: 'bg-pink-50', title: 'Mobile Ready', desc: 'Access anywhere, anytime with our responsive and mobile-first design.' },
]

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
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-600/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            StudySync<span className="text-blue-600">.</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {NAV_LINKS.map(link => (
              <button key={link} className="flex items-center gap-0.5 hover:text-slate-900 transition-colors">
                {link}
                {(link === 'Solutions' || link === 'Resources') && <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-60" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block px-2">Log in</Link>
            <Link to="/login" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm shadow-blue-600/30 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Left */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 shadow-sm">
            <span className="text-yellow-500">✦</span>
            StudySync 2.0 is now live
          </div>

          <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            The intelligent<br />
            operating system<br />
            for{' '}
            <span className="text-blue-600">modern<br />universities</span>
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-md">
            Unify admissions, academics, LMS, finance, and operations in one beautiful, enterprise-grade platform. Designed for administrators, loved by students.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link to="/login" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-full shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:shadow-blue-600/30 group">
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button className="flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-bold px-6 py-3 rounded-full hover:bg-slate-50 transition-colors bg-white shadow-sm">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-slate-500 text-slate-500 ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-500">
            {['No credit card required', 'Easy setup in 5 minutes', 'Cancel anytime'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-slate-400" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Dashboard Mockup */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/80">
            {/* Fake browser chrome */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[10px] text-slate-400 font-mono">
                app.studysync.edu/admin/dashboard
              </div>
            </div>

            {/* Fake Dashboard UI */}
            <div className="bg-white flex" style={{ minHeight: '360px' }}>
              {/* Sidebar */}
              <div className="w-44 shrink-0 border-r border-slate-100 bg-white p-3 flex-col gap-1 hidden sm:flex">
                <div className="flex items-center gap-2 px-2 py-2 mb-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center"><GraduationCap className="w-3.5 h-3.5 text-white" /></div>
                  <span className="text-xs font-bold text-slate-800">StudySync</span>
                </div>
                {['Dashboard', 'Students', 'Admissions', 'Academics', 'LMS', 'Finance', 'Exams', 'Attendance', 'Reports', 'Calendar', 'Messages', 'Settings'].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[11px] font-medium ${i === 0 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-slate-300'}`}></div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 bg-slate-50/50 overflow-hidden">
                {/* Topbar */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[11px] text-slate-400">Dashboard</p>
                    <p className="text-sm font-bold text-slate-800">Good morning, Dr. Sarah 👋</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200"></div>
                  </div>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { label: 'Total Students', value: '24,538', change: '+12.5%' },
                    { label: 'Active Courses', value: '1,259', change: '+8.2%' },
                    { label: 'Faculty Members', value: '1,125', change: '+7.1%' },
                    { label: 'Revenue This Month', value: '$128,430', change: '+16.3%' },
                  ].map(k => (
                    <div key={k.label} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                      <p className="text-[9px] text-slate-400 mb-1">{k.label}</p>
                      <p className="text-sm font-extrabold text-slate-900 leading-tight">{k.value}</p>
                      <p className="text-[9px] text-green-600 font-semibold mt-0.5">{k.change}</p>
                    </div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-700 mb-2">Admissions Overview</p>
                    <div className="flex items-end gap-1 h-16">
                      {[40,55,35,70,50,65,80,60,75,55,85,70].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col gap-0.5 items-center">
                          <div className="w-full bg-blue-600 rounded-t-sm opacity-70" style={{ height: `${h}%` }}></div>
                          <div className="w-full bg-blue-200 rounded-t-sm" style={{ height: `${h * 0.6}%` }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <p className="text-[10px] font-bold text-slate-700 mb-2 self-start">Students by Faculty</p>
                    <div className="w-16 h-16 rounded-full border-8 border-blue-600 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-teal-400 rotate-45"></div>
                      <p className="text-[10px] font-extrabold text-slate-800">24,538</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating accent */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100 rounded-2xl -z-10"></div>
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-100 rounded-2xl -z-10"></div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-sm font-medium text-slate-400 mb-8">Trusted by 500+ universities and colleges worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {UNIVERSITIES.map(u => (
            <div key={u.name} className="flex items-center gap-2.5 opacity-50 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 font-bold text-xs">
                {u.abbr}
              </div>
              <span className="text-sm font-semibold text-slate-500">{u.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex flex-col items-start gap-3 group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 border-t border-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Simple, transparent pricing</h2>
            <p className="text-slate-500">Choose the plan that fits your institution size.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING.map((p, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border shadow-sm relative ${p.popular ? 'border-blue-500 shadow-blue-100' : 'border-slate-200'}`}>
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-xs text-slate-400 mb-5 h-8 leading-relaxed">{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-slate-400 text-sm">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`block text-center py-2.5 rounded-full text-sm font-bold transition-colors ${p.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">Ready to transform your campus?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join hundreds of forward-thinking institutions that have unified their operations with StudySync.</p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
              StudySync<span className="text-blue-500">.</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">The modern, comprehensive management platform for higher education institutions.</p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Security', 'API'] },
            { title: 'Resources', links: ['Documentation', 'Help Center', 'Blog', 'Case Studies'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Privacy', 'Terms'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-slate-100 font-bold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 StudySync Inc. Built with care by rehancodeofficial.</p>
          <div className="flex gap-5">
            {['Twitter', 'LinkedIn', 'GitHub'].map(s => <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}
