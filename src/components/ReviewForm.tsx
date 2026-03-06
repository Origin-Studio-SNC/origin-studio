"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSpamShield } from "@/hooks/useSpamShield";
import { Star, Save } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  rating: number;
  text: string;
  image: File | null;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  rating?: string;
  text?: string;
  image?: string;
  consent?: string;
}

interface ReviewFormProps {
  translations: {
    intro: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    rating: string;
    ratingHint: string;
    text: string;
    textPlaceholder: string;
    image: string;
    imageHint: string;
    consent: string;
    savedInfo: string;
    submit: string;
    sending: string;
    loading: string;
    errors: {
      firstNameRequired: string;
      lastNameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      ratingRequired: string;
      textRequired: string;
      textMinLength: string;
      imageSize: string;
      imageType: string;
      consentRequired: string;
    };
    messages: {
      success: string;
      errorValidation: string;
      errorRateLimit: string;
      errorGeneric: string;
    };
  };
}

const STORAGE_KEY = "review_form_data";

export default function ReviewForm({ translations }: ReviewFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    rating: 0,
    text: "",
    image: null,
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { honeypotName, honeypotValue, setHoneypot, nonce, isReady, validateSubmission } = useSpamShield({
    nonceEndpoint: "/api/review/nonce"
  });

  // Charger les données depuis localStorage au montage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData((prev) => ({
          ...prev,
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          company: parsed.company || "",
          email: parsed.email || "",
          rating: parsed.rating || 0,
          text: parsed.text || "",
          consent: parsed.consent || false,
        }));
      } catch (e) {
        console.error("Failed to parse saved form data:", e);
      }
    }
  }, []);

  // Pré-remplissage depuis les paramètres URL (prioritaire sur localStorage)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlData: Partial<FormData> = {};
    
    if (params.get("firstName")) urlData.firstName = params.get("firstName")!;
    if (params.get("lastName")) urlData.lastName = params.get("lastName")!;
    if (params.get("company")) urlData.company = params.get("company")!;
    if (params.get("email")) urlData.email = params.get("email")!;
    
    if (Object.keys(urlData).length > 0) {
      setFormData((prev) => ({ ...prev, ...urlData }));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    const dataToSave = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      email: formData.email,
      rating: formData.rating,
      text: formData.text,
      consent: formData.consent,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData.firstName, formData.lastName, formData.company, formData.email, formData.rating, formData.text, formData.consent]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = translations.errors.firstNameRequired;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = translations.errors.lastNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.errors.emailInvalid;
    }

    if (formData.rating === 0) {
      newErrors.rating = translations.errors.ratingRequired;
    }

    if (!formData.text.trim()) {
      newErrors.text = translations.errors.textRequired;
    } else if (formData.text.trim().length < 20) {
      newErrors.text = translations.errors.textMinLength;
    }

    if (!formData.consent) {
      newErrors.consent = translations.errors.consentRequired;
    }

    if (formData.image) {
      if (formData.image.size > 20 * 1024 * 1024) {
        newErrors.image = translations.errors.imageSize;
      }
      if (!formData.image.type.startsWith("image/")) {
        newErrors.image = translations.errors.imageType;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Créer un aperçu
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    // Client-side validation
    if (!validateForm()) {
      setSubmitMessage(translations.messages.errorValidation);
      return;
    }

    // Spam shield validation
    const spamCheck = validateSubmission();
    if (!spamCheck.valid) {
      setSubmitMessage(spamCheck.error || translations.messages.errorGeneric);
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("firstName", formData.firstName.trim());
      formPayload.append("lastName", formData.lastName.trim());
      formPayload.append("company", formData.company.trim());
      formPayload.append("email", formData.email.trim());
      formPayload.append("rating", formData.rating.toString());
      formPayload.append("text", formData.text.trim());
      formPayload.append(honeypotName, honeypotValue);
      formPayload.append("nonce", nonce);
      
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const response = await fetch("/api/review/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(translations.messages.success);
        setFormData({ 
          firstName: "", 
          lastName: "", 
          company: "", 
          email: "", 
          rating: 0, 
          text: "", 
          image: null,
          consent: false,
        });
        setImagePreview(null);
        setErrors({});
        // Nettoyer le localStorage après soumission réussie
        localStorage.removeItem(STORAGE_KEY);
      } else if (response.status === 429) {
        setSubmitStatus("error");
        setSubmitMessage(translations.messages.errorRateLimit);
      } else if (response.status === 422) {
        setSubmitStatus("error");
        setSubmitMessage(data.message || translations.messages.errorValidation);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(translations.messages.errorGeneric);
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(translations.messages.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-center text-lg text-neutral-400 mb-4">
        {translations.intro}
      </p>
      
      <div className="flex items-center justify-center gap-2 mb-8 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
        <Save className="w-4 h-4 text-blue-400 shrink-0" />
        <p className="text-sm text-blue-300 text-center">
          {translations.savedInfo}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <Label htmlFor={honeypotName}>Website</Label>
          <Input
            id={honeypotName}
            name={honeypotName}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypotValue}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName" required>
              {translations.firstName}
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder={translations.firstNamePlaceholder}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="lastName" required>
              {translations.lastName}
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder={translations.lastNamePlaceholder}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="company">{translations.company}</Label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder={translations.companyPlaceholder}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="email" required>
            {translations.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={translations.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="rating" required>
            {translations.rating}
          </Label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                disabled={isSubmitting}
                className="group transition-all duration-200"
              >
                <Star
                  className={`w-8 h-8 transition-all duration-200 ${
                    star <= formData.rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-neutral-600 group-hover:text-yellow-500/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-neutral-500 mt-1">{translations.ratingHint}</p>
          {errors.rating && (
            <p className="text-sm text-red-500 mt-1">{errors.rating}</p>
          )}
        </div>

        <div>
          <Label htmlFor="text" required>
            {translations.text}
          </Label>
          <Textarea
            id="text"
            name="text"
            placeholder={translations.textPlaceholder}
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            error={errors.text}
            disabled={isSubmitting}
            rows={6}
          />
        </div>

        <div>
          <Label htmlFor="image">{translations.image}</Label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 cursor-pointer border border-neutral-800 rounded-md bg-neutral-900/50 p-2 transition-all"
          />
          <p className="text-sm text-neutral-500 mt-1">{translations.imageHint}</p>
          {errors.image && (
            <p className="text-sm text-red-500 mt-1">{errors.image}</p>
          )}
          {imagePreview && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Aperçu"
                className="max-w-xs rounded-lg border border-neutral-700"
              />
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              disabled={isSubmitting}
              className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-neutral-900 cursor-pointer"
            />
            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors flex-1">
              {translations.consent}
            </span>
          </label>
          {errors.consent && (
            <p className="text-sm text-red-500 mt-2 ml-7">{errors.consent}</p>
          )}
        </div>

        {submitMessage && (
          <div
            className={`p-4 rounded-lg text-center ${
              submitStatus === "success"
                ? "bg-green-900/20 border border-green-700 text-green-400"
                : "bg-red-900/20 border border-red-700 text-red-400"
            }`}
            role="alert"
          >
            {submitMessage}
          </div>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={isSubmitting || !isReady}
          className="w-full"
        >
          {!isReady ? translations.loading : isSubmitting ? translations.sending : translations.submit}
        </Button>
      </form>
    </div>
  );
}
