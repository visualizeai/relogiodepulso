import { Bird, Instagram, Mail } from "lucide-react";
import Container from "../components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-heron-500 text-slate-950 shadow-md shadow-heron-500/25">
                  <Bird className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-extrabold tracking-tight text-white">
                    Heronfy
                  </div>
                  <div className="text-xs text-slate-400">Social Media</div>
                </div>
              </div>

              <div className="max-w-md text-sm leading-relaxed text-slate-300">
                Agência de marketing focada em social media. Estratégia, criação
                e performance para marcas que querem crescer com consistência.
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  <Instagram className="h-4 w-4 text-heron-300" />
                  Instagram
                </a>
                <a
                  href="mailto:contato@heronfy.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-heron-300" />
                  contato@heronfy.com
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
                <div className="text-sm font-extrabold text-white">Serviços</div>
                <div className="mt-3 grid gap-2 text-sm text-slate-300">
                  {[
                    "Estratégia",
                    "Design",
                    "Copywriting",
                    "Reels",
                    "Relatórios",
                    "Campanhas",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-heron-400" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
                <div className="text-sm font-extrabold text-white">Contato</div>
                <div className="mt-3 grid gap-2 text-sm text-slate-300">
                  <div>WhatsApp: (00) 00000-0000</div>
                  <div>E-mail: contato@heronfy.com</div>
                  <div>Atendimento: seg–sex</div>
                </div>
                <div className="mt-4 text-xs text-slate-500">
                  Substitua os dados de contato pelos oficiais.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Heronfy. Todos os direitos reservados.</div>
            <div className="text-slate-500">
              Feito com foco em performance e design.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}