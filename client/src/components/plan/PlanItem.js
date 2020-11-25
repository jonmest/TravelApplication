import React, { Fragment, useEffect, useState } from "react"
import { Button, Card, Collapse, Row, Col, ButtonGroup } from 'react-bootstrap'
import EditPlan from "../EditPlan"
import ShowPlan from "../ShowPlan"

const PlanItem = plan => {
    const { id, title, description, country, start_date, end_date } = plan
    const [open, setOpen] = useState(false)

    const deletePlan = id => {
        fetch(`http://localhost:8080/plan/${id}`, { method: "DELETE" })
            .then(() => {
                window.location.href = '/'
            })
    }

    const expandItem = () => {
        open ? setOpen(false) : setOpen(true)
    }
    return (
        <Card style={{ marginBottom: "1rem" }}>
            <Card.Header>{country}</Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Row>
                    <Col xs={9}>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Col>
                    <Col>
                        <p><small>Starts:  {new Date(start_date).toDateString()}</small> <br />
                            <small>Ends:  {new Date(end_date).toDateString()}</small></p>
                    </Col>
                </Row>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <p>
                            Planned experiences:
                        </p>
                        {
                            plan.experiences.length == 0 ?
                                "None!" : plan.experiences.map((experience, i) => {
                                    return <Card style={{ marginBottom: "1rem" }}>
                                        <Card.Header>{experience.title}</Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col xs={9}>
                                                    <Card.Text>
                                                        {experience.description}
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <p><small>Starts:  {new Date(experience.start_datetime).toLocaleDateString()}</small> <br />
                                                        <small>Ends:  {new Date(experience.end_datetime).toLocaleDateString()}</small></p>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                })
                        }
                    </div>
                </Collapse>


            </Card.Body>
            <Card.Footer>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success" onClick={expandItem}>Expand</Button>
                    <EditPlan plan={plan}></EditPlan>
                    <Button variant="danger" onClick={() => deletePlan(plan.id)} >Delete</Button>
                </ButtonGroup>
            </Card.Footer>

        </Card >
    );
};
export default PlanItem
