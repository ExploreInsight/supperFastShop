import EmptyTag from "../components/ui/EmptyTag";
import Btn from "../components/ui/Btn";

const NotFoundPage = () => (
  <EmptyTag title="404: wrong aisle" action={<Btn to="/" variant="sticker">Back home</Btn>}>
    That page does not exist.
  </EmptyTag>
);

export default NotFoundPage;
