import { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Navbar,
  Image,
  Table,
} from "react-bootstrap";
import "./custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import navLogo from "./LipseysNav.svg";

function App() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-primary">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={navLogo}
              height={100}
              width={300}
              className="d-inline-block align-top"
              alt="Lipseys Logo"
              fluid
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=" justify-content-end"
          >
            <ToggleLightMode />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} lg={{ span: 5, offset: 1 }} className="mt-5">
            <FindEmail />
          </Col>
          <Col xs={12} lg={{ span: 5 }} className="mt-5">
            <DuplicateEmails />
          </Col>
        </Row>
      </Container>
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
    setValidated(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setEmailExists(undefined);
      return;
    }

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
    <>
      <Row>
        <Col>
          <h2>Find Email</h2>
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
              <Button
                variant="primary"
                type="submit"
                title="checkIfEmailExists"
              >
                Check
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>{result}</Col>
      </Row>
    </>
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
    <>
      <Row>
        <Col>
          <h2>View Duplicates</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>
              {duplicateEmails.map((email) => (
                <tr>
                  <td>{email}</td>
                </tr>
              ))}
              {duplicateEmails.length === 0 && (
                <tr>
                  <td>
                    <i>Results hidden</i>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Button
              title="viewDuplicateEmails"
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
    </>
  );
};

const ToggleLightMode = () => {
  const [lightMode, setLightMode] = useState<boolean>(false);

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  useEffect(() => {
    lightMode
      ? document.documentElement.setAttribute("data-bs-theme", "light")
      : document.documentElement.setAttribute("data-bs-theme", "dark");
  }, [lightMode]);

  return (
    <div className="d-inline-block">
      <Button title="toggleLightMode" onClick={toggleLightMode}>
        <i
          className={
            (lightMode ? "text-secondary" : "text-light") +
            " bi bi-sun-fill fs-3 me-3"
          }
        ></i>
        <i
          className={
            (!lightMode ? "text-primary" : "text-dark") +
            " bi bi-moon-fill fs-3"
          }
        ></i>
      </Button>
    </div>
  );
};

export default App;
