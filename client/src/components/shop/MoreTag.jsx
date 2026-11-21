import { Link } from "react-router-dom";
import Tag from "../ui/Tag";
import Sticker from "../ui/Sticker";

// Closing tile for a grid: links to the full range and fills the last row.
const MoreTag = ({ to = "/shop", children = "See everything", tilt = 1 }) => (
  <Link to={to} className="block h-full group focus-visible:outline-offset-8">
    <Tag hole className="h-full min-h-48 px-4 pt-12 pb-4 flex flex-col justify-between group-hover:-translate-y-1 transition-transform" style={{ transform: `rotate(${tilt}deg)` }}>
      <p className="font-display font-black uppercase text-4xl sm:text-5xl leading-[0.9]">{children}</p>
      <Sticker className="self-start text-2xl" tilt={-2}>Go &rarr;</Sticker>
    </Tag>
  </Link>
);

export default MoreTag;
