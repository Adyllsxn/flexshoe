import { Metadata } from 'next';
import RecoverContent from './_components/RecoverContent';

export const metadata: Metadata = {
  title: 'Recuperar senha | FlexShoe',
  description: 'Recupere o acesso à sua conta',
};

export default function RecoverPage() {
  return <RecoverContent />;
}