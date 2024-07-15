import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SideSearch = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Flask 서버로부터 데이터를 받아옴
        axios.get('http://localhost:5000/users')
            .then(response => {
                setMembers(response.data.members);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    
    return(
        <div>
            <form class="d-flex">
                <input class="form-control me-sm-2" type="search" placeholder="Search"/>
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                
            </form>
            <ul>
                {members.map(member => (
                    <li key={member.id}>{member.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SideSearch;