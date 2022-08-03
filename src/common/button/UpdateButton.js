import { Button } from "react-bootstrap";
const UpdateButton = () => {
  const Update = async (e) => {
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
  return (
    <div>
      <Button variant="outline-warning" onClick={Update}></Button>
    </div>
  );
};
export default UpdateButton;
