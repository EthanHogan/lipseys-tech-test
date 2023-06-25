import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

type emailExistsResponse = { emailExists: boolean };

export const FindEmail = () => {
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
    result = null;
  } else if (emailExists) {
    result = (
      <h5>
        <em className="text-primary">Yes! The email exists!</em>
      </h5>
    );
  } else {
    result = (
      <h5>
        <em className="text-danger">Sorry, that email does not exist.</em>
      </h5>
    );
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
              <Row className="mt-3">
                <Col xs={12} sm={3}>
                  <Button
                    variant="primary"
                    type="submit"
                    title="checkIfEmailExists"
                  >
                    Check
                  </Button>
                </Col>
                <Col xs={12} sm={9} className="mt-2 mt-sm-0">
                  <div>{result}</div>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};
