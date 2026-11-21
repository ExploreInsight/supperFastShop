import Hero from "../components/home/Hero";
import CategoryTags from "../components/home/CategoryTags";
import NewDrops from "../components/home/NewDrops";
import ThemeBand from "../components/home/ThemeBand";
import Tape from "../components/ui/Tape";
import { CATEGORIES } from "../lib/format";

const HomePage = () => (
  <>
    <Hero />
    <Tape items={CATEGORIES.map((c) => c.name)} />
    <CategoryTags />
    <NewDrops />
    <ThemeBand />
  </>
);

export default HomePage;
