import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { AboutTranslations } from "@/types/translations";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/TeamCard";
import HeroPage from "@/components/HeroPage";
import FeatureCardsContainer from "@/components/FeatureCardsContainer";
import { ShieldCheckIcon, StarIcon, HandshakeIcon } from "lucide-react";
import { link } from "fs";



export default async function About({
  params,
}: {
  params: { locales: "fr" | "en" | "de" };
}) {
  // On attend les paramètres
  const { locales } = await Promise.resolve(params);

  // Fonction pour récupérer les traductions en fonction de la locale
  const dictionary = await getDictionary(locales);
  const about = dictionary.about as AboutTranslations;

  const valuesFeatures = [
    {
      title: about.values.responsibleHosting.title,
      description: about.values.responsibleHosting.description,
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      id: "responsible-hosting",
    },
    {
      title: about.values.quality.title,
      description: about.values.quality.description,
      icon: <StarIcon className="w-6 h-6" />,
      id: "quality",
    },
    {
      title: about.values.commitment.title,
      description: about.values.commitment.description,
      icon: <HandshakeIcon className="w-6 h-6" />,
      id: "commitment",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroPage
        title={about.title}
        subtitle={about.subtitle}
        intro={about.intro}
      />
      {/* Mission Section */}
      <section className="w-full flex flex-col items-center justify-start pb-[25vh] pt-[10vh] px-4 bg-black">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {about.mission.title}
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            {about.mission.description}
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4 min-h-[75vh]">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          {about.team.title}
        </h2>
        <p className="text-center text-lg text-neutral-400 mb-12 max-w-2xl">
          {about.team.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl w-full relative">
          <TeamCard
            title={about.team.commercial.title}
            name={about.team.commercial.name}
            description={about.team.commercial.description}
            image="/img/team/chadi.webp"
            phone="+41 79 176 39 92"
            mail="chadi@origin-studio.ch"
            protectionMessage={about.team.protectionMessage}
          />
          <TeamCard
            title={about.team.backend.title}
            name={about.team.backend.name}
            description={about.team.backend.description}
            image="/img/team/eric.webp"
            phone="+41 79 941 89 68"
            mail="eric@origin-studio.ch"
            protectionMessage={about.team.protectionMessage}
          />
          <TeamCard
            title={about.team.frontend.title}
            name={about.team.frontend.name}
            description={about.team.frontend.description}
            image="/img/team/thoma.webp"
            phone="+41 79 648 19 98"
            mail="thomas@origin-studio.ch"
            protectionMessage={about.team.protectionMessage}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          {about.values.title}
        </h2>
        <p className="text-center text-lg text-neutral-400 mb-12 max-w-2xl">
          {about.values.description}
        </p>
        
        <FeatureCardsContainer features={valuesFeatures} />
      </section>

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-[25vh] px-4">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {about.cta.title}
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            {about.cta.description}
          </p>
          <Button variant="secondary" size="lg" className="mt-4">
            {about.cta.button}
          </Button>
        </div>
      </section>
    </main>
  );
}