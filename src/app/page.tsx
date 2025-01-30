import CardCrousal from "@/components/CardCrousal";
import FeaturedWebinars from "@/components/FeaturedWebinars";
import FeautedCard from "@/components/FeautedCard";
import HeroSection from "@/components/HeroSection";
import Instructors from "@/components/Instructors";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
        <HeroSection />
        <FeautedCard />
        <WhyChooseUs/>
        <CardCrousal/>
        <FeaturedWebinars/>
        <Instructors/>
    </div>  
 
  );
}
