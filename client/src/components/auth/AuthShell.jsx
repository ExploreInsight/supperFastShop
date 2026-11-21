import Tag from "../ui/Tag";

const AuthShell = ({ title, children, footer }) => (
  <div className="mx-auto max-w-md px-4 pt-20 pb-6">
    <div className="swing" style={{ "--r1": "-1deg" }}>
      <Tag hole string className="px-6 sm:px-8 pt-16 pb-8">
        <h1 className="text-6xl">{title}</h1>
        <div className="mt-6">{children}</div>
        <hr className="stitch my-6" />
        <p className="text-center">{footer}</p>
      </Tag>
    </div>
  </div>
);

export default AuthShell;
