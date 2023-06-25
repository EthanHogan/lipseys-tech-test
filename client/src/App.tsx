import { ToggleLightMode } from "./components/ToggleLightMode";
import { DuplicateEmails } from "./components/DuplicateEmails";
import { FindEmail } from "./components/FindEmails";
import { Container, Row, Col, Navbar, Image } from "react-bootstrap";
import "./App.css";
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
              height={75}
              width={225}
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

export default App;
