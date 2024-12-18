"use client"

import CardsHome from "@/app/components/cardsHome/CardsHome";
import HeaderAuth from "@/app/components/header/HeaderAuth";
import SecondSection from "@/app/components/secondSection/SecondSection";
import withAuth from "@/auth/WithAuth";

const Home = () => {
  return (
    <div className="bg-hero bg-cover bg-center h-full">
      <HeaderAuth />
      <section>
        <CardsHome/>
        <SecondSection/>
      </section>
    </div>
  );
};

export default withAuth(Home);
