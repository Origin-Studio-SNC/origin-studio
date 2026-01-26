import {
  FeaturesTranslations,
  ProcessTranslations,
  IdentityTranslations,
  StrengthsTranslations,
  TeamMiniTranslations,
  CTATranslations,
  ContactTranslations,
  ReviewTranslations,
  TestimonialsTranslations,
  TechStackTranslations,
  AboutTranslations,
  ProjectsTranslations,
  NotFoundTranslations,
  FooterTranslations,
  ServicesTranslations,
  LegalTranslations,
} from "./translations";

export type Dictionary = {
  nav: {
    home: string;
    prestations: string;
    about: string;
    projects: string;
    contact: string;
    contactUs: string;
  };
  hero: {
    title: string;
    description: string;
    servicesButton: string;
    projectsButton: string;
  };
  identity: IdentityTranslations;
  strengths: StrengthsTranslations;
  teamMini: TeamMiniTranslations;
  features: FeaturesTranslations;
  process: ProcessTranslations;
  testimonials: TestimonialsTranslations;
  techStack: TechStackTranslations;
  cta: CTATranslations;
  contact: ContactTranslations;
  review: ReviewTranslations;
  about: AboutTranslations;
  projects: ProjectsTranslations;
  notFound: NotFoundTranslations;
  footer: FooterTranslations;
  services?: ServicesTranslations;
  legal: LegalTranslations;
};
 