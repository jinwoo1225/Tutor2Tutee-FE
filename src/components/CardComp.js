import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col} from 'react-bootstrap';

function CardComp({classes}) {
    return(
        <Row>
                {classes.map(_class => {
                    return(
                        <Col className='col-md-3 my-3' key={_class._id}>
                            <Card >
                                <Card.Body >
                                    <Card.Title>{_class.className}</Card.Title>
                                    <Card.Text>{_class.tutor}</Card.Text>
                                    <Link to={{
                                        pathname:`class/id/${_class._id}`,
                                        _class,
                                    }}><Button>수강하기!!</Button></Link>
                                </Card.Body>
                            </Card>
                        </Col>  
                    )
                })}
        </Row>
    );
}

function mapStateToProps(state,){
    return {classes : state.class,};
}

export default connect(mapStateToProps)(CardComp);