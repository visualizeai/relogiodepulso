import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarClock,
  ChevronRight,
  Globe,
  Layers3,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-6", className)}>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
      <Sparkles className="h-4 w-4 text-slate-900" />
      {children}
    </span>
  );
}

function Button({ as = "button", href, onClick, variant = "primary", children }) {
  const Comp = as;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20";
  const styles = {
    primary:
      "bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md",
    secondary:
      "bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:shadow-md",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
  };

  const props =
    Comp === "a"
      ? { href }
      : {
          type: "button",
          onClick,
        };

  return (
    <Comp className={cn(base, styles[variant])} {...props}>
      {children}
    </Comp>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-semibold tracking-tight text-slate-900">
            {value}
          </div>
          <div className="text-sm text-slate-600">{label}</div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-900 ring-1 ring-slate-200 transition-all duration-200 group-hover:bg-slate-900 group-hover:text-white group-hover:ring-slate-900">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <ChevronRight className="h-4 w-4 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-700" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ name, role, quote }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-1 text-slate-900">
        <Star className="h-4 w-4 fill-slate-900" />
        <Star className="h-4 w-4 fill-slate-900" />
        <Star className="h-4 w-4 fill-slate-900" />
        <Star className="h-4 w-4 fill-slate-900" />
        <Star className="h-4 w-4 fill-slate-900" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">“{quote}”</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">
            {name}
          </div>
          <div className="truncate text-xs text-slate-600">{role}</div>
        </div>
        <BadgeCheck className="h-5 w-5 text-slate-900" />
      </div>
    </div>
  );
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-soft">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-slate-900">
                {title}
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                Resposta rápida em horário comercial.
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-700">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-900/30 focus:ring-2 focus:ring-slate-900/10"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-700">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-900/30 focus:ring-2 focus:ring-slate-900/10"
      />
    </label>
  );
}

function Header({ onOpenContact }) {
  const [open, setOpen] = React.useState(false);

  const nav = [
    { id: "inicio", label: "Início" },
    { id: "recursos", label: "Recursos" },
    { id: "resultados", label: "Resultados" },
    { id: "depoimentos", label: "Depoimentos" },
  ];

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <Globe className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">
                Site Principal
              </div>
              <div className="text-xs text-slate-600">
                Presença digital premium
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="secondary" as="a" href="#contato">
              Ver contato
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button onClick={onOpenContact}>
              Falar agora
              <Mail className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-50 md:hidden"
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:hidden">
            <div className="grid gap-1">
              {nav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              <Button variant="secondary" as="a" href="#contato">
                Ver contato
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  onOpenContact();
                }}
              >
                Falar agora
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contato" className="border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Site Principal
                </div>
                <div className="text-xs text-slate-600">
                  Estrutura sólida para crescer.
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Este é o seu site principal: rápido, responsivo e com visual
              premium. Pronto para receber novas páginas, integrações e conteúdo
              conforme sua necessidade.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-700">
                  E-mail
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  contato@seudominio.com
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Resposta em até 1 dia útil
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-700">
                  Horário
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  Seg–Sex, 09:00–18:00
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Atendimento comercial
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">
              Checklist do site principal
            </div>
            <div className="mt-1 text-xs text-slate-600">
              Itens essenciais já prontos para produção.
            </div>

            <div className="mt-5 grid gap-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Base moderna",
                  desc: "React + Vite + Tailwind com componentes consistentes.",
                },
                {
                  icon: BarChart3,
                  title: "Estrutura escalável",
                  desc: "Seções prontas para evoluir para páginas e rotas.",
                },
                {
                  icon: CalendarClock,
                  title: "Contato rápido",
                  desc: "Modal com envio via mailto e validação.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-slate-600">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button as="a" href="#inicio" variant="secondary">
                Voltar ao topo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as="a" href="mailto:contato@seudominio.com">
                Enviar e-mail
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Site Principal. Todos os direitos.</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              Performance
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              Responsivo
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              Premium
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  const [contactOpen, setContactOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const canSend =
    name.trim().length >= 2 &&
    email.trim().includes("@") &&
    message.trim().length >= 10;

  const subject = encodeURIComponent("Contato — Site Principal");
  const body = encodeURIComponent(
    `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}\n`
  );
  const mailtoHref = `mailto:contato@seudominio.com?subject=${subject}&body=${body}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onOpenContact={() => setContactOpen(true)} />

      <main>
        <section id="inicio" className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl" />
            <div className="absolute -bottom-24 right-[-6rem] h-72 w-72 rounded-full bg-slate-900/10 blur-3xl" />
          </div>

          <Container className="relative py-14 md:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Pill>Seu site principal está ativo</Pill>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                  Uma base premium para sua presença digital — rápida, clara e
                  pronta para crescer.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                  Layout moderno, componentes consistentes e uma estrutura
                  pensada para produção. Ideal para apresentar serviços,
                  resultados e captar contatos com confiança.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={() => setContactOpen(true)}>
                    Falar agora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" as="a" href="#recursos">
                    Ver recursos
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-semibold text-slate-700">
                      Stack
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      React + Vite
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-semibold text-slate-700">
                      Estilo
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      Tailwind
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-semibold text-slate-700">
                      Ícones
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      lucide-react
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Painel de visão geral
                      </div>
                      <div className="mt-1 text-xs text-slate-600">
                        Um exemplo de seção “hero” com cards premium.
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                      v1.0
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                            <ShieldCheck className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              Confiável
                            </div>
                            <div className="text-xs text-slate-600">
                              Componentes consistentes e acessíveis.
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-slate-700">
                          100%
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full rounded-full bg-white">
                        <div className="h-2 w-[92%] rounded-full bg-slate-900" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-900 ring-1 ring-slate-200">
                            <BarChart3 className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              Performance
                            </div>
                            <div className="text-xs text-slate-600">
                              Carregamento rápido.
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                          A+
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Otimizado para mobile-first.
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-900 ring-1 ring-slate-200">
                            <CalendarClock className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              Agilidade
                            </div>
                            <div className="text-xs text-slate-600">
                              Evolução contínua.
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                          24h
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Para publicar melhorias.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-3xl bg-slate-900/10 blur-2xl md:block" />
              </div>
            </div>
          </Container>
        </section>

        <section id="recursos" className="py-14 md:py-20">
          <Container>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Recursos
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  Tudo o que um site principal precisa para começar forte
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                  Seções bem definidas, visual premium e componentes reutilizáveis
                  para você evoluir com segurança.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" as="a" href="#resultados">
                  Ver resultados
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Feature
                icon={Layers3}
                title="Componentes consistentes"
                desc="Cards, botões, modal e seções com espaçamento e tipografia alinhados."
              />
              <Feature
                icon={ShieldCheck}
                title="Acessível e responsivo"
                desc="Mobile-first com estados de foco, contraste e navegação clara."
              />
              <Feature
                icon={BarChart3}
                title="Pronto para métricas"
                desc="Estrutura ideal para adicionar analytics, eventos e funis de conversão."
              />
              <Feature
                icon={Mail}
                title="Contato sem fricção"
                desc="Modal com validação e envio via mailto para começar imediatamente."
              />
              <Feature
                icon={Globe}
                title="Identidade forte"
                desc="Header sticky, navegação suave e hierarquia visual premium."
              />
              <Feature
                icon={CalendarClock}
                title="Evolução rápida"
                desc="Base limpa para adicionar páginas, rotas e integrações quando quiser."
              />
            </div>
          </Container>
        </section>

        <section id="resultados" className="py-14 md:py-20">
          <Container>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Resultados
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    Um site principal que transmite confiança e converte melhor
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                    Estrutura clara, conteúdo objetivo e chamadas para ação bem
                    posicionadas. Ideal para apresentar sua marca e capturar
                    oportunidades.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => setContactOpen(true)}>
                      Solicitar orçamento
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" as="a" href="#depoimentos">
                      Ver depoimentos
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Stat icon={BadgeCheck} label="Percepção de qualidade" value="Alta" />
                  <Stat icon={BarChart3} label="Estrutura para SEO" value="Sólida" />
                  <Stat icon={ShieldCheck} label="Consistência visual" value="Premium" />
                  <Stat icon={CalendarClock} label="Tempo para evoluir" value="Rápido" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="depoimentos" className="py-14 md:py-20">
          <Container>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Depoimentos
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  Experiência premium do primeiro clique ao contato
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                  Exemplos de cards de prova social para reforçar credibilidade.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" as="a" href="#contato">
                  Ir para contato
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Testimonial
                name="Marina S."
                role="Negócios locais"
                quote="O visual ficou muito acima do que eu esperava. Passa confiança e é fácil de navegar no celular."
              />
              <Testimonial
                name="Rafael P."
                role="Serviços profissionais"
                quote="A estrutura é limpa e dá para expandir rápido. Em pouco tempo já estávamos com novas seções no ar."
              />
              <Testimonial
                name="Camila R."
                role="E-commerce em crescimento"
                quote="O site ficou leve e com cara de marca grande. A conversão no contato melhorou."
              />
            </div>
          </Container>
        </section>
      </main>

      <Footer />

      <Modal
        open={contactOpen}
        title="Fale com a gente"
        onClose={() => setContactOpen(false)}
      >
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Seu nome"
              value={name}
              onChange={setName}
              placeholder="Ex.: Ana Silva"
            />
            <Input
              label="Seu e-mail"
              value={email}
              onChange={setEmail}
              placeholder="Ex.: ana@empresa.com"
              type="email"
            />
          </div>
          <Textarea
            label="Mensagem"
            value={message}
            onChange={setMessage}
            placeholder="Conte rapidamente o que você precisa (mín. 10 caracteres)."
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-600">
              Ao enviar, seu app de e-mail abrirá com a mensagem preenchida.
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setContactOpen(false)}>
                Fechar
              </Button>
              <Button as="a" href={canSend ? mailtoHref : undefined} variant="primary">
                Enviar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!canSend && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              Preencha nome e e-mail válidos e escreva uma mensagem com pelo menos
              10 caracteres.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}