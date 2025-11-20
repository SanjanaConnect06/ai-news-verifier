export default function TruthifyFooter() {
  return (
    <footer className="border-t border-white/5 bg-black/80 px-4 py-8 text-xs text-slate-400 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <p className="text-[0.76rem] text-slate-400">
          © 2025 Truthify. Helping you fight misinformation with AI-powered verification.
        </p>
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.76rem]">
          <a
            href="#"
            className="transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:underline"
          >
            Privacy Policy
          </a>
          <span aria-hidden="true" className="text-slate-600">
            •
          </span>
          <a
            href="#"
            className="transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:underline"
          >
            Terms of Service
          </a>
          <span aria-hidden="true" className="text-slate-600">
            •
          </span>
          <a
            href="#"
            className="transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:underline"
          >
            Contact
          </a>
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-500">
          Powered by AI
        </p>
      </div>
    </footer>
  );
}