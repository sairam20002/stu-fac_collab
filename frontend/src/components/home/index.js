import { Card, Button } from "react-bootstrap";

function CustomCard({ title, text, goto }) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="outline-warning" href={goto}>
            Click here
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CustomCard;
