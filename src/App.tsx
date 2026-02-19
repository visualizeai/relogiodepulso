import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Bookmark,
  Calendar,
  ChevronDown,
  Flame,
  Globe,
  LayoutGrid,
  ListFilter,
  Search,
  ShieldAlert,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

type Category = "Transferências" | "Bastidores" | "Polêmica" | "Seleções" | "Europa";

type Club =
  | "Flamengo"
  | "Palmeiras"
  | "Corinthians"
  | "São Paulo"
  | "Grêmio"
  | "Internacional"
  | "Cruzeiro"
  | "Atlético-MG"
  | "Vasco"
  | "Santos"
  | "PSG"
  | "Real Madrid"
  | "Barcelona"
  | "Manchester City"
  | "Liverpool";

type Source = "Apuração" | "Rumor" | "Oficial";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  club: Club;
  source: Source;
  confidence: number; // 0..100
  minutesAgo: number;
  author: string;
  reads: number;
  hotScore: number; // 0..100
  imageUrl: string;
  tags: string[];
};

const categories: { key: Category; icon: React.ReactNode; blurb: string }[] = [
  { key: "Transferências", icon: <TrendingUp className="h-4 w-4" />, blurb: "Vai e vem, cifras e bastidores." },
  { key: "Bastidores", icon: <Users className="h-4 w-4" />, blurb: "Vestiário, diretoria e clima." },
  { key: "Polêmica", icon: <ShieldAlert className="h-4 w-4" />, blurb: "Declarações, tretas e bastidores quentes." },
  { key: "Seleções", icon: <Globe className="h-4 w-4" />, blurb: "Convocações e bastidores internacionais." },
  { key: "Europa", icon: <Trophy className="h-4 w-4" />, blurb: "Gigantes, Champions e mercado." },
];

const clubs: Club[] = [
  "Flamengo",
  "Palmeiras",
  "Corinthians",
  "São Paulo",
  "Grêmio",
  "Internacional",
  "Cruzeiro",
  "Atlético-MG",
  "Vasco",
  "Santos",
  "PSG",
  "Real Madrid",
  "Barcelona",
  "Manchester City",
  "Liverpool",
];

const sources: Source[] = ["Apuração", "Rumor", "Oficial"];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatReads(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (n >= 1_000) return `${Math.round(n / 100) / 10}`.replace(".", ",") + "k";
  return String(n);
}

function timeLabel(minutesAgo: number) {
  if (minutesAgo < 60) return `${minutesAgo} min`;
  const h = Math.floor(minutesAgo / 60);
  if (h < 24) return `${h} h`;
  const d = Math.floor(h / 24);
  return `${d} d`;
}

function badgeForSource(source: Source) {
  if (source === "Oficial") return { label: "Oficial", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: <BadgeCheck className="h-3.5 w-3.5" /> };
  if (source === "Apuração") return { label: "Apuração", cls: "bg-indigo-50 text-indigo-700 ring-indigo-200", icon: <Sparkles className="h-3.5 w-3.5" /> };
  return { label: "Rumor", cls: "bg-amber-50 text-amber-800 ring-amber-200", icon: <Flame className="h-3.5 w-3.5" /> };
}

function confidenceTone(confidence: number) {
  if (confidence >= 80) return "bg-emerald-500";
  if (confidence >= 55) return "bg-amber-500";
  return "bg-rose-500";
}

function hotTone(hotScore: number) {
  if (hotScore >= 80) return "text-rose-600";
  if (hotScore >= 55) return "text-amber-600";
  return "text-slate-600";
}

const seedPosts: Post[] = [
  {
    id: "p1",
    title: "Diretoria do Flamengo acelera por meia europeu e tenta fechar antes do clássico",
    excerpt:
      "Conversas avançaram nas últimas 48h. O nome é tratado como prioridade e a ideia é anunciar ainda nesta janela.",
    category: "Transferências",
    club: "Flamengo",
    source: "Apuração",
    confidence: 78,
    minutesAgo: 18,
    author: "Redação Bola Quente",
    reads: 48200,
    hotScore: 86,
    imageUrl:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80",
    tags: ["janela", "meia", "negociação"],
  },
  {
    id: "p2",
    title: "Palmeiras: bastidores indicam mudança de rota e foco em atacante de velocidade",
    excerpt:
      "Após avaliação interna, o clube prioriza perfil específico. Intermediários já foram acionados e há otimismo.",
    category: "Bastidores",
    club: "Palmeiras",
    source: "Apuração",
    confidence: 72,
    minutesAgo: 44,
    author: "L. Menezes",
    reads: 31900,
    hotScore: 67,
    imageUrl:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1600&q=80",
    tags: ["scout", "perfil", "atacante"],
  },
  {
    id: "p3",
    title: "Corinthians: reunião tensa no CT após derrota; elenco cobra postura e comissão responde",
    excerpt:
      "Clima esquentou e houve conversa longa. Lideranças pediram ajustes imediatos e mais clareza no plano de jogo.",
    category: "Polêmica",
    club: "Corinthians",
    source: "Rumor",
    confidence: 52,
    minutesAgo: 95,
    author: "B. Duarte",
    reads: 60100,
    hotScore: 79,
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80",
    tags: ["CT", "cobrança", "vazou"],
  },
  {
    id: "p4",
    title: "Seleção: comissão monitora jovem destaque e pode antecipar convocação",
    excerpt:
      "Relatórios recentes agradaram. A tendência é ampliar observação e abrir conversa com o clube nas próximas semanas.",
    category: "Seleções",
    club: "São Paulo",
    source: "Apuração",
    confidence: 64,
    minutesAgo: 130,
    author: "C. Nascimento",
    reads: 18400,
    hotScore: 48,
    imageUrl:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80",
    tags: ["convocação", "monitoramento", "base"],
  },
  {
    id: "p5",
    title: "Europa: gigante inglês prepara oferta recorde por craque e agita o mercado",
    excerpt:
      "A proposta pode mexer com dominó de negociações. Agentes já trabalham em cenários e cláusulas.",
    category: "Europa",
    club: "Manchester City",
    source: "Rumor",
    confidence: 58,
    minutesAgo: 210,
    author: "M. Azevedo",
    reads: 90500,
    hotScore: 83,
    imageUrl:
      "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&w=1600&q=80",
    tags: ["mercado", "oferta", "cláusula"],
  },
  {
    id: "p6",
    title: "Oficial: clube anuncia renovação e multa alta para segurar joia",
    excerpt:
      "A assinatura foi confirmada nesta manhã. A multa chama atenção e reforça estratégia de valorização.",
    category: "Bastidores",
    club: "Grêmio",
    source: "Oficial",
    confidence: 95,
    minutesAgo: 360,
    author: "Redação Bola Quente",
    reads: 22100,
    hotScore: 54,
    imageUrl:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80",
    tags: ["renovação", "multa", "joia"],
  },
];

function Pill({
  children,
  active,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1 transition-all duration-200",
        active
          ? "bg-slate-900 text-white ring-slate-900 shadow-sm"
          : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
      )}
    >
      {icon ? <span className={cn(active ? "text-white" : "text-slate-600")}>{icon}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-sm">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="truncate text-sm font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function ProgressBar({ value, tone }: { value: number; tone: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 ring-1 ring-slate-200 overflow-hidden">
      <div className={cn("h-full rounded-full", tone)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 ring-1 ring-slate-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </label>
  );
}

function Header({
  query,
  setQuery,
  onToggleBookmarks,
  showBookmarks,
  bookmarkedCount,
}: {
  query: string;
  setQuery: (v: string) => void;
  onToggleBookmarks: () => void;
  showBookmarks: boolean;
  bookmarkedCount: number;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <Flame className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-slate-900">Bola Quente</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                  fofocas do futebol
                </span>
              </div>
              <div className="text-xs text-slate-500">Rumores, apurações e bastidores — com transparência</div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onToggleBookmarks}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ring-1 shadow-sm transition-all duration-200",
                showBookmarks
                  ? "bg-slate-900 text-white ring-slate-900"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
              )}
            >
              <Bookmark className="h-4 w-4" />
              <span>Salvos</span>
              <span
                className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                  showBookmarks ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                )}
              >
                {bookmarkedCount}
              </span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:ring-slate-300"
            >
              <Bell className="h-4 w-4" />
              <span>Alertas</span>
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por clube, jogador, diretoria, técnico..."
                className="w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-sm text-slate-900 ring-1 ring-slate-200 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-soft">
              <div className="min-w-0">
                <div className="text-xs text-white/70">Radar do dia</div>
                <div className="truncate text-sm font-semibold">Top rumores + apurações</div>
              </div>
              <ArrowRight className="h-4 w-4 text-white/80" />
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onToggleBookmarks}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm ring-1 shadow-sm transition-all duration-200",
                showBookmarks
                  ? "bg-slate-900 text-white ring-slate-900"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
              )}
            >
              <Bookmark className="h-4 w-4" />
              <span>Salvos</span>
              <span
                className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                  showBookmarks ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                )}
              >
                {bookmarkedCount}
              </span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:ring-slate-300"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function PostCard({
  post,
  bookmarked,
  onToggleBookmark,
}: {
  post: Post;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}) {
  const badge = badgeForSource(post.source);

  return (
    <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-44 w-full object-cover md:h-48"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1", badge.cls)}>
            {badge.icon}
            {badge.label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
            <Flame className="h-3.5 w-3.5" />
            <span className={cn(hotTone(post.hotScore))}>{post.hotScore}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleBookmark(post.id)}
          className={cn(
            "absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ring-1 backdrop-blur transition-all duration-200",
            bookmarked
              ? "bg-white text-slate-900 ring-white shadow-sm"
              : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
          )}
          aria-label={bookmarked ? "Remover dos salvos" : "Salvar matéria"}
        >
          <Bookmark className={cn("h-4 w-4", bookmarked ? "fill-slate-900" : "fill-transparent")} />
          <span className="hidden sm:inline">{bookmarked ? "Salvo" : "Salvar"}</span>
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white md:text-lg">
            {post.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/80">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 ring-1 ring-white/15">
              <Calendar className="h-3.5 w-3.5" />
              {timeLabel(post.minutesAgo)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 ring-1 ring-white/15">
              <Users className="h-3.5 w-3.5" />
              {post.club}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 ring-1 ring-white/15">
              <LayoutGrid className="h-3.5 w-3.5" />
              {post.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-medium text-slate-600">Confiança</div>
              <div className="text-xs font-semibold text-slate-900">{post.confidence}%</div>
            </div>
            <div className="mt-2">
              <ProgressBar value={post.confidence} tone={confidenceTone(post.confidence)} />
            </div>
            <div className="mt-2 text-xs text-slate-500">Baseado em fonte + histórico</div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-medium text-slate-600">Leituras</div>
              <div className="text-xs font-semibold text-slate-900">{formatReads(post.reads)}</div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Star className="h-4 w-4 text-slate-500" />
              <span>Por {post.author}</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">Atualizado há {timeLabel(post.minutesAgo)}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800"
          >
            Ler agora
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-xs text-slate-500">
            <span className="font-medium text-slate-700">Transparência:</span> {post.source} •{" "}
            <span className="font-medium text-slate-700">{post.confidence}%</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Todas">("Todas");
  const [activeClub, setActiveClub] = useState<Club | "Todos">("Todos");
  const [activeSource, setActiveSource] = useState<Source | "Todas">("Todas");
  const [sortBy, setSortBy] = useState<"Quente" | "Recentes" | "Confiança">("Quente");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const bookmarkedIds = useMemo(() => new Set(Object.keys(bookmarks).filter((k) => bookmarks[k])), [bookmarks]);
  const bookmarkedCount = bookmarkedIds.size;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = seedPosts.slice();

    if (showBookmarks) list = list.filter((p) => bookmarkedIds.has(p.id));
    if (activeCategory !== "Todas") list = list.filter((p) => p.category === activeCategory);
    if (activeClub !== "Todos") list = list.filter((p) => p.club === activeClub);
    if (activeSource !== "Todas") list = list.filter((p) => p.source === activeSource);

    if (q) {
      list = list.filter((p) => {
        const hay = [
          p.title,
          p.excerpt,
          p.category,
          p.club,
          p.source,
          p.author,
          ...p.tags,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      if (sortBy === "Quente") return b.hotScore - a.hotScore || a.minutesAgo - b.minutesAgo;
      if (sortBy === "Recentes") return a.minutesAgo - b.minutesAgo || b.hotScore - a.hotScore;
      return b.confidence - a.confidence || b.hotScore - a.hotScore;
    });

    return list;
  }, [query, activeCategory, activeClub, activeSource, sortBy, showBookmarks, bookmarkedIds]);

  const topStats = useMemo(() => {
    const total = seedPosts.length;
    const hot = seedPosts.filter((p) => p.hotScore >= 75).length;
    const official = seedPosts.filter((p) => p.source === "Oficial").length;
    const avgConfidence = Math.round(seedPosts.reduce((acc, p) => acc + p.confidence, 0) / Math.max(1, total));
    return { total, hot, official, avgConfidence };
  }, []);

  function toggleBookmark(id: string) {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        query={query}
        setQuery={setQuery}
        onToggleBookmarks={() => setShowBookmarks((v) => !v)}
        showBookmarks={showBookmarks}
        bookmarkedCount={bookmarkedCount}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    <ListFilter className="h-3.5 w-3.5" />
                    Feed inteligente
                  </div>
                  <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    Bastidores, rumores e o que ninguém quer que vaze
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Filtre por clube, categoria e tipo de fonte. Cada nota vem com um indicador de confiança.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
                  <Dropdown
                    label="Fonte"
                    value={activeSource}
                    options={["Todas", ...sources]}
                    onChange={(v) => setActiveSource(v as Source | "Todas")}
                  />
                  <Dropdown
                    label="Ordenar"
                    value={sortBy}
                    options={["Quente", "Recentes", "Confiança"]}
                    onChange={(v) => setSortBy(v as "Quente" | "Recentes" | "Confiança")}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill active={activeCategory === "Todas"} onClick={() => setActiveCategory("Todas")} icon={<LayoutGrid className="h-4 w-4" />}>
                  Todas
                </Pill>
                {categories.map((c) => (
                  <Pill
                    key={c.key}
                    active={activeCategory === c.key}
                    onClick={() => setActiveCategory(c.key)}
                    icon={c.icon}
                  >
                    {c.key}
                  </Pill>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                <StatChip icon={<TrendingUp className="h-5 w-5" />} label="Notas no radar" value={`${topStats.total} hoje`} />
                <StatChip icon={<Flame className="h-5 w-5" />} label="Quentes (75+)" value={`${topStats.hot} em alta`} />
                <StatChip icon={<BadgeCheck className="h-5 w-5" />} label="Oficiais" value={`${topStats.official} confirmadas`} />
                <StatChip icon={<Sparkles className="h-5 w-5" />} label="Confiança média" value={`${topStats.avgConfidence}%`} />
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">Como medimos “confiança”</div>
                    <div className="mt-1 text-sm text-slate-600">
                      <span className="font-medium text-slate-700">Oficial</span> = comunicado/registro •{" "}
                      <span className="font-medium text-slate-700">Apuração</span> = fonte + checagem •{" "}
                      <span className="font-medium text-slate-700">Rumor</span> = circulação sem confirmação.
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm">
                    <Trophy className="h-4 w-4" />
                    Premium UI
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  bookmarked={bookmarkedIds.has(post.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-white p-8 ring-1 ring-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Nada por aqui</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Ajuste filtros ou tente outra busca. Dica: procure por “janela”, “CT” ou um clube.
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill onClick={() => setQuery("janela")}>janela</Pill>
                      <Pill onClick={() => setQuery("CT")}>CT</Pill>
                      <Pill onClick={() => setQuery("renovação")}>renovação</Pill>
                      <Pill onClick={() => setQuery("clássico")}>clássico</Pill>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-[92px] space-y-6">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Filtro por clube</div>
                    <div className="mt-1 text-sm text-slate-600">Acompanhe o que está pegando fogo.</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    <Users className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <Dropdown
                    label="Clube"
                    value={activeClub}
                    options={["Todos", ...clubs]}
                    onChange={(v) => setActiveClub(v as Club | "Todos")}
                  />
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-medium text-slate-600">Modo</div>
                    <div className="text-xs font-semibold text-slate-900">{showBookmarks ? "Salvos" : "Feed"}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {showBookmarks
                      ? "Você está vendo apenas matérias salvas."
                      : "Você está vendo o feed completo com filtros."}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBookmarks((v) => !v)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800"
                  >
                    <Bookmark className="h-4 w-4" />
                    {showBookmarks ? "Voltar ao feed" : "Ver salvos"}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Radar rápido</div>
                    <div className="mt-1 text-sm text-slate-600">Top 3 por “quente”.</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    <Flame className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {seedPosts
                    .slice()
                    .sort((a, b) => b.hotScore - a.hotScore)
                    .slice(0, 3)
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setQuery(p.club)}
                        className="w-full rounded-2xl bg-slate-50 p-4 text-left ring-1 ring-slate-200 transition-all duration-200 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900">{p.club}</div>
                            <div className="mt-1 line-clamp-2 text-sm text-slate-600">{p.title}</div>
                          </div>
                          <div className={cn("text-sm font-semibold", hotTone(p.hotScore))}>{p.hotScore}</div>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {timeLabel(p.minutesAgo)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" />
                            {p.confidence}%
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">Newsletter “Bola Quente”</div>
                    <div className="mt-1 text-sm text-white/75">Receba o resumo diário com transparência.</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                </div>

                <form
                  className="mt-4 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const email = String(fd.get("email") || "").trim();
                    if (!email) return;
                    form.reset();
                    setQuery(email.includes("@") ? "janela" : "");
                  }}
                >
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/15 placeholder:text-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-100"
                  >
                    Assinar
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="text-xs text-white/60">
                    Sem spam. Você pode cancelar quando quiser.
                  </div>
                </form>
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Bola Quente</div>
                  <div className="text-sm text-slate-600">
                    Um feed de fofocas do futebol com indicadores de fonte e confiança.
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <ShieldAlert className="h-4 w-4" />
                    Aviso
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Rumores podem mudar rápido. Cheque a fonte antes de compartilhar.
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <BadgeCheck className="h-4 w-4" />
                    Transparência
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Cada nota indica se é Oficial, Apuração ou Rumor.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Bola Quente. Feito com React + Tailwind.</div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                <Sparkles className="h-3.5 w-3.5" />
                UI premium
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                <Flame className="h-3.5 w-3.5" />
                Radar
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}