import { ArrowUpRight, Instagram, Play } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const items = [
  {
    title: "Clínica estética — Reels semanais",
    desc: "Roteiros curtos + edição dinâmica para aumentar alcance e salvamentos.",
    metric: "+38% alcance em 30 dias",
    tag: "Reels",
  },
  {
    title: "Restaurante — Conteúdo de prova social",
    desc: "Carrosséis e stories com foco em reservas e recorrência.",
    metric: "+22% cliques no perfil",
    tag: "Conversão",
  },
  {
    title: "E-commerce — Calendário editorial",
    desc: "Pautas e criativos para campanhas sazonais e lançamentos.",
    metric: "+17% taxa de engajamento",
    tag: "Estratégia",
  },
];

export default function Work() {
  return (
    <section id="portfolio" className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-heron-300">
              Portfólio
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Resultados e entregas que parecem simples — porque o processo é
              sólido
            </h2>
            <p className="max-w-2xl text-pretty text-slate-300">
              Alguns exemplos do tipo de trabalho que fazemos para marcas que
              precisam de consistência e performance.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {items.map((it) => (
              <div
                key={it.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs font-semibold text-slate-200">
                    {it.tag}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-heron-300" />
                </div>
                <div className="mt-4 text-base font-bold text-white">
                  {it.title}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-slate-300">
                  {it.desc}
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold text-slate-400">
                    Destaque
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {it.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-heron-500/10 to-white/5 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-heron-500/15 text-heron-300 ring-1 ring-heron-500/20">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Quer ver exemplos reais?
                  </div>
                  <div className="text-sm text-slate-300">
                    Enviamos um mini portfólio no WhatsApp.
                  </div>
                </div>
              </div>
            </div>

            <a href="#contato">
              <Button className="w-full sm:w-auto" variant="secondary">
                Solicitar portfólio <Play className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}