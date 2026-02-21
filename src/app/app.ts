import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

interface SocialLink {
  label: string;
  url: string;
}

interface PortfolioItem {
  title: string;
  subtitle?: string;
  timeframe?: string;
  location?: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
  metrics?: string[];
  link?: {
    label: string;
    url: string;
  };
}

interface PortfolioSection {
  id: string;
  title: string;
  blurb: string;
  items: PortfolioItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '[class.dark]': 'isDark()'
  }
})
export class App {
  private readonly document = inject(DOCUMENT);

  readonly profile = {
    name: 'Kirtan Patel',
    title: 'Assistant Vice President, Software Engineer',
    email: 'kirtanpatl@gmail.com',
    website: 'www.kirtanpatel.me'
  };

  readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', url: 'https://github.com/kirtanp98' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kirtanpatel98' },
    { label: 'Portfolio', url: 'https://www.kirtanpatel.me' }
  ];

  readonly sectionPalette = ['petal', 'lilac', 'sky', 'violet', 'plum'];

  readonly sections: PortfolioSection[] = [
    {
      id: 'experience',
      title: 'Work Experience',
      blurb: 'Building data-heavy products, real-time systems, and highly reliable frontend experiences.',
      items: [
        {
          title: 'Tradeweb',
          subtitle: 'Assistant Vice President | Software Engineer',
          location: 'Jersey City, NJ',
          timeframe: 'June 2021 - Present',
          bullets: [
            'Built a new alerting interface so dealers can act on incoming bond trades from other dealers and traders.',
            'Implemented GraphQL subscriptions and lifecycle handling for trade alerts across 1000+ dealers.',
            'Owned an admin support service to diagnose and reconfigure user connections across Kafka and WebSocket flows.',
            'Improved history services and export workflows to surface more relevant trade data to end users.',
            'Mentored interns through scoped projects, architecture reviews, and weekly engineering check-ins.'
          ],
          tags: ['Angular', 'GraphQL', 'Kafka', 'WebSockets', 'Mentorship']
        },
        {
          title: 'Vanguard',
          subtitle: 'Developer I',
          location: 'Malvern, PA',
          timeframe: 'June 2020 - May 2021',
          bullets: [
            'Rewrote a legacy monolith into microservices and a micro frontend architecture using Angular and NestJS.',
            'Added responsive animations and UX feedback loops that improved product usability.',
            'Implemented reactive form validation with RxJS Observables and Subjects.',
            'Raised engineering quality with strict TypeScript settings, linting rules, and a pull request template.'
          ],
          tags: ['Angular', 'NestJS', 'TypeScript', 'RxJS']
        },
        {
          title: 'Button',
          subtitle: 'iOS Engineering Intern',
          location: 'New York, NY',
          timeframe: 'June 2019 - August 2019',
          bullets: [
            'Developed an iOS sample app with SwiftUI and the Button API for partner enablement.',
            'Updated merchant reporting libraries to streamline order reporting.',
            'Built hackathon apps for iOS and Android with a shared Kotlin Native codebase.'
          ],
          tags: ['SwiftUI', 'iOS', 'Kotlin Native', 'Mobile SDKs']
        }
      ]
    },
    {
      id: 'projects',
      title: 'Personal Projects',
      blurb: 'Backend-focused side projects with measurable impact and production-like constraints.',
      items: [
        {
          title: 'Mangaupdates GraphQL API',
          subtitle: 'TypeScript | Node.js | NestJS | Redis | GraphQL | Puppeteer | Apollo',
          timeframe: 'August 2021',
          link: {
            label: 'Repository',
            url: 'https://github.com/kirtanp98/mangaupdates-graphql-api'
          },
          bullets: [
            'Built a GraphQL API that queries and searches mangaupdates.com by scraping data with Puppeteer.',
            'Used Redis caching to reduce query latency and improve repeated search performance.',
            'Added subscription support for chapter update notifications via RSS-backed updates.'
          ]
        },
        {
          title: 'trackRU',
          subtitle: 'iOS | Swift | SwiftUI | Firebase | Node.js',
          timeframe: 'September 2020',
          bullets: [
            'Created a Rutgers course tracker app for New Brunswick students.',
            'Implemented notifications for open courses and searchable class discovery.',
            'Reached 200 daily active users, 1800 installs, and 10,000+ notifications sent.'
          ],
          metrics: ['200 DAU', '1800 installs', '10,000+ notifications']
        }
      ]
    },
    {
      id: 'education',
      title: 'Education',
      blurb: 'Strong computer science fundamentals with practical product engineering experience.',
      items: [
        {
          title: 'Rutgers University',
          subtitle: 'Bachelor of Science in Computer Science',
          location: 'New Brunswick, NJ',
          timeframe: 'September 2016 - May 2020',
          bullets: [
            'Relevant coursework: Data Structures, Algorithms, Systems Programming, Databases, Internet Technology, Software Methodology, Artificial Intelligence, Data Science.'
          ]
        }
      ]
    },
    {
      id: 'skills',
      title: 'Skills',
      blurb: 'Modern engineering toolkit across frontend, backend, testing, and delivery.',
      items: [
        {
          title: 'Languages',
          tags: ['TypeScript', 'JavaScript', 'Python', 'Swift', 'Java']
        },
        {
          title: 'Technologies',
          tags: ['Angular', 'Node.js', 'NestJS', 'GraphQL', 'Jest', 'Cypress', 'Firebase', 'Git', 'Jira']
        }
      ]
    }
  ];

  readonly activeTheme = signal<'light' | 'dark'>(this.getInitialTheme());
  readonly isDark = computed(() => this.activeTheme() === 'dark');

  constructor() {
    this.applyTheme(this.activeTheme());
  }

  trackBySection(_: number, section: PortfolioSection): string {
    return section.id;
  }

  trackByItem(_: number, item: PortfolioItem): string {
    return `${item.title}-${item.timeframe ?? ''}`;
  }

  toggleTheme(): void {
    const nextTheme = this.activeTheme() === 'light' ? 'dark' : 'light';
    this.activeTheme.set(nextTheme);
    this.applyTheme(nextTheme);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const target = this.document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const shouldReduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    target.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  private getInitialTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const storedTheme = this.getStoredTheme();
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light';
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.document.documentElement.classList.toggle('dark', theme === 'dark');
    this.document.body.classList.toggle('dark', theme === 'dark');
    this.document.documentElement.style.colorScheme = theme;

    this.setStoredTheme(theme);
  }

  private getStoredTheme(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage.getItem('portfolio-theme');
    } catch {
      return null;
    }
  }

  private setStoredTheme(theme: 'light' | 'dark'): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage failures (private mode, disabled storage, etc.).
    }
  }
}
