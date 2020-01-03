import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const User = props => (

    <tr>
        <td>
            <Link to={"/profile/" + props.user._id}>{props.user.name}</Link>
        </td>
        <td>{props.user.email}</td>
        <td>{props.user.company}</td>
        <td>{props.user.jobTitle}</td>
        <td>{props.user.jobDescription}</td>
        <td>{props.user.location}</td>
    </tr>
)

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }



    getUsers=function(){
        axios.get( '/api/users/searchUsers')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getUsers();
    }


    usersList() {
        return this.state.users.map(function (user, i) {
            return <User user={user} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Job Description </th>
                        <th>Location </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}