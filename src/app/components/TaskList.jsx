import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations'
import {withRouter, Link} from 'react-router-dom';

export const TaskList = ({tasks, name, ownerID, createNewTask}) => (
    <div className="col card p-2 m-2">
        <h3>{name}</h3>
        {tasks.map(function(task, index) {
            return (
                <div className="card p-2 mt-2" key={index}>
                    {task.isComplete 
                    ? <Link className="" to={`/task/${task.id}`} style={{textDecoration: 'none', textDecoration: 'line-through'}} >{task.name}</Link>
                    : <Link key={task.id} to={`/task/${task.id}`} style={{textDecoration: 'none'}} >{task.name}</Link>
                    }
                </div>
            )
        })}
        <button onClick={() => createNewTask(ownerID)} className="btn btn-primary btn-block mt-2">Add New</button>
    </div>
)



const mapStateToProps = (state, ownProps) => {
    let groupId = ownProps.id;
    let tasks = state.tasks.filter(task => task.group === groupId);
    let ownerID = state.session.id;
    return {
        name: ownProps.name,
        tasks,
        ownerID
    }
}

const mapDispatchToProps = (dispatch, {id}) => {{
    const groupID = id;
    return {
        createNewTask(ownerID) {
            dispatch(requestTaskCreation(ownerID, groupID));
        }
    }
}};

export const ConnectedTaskList = withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskList));