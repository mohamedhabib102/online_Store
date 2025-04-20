import "./Dahsboard.css"
import { useEffect, useState } from "react";
import  { useAuth } from "../Context/Context"
import axios from "axios";

function Users(){
    const { authToken, linkProxy } = useAuth()
    const [user, setUser] = useState([]);
    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = () => {
        axios.get(`${linkProxy}http://namehost.runasp.net/api/Account`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        }
        )
        .then((data) => setUser(data.data))
        .catch((err) => console.log(err))
    }
    const deleteUser = (id) => {
        axios.delete(`${linkProxy}http://namehost.runasp.net/api/Account?id=${id}`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((user) => {
            console.log(user)
            getAllUsers()
        })
    }
        return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((use, index) => {
                        return(
                            <tr key={use.id}>
                                <td>{index + 1}</td>
                                <td>{use.firstName+" "+use.lastName}</td>
                                <td>{use.email}</td>
                                <td className="delete">
                                <button
                                onClick={() => deleteUser(use.id)}
                                >Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}


export default Users;