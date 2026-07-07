import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";
import { User, Package, Settings, LogOut, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Client Portal | Zardosi Atelier" },
      { name: "description", content: "Client portal for Zardosi Atelier — view your hand embroidery commissions, samples and orders." },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/account" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PageShell>
      <section className="luxury-silk-bg min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {!isLoggedIn ? (
            <div className="mx-auto max-w-md">
              <Reveal>
                <div className="border border-gold/20 bg-white/40 p-10 backdrop-blur-xl">
                  <h1 className="font-serif text-4xl text-ink">Sign In</h1>
                  <p className="mt-4 text-[13px] font-medium text-ink-soft">
                    Access your commissions, sampling history, and atelier communications.
                  </p>
                  
                  <form 
                    className="mt-10 space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsLoggedIn(true);
                    }}
                  >
                    <div>
                      <label 
                        htmlFor="login-email"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft"
                      >
                        Email Address
                      </label>
                      <input 
                        id="login-email"
                        type="email" 
                        required
                        className="w-full border-b border-ink/20 bg-transparent py-3 text-sm outline-none transition focus:border-gold"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="login-password"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft"
                      >
                        Password
                      </label>
                      <input 
                        id="login-password"
                        type="password" 
                        required
                        className="w-full border-b border-ink/20 bg-transparent py-3 text-sm outline-none transition focus:border-gold"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-ivory transition hover:bg-gold hover:text-black"
                    >
                      Enter Atelier
                    </button>
                    
                    <div className="text-center">
                      <a href="#" className="text-[11px] font-semibold text-gold-soft hover:text-gold transition">
                        Forgotten your password?
                      </a>
                    </div>
                  </form>
                </div>
                
                <p className="mt-8 text-center text-[13px] text-ink-soft">
                  New to Zardosi Atelier? <a href="/contact" className="text-gold font-bold">Request a partner account.</a>
                </p>
              </Reveal>
            </div>
          ) : (
            <Reveal>
              <div className="flex flex-col gap-10 lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full lg:w-72">
                  <div className="border border-gold/20 bg-white/40 p-8 backdrop-blur-md">
                    <div className="flex items-center gap-4 border-b border-ink/5 pb-6">
                      <div className="flex size-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                        <User size={24} />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl text-ink">Maison Luxe</h2>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">Partner Account</p>
                      </div>
                    </div>
                    
                    <nav className="mt-8 space-y-2">
                      {[
                        { icon: Package, label: "Current Commissions" },
                        { icon: User, label: "Profile Details" },
                        { icon: Settings, label: "Account Settings" },
                      ].map((item) => (
                        <button 
                          key={item.label}
                          className="flex w-full items-center justify-between px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-ink-soft transition hover:bg-gold/5 hover:text-gold"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon size={16} />
                            {item.label}
                          </div>
                          <ChevronRight size={14} />
                        </button>
                      ))}
                      
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="mt-6 flex w-full items-center gap-3 px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </nav>
                  </div>
                </aside>

                {/* Content */}
                <main className="flex-1">
                  <div className="border border-gold/20 bg-white/40 p-8 backdrop-blur-md lg:p-12">
                    <h1 className="font-serif text-4xl text-ink">Current Commissions</h1>
                    <p className="mt-4 text-[15px] text-ink-soft">
                      Track the progress of your active embroidery sampling and production runs.
                    </p>
                    
                    <div className="mt-12 space-y-6">
                      {[
                        { id: "ZA-482", title: "Couture Gown Bodice - Crystal Work", status: "Sampling" },
                        { id: "ZA-479", title: "Bespoke Bridal Veil - Pearl & Bead", status: "Production" },
                      ].map((project) => (
                        <div key={project.id} className="group border border-ink/5 bg-white/20 p-6 transition hover:border-gold/30">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{project.id}</span>
                              <h3 className="mt-1 font-serif text-2xl text-ink">{project.title}</h3>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Status</p>
                                <p className="mt-1 text-sm font-bold text-ink">{project.status}</p>
                              </div>
                              <button className="border border-ink px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-ivory">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </main>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageShell>
  );
}
