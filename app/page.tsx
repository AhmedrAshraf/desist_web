import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { Features } from "./components/Features";
import { CommunityStats } from "./components/CommunityStats";
import { AppDownloadCTA } from "./components/AppDownloadCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Hero />
      <Mission />
      <Features />
      <CommunityStats />
      <AppDownloadCTA />
      <Footer />
    </main>
  );
}
