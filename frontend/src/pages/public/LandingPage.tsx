import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, ShieldCheck, BarChart4, ChevronDown, CheckCircle2 } from 'lucide-react'

const INSTITUTION_TYPES = ['University', 'College', 'School', 'Academy', 'Training Organization']

export function LandingPage() {
  const [activeInstitution, setActiveInstitution] = useState(0)

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-600/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-white text-xl tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
            StudySync
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Platform</span>
            <span className="hover:text-white cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">Sign in</Link>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2 rounded-full transition-all">Book a demo</Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-24">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center relative z-10">
          <h1 className="text-6xl md:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
            The operating system <br/>
            <span className="text-slate-400">for modern education.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-12">
            One intelligent platform for institutions to teach, manage, understand, and improve learning.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
            <Link to="/login" className="bg-white text-slate-900 hover:bg-slate-200 text-base font-bold px-8 py-4 rounded-full transition-all">
              Book a demo
            </Link>
            <Link to="/login" className="flex items-center gap-2 text-white text-base font-bold px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all group">
              Explore the platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Hero Ecosystem Visual */}
          <div className="w-full max-w-4xl h-[400px] relative border border-white/5 rounded-3xl bg-[#0a0f1e]/50 backdrop-blur-3xl overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-900/20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <div className="px-6 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-blue-400 font-mono text-sm tracking-widest mb-12 relative">
                STUDYSYNC
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-12 bg-linear-to-b from-blue-500/50 to-transparent"></div>
              </div>
              
              <div className="flex gap-16 md:gap-32 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 -z-10"></div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md relative">
                     <div className="absolute inset-0 border border-white/20 rounded-2xl animate-ping opacity-20"></div>
                     <span className="text-xs font-bold text-slate-300">TEACH</span>
                  </div>
                  <div className="w-[1px] h-8 bg-linear-to-b from-white/20 to-transparent"></div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md relative">
                     <span className="text-xs font-bold text-slate-300">LEARN</span>
                  </div>
                  <div className="w-[1px] h-8 bg-linear-to-b from-white/20 to-transparent"></div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md relative">
                     <span className="text-xs font-bold text-slate-300">MANAGE</span>
                  </div>
                  <div className="w-[1px] h-8 bg-linear-to-b from-white/20 to-transparent"></div>
                </div>
              </div>

              <div className="mt-8 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-xs font-bold tracking-widest">
                INTELLIGENCE & OUTCOMES
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. PRODUCT PILLARS --- */}
        <section className="border-t border-white/5 py-32 bg-[#020617]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-16">One institution. One learning environment.<br/><span className="text-slate-500">One source of truth.</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: 'Intelligent Teaching', d: 'Create courses, lessons, assignments, assessments, and learning experiences from one workspace.' },
                { t: 'Connected Learning', d: 'Give students a unified environment for courses, resources, assignments, assessments, progress, and communication.' },
                { t: 'Institutional Control', d: 'Give organizations complete control over their academic structure, users, departments, programs, courses, and policies.' },
                { t: 'Learning Intelligence', d: 'Transform learning activity into meaningful insights about engagement, performance, completion, and student progress.' },
                { t: 'AI-Assisted Education', d: 'Use AI to help educators create content, identify learning gaps, understand performance, and personalize learning.' }
              ].map((p, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-4">{p.t}</h3>
                  <p className="text-slate-400 leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3. AI EXPERIENCE --- */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-6">
                <BrainCircuit className="w-5 h-5" /> StudySync Intelligence
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Intelligence built into the learning workflow.
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Clearly present AI as assistance for educators, not a replacement for them. Generate assessments, summarize lessons, identify learning gaps, and analyze course performance instantly.
              </p>
            </div>

            <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl font-mono text-sm relative">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">Dr.</div>
                  <div className="bg-blue-600/20 border border-blue-500/30 text-blue-100 p-4 rounded-2xl rounded-tl-none">
                    "Show me students who may need support."
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0"><BrainCircuit className="w-4 h-4 text-white"/></div>
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
                      Analyzing 1,284 learners, 42 courses, 18,920 activities
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mt-2">
                      <p className="text-white font-bold text-lg mb-2">17 learners may need attention</p>
                      <button className="text-blue-400 hover:text-blue-300 font-sans font-semibold flex items-center gap-1 mt-4">
                        View insights <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. MULTI-TENANT & SECURITY --- */}
        <section className="border-t border-white/5 py-32 bg-[#020617]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Multi-Tenant */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Your institution. Your identity. Your learning environment.</h2>
              <p className="text-slate-400 mb-12">Every institution receives its own completely isolated environment with custom academic structures, roles, and branding.</p>
              
              <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
                <div className="text-center mb-8 font-bold tracking-widest text-xs text-slate-500 uppercase">StudySync Cloud</div>
                <div className="flex justify-center gap-4 sm:gap-8 relative">
                  <div className="absolute top-0 left-1/2 w-3/4 h-[1px] bg-white/10 -translate-x-1/2"></div>
                  
                  {['University', 'School', 'Academy'].map(org => (
                    <div key={org} className="flex-1 flex flex-col items-center">
                      <div className="w-[1px] h-6 bg-white/10 mb-2"></div>
                      <div className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm font-bold text-white w-full text-center mb-4">{org}</div>
                      <div className="text-[10px] text-slate-500 space-y-2 text-center">
                        <p>Students</p>
                        <p>Faculty</p>
                        <p>Courses</p>
                        <p>Analytics</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security */}
            <div>
               <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
                <ShieldCheck className="w-5 h-5" /> Enterprise Security
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Built for the responsibility education demands.</h2>
              <p className="text-slate-400 mb-12">Keep security messaging professional and understated. Complete control over authentication, permissions, and audit trails.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {['Secure authentication', 'Role-based permissions', 'Tenant isolation', 'Audit trails', 'Data protection', 'Controlled access'].map(s => (
                  <div key={s} className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* --- 5. ANALYTICS --- */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 lg:order-1">
              <div className="bg-[#0a0f1e] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">12,482</div>
                    <div className="text-sm text-slate-500">Active learners</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">87.4%</div>
                    <div className="text-sm text-slate-500">Course completion</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-emerald-400 mb-1">+18.6%</div>
                    <div className="text-sm text-slate-500">Engagement</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">92%</div>
                    <div className="text-sm text-slate-500">Submission rate</div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 border-l-4 border-l-amber-500">
                   <p className="text-sm font-medium text-white flex items-start gap-3">
                     <span className="text-amber-500">Insight:</span> 
                     "Engagement in Computer Science 204 has decreased 12% this week."
                   </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold mb-6">
                <BarChart4 className="w-5 h-5" /> Institutional Data
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                See learning clearly.
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                StudySync doesn't simply store academic data — it helps institutions understand it. Transform learning activity into meaningful insights about engagement, performance, completion, and progress.
              </p>
            </div>
          </div>
        </section>

        {/* --- 6. INSTITUTION TYPES --- */}
        <section className="border-t border-white/5 py-32 bg-[#020617]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Engineered for every academic model.</h2>
            
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {INSTITUTION_TYPES.map((type, idx) => (
                <button 
                  key={type}
                  onClick={() => setActiveInstitution(idx)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeInstitution === idx 
                    ? 'bg-white text-slate-900 shadow-md' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 min-h-[250px] flex items-center justify-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Empowering {INSTITUTION_TYPES[activeInstitution]}s</h3>
                <p className="text-slate-400 max-w-xl mx-auto">
                  A dedicated environment calibrated for the unique administrative and academic workflows of a modern {INSTITUTION_TYPES[activeInstitution].toLowerCase()}. Unify your programs, faculties, and student body on a single source of truth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 7. FINAL CTA --- */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold text-white tracking-tight mb-6">Build the learning environment your institution deserves.</h2>
            <p className="text-xl text-slate-400 mb-12">
              Bring teaching, learning, administration, intelligence, and progress into one connected platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="bg-white text-slate-900 hover:bg-slate-200 text-base font-bold px-8 py-4 rounded-full transition-all w-full sm:w-auto">
                Book a demo
              </Link>
              <Link to="/login" className="bg-white/10 text-white hover:bg-white/20 text-base font-bold px-8 py-4 rounded-full transition-all w-full sm:w-auto">
                Explore StudySync
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020617] py-12 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="font-bold text-white tracking-tight flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
            StudySync
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Platform</a>
            <a href="#" className="hover:text-slate-300">Security</a>
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
          </div>
          <p>© 2026 StudySync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
