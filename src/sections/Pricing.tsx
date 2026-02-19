import { Check } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const plans = [
  {
    name: "Start",
    price: "R$ 1.490",
    period: "/mês",
    desc: "Para começar com consistência e qualidade.",
    features: [
      "Estratégia mensal + calendário",
      "12 posts (feed) + 20 stories",
      "2 Reels (roteiro + edição)",
      "1 rodada de ajustes",
      "Relatório mensal",
    ],
  },
  {
    name: "Growth",
    price: "R$ 2.490",
    period: "/mês",
    desc: "Para crescer com volume e performance.",
    featured: true,
    features: [
      "Estratégia + otimização semanal",
      "16 posts (feed) + 30 stories",
      "6 Reels (roteiro + edição)",
      "2 rodadas de ajustes",
      "Relatório + insights acionáveis",
    ],
  },
  {
    name: "Scale",
    price: "R$ 3.990",
    period: "/mês",
    desc: "Para marcas que querem dominar o nicho.",
    features: [
      "Planejamento de campanhas",
      "20 posts (feed) + 40 stories",
      "10 Reels (roteiro + edição)",
      "3 rodadas de ajustes",
      "Dashboard de métricas",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="planos" className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-heron-300">Planos</div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Planos claros, entregas objetivas
            </h2>
            <p className="max-w-2xl text-pretty text-slate-300">
              Escolha o nível de produção ideal para o seu momento. Ajustamos o
              pacote conforme sua necessidade.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={[
                  "relative rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                  p.featured
                    ? "border-heron-500/40 bg-gradient-to-b from-heron-500/15 to-white/5"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-6 rounded-full bg-heron-500 px-3 py-1 text-xs font-extrabold text-slate-950 shadow-md shadow-heron-500/25">
                    Mais escolhido
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-extrabold text-white">
                      {p.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-300">{p.desc}</div>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <div className="text-3xl font-extrabold text-white">
                    {p.price}
                  </div>
                  <div className="pb-1 text-sm font-semibold text-slate-400">
                    {p.period}
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-slate-200">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-heron-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <a href="#contato" className="mt-7 block">
                  <Button className="w-full" variant={p.featured ? "primary" : "secondary"}>
                    Escolher {p.name}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}