import Hero from './_components/Hero';
import PromoCards from './_components/PromoCards';
import InfoCards from './_components/InfoCards';
import ProductList from './_components/ProductList';

export default function HomePage() {
  return (
    <main className="flex-1 overflow-hidden">
      <Hero />
      <PromoCards />
      <InfoCards />
      <ProductList />
    </main>
  );
}