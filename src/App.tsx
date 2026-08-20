import { type FormEvent, type ReactNode, useState, useEffect, useRef, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Facebook,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Laptop,
  Mail,
  MapPin,
  Menu,
  Music2,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Trophy,
  UsersRound,
  X,
  Youtube,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, Router as WouterRouter, useLocation } from "wouter";

const queryClient = new QueryClient();

type SectionId =
  | "home"
  | "about"
  | "academics"
  | "admissions"
  | "student-life"
  | "facilities"
  | "news"
  | "contact";

const navItems: { label: string; id: SectionId }[] = [
  { label: "About", id: "about" },
  { label: "Academics", id: "academics" },
  { label: "Admissions", id: "admissions" },
  { label: "Student Life", id: "student-life" },
  { label: "Facilities", id: "facilities" },
  { label: "News", id: "news" },
  { label: "Contact", id: "contact" },
];

const imageSources = {
  hero: "/class.jpeg",
  students:
    "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200",
  library:
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200",
  classroom:
    "https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=1200",
  sport:
    "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1200",
  science:
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200",
  landscape:
    "https://images.pexels.com/photos/1131774/pexels-photo-1131774.jpeg?auto=compress&cs=tinysrgb&w=1400",
  talent: "/talent.jpeg",
  hm: "/hm.jpeg",
  alevel: "/alevel.jpg",
  modernclass: "/modernclass.jpg",
  lab: "/lab.jpg",
  computerlab: "/computerlab.jpeg",
  grounds: "/grounds.jpeg",
};

const facilities = [
  {
    name: "Modern classrooms",
    kind: "Learning spaces",
    image: imageSources.modernclass,
    description:
      "Bright, spacious classrooms designed for focused learning. Each room is equipped with comfortable seating, adequate lighting, and a conducive atmosphere for both teaching and discussion.",
  },
  {
    name: "Science laboratories",
    kind: "Practical learning",
    image: imageSources.lab,
    description:
      "Well-equipped laboratories for Physics, Chemistry, and Biology. Students gain hands-on experience through guided experiments and practical sessions that bring scientific concepts to life.",
  },
  {
    name: "Computer laboratory",
    kind: "Digital fluency",
    image: imageSources.computerlab,
    description:
      "A fully equipped computer lab where students build digital literacy skills. From basic computer operation to programming and research, learners gain confidence in using technology.",
  },
  {
    name: "Library",
    kind: "Independent study",
    image: imageSources.library,
    description:
      "A well-stocked library providing a calm environment for reading, research, and independent study. Students have access to textbooks, reference materials, and reading collections.",
  },
  {
    name: "Sports grounds",
    kind: "Movement & teamwork",
    image: "/talent.jpg",
    description:
      "Expansive sports grounds for football, athletics, basketball, and other physical activities. Sport is an essential part of building discipline, resilience, and teamwork.",
  },
  {
    name: "School grounds",
    kind: "Community life",
    image: imageSources.grounds,
    description:
      "A well-maintained campus offering a safe and welcoming environment. The school grounds provide space for assembly, outdoor activities, and community gatherings.",
  },
];

const newsItems = [
  {
    category: "School update",
    date: "14 September 2026",
    title: "Term 3 begins",
    excerpt:
      "Term 3 begins on Monday, 14 September 2026. All students are expected to report on time.",
    content:
      "We welcome all students back for Term 3. Classes resume on Monday, 14 September 2026. Please ensure all school fees and requirements are cleared before reporting. Boarding students should report by 5:00 PM on Sunday, 13 September 2026. Day students should report by 7:30 AM on Monday. We look forward to a productive and rewarding term.",
    image: imageSources.alevel,
  },
  {
    category: "Academics",
    date: "TBA",
    title: "O-Level and A-Level preparation begins",
    excerpt:
      "Final preparation sessions for O-Level and A-Level candidates will commence this term.",
    content:
      "This term marks the final preparation period for our O-Level (S.4) and A-Level (S.6) candidates. Intensive revision classes, mock examinations, and career guidance sessions will be conducted. Parents are encouraged to support their children during this critical period.",
    image: imageSources.modernclass,
  },
  {
    category: "Student life",
    date: "TBA",
    title: "Sports and activities continue",
    excerpt:
      "Inter-house sports competitions and club activities resume this term.",
    content:
      "Term 3 brings exciting inter-house sports competitions including football, athletics, and basketball. Clubs and societies will also resume activities including debate, science club, and music. All students are encouraged to participate in at least one extracurricular activity.",
    image: imageSources.talent,
  },
  {
    category: "Announcement",
    date: "4 December 2026",
    title: "Term 3 ends",
    excerpt:
      "Term 3 ends on Friday, 4 December 2026. Holiday schedule will be communicated.",
    content:
      "Term 3 officially ends on Friday, 4 December 2026. Report cards will be distributed on the last day of term. The holiday schedule and Term 1 (2027) opening dates will be communicated to parents in due course. We thank all families for their continued support throughout the term.",
    image: imageSources.library,
  },
];

function scrollToSection(id: SectionId) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SchoolMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${compact ? "scale-90 origin-left" : ""}`}
      data-testid="brand-school-mark"
    >
      <img
        src="/logo.png"
        alt="Petta Community Secondary School logo"
        className="h-11 w-11 shrink-0 object-cover"
      />
      <div className="leading-none">
        <div className="font-display text-[1.05rem] font-semibold tracking-tight text-[hsl(var(--primary-foreground))]">
          Petta Community
        </div>
        <div className="mt-1 font-mono-school text-[.56rem] uppercase tracking-[.19em] text-[hsl(var(--primary-foreground)/.62)]">
          Secondary School
        </div>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "gold",
  className = "",
  testId,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "gold" | "outline" | "light";
  className?: string;
  testId: string;
}) {
  const variants = {
    gold: "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:-translate-y-0.5 hover:shadow-[0_12px_22px_hsl(var(--accent)/.23)]",
    outline:
      "border border-[hsl(var(--primary-foreground)/.35)] text-[hsl(var(--primary-foreground))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]",
    light:
      "border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] hover:-translate-y-0.5",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-bold transition-all duration-300 ${variants[variant]} ${className}`}
      data-testid={testId}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${light ? "text-[hsl(var(--primary-foreground))]" : ""}`}
    >
      <div
        className={`section-rule mb-5 ${light ? "bg-[hsl(var(--accent))]" : ""}`}
      />
      <div
        className={`eyebrow mb-4 ${light ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--muted-foreground))]"}`}
      >
        {eyebrow}
      </div>
      <h2 className="font-display text-balance text-4xl font-semibold leading-[.98] tracking-[-.035em] sm:text-5xl md:text-[4.25rem]">
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-6 max-w-xl text-base leading-7 ${light ? "text-[hsl(var(--primary-foreground)/.7)]" : "text-[hsl(var(--muted-foreground))]"}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

function ImageFrame({
  src,
  alt,
  className = "",
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[hsl(var(--secondary))] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-[hsl(var(--primary)/.85)] px-3 py-1.5 font-mono-school text-[.58rem] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))]">
          {label}
        </span>
      )}
    </div>
  );
}

function Navbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const go = (id: SectionId) => {
    scrollToSection(id);
    setMenuOpen(false);
  };
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--primary-foreground)/.12)] bg-[hsl(var(--primary)/.95)] text-[hsl(var(--primary-foreground))] backdrop-blur-xl"
      data-testid="site-header"
    >
      <div className="container-school flex h-[4.5rem] items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go("home")}
          aria-label="Return to Petta Community Secondary School home"
          data-testid="button-home-nav"
        >
          <SchoolMark />
        </button>
        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="relative py-3 text-[.72rem] font-semibold text-[hsl(var(--primary-foreground)/.72)] transition-colors hover:text-[hsl(var(--accent))]"
              data-testid={`button-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => go("contact")}
            className="inline-flex items-center gap-2 text-[.72rem] font-semibold text-[hsl(var(--primary-foreground)/.72)] hover:text-[hsl(var(--accent))]"
            data-testid="button-nav-contact-direct"
          >
            Enquire <ArrowUpRight size={14} />
          </button>
          <Button onClick={() => go("admissions")} testId="button-nav-apply">
            Apply now
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--primary-foreground)/.25)] lg:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div
          className="border-t border-[hsl(var(--primary-foreground)/.12)] bg-[hsl(var(--primary))] px-4 pb-5 pt-3 lg:hidden"
          data-testid="mobile-navigation"
        >
          <nav className="container-school grid" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="flex items-center justify-between border-b border-[hsl(var(--primary-foreground)/.1)] py-4 text-left text-base font-semibold"
                data-testid={`button-mobile-nav-${item.id}`}
              >
                {item.label}
                <ChevronRight size={16} className="text-[hsl(var(--accent))]" />
              </button>
            ))}
            <Button
              onClick={() => go("admissions")}
              className="mt-5 w-full"
              testId="button-mobile-apply"
            >
              Apply now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-end overflow-hidden bg-[hsl(var(--primary))] pt-28 text-[hsl(var(--primary-foreground))] md:min-h-[800px]"
    >
      <div className="absolute inset-0">
        <img
          src={imageSources.hero}
          alt="Students learning together in a bright school setting"
          className="h-full w-full object-cover opacity-45 mix-blend-luminosity"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/.98)] via-[hsl(var(--primary)/.74)] to-[hsl(var(--primary)/.27)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.95)] via-transparent to-[hsl(var(--primary)/.25)]" />
      </div>
      <div className="container-school relative z-10 w-full pb-14 md:pb-20">
        <div className="grid max-w-5xl gap-14 lg:grid-cols-[1fr_280px] lg:items-end">
          <div className="reveal">
            <div className="eyebrow mb-6 text-[hsl(var(--accent))]">
              Petta Community Secondary School{" "}
              <span className="mx-2 text-[hsl(var(--primary-foreground)/.4)]">
                /
              </span>{" "}
              Uganda
            </div>
            <h1 className="max-w-4xl font-display text-balance text-[3.35rem] font-semibold leading-[.91] tracking-[-.055em] sm:text-6xl md:text-8xl">
              Shaping minds.
              <br />
              <span className="text-[hsl(var(--accent))]">
                Building character.
              </span>
              <br />
              Preparing leaders.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-[hsl(var(--primary-foreground)/.74)] sm:text-lg">
              A nurturing and academically focused environment where young
              people are equipped with the knowledge, discipline and confidence
              to shape their future.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => scrollToSection("about")}
                testId="button-hero-explore"
              >
                Explore our school
              </Button>
              <Button
                onClick={() => scrollToSection("admissions")}
                variant="outline"
                testId="button-hero-admissions"
              >
                Admissions
              </Button>
            </div>
          </div>
          <div className="reveal reveal-delay-2 border-l border-[hsl(var(--primary-foreground)/.3)] pl-6">
            <div className="eyebrow text-[hsl(var(--primary-foreground)/.55)]">
              Our learning pathways
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["O-Level", "A-Level", "Day & Boarding"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[hsl(var(--primary-foreground)/.25)] px-3 py-2 text-xs text-[hsl(var(--primary-foreground)/.82)]"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-[hsl(var(--primary-foreground)/.48)]">
              A place for serious learning, steady growth and a life of
              contribution.
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => scrollToSection("about")}
        className="absolute bottom-5 right-5 hidden items-center gap-3 font-mono-school text-[.6rem] uppercase tracking-[.15em] text-[hsl(var(--primary-foreground)/.55)] transition-colors hover:text-[hsl(var(--accent))] md:flex"
        data-testid="button-hero-scroll"
      >
        Scroll to discover <ArrowDownRight size={16} />
      </button>
    </section>
  );
}

function AtAGlance() {
  const items = [
    {
      icon: BookOpen,
      title: "O-Level",
      copy: "Strong academic foundations for the next stage of learning.",
    },
    {
      icon: GraduationCap,
      title: "A-Level",
      copy: "Advanced study that opens pathways to university and future careers.",
    },
    {
      icon: UsersRound,
      title: "A whole community",
      copy: "A structured environment for learners, families and educators.",
    },
    {
      icon: HeartHandshake,
      title: "Beyond the classroom",
      copy: "Academics, leadership, sport, creativity and character.",
    },
  ];
  return (
    <section
      className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] py-14 md:py-20"
      data-testid="section-at-a-glance"
    >
      <div className="container-school">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="eyebrow text-[hsl(var(--muted-foreground))]">
              At a glance
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              A foundation with room to grow.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">
            A clear promise: prepare every learner for the next chapter, while
            making this chapter count.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, copy }, index) => (
            <div
              key={title}
              className="group bg-[hsl(var(--card))] p-6 transition-colors hover:bg-[hsl(var(--secondary))] md:p-7"
              data-testid={`card-glance-${index}`}
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-[hsl(var(--primary))] transition-transform duration-300 group-hover:-translate-y-1"
              />
              <h3 className="mt-8 font-display text-2xl font-semibold">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    "Fear of God",
    "Discipline",
    "Time Management",
    "Commitment & Devotion",
    "Upholding Smartness",
    "Respect",
  ];
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-[hsl(var(--background))] py-20 md:py-28"
      data-testid="section-about"
    >
      <div className="container-school">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="relative min-h-[450px]">
            <ImageFrame
              src={imageSources.alevel}
              alt="Petta Community Secondary School"
              className="absolute inset-0 h-[390px] md:h-[470px]"
              label="A culture of possibility"
            />
            <div className="absolute bottom-0 right-0 w-3/5 border-8 border-[hsl(var(--background))] bg-[hsl(var(--accent))] p-5 sm:p-7">
              <div className="font-mono-school text-[.62rem] uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                Our belief
              </div>
              <p className="mt-3 font-display text-xl font-semibold leading-tight text-[hsl(var(--primary))]">
                Education should make a young person more capable — and more
                human.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <SectionHeading
              eyebrow="About the school"
              title="More than education. A foundation for life."
              copy="Petta Community Secondary School is being shaped as a serious, welcoming place for young people to learn well, live responsibly and find the confidence to contribute."
            />
            <div className="mt-10 grid gap-7 border-t border-[hsl(var(--border))] pt-7 sm:grid-cols-2">
              <div>
                <div className="eyebrow text-[hsl(var(--muted-foreground))]">
                  Vision
                </div>
                <p className="mt-3 text-sm leading-6">
                  To be an Academic Center of Excellence that produces
                  academically sound students who are morally upright and
                  relevant to the society.
                </p>
              </div>
              <div>
                <div className="eyebrow text-[hsl(var(--muted-foreground))]">
                  Mission
                </div>
                <p className="mt-3 text-sm leading-6">
                  To teach, guide and assess students effectively towards
                  Academic excellence and Moral Uprightness.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <div className="eyebrow text-[hsl(var(--muted-foreground))]">
                Our values
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-[hsl(var(--border))] px-3 py-2 text-sm text-[hsl(var(--primary))]"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 border-t border-[hsl(var(--border))] pt-10">
          <div className="eyebrow text-[hsl(var(--muted-foreground))]">
            A note from leadership
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
            “We see the whole learner.”
          </h3>
          <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <ImageFrame
              src={imageSources.hm}
              alt="Bayeke Peter - Headteacher"
              className="h-48 w-48 lg:h-56 lg:w-56"
            />
            <div className="border-l-2 border-[hsl(var(--accent))] pl-6">
              <Quote size={24} className="mb-4 text-[hsl(var(--accent))]" />
              <p className="font-display text-xl leading-relaxed text-[hsl(var(--primary))] md:text-2xl">
                “At Petta Community Secondary School, we believe every child
                deserves the chance to grow — not just in knowledge, but in
                character. Our role is to guide, challenge and inspire young
                people to become the best version of themselves.”
              </p>
              <div className="mt-5 font-mono-school text-[.65rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
                Bayeke Peter · Headteacher
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Academics() {
  return (
    <section
      id="academics"
      className="scroll-mt-20 bg-[hsl(var(--primary))] py-20 text-[hsl(var(--primary-foreground))] md:py-28"
      data-testid="section-academics"
    >
      <div className="container-school">
        <div className="flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
          <SectionHeading
            light
            eyebrow="Academic life"
            title="Rigour, curiosity, direction."
            copy="A purposeful academic experience for learners building strong foundations at O-Level and making informed choices for A-Level and beyond."
          />
          <div className="max-w-xs border-l border-[hsl(var(--primary-foreground)/.25)] pl-5 text-sm leading-6 text-[hsl(var(--primary-foreground)/.65)]">
            The programme details below are a framework ready for the school’s
            confirmed curriculum, departments and subject combinations.
          </div>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div
            className="border border-[hsl(var(--primary-foreground)/.17)] bg-[hsl(var(--primary-foreground)/.05)] p-7 md:p-9"
            data-testid="card-academics-olevel"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center bg-[hsl(var(--accent))] text-[hsl(var(--primary))]">
                <span className="font-mono-school text-sm font-bold">01</span>
              </div>
              <BookOpen size={23} className="text-[hsl(var(--accent))]" />
            </div>
            <h3 className="mt-12 font-display text-4xl font-semibold">
              O-Level
            </h3>
            <p className="mt-4 max-w-md leading-7 text-[hsl(var(--primary-foreground)/.65)]">
              A broad, balanced secondary education focused on strong
              foundations, practical understanding and the confidence to keep
              learning.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[hsl(var(--primary-foreground)/.16)] pt-6 text-sm text-[hsl(var(--primary-foreground)/.8)]">
              <span className="flex gap-2">
                <Check size={16} className="text-[hsl(var(--accent))]" />{" "}
                Sciences
              </span>
              <span className="flex gap-2">
                <Check size={16} className="text-[hsl(var(--accent))]" />{" "}
                Mathematics
              </span>
              <span className="flex gap-2">
                <Check size={16} className="text-[hsl(var(--accent))]" />{" "}
                Humanities
              </span>
              <span className="flex gap-2">
                <Check size={16} className="text-[hsl(var(--accent))]" />{" "}
                Languages
              </span>
              <span className="flex gap-2">
                <Check size={16} className="text-[hsl(var(--accent))]" /> ICT
              </span>
              <span className="flex gap-2">
                <Check size={16} className="text-[hsl(var(--accent))]" />{" "}
                Practical learning
              </span>
            </div>
          </div>
          <div
            className="border border-[hsl(var(--primary-foreground)/.17)] bg-[hsl(var(--accent))] p-7 text-[hsl(var(--primary))] md:p-9"
            data-testid="card-academics-alevel"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center bg-[hsl(var(--primary))] text-[hsl(var(--accent))]">
                <span className="font-mono-school text-sm font-bold">02</span>
              </div>
              <GraduationCap size={25} />
            </div>
            <h3 className="mt-12 font-display text-4xl font-semibold">
              A-Level
            </h3>
            <p className="mt-4 max-w-md leading-7 text-[hsl(var(--primary)/.72)]">
              Advanced secondary education that invites depth, independence and
              clear thinking as learners prepare for higher education and future
              work.
            </p>
            <div className="mt-8 grid gap-3 border-t border-[hsl(var(--primary)/.18)] pt-6 text-sm text-[hsl(var(--primary)/.82)]">
              <span className="flex gap-2">
                <Check size={16} /> Sciences &amp; Arts pathways
              </span>
              <span className="flex gap-2">
                <Check size={16} /> University preparation
              </span>
              <span className="flex gap-2">
                <Check size={16} /> Career preparation
              </span>
              <span className="flex gap-2">
                <Check size={16} /> [Insert confirmed subject combinations]
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: FlaskConical,
              title: "Practical learning",
              copy: "Connecting concepts to observation, experiment and application.",
            },
            {
              icon: ShieldCheck,
              title: "Academic support",
              copy: "Structures for focus, feedback and steady progress.",
            },
            {
              icon: Laptop,
              title: "Future ready",
              copy: "Digital fluency and habits that travel beyond school.",
            },
          ].map(({ icon: Icon, title, copy }, index) => (
            <div
              key={title}
              className="border border-[hsl(var(--primary-foreground)/.17)] p-6"
              data-testid={`card-academic-support-${index}`}
            >
              <Icon size={21} className="text-[hsl(var(--accent))]" />
              <h4 className="mt-7 font-display text-xl font-semibold">
                {title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-[hsl(var(--primary-foreground)/.6)]">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Admissions() {
  const steps = [
    {
      number: "01",
      title: "Apply",
      copy: "Submit an enquiry or application with the required information.",
    },
    {
      number: "02",
      title: "Assessment / Interview",
      copy: "The school shares the next step for the learner and family.",
    },
    {
      number: "03",
      title: "Admission decision",
      copy: "Receive confirmed feedback and joining information.",
    },
    {
      number: "04",
      title: "Join the school",
      copy: "Begin the Petta Community experience with a clear welcome.",
    },
  ];
  return (
    <section
      id="admissions"
      className="scroll-mt-20 bg-[hsl(var(--secondary))] py-20 md:py-28"
      data-testid="section-admissions"
    >
      <div className="container-school">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Admissions"
              title="A clear next step for your family."
              copy="Choosing a school is a thoughtful decision. We want families to have the right information, the right conversation and a warm welcome."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => scrollToSection("contact")}
                testId="button-admissions-contact"
              >
                Contact admissions
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="light"
                testId="button-admissions-visit"
              >
                Visit our school
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdmissionCard
              title="O-Level (S.1–S.4)"
              icon={<BookOpen size={22} />}
              items={[
                "PLE Results Slip",
                "Admission Letter",
                "Passport Photo",
                "Birth Certificate / ID",
                "Parent/Guardian ID",
                "Previous School Records",
                "Admission/Interview requirements",
              ]}
              testId="card-admission-olevel"
            />
            <AdmissionCard
              title="A-Level (S.5–S.6)"
              icon={<GraduationCap size={22} />}
              items={[
                "UCE Results Slip",
                "Admission Letter",
                "Passport Photo",
                "Birth Certificate / ID",
                "Parent/Guardian ID",
                "Previous School Records",
                "Required grades for chosen combination",
              ]}
              testId="card-admission-alevel"
            />
          </div>
        </div>
        <div className="mt-20 border-t border-[hsl(var(--border))] pt-10">
          <div className="eyebrow text-[hsl(var(--muted-foreground))]">
            How it works
          </div>
          <div className="mt-8 grid gap-0 md:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative border-l border-[hsl(var(--border))] p-5 md:min-h-[180px] md:border-l-0 md:border-t ${index === steps.length - 1 ? "md:border-r" : ""}`}
                data-testid={`step-admission-${index}`}
              >
                <div className="font-mono-school text-xs font-bold text-[hsl(var(--accent-foreground))]">
                  {step.number}
                </div>
                <h3 className="mt-9 font-display text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {step.copy}
                </p>
                {index < 3 && (
                  <ChevronRight
                    className="absolute -bottom-2 left-[-9px] hidden text-[hsl(var(--accent-foreground))] md:block"
                    size={16}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdmissionCard({
  title,
  icon,
  items,
  testId,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
  testId: string;
}) {
  return (
    <div
      className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-1"
      data-testid={testId}
    >
      <div className="flex items-center gap-3 text-[hsl(var(--primary))]">
        {icon}
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
      </div>
      <ul className="mt-6 space-y-3 border-t border-[hsl(var(--border))] pt-5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-5 text-[hsl(var(--muted-foreground))]"
          >
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-[hsl(var(--accent-foreground))]"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhyChoose() {
  const reasons = [
    {
      icon: Trophy,
      title: "Academic excellence",
      copy: "A focused environment designed to help every learner reach their potential.",
    },
    {
      icon: ShieldCheck,
      title: "Character & discipline",
      copy: "Developing responsible, respectful and confident young people.",
    },
    {
      icon: HeartHandshake,
      title: "Holistic development",
      copy: "Supporting students beyond academics through sport, leadership and creativity.",
    },
    {
      icon: UsersRound,
      title: "Experienced teachers",
      copy: "Dedicated educators committed to student growth.",
    },
    {
      icon: CheckCircle2,
      title: "Safe learning environment",
      copy: "A supportive setting where students can learn, grow and thrive.",
    },
    {
      icon: ArrowUpRight,
      title: "Leadership development",
      copy: "Preparing young people to become responsible leaders in their communities.",
    },
  ];
  return (
    <section
      className="bg-[hsl(var(--background))] py-20 md:py-28"
      data-testid="section-why-choose"
    >
      <div className="container-school">
        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
          <SectionHeading
            eyebrow="Why choose us"
            title="The question behind every school search."
            copy="Trust is built in the details: what is taught, how people are treated and whether every learner is known well enough to be supported."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, copy }, index) => (
              <div
                key={title}
                className="group border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                data-testid={`card-why-${index}`}
              >
                <Icon
                  size={23}
                  className="text-[hsl(var(--accent-foreground))]"
                />
                <h3 className="mt-7 font-display text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentLife() {
  return (
    <section
      id="student-life"
      className="scroll-mt-20 overflow-hidden bg-[hsl(var(--background))] py-20 md:py-28"
      data-testid="section-student-life"
    >
      <div className="container-school">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_.9fr]">
          <SectionHeading
            eyebrow="Student life"
            title="School is where a young person finds their people."
            copy="The strongest school days are full of purposeful work, shared rituals, movement, questions and the quiet discovery of what you can do."
          />
          <ImageFrame
            src={imageSources.talent}
            alt="Students showcasing their talents"
            className="h-64 lg:h-80"
            label="Participation matters"
          />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <LifeCard
            icon={<Trophy size={22} />}
            title="Sport & movement"
            copy="Football, athletics, basketball and other activities — [confirm current offerings]."
          />
          <LifeCard
            icon={<Music2 size={22} />}
            title="Clubs & creativity"
            copy="Debate, science, technology, journalism, music and more — [confirm current clubs]."
          />
          <LifeCard
            icon={<HeartHandshake size={22} />}
            title="Leadership & service"
            copy="Opportunities to practise responsibility, initiative and care for the wider community."
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[1.35fr_.65fr]">
          <ImageFrame
            src={imageSources.library}
            alt="A library prepared for focused reading"
            className="h-64"
            label="Curiosity has a place here"
          />
          <div className="flex flex-col justify-between bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))]">
            <div>
              <div className="eyebrow text-[hsl(var(--accent))]">
                The student experience
              </div>
              <p className="mt-8 font-display text-3xl font-semibold leading-tight">
                “Find your voice. Learn to use it well.”
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 flex items-center gap-2 self-start text-sm font-bold text-[hsl(var(--accent))]"
              data-testid="button-student-life-enquire"
            >
              Ask about student life <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LifeCard({
  icon,
  title,
  copy,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <div className="text-[hsl(var(--accent-foreground))]">{icon}</div>
      <h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
        {copy}
      </p>
    </div>
  );
}

function Facilities({
  onOpen,
}: {
  onOpen: (facility: (typeof facilities)[number]) => void;
}) {
  return (
    <section
      id="facilities"
      className="scroll-mt-20 bg-[hsl(var(--secondary))] py-20 md:py-28"
      data-testid="section-facilities"
    >
      <div className="container-school">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Campus & facilities"
            title="Spaces that make learning possible."
            copy="Explore the kinds of spaces that support a complete school experience. Approved campus photography and confirmed details will be added as the school shares them."
          />
          <div className="eyebrow hidden text-right text-[hsl(var(--muted-foreground))] md:block">
            Gallery / 06 views
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {facilities.map((facility, index) => (
            <button
              type="button"
              key={facility.name}
              onClick={() => onOpen(facility)}
              className="group relative block overflow-hidden text-left lg:col-span-4"
              data-testid={`button-facility-${index}`}
            >
              <div className="h-56">
                <ImageFrame
                  src={facility.image}
                  alt={facility.name}
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.9)] via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-[hsl(var(--primary-foreground))]">
                  <div className="eyebrow text-[hsl(var(--accent))]">
                    {facility.kind}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold">
                      {facility.name}
                    </h3>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--primary))] opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function News({ onOpen }: { onOpen: (item: (typeof newsItems)[number]) => void }) {
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "School update",
    "Academics",
    "Student life",
    "Announcement",
  ];
  const filtered =
    filter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === filter);
  return (
    <section
      id="news"
      className="scroll-mt-20 bg-[hsl(var(--background))] py-20 md:py-28"
      data-testid="section-news"
    >
      <div className="container-school">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="News & events"
            title="What is happening at Petta."
            copy="Stay updated with the latest news, events and announcements from Petta Community Secondary School."
          />
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setFilter(category)}
                className={`rounded-full border px-3 py-2 text-xs font-bold transition-colors ${filter === category ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]"}`}
                data-testid={`button-news-filter-${category.toLowerCase().replace(" ", "-")}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item, index) => (
            <button
              type="button"
              key={item.title}
              onClick={() => onOpen(item)}
              className="group overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              data-testid={`card-news-${index}`}
            >
              <div className="h-48 overflow-hidden">
                <ImageFrame src={item.image} alt="" className="h-full w-full" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 font-mono-school text-[.58rem] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">
                  <span className="text-[hsl(var(--accent-foreground))]">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {item.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]">
                  Read more <ArrowUpRight size={15} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const achievementStats = [
  { value: 98, suffix: "%", label: "UCE Division 1" },
  { value: 87, suffix: "%", label: "UACE Principal Passes" },
  { value: 30, suffix: "+", label: "Awards & Recognitions" },
  { value: 15, suffix: "+", label: "Years of Excellence" },
];

const achievements = [
  {
    year: "2026",
    title: "Academic Excellence",
    description: "Outstanding performance in national examinations with a 98% Division 1 pass rate in UCE.",
    category: "Academics",
  },
  {
    year: "2025",
    title: "Regional Debate Champions",
    description: "Students represented the school at regional level and emerged champions in the inter-school debate competition.",
    category: "Leadership",
  },
  {
    year: "2024",
    title: "Science & Innovation",
    description: "Students showcased innovative projects at a national science and technology competition.",
    category: "Innovation",
  },
  {
    year: "2024",
    title: "Sports Excellence",
    description: "District champions in football and athletics, with multiple students selected for regional teams.",
    category: "Sports",
  },
];

const beyondItems = [
  { icon: <GraduationCap size={20} />, title: "Academics", description: "Rigorous curriculum that prepares students for national exams and beyond." },
  { icon: <ShieldCheck size={20} />, title: "Leadership & Character", description: "Building principled leaders through mentorship and community service." },
  { icon: <Laptop size={20} />, title: "Innovation & Technology", description: "Equipping students with digital skills and a passion for problem-solving." },
  { icon: <Trophy size={20} />, title: "Sports, Arts & Talent", description: "Nurturing every student's unique gifts through clubs, competitions and cultural events." },
];

const testimonials = [
  {
    quote: "The school gave me more than academic knowledge. It gave me the confidence, discipline and foundation to pursue my dreams.",
    name: "Sarah Namukasa",
    role: "Alumni",
    detail: "Former Student · Class of 2024",
    image: imageSources.alevel,
  },
  {
    quote: "As a parent, I have watched my child grow not just in grades but in character. Petta is more than a school — it is a community that truly cares.",
    name: "Mr. David Okello",
    role: "Parent",
    detail: "Parent of S.3 Student",
    image: imageSources.hm,
  },
  {
    quote: "Teaching at Petta has been the most fulfilling experience. The students are eager, the environment is supportive, and the vision is clear.",
    name: "Mrs. Grace Auma",
    role: "Teacher",
    detail: "Senior Teacher · 8 Years",
    image: imageSources.modernclass,
  },
  {
    quote: "From my first day in S.1 to my final exams in S.4, Petta shaped me into someone who believes in hard work and integrity.",
    name: "Ofwono Alex",
    role: "Alumni",
    detail: "Former Student · Class of 2022",
    image: "/alex.png",
  },
];

function AchievementsAndTestimonials() {
  const N = testimonials.length;
  const CARD_GAP = 28;

  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const resetRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(300);

  const track = [...testimonials, ...testimonials];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w < 400) setCardW(w - 32);
      else if (w < 700) setCardW((w - CARD_GAP) / 2);
      else setCardW(300);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardTotal = cardW + CARD_GAP;

  const goNext = useCallback(() => {
    setTransition(true);
    setOffset((prev) => {
      const next = prev + 1;
      if (next >= N) resetRef.current = true;
      return next;
    });
  }, [N]);

  const goTo = useCallback((i: number) => {
    setTransition(true);
    setOffset(i);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!resetRef.current) return;
    setTransition(false);
    setOffset(0);
    resetRef.current = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransition(true));
    });
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, isHovered]);

  return (
    <>
      {/* ── ACHIEVEMENTS ── */}
      <section
        className="bg-[hsl(var(--background))] py-20 md:py-28"
        data-testid="section-achievements"
      >
        <div className="container-school">
          <div className="max-w-3xl">
            <span className="font-mono-school text-[.65rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
              Our Achievements
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[.97] tracking-[-.03em] md:text-6xl">
              Let the Work Speak.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              Excellence isn't something we claim. It's something we
              demonstrate — through our results, our students, and our
              impact.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {achievementStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="font-display text-5xl font-bold text-[hsl(var(--primary))] md:text-6xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 font-mono-school text-[.65rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <span className="font-mono-school text-[.65rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
              Our Record
            </span>
            <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              A Legacy of Achievement
            </h3>
            <div className="mt-12 space-y-0">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="group relative flex gap-6 border-l-2 border-[hsl(var(--border))] py-8 pl-8 transition-colors hover:border-[hsl(var(--primary))]"
                >
                  <div className="absolute -left-[9px] top-8 h-4 w-4 rounded-full border-2 border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-colors group-hover:border-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono-school text-xs font-bold tracking-wider text-[hsl(var(--primary))]">
                        {item.year}
                      </span>
                      <span className="rounded-full bg-[hsl(var(--primary)/.08)] px-3 py-1 font-mono-school text-[.6rem] font-bold uppercase tracking-[.1em] text-[hsl(var(--primary))]">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="mt-3 font-display text-xl font-semibold">
                      {item.title}
                    </h4>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={imageSources.talent}
                alt="Students participating in school activities"
                className="h-80 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-[420px]"
              />
            </div>
            <div>
              <span className="font-mono-school text-[.65rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                Beyond the Classroom
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                Education That Shapes the Whole Student
              </h3>
              <p className="mt-4 max-w-lg text-[hsl(var(--muted-foreground))]">
                At Petta, learning extends far beyond textbooks. We nurture
                talent, character, leadership and innovation.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {beyondItems.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/.08)] text-[hsl(var(--primary))]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#student-life"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-opacity hover:opacity-90"
              >
                Explore Student Life <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="relative overflow-hidden bg-[hsl(216,40%,97%)] py-16 md:py-28"
        data-testid="section-testimonials"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative container-school">
          {/* Header */}
          <div className="text-center">
            <span className="font-mono-school text-[.65rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
              What Our Community Says
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[.97] tracking-[-.03em] md:text-5xl">
              More Than a School.
              <br className="hidden md:block" />
              A Place That Shapes Lives.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              Real experiences from the students, parents, teachers and
              alumni who have been part of our journey.
            </p>
          </div>

          {/* Card Carousel */}
          <div ref={containerRef} className="mt-14 -mx-4 overflow-hidden px-4 sm:mx-0 sm:px-0">
            <div
              className="flex"
              style={{
                gap: CARD_GAP,
                transform: `translateX(${-(offset * cardTotal)}px)`,
                transition: transition
                  ? "transform 600ms cubic-bezier(0.32, 0.72, 0, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {track.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="flex-none"
                  style={{ width: cardW }}
                >
                  <div className="flex h-full flex-col rounded-[4px] border border-white/60 bg-white/70 px-7 pt-10 pb-8 shadow-[0_4px_20px_-4px_hsl(var(--primary)/.1)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_12px_48px_-4px_hsl(var(--primary)/.25)]">
                    {/* Decorative quote */}
                    <span className="absolute left-6 top-4 font-display text-[5rem] leading-none text-[hsl(var(--primary)/.08)] select-none">
                      &ldquo;
                    </span>

                    {/* Quote */}
                    <blockquote className="relative z-10 mb-8 flex-1 font-display text-[.95rem] font-medium italic leading-relaxed text-[hsl(var(--foreground)/.8)]">
                      {item.quote}
                    </blockquote>

                    {/* Author */}
                    <div className="relative z-10 flex items-center gap-3 border-t border-[hsl(var(--primary)/.08)] pt-6">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[hsl(var(--primary)/.12)]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-display text-sm font-semibold text-[hsl(var(--foreground))]">
                          {item.name}
                        </div>
                        <div className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === (offset % N)
                    ? "w-7 bg-[hsl(var(--primary))]"
                    : "w-2.5 bg-[hsl(var(--primary)/.2)] hover:bg-[hsl(var(--primary)/.35)]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[hsl(var(--background))] py-20 md:py-28"
      data-testid="section-contact"
    >
      <div className="container-school">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Start a conversation."
              copy="Whether you are considering a place, looking for the right information or want to connect with the school community, we would be glad to hear from you."
            />
            <div className="mt-10 space-y-6">
              <ContactLine
                icon={<MapPin size={19} />}
                label="Visit"
                value="Petta, West Budama, Tororo District, Eastern Uganda"
              />
              <ContactLine
                icon={<Phone size={19} />}
                label="Call"
                value="+256774 398029"
              />
              <ContactLine
                icon={<Mail size={19} />}
                label="Email"
                value="pettacommunitysecondaryschool@gmail.com"
              />
              <ContactLine
                icon={<Clock3 size={19} />}
                label="Office hours"
                value="[Insert office hours]"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Map location will be connected once the school address is confirmed.",
                )
              }
              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]"
              data-testid="button-visit-school"
            >
              Visit our school <ExternalLink size={15} />
            </button>
          </div>
          <div className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)] md:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="eyebrow text-[hsl(var(--muted-foreground))]">
                  Send an enquiry
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold">
                  We are listening.
                </h3>
              </div>
              <Send
                size={22}
                className="text-[hsl(var(--accent-foreground))]"
              />
            </div>
            {sent ? (
              <div
                className="mt-10 border border-[hsl(var(--accent)/.55)] bg-[hsl(var(--accent)/.14)] p-6"
                role="status"
                data-testid="status-contact-success"
              >
                <CheckCircle2
                  className="text-[hsl(var(--accent-foreground))]"
                  size={25}
                />
                <h4 className="mt-4 font-display text-2xl font-semibold">
                  Thank you for reaching out.
                </h4>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Your message has been noted for the school team. This demo
                  form is ready to connect to the approved contact workflow.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-5 text-sm font-bold underline underline-offset-4"
                  data-testid="button-contact-send-another"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="mt-8 space-y-5"
                data-testid="form-contact"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    label="Name"
                    placeholder="Your name"
                    required
                  />
                  <Field
                    id="contact-email"
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="contact-phone"
                    label="Phone"
                    placeholder="[Phone number]"
                  />
                  <Field
                    id="contact-subject"
                    label="Subject"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full resize-y border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--primary))]"
                    data-testid="textarea-contact-message"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  data-testid="button-contact-submit"
                >
                  Send message{" "}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <p className="text-center text-xs leading-5 text-[hsl(var(--muted-foreground))]">
                  [Admissions contact details to be confirmed by the school]
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[hsl(var(--accent-foreground))]">*</span>
        )}
      </label>
      <input
        id={id}
        name={id.replace("contact-", "")}
        type={type}
        placeholder={placeholder}
        required={required}
        className="min-h-12 w-full border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-4 text-sm outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground)/.7)] focus:border-[hsl(var(--primary))]"
        data-testid={`input-${id}`}
      />
    </div>
  );
}

function ContactLine({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-[hsl(var(--accent-foreground))]">{icon}</div>
      <div>
        <div className="eyebrow text-[hsl(var(--muted-foreground))]">
          {label}
        </div>
        <div className="mt-1 text-sm">{value}</div>
      </div>
    </div>
  );
}

function Footer() {
  const go = (id: SectionId) => scrollToSection(id);
  return (
    <footer
      className="bg-[hsl(var(--primary))] py-14 text-[hsl(var(--primary-foreground))]"
      data-testid="site-footer"
    >
      <div className="container-school">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <SchoolMark compact />
            <p className="mt-7 max-w-xs text-sm leading-6 text-[hsl(var(--primary-foreground)/.58)]">
              A serious, warm and community-minded secondary school experience
              for O-Level and A-Level learners.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialIcon icon={<Facebook size={16} />} label="Facebook" />
              <SocialIcon icon={<Instagram size={16} />} label="Instagram" />
              <SocialIcon icon={<Youtube size={16} />} label="YouTube" />
            </div>
          </div>
          <FooterColumn
            title="Explore"
            links={[
              ["About", "about"],
              ["Academics", "academics"],
              ["Admissions", "admissions"],
              ["Student Life", "student-life"],
            ]}
            go={go}
          />
          <FooterColumn
            title="Discover"
            links={[
              ["Facilities", "facilities"],
              ["News", "news"],
              ["Contact", "contact"],
            ]}
            go={go}
          />
          <div>
            <div className="eyebrow text-[hsl(var(--accent))]">Contact</div>
            <div className="mt-5 space-y-3 text-sm text-[hsl(var(--primary-foreground)/.65)]">
              <div className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />Petta, West Budama, Tororo District, Eastern Uganda</div>
              <div className="flex items-center gap-2"><Phone size={14} className="shrink-0" />+256774 398029</div>
              <div className="flex items-center gap-2"><Mail size={14} className="shrink-0" />pettacommunitysecondaryschool@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[hsl(var(--primary-foreground)/.16)] pt-6 font-mono-school text-[.58rem] uppercase tracking-[.1em] text-[hsl(var(--primary-foreground)/.43)] sm:flex-row">
          <span>
            © 2026 Petta Community Secondary School. All rights reserved.
          </span>
          <span>O-Level · A-Level · Community</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  go,
}: {
  title: string;
  links: [string, SectionId][];
  go: (id: SectionId) => void;
}) {
  return (
    <div>
      <div className="eyebrow text-[hsl(var(--accent))]">{title}</div>
      <div className="mt-5 grid gap-3">
        {links.map(([label, id]) => (
          <button
            type="button"
            key={id}
            onClick={() => go(id)}
            className="flex items-center gap-2 self-start text-left text-sm text-[hsl(var(--primary-foreground)/.65)] transition-colors hover:text-[hsl(var(--accent))]"
            data-testid={`button-footer-${id}`}
          >
            {label}
            <ChevronRight size={13} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.alert(
          `${label} link will be added when the school's social accounts are confirmed.`,
        )
      }
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--primary-foreground)/.22)] text-[hsl(var(--primary-foreground)/.7)] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
      data-testid={`button-social-${label.toLowerCase()}`}
    >
      {icon}
    </button>
  );
}

function Modal({
  facility,
  onClose,
}: {
  facility: (typeof facilities)[number] | null;
  onClose: () => void;
}) {
  if (!facility) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[hsl(var(--primary)/.8)] p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${facility.name} details`}
      data-testid="modal-facility"
    >
      <div className="relative w-full max-w-2xl overflow-hidden bg-[hsl(var(--card))] shadow-[var(--shadow-lg)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close facility details"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          data-testid="button-close-facility"
        >
          <X size={18} />
        </button>
        <div className="h-64 sm:h-80">
          <ImageFrame
            src={facility.image}
            alt={facility.name}
            className="h-full w-full"
          />
        </div>
        <div className="p-7">
          <div className="eyebrow text-[hsl(var(--muted-foreground))]">
            {facility.kind}
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold">
            {facility.name}
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-[hsl(var(--muted-foreground))]">
            {facility.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function NewsModal({
  news,
  onClose,
}: {
  news: (typeof newsItems)[number] | null;
  onClose: () => void;
}) {
  if (!news) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[hsl(var(--primary)/.8)] p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={news.title}
      data-testid="modal-news"
    >
      <div className="relative w-full max-w-2xl overflow-hidden bg-[hsl(var(--card))] shadow-[var(--shadow-lg)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close news details"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          data-testid="button-close-news"
        >
          <X size={18} />
        </button>
        <div className="h-64 sm:h-80">
          <ImageFrame
            src={news.image}
            alt={news.title}
            className="h-full w-full"
          />
        </div>
        <div className="p-7">
          <div className="flex items-center justify-between">
            <div className="eyebrow text-[hsl(var(--accent-foreground))]">
              {news.category}
            </div>
            <span className="font-mono-school text-[.65rem] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">
              {news.date}
            </span>
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold">
            {news.title}
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-[hsl(var(--muted-foreground))]">
            {news.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [facility, setFacility] = useState<(typeof facilities)[number] | null>(
    null,
  );
  const [newsItem, setNewsItem] = useState<(typeof newsItems)[number] | null>(
    null,
  );
  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <AtAGlance />
        <About />
        <Academics />
        <Admissions />
        <WhyChoose />
        <StudentLife />
        <Facilities onOpen={setFacility} />
        <News onOpen={setNewsItem} />
        <AchievementsAndTestimonials />
        <Contact />
      </main>
      <Footer />
      <Modal facility={facility} onClose={() => setFacility(null)} />
      <NewsModal news={newsItem} onClose={() => setNewsItem(null)} />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
