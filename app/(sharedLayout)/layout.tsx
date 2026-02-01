import { Header } from "@/components/app/header";

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <Header />
          {children}
    </>
  );
}
