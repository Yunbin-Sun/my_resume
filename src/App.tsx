import {
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";
import {
  motion,
  MotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const primaryText = "#E1E0CC";
const easeOut = [0.16, 1, 0.3, 1] as const;

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";
const heroPoster = `${import.meta.env.BASE_URL}hero-poster.jpg`;

// Isometric golden-hour illustration assets (sliced from the hero artwork set).
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

type StyledSegment = {
  text: string;
  className?: string;
};

const navItems = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#skills" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

type Project = {
  image: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  highlights: string[];
};

const featuredProject = {
  badge: "核心研究 · 可验证智能体",
  status: "实验与论文推进中",
  image: "scene-agent.webp",
  title: "TGVP · Template-Grounded Verifiable Planning",
  role: "研究设计 / 核心开发",
  description:
    "面向大模型智能体规划中的自由生成、结构漂移与难验证问题，以结构化 DSL、模板约束和验证机制构建可验证规划框架，并围绕规划结构熵（PSE）设计系统化评估。",
  tech: ["Python", "LLM", "Structured DSL", "Verifiable Planning", "PSE", "Statistical Analysis"],
  highlights: [
    "将自然语言规划重构为可检查的 Sequence / Graph 结构表示，并建立对应验证流程。",
    "采用 Candidate / System 两阶段评估与失败分类体系，正式实验按每条件 K=50 设计。",
    "以 candidate_Sequence_PSE@50 为主终点，并结合 Wilcoxon 检验与 bootstrap 置信区间进行统计分析。",
  ],
};

const projects: Project[] = [
  {
    image: "scene-charts.webp",
    title: "算法智能生成 · 风险感知任务规格化与验证门控",
    role: "共同作者 / 系统与实验设计",
    description:
      "面向算法智能生成中需求缺失、冲突与错误下游放行问题，研究从自然语言任务到 TaskIR / TaskSpec 的风险感知规格化方法，并通过确定性验证门控控制任务进入算法生成器。",
    tech: ["Python", "LLM", "TaskIR / TaskSpec", "Validation Gating", "Structured Clarification", "Evaluation"],
    highlights: [
      "构建 TaskIR / TaskSpec 表示，覆盖目标、输入输出、指标、约束、资源、风险与来源信息。",
      "实现缺失与冲突检测、结构化澄清、Schema / Rule / Semantic Validation 与 READY Gate。",
      "论文题目：Risk-Aware Task Specification and Validation Gating for Intelligent Algorithm Generation。",
    ],
  },
  {
    image: "scene-code.webp",
    title: "CoFind · AI 浏览器 Agent",
    role: "独立开发",
    description:
      "基于 CEF 嵌入真实 Chromium 的桌面浏览器，配悬浮 AI 助手面板。用户用自然语言下达指令，Agent 临时接管浏览器执行任务后归还控制权。",
    tech: [
      "CEF / Chromium",
      "C++",
      "React · TypeScript",
      "Python · FastAPI",
      "browser-use",
      "LLM API",
    ],
    highlights: [
      "CEF（C++）原生宿主嵌入 Chromium，通过 CDP 统一管理浏览器与执行生命周期。",
      "React + TypeScript 悬浮助手面板，经原生 window.shell 桥与宿主通信。",
      "Python / FastAPI 后端接入 browser-use 引擎，SSE 推送执行事件。",
      "双执行模式：确定性 DSL 步骤执行器 + ReAct（browser-use）兜底。",
    ],
  },
];

const skillGroups = [
  {
    title: "编程与实现",
    icon: "ic-laptop.webp",
    items: ["Python（主力）", "PyTorch（学习中）", "C / C++（基础）", "JavaScript / TypeScript", "HTML / CSS", "SQL"],
  },
  {
    title: "研究方向",
    icon: "ic-bulb.webp",
    items: [
      "世界模型",
      "自监督表征学习",
      "JEPA / V-JEPA",
      "视频理解",
      "潜空间预测与规划",
      "可验证智能体",
    ],
  },
  {
    title: "实验与数据",
    icon: "ic-glass.webp",
    items: ["NumPy", "Pandas", "Matplotlib", "实验设计", "统计检验", "Bootstrap CI", "数据清洗 / 可视化"],
  },
  {
    title: "框架与工具",
    icon: "ic-gears.webp",
    items: [
      "Git / GitHub",
      "Docker",
      "React / TypeScript",
      "FastAPI",
      "Playwright",
      "LLM API",
      "VS Code / Codex / Claude Code",
    ],
  },
];

type ExperienceItem = {
  icon: string;
  period: string;
  title: string;
  role: string;
  points: string[];
};

const experience: ExperienceItem[] = [
  {
    icon: "ic-gradcap.webp",
    period: "2025 – 2029",
    title: "云南中医药大学 · 信息学院",
    role: "医学信息工程 · 本科在读",
    points: [
      "医学信息工程本科在读，持续学习计算机、数学、机器学习与医学数据相关课程。",
      "当前重点转向世界模型、自监督表征学习、视频理解与潜空间预测等研究方向。",
    ],
  },
  {
    icon: "ic-scroll.webp",
    period: "2026 · 北京",
    title: "北京大学 · 科研实习",
    role: "科研实习生",
    points: [
      "参与 PET-CT 与肌肉相关的医学影像研究工作，接触真实科研问题与研究流程。",
      "在实习过程中进一步积累医学影像、数据分析与科研实践经验。",
    ],
  },
  {
    icon: "ic-scroll.webp",
    period: "2026.06 · 昆明",
    title: "ICBDSE 2026 · IEEE 第三届大数据科学与工程国际会议",
    role: "志愿者 · 获评「最佳志愿者」",
    points: [
      "协助会议签到、嘉宾引导、会场秩序与会务支持。",
      "接触大数据科学与工程领域的学术交流流程。",
    ],
  },
];

const contacts = [
  { icon: Mail, label: "邮箱", value: "yunbinsun7215@foxmail.com", href: "mailto:yunbinsun7215@foxmail.com" },
  { icon: GraduationCap, label: "学校", value: "云南中医药大学 · 医学信息工程", href: null },
  {
    icon: MapPin,
    label: "研究兴趣",
    value: "世界模型 · 自监督表征 · 视频理解 · 可验证智能体",
    href: null,
  },
];

const CJK_RE = /[　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/;

// Split mixed Chinese/English text into render tokens: each CJK character stands
// alone (so it can animate per-glyph and wrap freely) while runs of Latin text
// stay grouped (so words like "Web Agent" never break mid-word).
function tokenize(text: string): string[] {
  const tokens: string[] = [];
  let buffer = "";
  for (const ch of Array.from(text)) {
    if (CJK_RE.test(ch)) {
      if (buffer) {
        tokens.push(buffer);
        buffer = "";
      }
      tokens.push(ch);
    } else {
      buffer += ch;
    }
  }
  if (buffer) tokens.push(buffer);
  return tokens;
}

function NamePullUp({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const chars = useMemo(() => Array.from(name), [name]);

  return (
    <span ref={ref} className="inline-flex">
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-visible">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduceMotion ? false : { y: 26 }}
            animate={isInView || reduceMotion ? { y: 0 } : { y: 26 }}
            transition={{
              duration: 0.85,
              delay: reduceMotion ? 0 : index * 0.1,
              ease: easeOut,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function PullUpHeading({
  segments,
  className = "",
}: {
  segments: StyledSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const tokens = useMemo(
    () =>
      segments.flatMap((segment, segmentIndex) =>
        tokenize(segment.text).map((token) => ({
          token,
          className: segment.className ?? "",
          segmentIndex,
        })),
      ),
    [segments],
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {tokens.map(({ token, className: tokenClassName, segmentIndex }, index) => (
        <span
          key={`${segmentIndex}-${index}`}
          className="inline-block overflow-visible"
        >
          <motion.span
            className={`inline-block will-change-transform ${tokenClassName}`}
            initial={reduceMotion ? false : { y: 22 }}
            animate={isInView || reduceMotion ? { y: 0 } : { y: 22 }}
            transition={{
              duration: 0.72,
              delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.9),
              ease: easeOut,
            }}
          >
            {token.trim() === "" ? " " : token}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedToken({
  token,
  index,
  total,
  scrollYProgress,
}: {
  token: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const progress = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [progress - 0.1, progress + 0.05],
    [0.2, 1],
  );

  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {token}
    </motion.span>
  );
}

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const tokens = useMemo(() => tokenize(text), [text]);
  const total = Math.max(tokens.length, 1);

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto mt-8 max-w-2xl text-sm leading-[1.9] text-[#DEDBC8] sm:mt-10 sm:text-base"
    >
      {tokens.map((token, index) => (
        <AnimatedToken
          key={`${token}-${index}`}
          token={token}
          index={index}
          total={total}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function Reveal({
  children,
  index = 0,
  className = "",
  lift = false,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={lift && !reduceMotion ? { y: -6 } : undefined}
    >
      {children}
    </motion.div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <span
          key={item}
          className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-stone-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function SectionTitle({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="mb-5 flex items-center gap-4">
        <span className="font-serif text-base italic text-accent">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />
        <p className="text-[11px] tracking-[0.25em] text-primary/50">{kicker}</p>
      </div>
      <h2 className="text-3xl font-medium leading-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}

function Navbar() {
  return (
    <nav
      aria-label="主导航"
      className="absolute left-1/2 top-0 z-20 max-w-[calc(100%-1rem)] -translate-x-1/2 overflow-x-auto rounded-b-2xl bg-ink px-4 py-2 md:rounded-b-3xl md:px-8"
    >
      <ul className="flex items-center gap-3 whitespace-nowrap text-[11px] sm:gap-7 sm:text-xs md:gap-12 md:text-sm">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-primary/75 transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Some mobile browsers still block autoplay in low-power/data-saver modes.
        // In that case the poster remains visible until the user/browser allows playback.
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] bg-ink p-4 md:p-6">
      <div className="relative min-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem]">
        <img
          src={heroPoster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/5 to-ink/80" />

        <Navbar />

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6 sm:px-6 md:px-8 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-5 md:gap-6">
            <div className="col-span-12 md:col-span-8">
              <motion.p
                className="mb-3 text-[11px] tracking-[0.25em] text-primary/70 sm:text-xs md:mb-5"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.3, ease: easeOut }}
              >
                世界模型 · 可验证智能体 · 医学信息工程
              </motion.p>
              <h1
                className="select-none overflow-visible py-[0.08em] text-[20vw] font-medium leading-[1.02] tracking-[-0.03em] text-primary sm:text-[20vw] sm:tracking-[-0.03em] md:text-[15vw] lg:text-[13vw] xl:text-[12vw]"
              >
                <NamePullUp name="孙允斌" />
              </h1>
              <motion.p
                className="mt-3 font-serif text-lg italic text-primary/55 sm:text-xl md:mt-4 md:text-2xl"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.6, ease: easeOut }}
              >
                Yunbin Sun
              </motion.p>
            </div>
            <div className="col-span-12 flex max-w-[34rem] flex-col items-start gap-5 pb-1 md:col-span-4 md:pb-2">
              <motion.p
                className="text-sm leading-[1.7] text-primary/75 sm:text-base"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.5, ease: easeOut }}
              >
                医学信息工程本科生，当前重点学习世界模型、自监督表征与视频理解；
                同时持续推进可验证智能体规划与算法智能生成方向的研究。
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.7, ease: easeOut }}
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:translate-y-px sm:text-base"
                >
                  <span className="whitespace-nowrap">查看项目</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="text-sm text-primary/80 underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline sm:text-base"
                >
                  联系我 →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const aboutCopy =
    "我正在从大模型智能体研究进一步转向世界模型方向，重点关注自监督表征学习、JEPA / V-JEPA、视频理解与潜空间预测。同时持续推进 TGVP 可验证规划与算法智能生成任务规格化研究，并通过北京大学科研实习积累医学影像研究经验。相比堆叠工具，我更关注问题如何被结构化、验证，以及模型如何学习可用于预测和规划的内部表征。";

  return (
    <section id="about" className="bg-ink px-4 py-16 sm:px-6 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-surface px-5 py-16 text-center sm:px-8 md:rounded-[2rem] md:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[120%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-[130px]"
        />
        <div className="relative z-10">
          <p className="mb-6 text-[11px] tracking-[0.25em] text-primary/60">关于我</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-normal leading-[1.15] text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            <PullUpHeading
              segments={[
                { text: "我是孙允斌，", className: "text-primary" },
                { text: "医学信息工程本科生，", className: "text-primary" },
                { text: "关注世界模型与可验证智能系统。", className: "text-stone-500" },
              ]}
            />
          </h2>
          <ScrollRevealText text={aboutCopy} />
          <Reveal index={1} className="mx-auto mt-12 max-w-2xl md:mt-16">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]">
              <img
                src={asset("scene-pavilion.webp")}
                alt="等距风格插画：悬浮山崖上的院落与林木，金色暮光"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <Reveal className="group overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:rounded-[1.75rem]">
      <div className="relative h-52 overflow-hidden sm:h-64 md:h-80">
        <img
          src={asset(featuredProject.image)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/25 to-transparent" />
        <div className="absolute left-6 top-6 flex flex-wrap items-center gap-3 sm:left-8 sm:top-8 md:left-10">
          <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-black">
            {featuredProject.badge}
          </span>
          <span className="inline-flex rounded-full border border-white/20 bg-ink/40 px-3 py-1 text-[11px] text-primary/80 backdrop-blur-sm">
            {featuredProject.status}
          </span>
        </div>
      </div>
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-5 md:gap-10 md:p-10 md:pt-8">
        <div className="md:col-span-3">
          <h3 className="text-2xl font-medium leading-tight text-primary sm:text-3xl">
            {featuredProject.title}
          </h3>
          <p className="mt-2 text-sm text-stone-500">{featuredProject.role}</p>
          <p className="mt-5 text-sm leading-[1.8] text-stone-300 sm:text-base">
            {featuredProject.description}
          </p>
          <div className="mt-7">
            <TechTags tech={featuredProject.tech} />
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.2em] text-primary/50">实验与产出</p>
          <ul className="mt-5 space-y-4">
            {featuredProject.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-stone-400">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-none text-primary"
                  strokeWidth={1.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      index={index}
      lift
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-raised transition-colors duration-300 hover:border-white/20 md:rounded-[1.5rem]"
    >
      <div className="relative h-40 overflow-hidden sm:h-44">
        <img
          src={asset(project.image)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/10 to-transparent" />
        <span
          aria-hidden="true"
          className="absolute right-5 top-4 font-serif text-sm italic text-primary/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-normal leading-tight text-primary sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-xs text-stone-500 sm:text-sm">{project.role}</p>
        <p className="mt-4 text-sm leading-[1.75] text-stone-400">{project.description}</p>
        <ul className="mt-5 space-y-3">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-snug text-stone-400">
              <Check
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-none text-primary"
                strokeWidth={1.5}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          <TechTags tech={project.tech} />
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-ink px-4 py-20 sm:px-6 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 h-[420px] w-[620px] max-w-[80%] translate-x-1/4 rounded-full bg-accent/[0.05] blur-[150px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle index="01" kicker="项目经历" title="把研究与场景做成系统" />
        <FeaturedProject />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink px-4 py-20 sm:px-6 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[620px] max-w-[80%] -translate-x-1/4 rounded-full bg-accent/[0.045] blur-[150px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle index="02" kicker="技能" title="工具与方向" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              index={index}
              lift
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-raised p-6 transition-colors duration-300 hover:border-white/20 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={asset(group.icon)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-14 w-14 flex-none object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-16 sm:w-16"
                  />
                  <div>
                    <span className="font-serif text-sm italic text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-medium text-primary sm:text-lg">{group.title}</h3>
                  </div>
                </div>
                <span className="text-[11px] tabular-nums tracking-[0.1em] text-primary/30">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-stone-300 transition-colors duration-300 group-hover:border-white/15"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const phoneDigits = ["180", "8298", "4726"] as const;

function phoneImageSrc() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="28" viewBox="0 0 150 28" role="img" aria-label="联系电话">
      <rect width="150" height="28" rx="7" fill="transparent"/>
      <text x="0" y="20" fill="#e7e5d7" font-size="16" font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" letter-spacing="0.4">${phoneDigits.join("")}</text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function PhoneReveal({ index }: { index: number }) {
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "-60px" };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: index % 2 === 0 ? -28 : 28 }
      }
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <button
        type="button"
        className="block h-full w-full text-left"
        onClick={() => setRevealed(true)}
        aria-label={revealed ? "联系电话已显示" : "点击显示联系电话"}
      >
        <div className="flex h-full items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/15">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
            <Phone aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.15em] text-primary/50">电话</p>
            {revealed ? (
              <img
                src={phoneImageSrc()}
                alt="联系电话"
                className="mt-1 h-7 max-w-full select-none"
                draggable={false}
              />
            ) : (
              <p className="mt-1 text-sm leading-snug text-stone-200">点击显示手机号</p>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-ink px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="03" kicker="教育与经历" title="学习、研究与参与" />
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent md:left-[31px]"
          />
          <div className="space-y-5">
            {experience.map((item, index) => {
              return (
                <Reveal
                  key={item.title}
                  index={index}
                  className="relative pl-[72px] md:pl-20"
                >
                  <span className="absolute left-0 top-0 flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-white/10 bg-surface-raised md:h-16 md:w-16">
                    <img
                      src={asset(item.icon)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-11 w-11 object-contain md:h-[52px] md:w-[52px]"
                    />
                  </span>
                  <div className="rounded-2xl border border-white/5 bg-surface-raised p-6 transition-colors duration-300 hover:border-white/10 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="text-xs tracking-[0.15em] text-accent/80">{item.period}</span>
                      <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                      <span className="text-xs text-stone-500">{item.role}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-medium leading-snug text-primary sm:text-xl">
                      {item.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-stone-400">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 flex-none text-primary"
                            strokeWidth={1.5}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const reduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "-60px" };

  return (
    <section id="contact" className="bg-ink px-4 py-16 sm:px-6 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-surface px-5 py-16 sm:px-8 md:rounded-[2rem] md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[860px] max-w-[120%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.07] blur-[140px]"
        />
        <div className="relative z-10">
        <div className="text-center">
          <p className="mb-6 text-[11px] tracking-[0.25em] text-primary/60">联系</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-normal leading-[1.15] text-primary sm:text-4xl md:text-5xl">
            <PullUpHeading
              segments={[
                { text: "想聊聊，或给我一个", className: "text-primary" },
                { text: "实习机会？", className: "text-stone-500" },
              ]}
            />
          </h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-sm leading-[1.8] text-stone-400 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          >
            关注世界模型、自监督学习、视频理解、具身智能与可靠 AI 方向的科研交流和实习机会，也欢迎围绕可验证智能体与算法智能生成进行合作。
          </motion.p>
          <motion.a
            href="mailto:yunbinsun7215@foxmail.com"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { y: 0, scale: 0.98 }}
          >
            <span className="whitespace-nowrap">发邮件给我</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
              <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </span>
          </motion.a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <PhoneReveal index={1} />
          {contacts.map(({ icon: Icon, label, value, href }, index) => {
            const motionIndex = index === 0 ? 0 : index + 1;
            const inner = (
              <div className="flex h-full items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/15">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <Icon aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.15em] text-primary/50">{label}</p>
                  <p className="mt-1 break-words text-sm leading-snug text-stone-200">{value}</p>
                </div>
              </div>
            );
            return (
              <motion.div
                key={label}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: motionIndex % 2 === 0 ? -28 : 28 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: motionIndex * 0.1, ease: easeOut }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                {href ? (
                  <a href={href} className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="mt-14 text-center text-xs text-stone-600"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          © 2026 孙允斌 · Yunbin Sun　|　Built with React · Tailwind · Framer Motion
        </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        跳到主要内容
      </a>
      <main className="min-h-[100dvh] bg-ink" style={{ color: primaryText }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
