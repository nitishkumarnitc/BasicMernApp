import React, {Component} from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client'


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:{},
         endpoint: "http://127.0.0.1:5000",
            visitorsLength:0
        }
    }

    // sending sockets
    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        console.log("socket data emitted ",this.props.match.params.id);

        socket.emit("profileViewed",
            {roomId:this.props.match.params.id,
            emailId:this.state.user.email}
        );

        socket.on(this.props.match.params.id, (visitorsLength) => {
            this.setState({
                visitorsLength:visitorsLength
            })
        })

    }

    componentDidMount() {
        axios.get('/api/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    user:response.data
                })
                this.send();

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const {user}=this.state;

        return (
            <div className="container">
                <div className="row">
                     User Profile
                    <ul>
                        <li>Name : {user.name}</li>
                        <li>Email : {user.email}</li>
                        <li>Location : {user.location}</li>
                        <li>Company : {user.company}</li>
                        <li>Job Title : {user.jobTitle}</li>
                        <li>Job Description : {user.jobDescription}</li>
                        <li>No Of Visitors : {this.state.visitorsLength}</li>
                    </ul>

                </div>
            </div>
        )
    }
}




export default UserProfile;