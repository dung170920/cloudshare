import { Header } from "./_components/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full flex-col container">
      <Header />
      {children}
    </main>
  );
}