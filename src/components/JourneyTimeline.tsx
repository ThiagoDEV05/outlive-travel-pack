import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = {
  when: string;
  title: string;
  subtitle: string;
  items: string[];
};

const PHASES: Phase[] = [
  {
    when: "1ª semana",
    title: "Suas primeiras doses. Você começou a preencher as lacunas da sua nutrição.",
    subtitle: "Primeiras percepções",
    items: [
      "Seu intestino começa a receber suporte diário.",
      "Sua energia ganha um leve impulso.",
      "Você começa a criar consistência na rotina.",
      "Pequenas mudanças aparecem e o melhor ainda está por vir.",
    ],
  },
  {
    when: "2ª semana",
    title: "Consistência de hábitos: suporte diário de fibras, vitaminas e minerais para o seu dia render.",
    subtitle: "Você começa a notar",
    items: [
      "Menos sensação de cansaço constante.",
      "Sua rotina já não pesa como antes.",
      "Digestão mais equilibrada.",
      "Mais clareza mental nas tarefas do dia.",
    ],
  },
  {
    when: "30 dias",
    title: "Seu corpo está em ritmo de renovação.",
    subtitle: "Resultados mais claros",
    items: [
      "Mais disposição no dia a dia.",
      "Sensação geral de bem-estar.",
      "Mais consistência nos seus níveis de energia.",
    ],
  },
  {
    when: "60 dias",
    title: "A consistência começa a se traduzir em evolução. É aqui que os resultados mais profundos aparecem.",
    subtitle: "Com constância",
    items: [
      "Recuperação mais eficiente após esforço.",
      "Mais estabilidade física e mental.",
      "Seu corpo funcionando com mais equilíbrio.",
      "A rotina saudável já faz parte do seu dia.",
    ],
  },
  {
    when: "90 dias",
    title: "Isso já não é mais um teste. É parte de quem você é.",
    subtitle: "Hábito",
    items: [
      "Mais energia e consistência no longo prazo.",
      "Sensação de corpo mais equilibrado.",
      "Mais controle sobre sua rotina de saúde.",
      "Você construiu um hábito que sustenta sua performance e bem-estar.",
    ],
  },
];

const AUTO_MS = 6000;

export default function JourneyTimeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive((idx + PHASES.length) % PHASES.length);
  }, [active]);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % PHASES.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [paused, inView, active]);

  const phase = PHASES[active];
  const progress = ((active + 1) / PHASES.length) * 100;

  return (
    <div
      ref={sectionRef}
      className="mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Trilha de progresso com nós clicáveis */}
      <div className="relative mx-auto max-w-3xl px-2">
        <div className="absolute left-0 right-0 top-[10px] h-[3px] rounded-full bg-primary/15" />
        <motion.div
          className="absolute left-0 top-[10px] h-[3px] rounded-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        <div className="relative flex items-start justify-between">
          {PHASES.map((p, i) => {
            const done = i <= active;
            return (
              <button
                key={p.when}
                onClick={() => go(i)}
                className="group flex flex-col items-center gap-2 focus:outline-none"
                aria-label={`Ver ${p.when}`}
              >
                <span className="relative flex h-[22px] items-center justify-center">
                  {i === active && (
                    <motion.span
                      layoutId="journey-glow"
                      className="absolute h-6 w-6 rounded-full bg-primary/25"
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    />
                  )}
                  <span
                    className={`h-[14px] w-[14px] rounded-full border-2 transition-colors duration-300 ${
                      done
                        ? "border-primary bg-primary"
                        : "border-primary/30 bg-background"
                    } ${i === active ? "scale-110" : "group-hover:scale-110"}`}
                  />
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 sm:text-xs ${
                    i === active ? "text-amber-glow" : "text-muted-foreground/60"
                  }`}
                >
                  {p.when}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conteúdo animado */}
      <div className="relative mx-auto mt-12 min-h-[320px] max-w-3xl overflow-hidden px-2">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-amber-glow">
              {phase.when}
            </p>
            <div className="mt-3 rounded-xl border border-primary/30 bg-sage-deep/30 p-5 text-base font-medium text-foreground md:text-lg">
              {phase.title}
            </div>
            <p className="mt-6 font-bold text-foreground">{phase.subtitle}</p>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground md:text-base">
              {phase.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="flex gap-2"
                >
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{it}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => go(active - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
          aria-label="Anterior"
        >
          ←
        </button>
        <div className="flex gap-2">
          {PHASES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir para etapa ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-primary" : "w-2 bg-primary/25"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(active + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
          aria-label="Próximo"
        >
          →
        </button>
      </div>
    </div>
  );
}
