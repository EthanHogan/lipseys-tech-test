import { useState } from "react";
import "./App.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <FindEmail />
      <DuplicateEmails />
    </>
  );
}

type emailExistsResponse = { emailExists: boolean };

const FindEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [emailExists, setEmailExists] = useState<boolean | undefined>(
    undefined
  );
  const [validated, setValidated] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setEmailExists(undefined);
      return;
    }
    setValidated(true);
    doesEmailExist(email);
  };

  let result;
  if (emailExists === undefined) {
    result = <div></div>;
  } else if (emailExists) {
    result = <h2 className="text-success">Yes! The email exists!</h2>;
  } else {
    result = <h2 className="text-danger">Sorry, that email does not exist.</h2>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Find Email</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                required
                type="email"
                onChange={handleChange}
                placeholder="Enter email"
                className="mb-2"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
              <Button variant="primary" type="submit">
                Check
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {result}
    </Container>
  );
};

type duplicateEmailsResponse = { emails: string[] };

const DuplicateEmails = () => {
  const [duplicateEmails, setDuplicateEmails] = useState<string[]>([]);
  const getDuplicateEmails = async (): Promise<void> => {
    fetch("/api/emails/duplicates")
      .then((res) => res.json())
      .then((data: duplicateEmailsResponse): void => {
        setDuplicateEmails(data.emails);
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>View duplicate emails</h1>
          <Form>
            <Button
              type="button"
              variant="primary"
              onClick={(e) => {
                getDuplicateEmails();
              }}
            >
              View
            </Button>
          </Form>
        </Col>
      </Row>
      {duplicateEmails.length > 0 && (
        <Row>
          <Col>
            <h2>Duplicate Emails</h2>
            <ol>
              {duplicateEmails.map((email) => (
                <li>{email}</li>
              ))}
            </ol>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
