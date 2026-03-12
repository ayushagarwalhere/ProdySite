import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full border-t border-white/5 bg-black px-6 py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#020008] to-black" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#E7BA80]/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#E7BA80]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-zinc-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7BA80]" />
              Prodyogiki
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-300">
              Prodyogiki empowers teams to turn raw curiosity into immersive,
              hands‑on experiences — making science and engineering easier to
              feel, share, and act on.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <Link href="/events" className="hover:text-[#E7BA80]">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-[#E7BA80]">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#E7BA80]">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Connect
            </h3>
            <div className="flex gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-zinc-200 transition hover:border-[#E7BA80] hover:bg-[#E7BA80]/10 hover:text-[#E7BA80]">
                X
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-zinc-200 transition hover:border-[#E7BA80] hover:bg-[#E7BA80]/10 hover:text-[#E7BA80]">
                in
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-zinc-200 transition hover:border-[#E7BA80] hover:bg-[#E7BA80]/10 hover:text-[#E7BA80]">
                IG
              </button>
            </div>
            <p className="text-sm text-zinc-400">contact@prodyogiki.com</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-zinc-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Prodyogiki. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <button className="hover:text-[#E7BA80]">Privacy Policy</button>
            <button className="hover:text-[#E7BA80]">Terms</button>
            <button className="hover:text-[#E7BA80]">Cookies</button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center text-[40px] font-semibold uppercase tracking-[0.4em] text-white/5 sm:text-[56px] md:bottom-4 md:text-[72px]"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        Prodyogiki
      </div>
    </footer>
  );
}

