import Hero from "./home/Hero";
import WhyJoin from "./home/Sections/Whyjoin";
import EventDetails from "./home/Sections/EventDetails";
import Faq from "./home/Sections/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyJoin />
      <EventDetails />
      <Faq />
    </main>
  );
}
