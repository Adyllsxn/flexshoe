import Hero from './_components/Hero';
import PromoCards from './_components/PromoCards';

export default function HomePage() {
  return (
    <main className="flex-1 overflow-hidden">
      <Hero />
      <PromoCards />
    </main>
  );
}