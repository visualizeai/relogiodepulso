import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Container from "../components/Container";

const bullets = [
  "Calendário editorial e estratégia mensal",
  "Design premium para feed e stories",
  "Relatórios claros com métricas que importam",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-heron-500/20 blur-3xl" />
        <div className="absolute -bottom-24 right-[-120px] h-[520px] w-[520px] rounded-full bg-heron-700/20 blur-3xl" />
      </div>

      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>
                <Sparkles className="h-4 w-4 text-heron-300" />
                <span>Agência de Social Media</span>
              </Badge>
              <Badge>
                <span className="text-slate-300">Foco em</span>
                <span className="font-semibold text-white">crescimento</span>
              </Badge>
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Heronfy: sua presença no Instagram com{" "}
              <span className="text-heron-400">estratégia</span>,{" "}
              <span className="text-heron-400">conteúdo</span> e{" "}
              <span className="text-heron-400">performance</span>.
            </h1>

            <p className="max-w-xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
              Criamos um sistema completo de social media: posicionamento, pauta,
              design, copy e acompanhamento de métricas. Você aprova, a gente
              executa.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contato">
                <Button className="w-full sm:w-auto">
                  Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button className="w-full sm:w-auto" variant="secondary">
                  Ver portfólio
                </Button>
              </a>
            </div>

            <div className="grid gap-2 pt-2">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-heron-400" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { k: "+120", v: "peças/mês" },
                { k: "7d", v: "prazo médio" },
                { k: "100%", v: "processo claro" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur transition-all duration-200 hover:bg-white/10"
                >
                  <div className="text-lg font-extrabold text-white">{s.k}</div>
                  <div className="text-xs text-slate-400">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-heron-500/20 to-transparent blur-2xl" />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Painel de Conteúdo
                  </div>
                  <div className="text-xs text-slate-400">
                    Visão semanal • Aprovação rápida
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs font-semibold text-slate-200">
                  Atualizado hoje
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  { title: "Reels: bastidores", tag: "Roteiro + edição", pct: 86 },
                  { title: "Carrossel: dicas", tag: "Design + copy", pct: 72 },
                  { title: "Stories: enquete", tag: "Interação", pct: 64 },
                  { title: "Post: prova social", tag: "Conversão", pct: 91 },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-sm transition-all duration-200 hover:bg-slate-950/55"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {c.title}
                        </div>
                        <div className="text-xs text-slate-400">{c.tag}</div>
                      </div>
                      <div className="text-xs font-semibold text-slate-200">
                        {c.pct}%
                      </div>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-heron-400 to-heron-600"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-heron-500/15 to-white/5 p-4">
                <div className="text-sm font-semibold text-white">
                  Próximo passo
                </div>
                <div className="mt-1 text-sm text-slate-300">
                  Envie seu @ e receba um diagnóstico com oportunidades de
                  crescimento.
                </div>
                <a href="#contato" className="mt-4 inline-flex">
                  <Button variant="secondary">
                    Quero meu diagnóstico <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}