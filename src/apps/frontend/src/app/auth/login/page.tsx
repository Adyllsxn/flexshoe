import { Metadata } from 'next';
import LoginForm from './_components/LoginForm';

export const metadata: Metadata = {
  title: 'Login | FlexShoe Admin',
  description: 'Faça login no painel administrativo',
};

export default function LoginPage() {
  return <LoginForm />;
}