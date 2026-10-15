import React from "react";

import Hero from "../components/Hero";
import FitnessPrograms from "../components/FitnessPrograms";
import WhyChooseUs from "../components/WhyChooseUs";
import MembershipPlans from "../components/MembershipPlans";
import Trainers from "../components/Trainers";
import GymGallery from "../components/GymGallery";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      
      <Hero />
      <FitnessPrograms />
      <WhyChooseUs />
      <MembershipPlans />
      <Trainers />
      <GymGallery />
      <Testimonials />
    </>
  );
};

export default Home;