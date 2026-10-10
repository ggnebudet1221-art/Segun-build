import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Home, Instagram, MapPin, Menu, MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from './config/site';
import { projects, type Project } from './data/projects';
import { useReveal } from './hooks/useReveal';
import { trackEvent } from './lib/analytics';

const mainServices = [
  {
    title: 'Ремонт под ключ',
    description: 'Полный цикл работ: от подготовки помещения и коммуникаций до готовой чистовой отделки.'
  },
  {
    title: 'Черновая отделка',
    description: 'Подготовка стен, пола и потолка, устройство перегородок и работы перед чистовой отделкой.'
  },
  {
    title: 'Чистовая отделка',
    description: 'Финишные этапы ремонта: покраска, обои, напольные покрытия, плитка и аккуратные примыкания.'
  },
  {
    title: 'Электромонтажные работы',
    description: 'Проводка, розетки, выключатели, освещение и другие электромонтажные работы в помещении.'
  },
  {
    title: 'Сантехнические работы',
    description: 'Монтаж и замена труб, сантехники, смесителей и элементов водоснабжения и канализации.'
  },
  {
    title: 'Плиточные работы',
    description: 'Укладка плитки и керамогранита в санузлах, кухнях и других помещениях.'
  }
];

const allServices = [
  'Штукатурка и шпаклёвка',
  'Покраска',
  'Обои',
  'Напольные покрытия',
  'Потолки',
  'Гипсокартон и перегородки',
  'Ремонт санузлов',
  'Ремонт кухни',
  'Отделка домов',
  'Коммерческие помещения'
];

const navItems = [
  ['Работы', '#projects'],
  ['Услуги', '#services'],
  ['О нас', '#about'],
  ['Контакты', '#contacts']
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [allServicesOpen, setAllServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const headerContactsRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!contactOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!headerContactsRef.current?.contains(event.target as Node)) {
        setContactOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContactOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [contactOpen]);

  const activeImages = activeProject?.images ?? [];

  const openProject = (project: Project, index = 0) => {
    setActiveProject(project);
    setActiveImage(index);
    trackEvent('project_view', { project: project.id });
  };

  const nextImage = () => setActiveImage((value) => (value + 1) % activeImages.length);
  const prevImage = () => setActiveImage((value) => (value - 1 + activeImages.length) % activeImages.length);

  const contactLinks = useMemo(
    () => [
      { label: 'Telegram', href: siteConfig.telegram, icon: Send, event: 'telegram_click' as const },
      { label: 'WhatsApp', href: siteConfig.whatsapp, icon: MessageCircle, event: 'whatsapp_click' as const },
      { label: 'Позвонить', href: `tel:${siteConfig.phone}`, icon: Phone, event: 'phone_click' as const }
    ],
    []
  );

  const leaderSocialLinks = [
    { label: 'Telegram', handle: siteConfig.telegramHandle, href: siteConfig.telegram, icon: Send, event: 'telegram_click' as const },
    { label: 'Instagram', handle: siteConfig.socials.instagramHandle, href: siteConfig.socials.instagram, icon: Instagram, event: 'instagram_click' as const }
  ];

  const ContactButton = ({ compact = false }: { compact?: boolean }) => (
    <a
      className={compact ? 'btn btn-dark btn-compact' : 'btn btn-dark'}
      href={siteConfig.telegram}
      onClick={() => {
        trackEvent('cta_click', { place: compact ? 'header' : 'hero' });
        trackEvent('telegram_click', { place: compact ? 'header' : 'hero' });
      }}
    >
      Обсудить проект <ArrowRight size={18} />
    </a>
  );

  const HeaderContacts = () => (
    <div className="header-contacts" ref={headerContactsRef}>
      <a
        className="header-phone"
        href={`tel:${siteConfig.phone}`}
        onClick={() => trackEvent('phone_click', { place: 'header' })}
      >
        <Phone size={16} /> {siteConfig.phoneDisplay}
      </a>
      <button
        className="header-contact-toggle"
        type="button"
        aria-expanded={contactOpen}
        aria-controls="header-contact-panel"
        onClick={() => setContactOpen((value) => !value)}
      >
        Контакты <ChevronDown size={16} />
      </button>
      <div className={`header-contact-panel ${contactOpen ? 'is-open' : ''}`} id="header-contact-panel">
        {contactLinks.map(({ label, href, icon: Icon, event }) => (
          <a
            href={href}
            key={label}
            onClick={() => {
              trackEvent(event, { place: 'header_dropdown' });
              setContactOpen(false);
            }}
          >
            <Icon size={18} />
            <span>
              <strong>{label}</strong>
              <small>{label === 'Telegram' ? siteConfig.telegramHandle : siteConfig.phoneDisplay}</small>
            </span>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-mark"><Home size={18} /></span>
          <span>{siteConfig.teamName}</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <HeaderContacts />
          <button className="icon-btn mobile-menu-btn" type="button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <button className="icon-btn" type="button" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}>
            <X size={22} />
          </button>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <ContactButton />
        </div>
      )}

      <main id="top">
        <section className="hero">
          <div className="hero-copy" data-reveal>
            <div className="hero-kicker">
              <p className="eyebrow">Строительные и отделочные работы</p>
              <span className="location-badge"><MapPin size={15} /> {siteConfig.serviceArea}</span>
            </div>
            <h1>Ремонт и отделка в Уфе без лишних переживаний</h1>
            <p className="lead">
              Небольшая команда мастеров выполняет работы в квартирах, домах и коммерческих помещениях: от отдельных задач до комплексного ремонта.
            </p>
            <div className="hero-actions">
              <ContactButton />
              <a className="btn btn-light" href="#projects" onClick={() => trackEvent('cta_click', { place: 'hero_projects' })}>
                Посмотреть работы
              </a>
            </div>
            <div className="hero-points" aria-label="Коротко о подходе">
              <span><CircleCheck size={16} /> Работаем напрямую</span>
              <span><CircleCheck size={16} /> Отделка под ключ</span>
              <span><CircleCheck size={16} /> Фотоотчёты по ходу работ</span>
            </div>
          </div>
          <div className="hero-media" data-reveal>
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&h=1700&q=86"
              alt="Современный интерьер после ремонта"
              width="1600"
              height="1700"
            />
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Услуги</p>
            <h2>Берём на себя строительные и отделочные задачи без лишней суеты</h2>
            <p>Выполняем комплексный ремонт и отдельные виды работ — от подготовки помещения до чистовой отделки.</p>
          </div>
          <p className="directions-label" data-reveal>Основные направления</p>
          <div className="service-grid">
            {mainServices.map((service, index) => (
              <article className="service-card" key={service.title} data-reveal>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <div className="expanded-services" data-reveal>
            <button className="btn btn-outline" type="button" onClick={() => setAllServicesOpen((value) => !value)}>
              {allServicesOpen ? 'Скрыть список' : 'Все виды работ'}
            </button>
            <div className={`service-list ${allServicesOpen ? 'is-open' : ''}`}>
              {allServices.map((service) => (
                <span key={service}><Check size={16} />{service}</span>
              ))}
            </div>
            <p className="service-spectrum">Здесь собраны основные направления. На практике берёмся за разные строительные и отделочные задачи — от небольших работ до комплексной отделки.</p>
          </div>
          <div className="service-cta" data-reveal>
            <p>Не нашли нужную работу? Напишите нам — скорее всего, мы её выполняем.</p>
            <div>
              <a href={siteConfig.telegram} onClick={() => trackEvent('telegram_click', { place: 'services' })}>Telegram</a>
              <a href={siteConfig.whatsapp} onClick={() => trackEvent('whatsapp_click', { place: 'services' })}>WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Портфолио</p>
            <h2>Наши работы</h2>
            <p>Сейчас здесь подготовлены placeholder-проекты с демонстрационными фотографиями. Их легко заменить на реальные объекты команды.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-card-${index}`} key={project.id} data-reveal>
                <button type="button" onClick={() => openProject(project)} aria-label={`Открыть проект ${project.title}`}>
                  <img src={project.cover} alt={project.title} loading="lazy" width="1400" height="1000" />
                  <span className="project-overlay">
                    <span>{project.type}</span>
                    <strong>{project.title}</strong>
                    <small>{project.summary}</small>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section about leader" id="about">
          <div className="leader-media" data-reveal>
            <div className="leader-main-photo">
              <img
                src="/team/leader-main.webp"
                alt="Руководитель команды"
                loading="lazy"
                width="1050"
                height="1180"
              />
              <span>Руководитель команды</span>
            </div>
            <div className="leader-small-photos" aria-label="Активный образ жизни руководителя">
              <img src="/team/leader-marathon.webp" alt="Руководитель на марафоне" loading="lazy" width="640" height="640" />
              <img src="/team/leader-cold.webp" alt="Руководитель во время зимней активности" loading="lazy" width="640" height="640" />
            </div>
          </div>
          <div className="about-copy leader-copy" data-reveal>
            <p className="eyebrow">Кто стоит за работой</p>
            <h2>Лично отвечаем за организацию и связь</h2>
            <p>
              За командой стоит конкретный человек: руководитель остаётся на связи, помогает согласовать детали и следит, чтобы договорённости не терялись по ходу работ.
            </p>
            <p>
              Вне работы ведёт активный образ жизни: регулярно участвует в марафонах, занимается закаливанием и практикует купание в холодной воде. Открыто делится повседневной жизнью и остаётся доступен в социальных сетях.
            </p>
            <div className="leader-social-note">Мы не прячемся за сайтом: можно написать напрямую руководителю команды.</div>
            <div className="leader-socials">
              {leaderSocialLinks.map(({ label, handle, href, icon: Icon, event }) => (
                <a href={href} key={label} onClick={() => trackEvent(event, { place: 'leader' })}>
                  <Icon size={20} />
                  <span>
                    <strong>{label}</strong>
                    <small>{handle}</small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section reasons">
          <div className="section-head compact-head" data-reveal>
            <p className="eyebrow">Подход</p>
            <h2>Почему с нами удобно работать</h2>
          </div>
          <div className="reason-grid">
            {[
              ['Без лишних посредников', 'Общение идёт напрямую с людьми, которые понимают работу на объекте.'],
              ['Сначала разбираем задачу', 'Просим вводные, фотографии и детали, чтобы не обещать вслепую.'],
              ['Показываем процесс', 'Держим связь и можем отправлять фото по ходу ремонта.'],
              ['Гибкий объём работ', 'Берёмся за отдельные этапы и за комплексную отделку.']
            ].map(([title, text]) => (
              <article className="reason-card" key={title} data-reveal>
                <Sparkles size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta" id="contacts" data-reveal>
          <div>
            <p className="eyebrow">Контакты</p>
            <h2>Планируете ремонт? Давайте обсудим задачу.</h2>
            <p>Работаем в Уфе. Напишите нам или позвоните — расскажете, что нужно сделать, а мы обсудим детали.</p>
          </div>
          <div className="contact-actions">
            {contactLinks.map(({ label, href, icon: Icon, event }) => (
              <a className="btn btn-light" href={href} key={label} onClick={() => trackEvent(event, { place: 'final_cta' })}>
                <Icon size={18} /> {label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>{siteConfig.teamName}</strong>
          <p>{siteConfig.city}</p>
        </div>
        <address>
          <a href={`tel:${siteConfig.phone}`} onClick={() => trackEvent('phone_click', { place: 'footer' })}>{siteConfig.phoneDisplay}</a>
          <a href={siteConfig.telegram} onClick={() => trackEvent('telegram_click', { place: 'footer' })}>Telegram</a>
          <a href={siteConfig.whatsapp} onClick={() => trackEvent('whatsapp_click', { place: 'footer' })}>WhatsApp</a>
          <a href={siteConfig.socials.instagram} onClick={() => trackEvent('instagram_click', { place: 'footer' })}>Instagram</a>
        </address>
        <p>© {new Date().getFullYear()}. Ремонт и отделка в Уфе.</p>
      </footer>

      <div className="mobile-contact-bar" aria-label="Быстрая связь">
        {contactLinks.map(({ label, href, icon: Icon, event }) => (
          <a href={href} key={label} onClick={() => trackEvent(event, { place: 'mobile_bar' })}>
            <Icon size={17} /> {label}
          </a>
        ))}
      </div>

      {activeProject && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <button className="lightbox-close" type="button" aria-label="Закрыть" onClick={() => setActiveProject(null)}>
            <X size={24} />
          </button>
          <button className="lightbox-nav prev" type="button" aria-label="Предыдущее фото" onClick={prevImage}>
            <ChevronLeft size={26} />
          </button>
          <img
            src={activeImages[activeImage]}
            alt={`${activeProject.title}, фото ${activeImage + 1}`}
            onTouchStart={(event) => {
              const startX = event.touches[0].clientX;
              const target = event.currentTarget;
              target.ontouchend = (endEvent) => {
                const diff = endEvent.changedTouches[0].clientX - startX;
                if (Math.abs(diff) > 45) {
                  diff < 0 ? nextImage() : prevImage();
                }
                target.ontouchend = null;
              };
            }}
          />
          <button className="lightbox-nav next" type="button" aria-label="Следующее фото" onClick={nextImage}>
            <ChevronRight size={26} />
          </button>
          <div className="lightbox-caption">
            <span>{activeProject.type}</span>
            <strong>{activeProject.title}</strong>
            <p>{activeProject.summary}</p>
            <small>{activeImage + 1} / {activeImages.length}</small>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
