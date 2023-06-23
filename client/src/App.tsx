import { useState } from "react";
import "./App.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <FindEmail />
    </>
  );
}

type emailExistsResponse = { emailExists: boolean };

const FindEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [emailExists, setEmailExists] = useState<boolean | undefined>(
    undefined
  );

  const doesEmailExist = async (email: string): Promise<void> => {
    fetch("/api/emails/exists?email=" + email)
      .then((res) => res.json())
      .then((data: emailExistsResponse): void => {
        setEmailExists(data.emailExists === true);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === undefined) return;
    setEmail(e.target.value);
  };

  let result;
  if (emailExists === undefined) {
    result = <div></div>;
  } else if (emailExists) {
    result = <h2>Yes! The email exists!</h2>;
  } else {
    result = <h2>Sorry, that email does not exist.</h2>;
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>Find Email</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={handleChange}
                placeholder="Check if an email exists"
                className="mb-2"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  doesEmailExist(email);
                }}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {result}
    </Container>
  );
};

export default App;
