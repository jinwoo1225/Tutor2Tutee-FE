import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col} from 'react-bootstrap';

function CardComp({classes}) {
    return(
        <Row>
                {classes.map(_class => {
                    return(
                        <Col className='col-md-3 my-md-3' key={_class._id}>
                            <Card >
                                <Card.Body >
                                    <Card.Title>{_class.className}</Card.Title>
                                    <Card.Text>{_class.tutor}</Card.Text>
                                    <Link to={{
                                        pathname:`class/${_class._id}`,
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


// {classes.map(_class => {
//     return(
//     <div key={_class._id}>
//         <p>ClassID : {_class._id}<br/>
//         ClassTitle : {_class.className}<br/>
//         ClassTeacher : {_class.tutor}<br/>
//         {/* ClassDescription : {_class.description}<br/> */}
//         ClassCurMax : {_class.tutees.length} / I don't know</p>
//         <Link to={{
//             pathname:`class/${_class._id}`,
//             _class : _class,
//         }}><button>Go</button></Link>
//     </div>
//     )
// })}