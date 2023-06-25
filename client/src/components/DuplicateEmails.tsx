import React, { useState } from "react";
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
              {loading ? (
                <tr>
                  <td className="placeholder-glow">
                    <div className="placeholder col-12"></div>
                  </td>
                </tr>
              ) : (
                duplicateEmails.map((email, index) => (
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
                ))
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
