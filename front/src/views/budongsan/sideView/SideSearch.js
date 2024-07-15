import React from 'react';
import { useState, useEffect } from 'react';

const SideSearch = () => {

    // state
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("/users")
            .then(response => response.json())
            .then(data => {
                // 받아온 데이터를 data 변수에 저장
                setData(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼 제출 시 추가 동작을 여기에 정의할 수 있습니다.
        console.log('Search submitted');
    };

    return(
        <div>
            <form class="d-flex">
                <input class="form-control me-sm-2" type="search" placeholder="Search"/>
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div>
                {data.members && data.members.map((u) => <p key={u.id}>{u.name}</p>)}
            </div>
            
        </div>
    )
}

export default SideSearch;