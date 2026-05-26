"use client"
import { Button, Card, Herosection, Navbar } from "@/components/index"
import AboutUs from "@/components/layout/AboutUs";
import ArtistSection from "@/components/layout/ArtistSection";
import Footer from "@/components/layout/Footer";
import RilisSection from "@/components/layout/RilisSection";
import CardArt from "@/components/ui/CardArt";
import Login from "@/components/ui/Login";
import { useTheme } from "@/hooks/useTheme";


export default function Home() {
 const {IsDark , themeToggle} = useTheme()


 console.log(IsDark)


  const triggerData = () => {
    alert("hal")
  }

  return (
    <main>
      <Navbar />
      <Herosection />
      <Card />
      <ArtistSection />
      <RilisSection />
      <AboutUs />
      <Footer />
    </main>
  );
}
