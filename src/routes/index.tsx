import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Check, X, AlertTriangle, Crown, Minus, Star, Battery, Brain, ShieldAlert, Zap, ShieldCheck, Leaf, Bone, Moon, Sparkles, FlaskConical, ArrowRight, Instagram } from "lucide-react";

import imgBoxSachets from "@/assets/daily-health-travel-pack.png";
import imgBox from "@/assets/daily-health-box.png";
import imgBottlePour from "@/assets/daily-health-hero-square.jpg";
import JourneyTimeline from "@/components/JourneyTimeline";

import logoExame from "@/assets/media/exame.png";
import logoFitfeed from "@/assets/media/fitfeed.png";
import logoPegn from "@/assets/media/pegn.png";
import logoValor from "@/assets/media/valor.png";
import logoVejaSp from "@/assets/media/veja-sp.png";
import outliveLogo from "@/assets/brand/outlive-logo.png";

const mediaLogos = [
  { src: logoFitfeed, alt: "FitFeed" },
  { src: logoPegn, alt: "Pequenas Empresas & Grandes Negócios" },
  { src: logoVejaSp, alt: "Veja São Paulo" },
  { src: logoValor, alt: "Valor Econômico" },
  { src: logoExame, alt: "Exame" },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Outlive Daily Health Travel Pack — 10 sachês, 62 nutrientes | R$ 129,90" },
      { name: "description", content: "Conheça a Outlive com uma dose por dia. 10 sachês Daily Health com 62 nutrientes em sabor limão siciliano por R$ 129,90. Entrega para todo o Brasil." },
      { property: "og:title", content: "Outlive Daily Health Travel Pack — 10 sachês, 62 nutrientes" },
      { property: "og:description", content: "Uma dose por dia. 10 sachês com 62 nutrientes, sabor limão siciliano, por R$ 129,90." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "https://daily-dose-builder.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://daily-dose-builder.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Daily Health Travel Pack",
          brand: { "@type": "Brand", name: "Outlive Nutrition" },
          description:
            "10 sachês Daily Health com 62 nutrientes cada, sabor limão siciliano. Uma dose por dia de nutrição completa.",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "12000",
          },
          offers: {
            "@type": "Offer",
            price: "129.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: "https://daily-dose-builder.lovable.app/",
          },
        }),
      },
    ],
  }),
});

const BUY_TRAVEL = "https://outlivenutrition.com.br/cart/41664009961566:1?checkout";

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const keys = [
    'utm_source', 'utm_medium', 'utm_campaign',
    'utm_content', 'utm_term', 'utm_id',
    'fbclid', 'gclid', 'ttclid', 'sclid'
  ];
  const utms = new URLSearchParams();
  keys.forEach((k) => {
    const v = params.get(k);
    if (v) utms.set(k, v);
  });
  return utms.toString();
};

const buildCheckoutUrl = (baseUrl: string) => {
  const utmString = getUtmParams();
  if (!utmString) return baseUrl;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${utmString}`;
};

const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>, baseUrl: string) => {
  e.preventDefault();
  window.location.href = buildCheckoutUrl(baseUrl);
};


function Img({ desc, className = "", ratio = "aspect-square" }: { desc: string; className?: string; ratio?: string }) {
  return (
    <div className={`placeholder-img rounded-2xl ${ratio} ${className}`}>
      <span>{desc}</span>
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // Mark container ready so .reveal elements hide only when JS is alive.
    root.classList.add("reveal-ready");
    const els = root.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function CTA({ children, href = BUY_TRAVEL, full = false }: { children: React.ReactNode; href?: string; full?: boolean }) {
  return (
    <a
      href={href}
      target="_top"
      onClick={(e) => handleCheckoutClick(e, href)}

      className={`cta-glow inline-flex items-center justify-center gap-2 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground ${full ? "w-full" : ""}`}
    >
      {children}
    </a>
  );
}

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-current`} strokeWidth={0} />
      ))}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
      {children}
    </span>
  );
}



function Index() {
  const ref = useReveal();

  return (
    <div ref={ref} className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      {/* Announcement bar */}
      <div className="bg-brand-dark text-brand-dark-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2.5 text-center text-xs font-medium">
          <span>Frete grátis acima de R$ 150</span>
          <span className="text-brand-dark-foreground/40">·</span>
          <a href={BUY_TRAVEL} target="_top" onClick={(e) => handleCheckoutClick(e, BUY_TRAVEL)} className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
            Garanta o seu <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Top logo bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <img src={outliveLogo} alt="Outlive" className="h-6 w-auto md:h-7" />
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            <a href="#problema" className="transition-colors hover:text-foreground">Benefícios</a>
            <a href="#produto" className="transition-colors hover:text-foreground">Produto</a>
            <a href="#ciencia" className="transition-colors hover:text-foreground">Ciência</a>
            <a href="#comparacao" className="transition-colors hover:text-foreground">Comparação</a>
          </nav>
          <a
            href={BUY_TRAVEL}
            target="_top"
            onClick={(e) => handleCheckoutClick(e, BUY_TRAVEL)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-px"
          >
            Comprar <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>


      {/* HERO */}
      <section className="relative overflow-hidden hero-glow">
        <div className="pointer-events-none absolute inset-0 blueprint-grid" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 pt-4 pb-14 md:grid-cols-2 md:items-center md:gap-12 md:py-24">
          {/* Headline first on mobile, left on desktop */}
          <div className="reveal order-first text-center md:order-first md:text-left">
            <Eyebrow>Daily Health · da Outlive</Eyebrow>
            <h1 className="mt-6 font-display text-[2.5rem] leading-[1.02] text-foreground sm:text-5xl md:text-[3.75rem]">
              62 nutrientes que faltam no seu prato. <span className="text-primary">Em uma única dose.</span>
            </h1>
            <p className="mt-5 text-lg font-medium text-muted-foreground md:text-xl">
              Energia, foco e imunidade não vêm de mais um suplemento, vêm de fechar as lacunas que sua alimentação deixa passar. <span className="font-semibold text-foreground">Comece com 10 sachês de Travel Pack.</span>
            </p>

            {/* Prova social */}
            <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:justify-start">
              <Stars className="h-4 w-4" />
              <p className="text-sm font-semibold text-foreground">
                4,9/5 <span className="font-normal text-muted-foreground">· +12.000 clientes já experimentaram</span>
              </p>
            </div>


            {/* Preço ancorado logo abaixo do subheadline */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-primary md:text-5xl">R$ 129,90</span>
                <span className="font-sans text-base text-muted-foreground line-through">R$ 169,90</span>
              </div>
              <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Economize 24%
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Apenas R$ 12,99 por dose de nutrição completa</p>

            <div className="mt-6">
              <CTA full>Garantir meu Travel Pack — R$ 129,90 →</CTA>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground sm:text-xs md:justify-start">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Frete calculado no checkout</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Compra 100% segura</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Satisfação garantida</span>
            </div>
          </div>


          {/* Image second on mobile, right on desktop */}
          <div className="reveal order-last md:order-last">
            <div className="relative mx-auto w-full max-w-[540px]">
              <img
                src={imgBottlePour}
                alt="Daily Health sendo preparado na garrafa Outlive"
                width={1280}
                height={1280}
                fetchPriority="high"
                className="mx-auto aspect-square w-full rounded-3xl object-cover shadow-2xl ring-1 ring-border"
              />

              {/* Floating badges */}
              <div className="float-badge absolute -left-3 top-10 flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-xl ring-1 ring-border">
                <Zap className="h-4 w-4 text-primary" /> 62 nutrientes
              </div>
              <div className="float-badge delay absolute -bottom-3 right-6 flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-xl ring-1 ring-border">
                <Brain className="h-4 w-4 text-primary" /> Foco & energia
              </div>
              <div className="float-badge absolute -left-3 bottom-20 flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-xl ring-1 ring-border">
                <ShieldCheck className="h-4 w-4 text-primary" /> Imunidade
              </div>
              <div className="float-badge delay absolute left-10 -bottom-3 flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-xl ring-1 ring-border">
                <Leaf className="h-4 w-4 text-primary" /> Suporte digestivo
              </div>
              <div className="float-badge absolute -right-3 bottom-24 flex items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-xl ring-1 ring-border">
                <Sparkles className="h-4 w-4 text-primary" /> GLP-1 Friendly
              </div>
              <div className="absolute -right-3 top-6 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-brand-dark text-brand-dark-foreground shadow-xl">
                <span className="font-display text-2xl leading-none text-primary">10</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">sachês</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media marquee — "Já saímos em" */}
        <div className="border-y border-border bg-surface py-8">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            A Outlive na mídia
          </p>
          <div className="marquee">
            <div className="marquee-track">
              {Array.from({ length: 2 }).flatMap((_, i) =>
                mediaLogos.map((logo) => (
                  <img
                    key={`${logo.alt}-${i}`}
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="media-logo-img"
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="problema" className="mx-auto max-w-6xl px-5 py-20 md:py-28 scroll-mt-24">
        <div className="reveal mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <Eyebrow>O diagnóstico</Eyebrow>
          <h2 className="mt-6 font-display text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl">
            Você come bem, faz exercício.<br />
            <span className="text-muted-foreground">Mas ainda sente que falta algo.</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { Icon: Battery, title: "Energia que some às 15h", desc: "Cansaço crônico mesmo dormindo 8 horas. Aquela queda de tarde que virou normal." },
            { Icon: Brain, title: "Dificuldade de foco e memória", desc: "Mente nublada, esquecimento fácil, falta de clareza mental." },
            { Icon: ShieldAlert, title: "Sistema imune sempre no limite", desc: "Qualquer mudança de estação e você adoece. Recuperação lenta." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="reveal rounded-2xl border border-border bg-surface p-7 text-left transition-colors hover:border-primary/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <p className="reveal mt-12 text-center text-lg font-semibold text-primary">
          A raiz do problema? Lacunas nutricionais invisíveis.
        </p>
        <div className="reveal mt-8 flex justify-center">
          <CTA>Quero corrigir isso — R$ 129,90 →</CTA>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section id="ciencia" className="border-t border-border bg-surface scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="reveal mx-auto max-w-3xl text-center md:mx-0 md:text-left">
            <Eyebrow>A solução</Eyebrow>
            <h2 className="mt-6 font-display text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl">
              Uma fórmula. 62 nutrientes.<br />
              <span className="text-primary">Tudo que seu corpo precisa — em um scoop.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="reveal">
              <img src={imgBox} alt="Caixa Daily Health More in One" width={523} height={652} loading="lazy" className="mx-auto w-full max-w-[340px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
            </div>
            <ul className="reveal grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {[
                [Zap, "Energia limpa sem cafeína", "Coenzima Q10 + complexo B + magnésio nas mitocôndrias"],
                [ShieldCheck, "Imunidade o ano inteiro", "Beta-glucana + vitamina C + zinco para as defesas"],
                [Leaf, "Intestino em equilíbrio", "Fibras prebióticas + curcumina para microbioma saudável"],
                [Bone, "Articulações protegidas", "Colágeno tipo II + cálcio + curcumina para mobilidade"],
                [Brain, "Memória e foco", "Vitaminas do grupo B + antioxidantes para cognição"],
                [Moon, "Sono e recuperação", "Magnésio + compostos bioativos para recuperação real"],
                [Sparkles, "Cabelo, pele e unhas", "Colágeno + biotina + zinco para beleza de dentro"],
              ].map(([Icon, title, desc]) => {
                const I = Icon as typeof Zap;
                return (
                  <li key={title as string} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <I className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{title as string}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{desc as string}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="reveal mt-14 flex items-start gap-3 rounded-2xl border border-primary/20 bg-background p-6 md:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FlaskConical className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="text-sm md:text-base">
              <span className="font-semibold text-foreground">Fórmula validada por médicos, nutricionistas e pesquisadores.</span>
              <span className="text-muted-foreground"> Cada ingrediente testado individualmente e em sinergia.</span>
            </p>
          </div>
        </div>
      </section>

      {/* PRODUTO EM DESTAQUE */}
      <section id="produto" className="border-y border-primary/20 bg-brand-dark text-brand-dark-foreground scroll-mt-24">

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="reveal">
            <img src={imgBoxSachets} alt="Caixa e sachês Daily Health More in One sabor limão siciliano" width={1100} height={1230} loading="lazy" className="mx-auto w-full max-w-[520px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
          </div>
          <div className="reveal text-center md:text-left">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Ideal para a primeira compra
            </span>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary/70">Daily Health, da Outlive</p>
            <h2 className="mt-2 font-display text-[2rem] leading-[1.05] sm:text-4xl md:text-5xl">
              Daily Health Travel Pack
            </h2>
            <p className="mt-2 font-display text-xl text-primary md:text-2xl">10 sachês · Sabor Limão Siciliano</p>
            <ul className="mt-6 inline-block space-y-2.5 text-left text-sm text-brand-dark-foreground/80 md:block">
              {[
                "10 sachês individuais (doses únicas, para onde você for)",
                "62 ingredientes em cada sachê",
                "Fórmula MORE IN ONE completa",
                "Sabor refrescante Limão Siciliano",
                "Prático: dissolve em água em segundos",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <p className="font-display text-5xl text-primary">R$ 129,90 <span className="font-sans text-2xl text-muted-foreground line-through">R$ 169,90</span></p>
              <p className="text-sm text-muted-foreground">10 sachês · = R$ 12,99 por dose de nutrição completa</p>
            </div>
            <div className="mt-6">
              <CTA full>Experimentar agora — R$ 129,90 →</CTA>
            </div>
            <p className="mt-3 text-xs text-brand-dark-foreground/70">62 nutrientes em uma única dose diária. Praticidade para onde você for.</p>
          </div>
        </div>
      </section>


      {/* PROVA SOCIAL */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="reveal mx-auto max-w-3xl text-center md:mx-0 md:text-left">
            <Eyebrow>Quem usa, recomenda</Eyebrow>
            <h2 className="mt-6 font-display text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl">
              +4.800 pessoas já escolheram <span className="text-primary">a Outlive.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { q: "Eu era cético. Comprei o Travel Pack só para testar. Terminei os 10 sachês em menos de 2 semanas e já pedi o pote de 300g. A diferença na disposição é real.", n: "Rafael M., 34 anos" },
              { q: "Prática absurda. Fico viajando toda semana e o sachê vai na mala sem ocupar espaço. Gosto de limão siciliano é suave e refrescante. Não largo mais.", n: "Camila T., 29 anos" },
              { q: "Comecei pelo pack de degustação porque não queria gastar muito sem conhecer. Hoje assino o mensal. Melhor decisão de saúde do ano.", n: "Lucas B., 41 anos" },
            ].map((t) => (
              <div key={t.n} className="reveal rounded-2xl border border-border bg-background p-7">
                <Stars className="h-4 w-4" />
                <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {t.n.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">{t.n}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-14 grid gap-6 rounded-2xl border border-primary/20 bg-background p-8 text-center md:grid-cols-3">
            {[
              ["85%", "relatam mais energia no 1º mês"],
              ["76%", "melhora digestiva"],
              ["4,9", "avaliação média"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-5xl text-primary">{num}</div>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VÍDEOS COM INFLUENCIADORES */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">

          <div className="reveal mx-auto max-w-3xl text-center">
            <Eyebrow>Influenciadores Outlive</Eyebrow>
            <h2 className="mt-6 font-display text-[2rem] leading-[1.05] sm:text-4xl md:text-5xl">
              Em quem confia,<br />
              <span className="text-primary">também já testou.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Atletas, médicos e creators de wellness experimentaram o Daily Health.
              Veja o que eles têm dito sobre a fórmula MORE IN ONE.
            </p>
          </div>

          <div className="reveal mt-12 -mx-5">
            <div className="marquee">
              <div className="marquee-track" style={{ gap: '1.25rem', paddingRight: '1.25rem', animationDuration: '60s' }}>
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex gap-5">
                    {[
                      { name: "Yasmin Alves", handle: "@nutri.yasminalves", role: "Nutricionista", src: "/videos/video-1.mp4" },
                      { name: "Bruno Manzoni", handle: "@brunomanzonitri", role: "Atleta · Triatlo", src: "/videos/video-2.mp4" },
                      { name: "Day Damm", handle: "@daydamm", role: "Creator Wellness", src: "/videos/video-3.mp4" },
                    ].map((v, i) => (
                      <a
                        key={`${dup}-${i}`}
                        href={BUY_TRAVEL}
                        target="_top"
                        onClick={(e) => handleCheckoutClick(e, BUY_TRAVEL)}
                        className="group relative block w-[240px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-primary/50 sm:w-[280px]"
                      >
                        <div className="relative aspect-[9/16] overflow-hidden">
                          <video
                            src={v.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-2 ring-background">{v.name.charAt(0)}</div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white">{v.name}</p>
                                <p className="truncate text-[11px] text-white/60">{v.handle}</p>
                              </div>
                            </div>
                            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-primary">{v.role}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA inline estilo da LP de referência */}
          <div className="reveal mt-14 overflow-hidden rounded-3xl bg-brand-dark p-8 text-brand-dark-foreground md:p-12">
            <div className="grid items-center gap-6 text-center md:grid-cols-[1fr_auto] md:text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Os mesmos resultados deles
                </span>
                <h3 className="mt-3 font-display text-2xl leading-[1.1] md:text-4xl">
                  Comece pelo Travel Pack<br />
                  <span className="text-primary">e sinta na primeira semana.</span>
                </h3>
                <p className="mt-3 text-sm text-brand-dark-foreground/70">
                  10 sachês · R$ 129,90 · sabor limão siciliano · entrega para todo Brasil
                </p>
              </div>
              <div className="w-full md:w-auto">
                <CTA full>Quero experimentar →</CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARAÇÃO */}
      <section id="comparacao" className="mx-auto max-w-6xl px-5 py-20 md:py-28 scroll-mt-24">
        <div className="reveal mx-auto max-w-3xl text-center">
          <Eyebrow>Compare e decida</Eyebrow>
          <h2 className="mt-6 font-display text-[2rem] leading-[1.05] sm:text-4xl md:text-5xl">
            R$ 12,99 por dose. <span className="text-primary">Faça as contas.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Um sachê substitui uma gaveta inteira de potes. Veja por que vale cada centavo.
          </p>
        </div>

        {/* Cabeçalho dos planos */}
        <div className="reveal mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Daily Health — destaque */}
          <div className="relative order-first md:order-2 rounded-3xl bg-brand-dark p-6 text-brand-dark-foreground shadow-2xl ring-2 ring-primary md:-mt-4 md:p-7">
            <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              <Crown className="h-3.5 w-3.5" /> Melhor escolha
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Daily Health</p>
            <p className="mt-2 font-display text-4xl">R$ 12,99<span className="text-base font-normal text-brand-dark-foreground/60"> /dose</span></p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Ingredientes", "62 nutrientes"],
                ["Biodisponibilidade", "Alta (pó solúvel)"],
                ["Praticidade", "1 dose única"],
                ["Sinergia validada", "Sim, cientificamente"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="text-brand-dark-foreground/60">{k}: </span>
                    <span className="font-semibold">{v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Multivitamínico comum */}
          <div className="md:order-1 rounded-3xl border border-border bg-surface p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Multivitamínico comum</p>
            <p className="mt-2 font-display text-4xl text-foreground/70">R$ 6,99<span className="text-base font-normal text-muted-foreground"> /dose</span></p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                [<Minus key="i" />, "Ingredientes", "10–15"],
                [<X key="b" />, "Biodisponibilidade", "Baixa (comprimido)"],
                [<AlertTriangle key="p" />, "Praticidade", "Vários comprimidos"],
                [<X key="s" />, "Sinergia validada", "Não"],
              ].map(([icon, k, v], i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-muted-foreground/60">{icon}</span>
                  <span>
                    <span className="text-muted-foreground/70">{k}: </span>
                    <span className="font-medium text-foreground/80">{v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprimidos separados */}
          <div className="md:order-3 rounded-3xl border border-border bg-surface p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Comprimidos separados</p>
            <p className="mt-2 font-display text-4xl text-foreground/70">R$ 30,99<span className="text-base font-normal text-muted-foreground"> /dose</span></p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                [<Minus key="i" />, "Ingredientes", "5–8 por produto"],
                [<AlertTriangle key="b" />, "Biodisponibilidade", "Variável"],
                [<X key="p" />, "Praticidade", "Múltiplos produtos"],
                [<X key="s" />, "Sinergia validada", "Não"],
              ].map(([icon, k, v], i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-muted-foreground/60">{icon}</span>
                  <span>
                    <span className="text-muted-foreground/70">{k}: </span>
                    <span className="font-medium text-foreground/80">{v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-12 rounded-3xl bg-primary/10 px-6 py-8 text-center">
          <p className="text-xl font-bold text-foreground md:text-2xl">
            Você não paga por suplemento. <span className="text-primary">Você investe em não adoecer.</span>
          </p>
          <div className="mt-6">
            <CTA>Quero meu Travel Pack — R$ 129,90 →</CTA>
          </div>
        </div>
      </section>


      {/* TIMELINE — O QUE ESPERAR */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
          <h2 className="reveal text-center font-display text-[2rem] leading-[1.08] md:text-5xl">
            O que esperar ao tomar diariamente?
          </h2>
          <p className="reveal mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
            Uma dose por dia. Resultados que se acumulam — semana após semana.
          </p>

          <JourneyTimeline />

          <div className="reveal mt-14 text-center">
            <CTA>Começar meus 90 dias — R$ 129,90 →</CTA>
          </div>
        </div>
      </section>


      {/* CTA FINAL */}
      <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
        <div className="reveal rounded-3xl bg-brand-dark p-8 text-center text-brand-dark-foreground md:p-14">
          <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            Oferta de primeira compra · 24% off
          </span>
          <h2 className="mt-6 font-display text-[2rem] leading-[1.05] sm:text-4xl md:text-5xl">
            Sua primeira dose de longevidade<br />
            <span className="text-primary">está a um clique.</span>
          </h2>
          <ul className="mx-auto mt-8 inline-block max-w-md space-y-2.5 text-left text-sm text-brand-dark-foreground/80">
            <li className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> 10 sachês Daily Health (62 nutrientes cada)</li>
            <li className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Fórmula MORE IN ONE validada cientificamente</li>
            <li className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Sabor Limão Siciliano refrescante</li>
            <li className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Praticidade máxima — leve para onde quiser</li>
          </ul>
          <div className="mt-10">
            <p className="font-display text-5xl text-primary md:text-6xl">R$ 129,90 <span className="font-sans text-2xl text-brand-dark-foreground line-through md:text-3xl">R$ 169,90</span></p>
            <p className="text-sm text-brand-dark-foreground/70">(R$ 12,99 por dose de nutrição completa)</p>
          </div>
          <div className="mt-8">
            <CTA full>Garantir meu Travel Pack agora →</CTA>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Preço promocional de primeira compra. Satisfação garantida ou seu dinheiro de volta.
          </p>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <img src={outliveLogo} alt="Outlive" className="h-7 w-auto" />
            <a
              href="https://www.instagram.com/outlivenutrition/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Outlive"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a href="mailto:hi@outlivenutrition.com.br" className="text-sm text-muted-foreground hover:text-primary">
              hi@outlivenutrition.com.br
            </a>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="rounded border border-border px-2 py-1">🔒 Compra Segura</span>
              <span className="rounded border border-border px-2 py-1">💳 Pagamento Criptografado</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Outlive Nutrition. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>


    </div>
  );
}
