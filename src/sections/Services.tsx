import {
  BarChart3,
  Brush,
  Captions,
  Clapperboard,
  Megaphone,
  Target,
} from "lucide-react";
import Container from "../components/Container";

const services = [
  {
    icon: Target,
    title: "Estratégia & Posicionamento",
    desc: "Diagnóstico, definição de pilares, calendário editorial e metas realistas.",
  },
  {
    icon: Brush,
    title: "Design para Feed & Stories",
    desc: "Identidade visual consistente, templates e peças premium para o dia a dia.",
  },
  {
    icon: Captions,
    title: "Copywriting",
    desc: "Textos que prendem atenção, geram conversa e direcionam para a ação.",
  },
  {
    icon: Clapperboard,
    title: "Reels & Vídeos Curtos",
    desc: "Roteiro, edição e formatos que performam com retenção e compartilhamento.",
  },
  {
    icon: BarChart3,
    title: "Métricas & Relatórios",
    desc: "Acompanhamento semanal e relatório mensal com insights acionáveis.",
  },
  {
    icon: Megaphone,
    title: "Campanhas & Lançamentos",
    desc: "Planejamento de campanhas, criativos e execução com foco em conversão.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-heron-300">
              Serviços
            </div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Tudo o que sua marca precisa para crescer nas redes
            </h2>
            <p className="max-w-2xl text-pretty text-slate-300">
              Um pacote completo para social media: estratégia, criação e
              acompanhamento. Você ganha consistência, clareza e performance.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-heron-500/15 text-heron-300 ring-1 ring-heron-500/20 transition-all duration-200 group-hover:bg-heron-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-base font-bold text-white">
                        {s.title}
                      </div>
                      <div className="text-sm leading-relaxed text-slate-300">
                        {s.desc}
                      </div>
                    </div>
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