import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JobCategories from "@/components/JobCategories";
import JobListings from "@/components/JobListings";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <JobCategories />
      <JobListings />
      <FeaturedCompanies />
      <HowItWorks />
      <Testimonials />
      <SiteFooter />
    </div>
  );
};

export default Index;
