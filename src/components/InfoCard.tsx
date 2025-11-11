import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 hover:border-neutral-600 transition-colors duration-300 group">
      {icon && (
        <div className="mb-4 text-[var(--color-accent-violet)] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}