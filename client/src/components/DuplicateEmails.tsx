import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { motion } from "framer-motion";

type duplicateEmailsResponse = { emails: string[] };

export const DuplicateEmails = () => {
  const [duplicateEmails, setDuplicateEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getDuplicateEmails = async (): Promise<void> => {
    setLoading(true);
    setDuplicateEmails([]);
    fetch("/api/emails/duplicates")
      .then((res) => res.json())
      .then((data: duplicateEmailsResponse): void => {
        setDuplicateEmails(data.emails);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const reset = () => {
    setDuplicateEmails([]);
  };

  const rows = loadRows(loading, duplicateEmails);

  return (
    <>
      <Row>
        <Col>
          <h2>View Duplicates</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="border-primary">
            <thead>
              <tr>
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            {duplicateEmails.length > 0 ? (
              <Button
                title="resetDuplicateEmails"
                type="button"
                variant="primary"
                onClick={(e) => {
                  reset();
                }}
              >
                Reset
              </Button>
            ) : (
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
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

function loadRows(isLoading: boolean, duplicateEmails: string[]) {
  let rows;
  if (isLoading) {
    rows = (
      <tr>
        <td className="placeholder-glow">
          <div className="placeholder col-12"></div>
        </td>
      </tr>
    );
  } else if (duplicateEmails.length === 0) {
    rows = (
      <tr>
        <td>
          <em>Click "View" to see duplicates.</em>
        </td>
      </tr>
    );
  } else {
    rows = duplicateEmails.map((email, index) => (
      <motion.tr
        key={index}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: index * 0.3, duration: 0.5 },
        }}
        exit={{ opacity: 0 }}
      >
        <td>{email}</td>
      </motion.tr>
    ));
  }
  return rows;
}
