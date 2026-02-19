import { ArrowRight, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";

type FormState = {
  name: string;
  handle: string;
  goal: string;
  contact: string;
};

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (state.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (state.handle.trim().length < 2) errors.handle = "Informe seu @ (ou site).";
  if (state.goal.trim().length < 8) errors.goal = "Conte seu objetivo em uma frase.";
  if (state.contact.trim().length < 6) errors.contact = "Informe um contato (WhatsApp ou e-mail).";
  return errors;
}

export default function CTA() {
  const [state, setState] = useState<FormState>({
    name: "",
    handle: "",
    goal: "",
    contact: "",
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(state), [state]);
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, handle: true, goal: true, contact: true });
    if (Object.keys(validate(state)).length > 0) return;
    setSubmitted(true);
  };

  const fieldBase =
    "w-full rounded-xl border bg-slate-950/40 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-heron-500/50 focus:ring-2 focus:ring-heron-500/30";

  return (
    <section id="contato" className="border-t border-white/10 bg-slate-950">
      <Container>
        <div className="py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-semibold text-heron-300">Contato</div>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Vamos montar seu plano de conteúdo
              </h2>
              <p className="max-w-xl text-pretty text-slate-300">
                Envie seu @ e objetivo. A Heronfy retorna com um diagnóstico e
                uma proposta de plano (sem compromisso).
              </p>

              <div className="grid gap-3 pt-2">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-heron-500/15 text-heron-300 ring-1 ring-heron-500/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">WhatsApp</div>
                    <div className="text-sm text-slate-300">
                      Resposta em até 1 dia útil
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-heron-500/15 text-heron-300 ring-1 ring-heron-500/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">E-mail</div>
                    <div className="text-sm text-slate-300">
                      Envie briefing e referências
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-heron-500/10 to-white/5 p-6 shadow-sm">
                <div className="text-sm font-bold text-white">O que você recebe</div>
                <div className="mt-3 grid gap-2 text-sm text-slate-200">
                  {[
                    "Diagnóstico do perfil e oportunidades",
                    "Sugestão de pilares e formatos",
                    "Plano recomendado (Start, Growth ou Scale)",
                    "Próximos passos e cronograma",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-heron-400" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-md backdrop-blur md:p-8">
              <div className="text-sm font-extrabold text-white">
                Solicitar diagnóstico
              </div>
              <div className="mt-1 text-sm text-slate-300">
                Preencha em 1 minuto.
              </div>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-heron-500/30 bg-heron-500/10 p-5">
                  <div className="text-sm font-extrabold text-white">
                    Recebido!
                  </div>
                  <div className="mt-1 text-sm text-slate-200">
                    Em breve a Heronfy entra em contato. Se preferir, envie uma
                    mensagem no WhatsApp com seu @ e objetivo.
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSubmitted(false);
                        setState({ name: "", handle: "", goal: "", contact: "" });
                        setTouched({});
                      }}
                    >
                      Enviar outro
                    </Button>
                    <a
                      href="https://wa.me/5500000000000"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex"
                    >
                      <Button>
                        Abrir WhatsApp <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Seu nome
                    </label>
                    <input
                      value={state.name}
                      onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      className={[
                        fieldBase,
                        touched.name && errors.name ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/20" : "border-white/10",
                      ].join(" ")}
                      placeholder="Ex.: Ana"
                      autoComplete="name"
                      inputMode="text"
                    />
                    {touched.name && errors.name && (
                      <div className="text-xs font-semibold text-rose-300">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Seu @ (Instagram) ou site
                    </label>
                    <input
                      value={state.handle}
                      onChange={(e) => setState((s) => ({ ...s, handle: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, handle: true }))}
                      className={[
                        fieldBase,
                        touched.handle && errors.handle ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/20" : "border-white/10",
                      ].join(" ")}
                      placeholder="Ex.: @suaempresa"
                      autoComplete="off"
                      inputMode="text"
                    />
                    {touched.handle && errors.handle && (
                      <div className="text-xs font-semibold text-rose-300">
                        {errors.handle}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Objetivo (em uma frase)
                    </label>
                    <textarea
                      value={state.goal}
                      onChange={(e) => setState((s) => ({ ...s, goal: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, goal: true }))}
                      className={[
                        fieldBase,
                        "min-h-[110px] resize-none",
                        touched.goal && errors.goal ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/20" : "border-white/10",
                      ].join(" ")}
                      placeholder="Ex.: aumentar alcance e gerar leads pelo Instagram"
                    />
                    {touched.goal && errors.goal && (
                      <div className="text-xs font-semibold text-rose-300">
                        {errors.goal}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Contato (WhatsApp ou e-mail)
                    </label>
                    <input
                      value={state.contact}
                      onChange={(e) => setState((s) => ({ ...s, contact: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
                      className={[
                        fieldBase,
                        touched.contact && errors.contact ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/20" : "border-white/10",
                      ].join(" ")}
                      placeholder="Ex.: (11) 99999-9999 ou email@dominio.com"
                      autoComplete="email"
                      inputMode="text"
                    />
                    {touched.contact && errors.contact && (
                      <div className="text-xs font-semibold text-rose-300">
                        {errors.contact}
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={hasErrors}>
                    Enviar <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="text-xs text-slate-400">
                    Ao enviar, você concorda em receber contato da Heronfy para
                    diagnóstico e proposta.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}