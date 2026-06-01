import { Metadata } from 'next';
import LogoutContent from './_components/LogoutContent';

export const metadata: Metadata = {
  title: 'Sessão encerrada | FlexShoe',
  description: 'Você saiu do painel administrativo',
  robots: 'noindex, nofollow',
};

export default function LogoutPage() {
  return <LogoutContent />;
}