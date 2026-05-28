"use client"
import { Button, Card, Herosection, Navbar } from "@/components/index"
import AboutUs from "@/components/layout/AboutUs";
import ArtistSection from "@/components/layout/ArtistSection";
import Footer from "@/components/layout/Footer";
import RilisSection from "@/components/layout/RilisSection";




export default function Home() {


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
