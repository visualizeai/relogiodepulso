import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import Container from "../components/Container";

type Item = { q: string; a: string };

export default function FAQ() {
  const items: Item[] = useMemo(
    () => [
      {
        q: "Vocês publicam ou só entregam o material?",
        a: "Podemos trabalhar nos dois formatos. O mais comum é entregar tudo pronto e organizado para postagem. Se você quiser, também fazemos a publicação e o monitoramento.",
      },
      {
        q: "Como funciona a aprovação?",
        a: "Você recebe a pauta e as peças em um painel simples. Faz comentários e aprovamos por rodada. Assim o processo fica rápido e sem retrabalho.",
      },
      {
        q: "Em quanto tempo começo a ver resultados?",
        a: "Depende do ponto de partida e do nicho. Em geral, nas primeiras 4 a 8 semanas já dá para perceber melhora de consistência, alcance e engajamento.",
      },
      {
        q: "Vocês fazem tráfego pago?",
        a: "Sim, em campanhas e lançamentos. O foco principal da Heronfy é social media orgânico, mas podemos integrar mídia paga quando fizer sentido.",
      },
    ],
    []
  );

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-heron-300">FAQ</div>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Perguntas frequentes
            </h2>
            <p className="max-w-2xl text-pretty text-slate-300">
              Respostas rápidas para você decidir com segurança.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {items.map((it, idx) => {
              const isOpen = open === idx;
              return (
                <div
                  key={it.q}
                  className="rounded-2xl border border-white/10 bg-white/5 shadow-sm transition-all duration-200 hover:bg-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setOpen((v) => (v === idx ? null : idx))}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="text-sm font-bold text-white">{it.q}</div>
                    <ChevronDown
                      className={[
                        "h-5 w-5 flex-none text-slate-300 transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-slate-300">
                      {it.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}