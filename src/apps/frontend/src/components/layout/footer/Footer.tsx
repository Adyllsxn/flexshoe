import { SITE_NAME } from './_constants/footer';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}