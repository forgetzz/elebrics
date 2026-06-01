"use client"
import { ArtistSection, Button, Card, Herosection, Navbar , AboutUs, Footer, RilisSection } from "@/components/index"
import MusicPlatform from "@/components/layout/MusicPlatform";



export default function Home() {

  return (
    <main>
      <Navbar />
      <Herosection />
      <Card />
      <ArtistSection />
      <RilisSection />
      <MusicPlatform/>
      <AboutUs />
      <Footer />
    </main>
  );
}
