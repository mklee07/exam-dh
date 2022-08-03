import { Button } from "react-bootstrap";
const DeleteButton = () => {
  const Delete = async (e) => {
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
  return <Button variant="outline-danger" onClick={Delete}></Button>;
};
export default DeleteButton;
