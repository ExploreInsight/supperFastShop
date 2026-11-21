// Die-cut swing tag. The surface every card, panel and form in the shop is built on.
const Tag = ({ as: Component = "div", hole = false, string = false, className = "", wrapClassName = "", style, children, ...rest }) => (
  <div className={`tag-wrap ${wrapClassName}`} style={style}>
    <Component className={`tag ${hole ? "has-hole" : ""} ${string ? "tag-string" : ""} ${className}`} {...rest}>
      {children}
    </Component>
  </div>
);

export default Tag;
