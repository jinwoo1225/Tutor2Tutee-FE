import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

function Card({classes}) {
    console.log(classes);
    return(
        <span>
            <h1>This is CardView</h1>
            {classes.map(_class => {
                return(
                <div key={_class.classID}>
                    <p>ClassID : {_class.classID}<br/>
                    ClassTitle : {_class.title}<br/>
                    ClassTeacher : {_class.teacher}<br/>
                    ClassDescription : {_class.description}<br/>
                    ClassCurMax : {_class.current} / {_class.maximum}</p>
                    <Link to={{
                        pathname:`class/${_class.classID}`,
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