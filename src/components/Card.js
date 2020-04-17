import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

function Card({classes}) {
    return(
        <span>
            <h1>This is CardView</h1>
            {classes.map(_class => {
                return(
                <div key={_class._id}>
                    <p>ClassID : {_class._id}<br/>
                    ClassTitle : {_class.className}<br/>
                    ClassTeacher : {_class.tutor}<br/>
                    {/* ClassDescription : {_class.description}<br/> */}
                    ClassCurMax : {_class.tutees.length} / I don't know</p>
                    <Link to={{
                        pathname:`class/${_class._id}`,
                        _class : _class,
                    }}><button>Go</button></Link>
                </div>
                )
            })}
        </span>
    );
}

function mapStateToProps(state,){
    return {classes : state.class,};
}

export default connect(mapStateToProps)(Card);