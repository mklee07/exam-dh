import { Button } from "react-bootstrap";
const SaveButton = () => {
  const Save = async (e) => {
    e.preventDefault();
    const res = await axios("/axios/add", {
      method: "POST",
      data: { data: id },
      header: new Headers(),
    });
    if (res.data) {
      alert("added Data");
      return window.location.reload();
    }
  };
  return <Button variant="outline-success" onClick={Save}></Button>;
};
export default SaveButton;
