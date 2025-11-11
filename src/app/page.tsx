import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirection vers la locale française par défaut
  redirect('/fr');
}
