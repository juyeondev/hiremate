import Header from './Header';

interface LoadingScreenProps {
  text: string;
}

export default function LoadingScreen({ text }: LoadingScreenProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <Header />
      <p
        className="mt-20 font-extrabold text-2xl"
        style={{ fontFamily: 'var(--font-nunito)', color: 'var(--hm-deep)' }}
      >
        {text}
      </p>
    </main>
  );
}
