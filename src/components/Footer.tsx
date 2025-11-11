"use client"

import { useParams } from "next/navigation";
import Image from "next/image";
import { FooterTranslations } from "@/types/translations";


export default function FooterFiveColsLogoSubFooter({ dictionary }: { dictionary: FooterTranslations }) {
    const params = useParams();
    const locale = params.locales as string;
    return (
      <footer className="w-full text-neutral-400">
        {/* Main footer */}
        <div className="pt-16 pb-12 text-sm border-t border-neutral-800 bg-neutral-950">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col justify-between lg:flex-row gap-12">
              {/* Logo and description */}
              <div className="flex-1 max-w-md">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/img/logo_origin_full.svg" alt="Logo" width={100} height={40} className="w-30 h-auto" />
                </div>
                <p>
                  {dictionary.description}
                </p>
              </div>

              {/* Navigation links */}
              <div className="flex flex-wrap justify-between gap-8 lg:gap-12">
                <nav className="min-w-[160px]" aria-labelledby="footer-product-5-logo">
                  <h3 className="mb-6 text-base font-semibold text-neutral-200" id="footer-product-5-logo">
                    {dictionary.services.title}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.services.features}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.services.customers}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.services.whyUs}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.services.pricing}
                      </a>
                    </li>
                  </ul>
                </nav>

                <nav className="min-w-[160px]" aria-labelledby="footer-about-5-logo">
                  <h3 className="mb-6 text-base font-semibold text-neutral-200" id="footer-about-5-logo">
                    {dictionary.aboutUs.title}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.aboutUs.aboutUs}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.aboutUs.careers}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.aboutUs.blog}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.aboutUs.contact}
                      </a>
                    </li>
                  </ul>
                </nav>

                <nav className="min-w-[160px]" aria-labelledby="footer-get-in-touch-5-logo">
                  <h3 className="mb-6 text-base font-bold text-neutral-200" id="footer-get-in-touch-5-logo">
                    {dictionary.contact.title}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.contact.title}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.contact.support}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        {dictionary.contact.partners}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="py-4 text-sm border-t border-neutral-800 bg-neutral-950">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                © {new Date().getFullYear()} Origin Studio. {locale === 'en' ? 'All rights reserved' : 'Tous droits réservés'}
              </div>
              <nav aria-labelledby="subfooter-links-3-sub">
                <h3 className="sr-only" id="subfooter-links-3-sub">Get in touch</h3>
                <ul className="flex items-center gap-4">
                  <li>
                    <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                      T&C
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                      Cookies
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    )
  }