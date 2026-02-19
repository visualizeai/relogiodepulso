import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Logo from "./Logo";

type NavItem = { label: string; href: string };

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { label: "Serviços", href: "#servicos" },
      { label: "Processo", href: "#processo" },
      { label: "Portfólio", href: "#portfolio" },
      { label: "Planos", href: "#planos" },
      { label: "FAQ", href: "#faq" },
    ],
    []
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#top" className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heron-500/60">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heron-500/60"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href="#contato">
              <Button variant="secondary">Falar com a Heronfy</Button>
            </a>
            <a href="#planos">
              <Button>Ver planos</Button>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 shadow-sm transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heron-500/60 md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-slate-950/95 backdrop-blur md:hidden">
          <Container>
            <div className="flex flex-col gap-2 py-4">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-100 transition-all duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heron-500/60"
                >
                  {it.label}
                </a>
              ))}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <a href="#contato" onClick={() => setOpen(false)}>
                  <Button className="w-full" variant="secondary">
                    Falar com a Heronfy
                  </Button>
                </a>
                <a href="#planos" onClick={() => setOpen(false)}>
                  <Button className="w-full">Ver planos</Button>
                </a>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}