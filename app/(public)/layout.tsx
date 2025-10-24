import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="relative px-4 min-h-[calc(100vh-160px)] h-full">
        {children}
      </div>
      <Footer />
    </>
  );
}
