'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger automatiquement vers la version française après 3 secondes
    const timer = setTimeout(() => {
      router.push('/fr');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-accent-violet)] mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Page Not Found / Page Introuvable
          </h2>
          <p className="text-lg text-neutral-400 mb-4 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. / Désolé, nous n&apos;avons pas pu trouver la page que vous recherchez.
          </p>
          <p className="text-sm text-neutral-500 mb-8">
            Redirecting to French version in 3 seconds... / Redirection vers la version française dans 3 secondes...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fr">
              <Button
                size="lg"
                className="bg-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/80 text-white font-semibold px-8 py-4 text-lg"
              >
                Accueil (FR)
              </Button>
            </Link>
            <Link href="/en">
              <Button
                variant="outline"
                size="lg"
                className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 font-semibold px-8 py-4 text-lg"
              >
                Home (EN)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}