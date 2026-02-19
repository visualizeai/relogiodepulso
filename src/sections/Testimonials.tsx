import { Star } from "lucide-react";
import Container from "../components/Container";

const testimonials = [
  {
    name: "Marina S.",
    role: "Clínica estética",
    quote:
      "A Heronfy organizou nosso conteúdo e trouxe consistência. O feed ficou mais profissional e os Reels começaram a performar melhor.",
  },
  {
    name: "Rafael M.",
    role: "Restaurante",
    quote:
      "O processo é muito claro. A aprovação é rápida e o material chega pronto para postar. Melhorou nosso engajamento e as reservas.",
  },
  {
    name: "Camila P.",
    role: "E-commerce",
    quote:
      "Relatórios objetivos e ajustes certeiros. A gente sente que tem uma estratégia por trás, não só posts bonitos.",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-heron-300">
              Depoimentos
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Clientes que querem consistência ficam com a Heronfy
            </h2>
            <p className="max-w-2xl text-pretty text-slate-300">
              Parceria de verdade: planejamento, execução e evolução contínua.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-200 hover:bg-white/10"
              >
                <div className="flex items-center gap-1 text-heron-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-4 text-sm leading-relaxed text-slate-200">
                  “{t.quote}”
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}