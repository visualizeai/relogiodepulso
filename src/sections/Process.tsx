import { Check, ClipboardList, Rocket, Wand2 } from "lucide-react";
import Container from "../components/Container";

const steps = [
  {
    icon: ClipboardList,
    title: "Diagnóstico",
    desc: "Entendemos seu momento, público e objetivos. Definimos metas e prioridades.",
  },
  {
    icon: Wand2,
    title: "Estratégia & Pauta",
    desc: "Criamos pilares, calendário e formatos. Você aprova antes de produzir.",
  },
  {
    icon: Rocket,
    title: "Produção & Publicação",
    desc: "Design, copy e vídeos. Entregamos tudo organizado e pronto para postar.",
  },
  {
    icon: Check,
    title: "Otimização",
    desc: "Acompanhamos métricas e ajustamos o plano para melhorar resultados mês a mês.",
  },
];

export default function Process() {
  return (
    <section id="processo" className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-heron-300">
                Processo
              </div>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Um método simples, rápido e transparente
              </h2>
              <p className="max-w-2xl text-pretty text-slate-300">
                Você sabe exatamente o que vai acontecer, quando e por quê. Sem
                improviso: consistência e qualidade em cada entrega.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-heron-500/10 to-white/5 p-6 shadow-sm md:p-8">
              <div className="text-sm font-semibold text-white">
                Entregáveis do mês
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  "Calendário editorial + pauta",
                  "Pacote de artes (feed + stories)",
                  "Roteiros e edição de Reels",
                  "Relatório com insights e próximos passos",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-slate-200">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-heron-400" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-200 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-heron-500/15 text-heron-300 ring-1 ring-heron-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                      Passo {idx + 1}
                    </div>
                  </div>
                  <div className="mt-4 text-base font-bold text-white">
                    {s.title}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-300">
                    {s.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}