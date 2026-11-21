// Price-gun sticker.
const Sticker = ({ tilt = -2, className = "", children, as: Component = "span", ...rest }) => (
  <Component className={`sticker inline-block px-2.5 py-1.5 ${className}`} style={{ "--tilt": `${tilt}deg` }} {...rest}>
    {children}
  </Component>
);

export default Sticker;
