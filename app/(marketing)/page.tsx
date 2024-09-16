import { Poppins, Rowdies } from "next/font/google";
import Banner from "./_components/Banner";
import FAQs from "./_components/FAQs";
import Features from "./_components/Features";
import Hero from "./_components/Hero";
import LogoTicker from "./_components/LogoTicker";
import Navbar from "./_components/Navbar";
import ProductShowcase from "./_components/ProductShowcase";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen  *:w-full">
      <Banner />
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <FAQs />
    </div>
  );
};

export default MarketingPage;
