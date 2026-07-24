import Hero from "./home/Hero";
import WhyJoin from "./home/Sections/Whyjoin";
import EventDetails from "./home/Sections/EventDetails";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyJoin />
      <EventDetails />
    </main>
  );
}
