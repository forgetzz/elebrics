"use client"
import { Button, Card, Herosection, Navbar } from "@/components/index"
import AboutUs from "@/components/layout/AboutUs";
import ArtistSection from "@/components/layout/ArtistSection";
import Footer from "@/components/layout/Footer";
import RilisSection from "@/components/layout/RilisSection";




export default function Home() {
  const nama = {
    name: "",
    function: function NAMA(params: boolean) {
      console.log(params)
    },
    
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
