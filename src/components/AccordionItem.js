import React from 'react';
import {Accordion, Card} from 'react-bootstrap';
const AccordionItem = (props) => {
  return (
    <div className="accordion-item">
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0" id="title">
            <h4>{props.item.title}</h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body><p>{props.item.text}</p></Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default AccordionItem;