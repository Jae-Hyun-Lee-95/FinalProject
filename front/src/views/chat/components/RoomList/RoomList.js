import React, { useContext, useEffect, useState } from "react";
import socket from "../../server";
import { useNavigate } from "react-router-dom";
import "./RoomList.css";
import RoomListContext from "../../contexts/RoomListContext";
import axios from "axios";

const RoomList = () => {
    const value = useContext(RoomListContext);

    // 채팅 방 입장
    const moveToChat = (rid) => {
        // 채팅 유저 정보가 없을 경우
        if (!value.state.user) {
            const userName = prompt("이름입력");

            // 방 참여
            socket.emit("joinRoom", rid, userName, (res) => {
                if (res && res.ok) {
                    console.log("successfully join", res);
                    value.actions.setUser(res.data);

                    // const name = {
                    //     name: userName,
                    // };

                    // axios.get('http://localhost:5001/setSession', { params: name, withCredentials: true })
                    //     .then((response) => {
                    //         console.log('Session set', response);
                    //     })
                    //     .catch(error => {
                    //         console.error('Error setting session', error);
                    //     });
                }
                else {
                    console.log("fail to join", res);
                }
            })

            // 서버에 로그인 요청
            // socket.emit("login", userName, (res) => {
            //     if (res.ok) {
            //         value.actions.setUser(res.data); // 유저 정보 저장
            //         value.actions.setRId(rid); // 채팅 방 id 저장
            //     }
            // });
        }
    };

    return (
        <div className="room-body">
            <div className="room-nav">채팅 ▼</div>
            {value.state.rooms.length > 0
                ? value.state.rooms.map((room) => (
                    <div
                        className="room-list"
                        key={room._id}
                        onClick={() => moveToChat(room._id)}
                    >
                        <div className="room-title">
                            <img src="/profile.jpeg" alt="Profile" />
                            <p>{room.room}</p>
                        </div>
                        <div className="member-number">{room.members.length}</div>
                    </div>
                ))
                : null}
        </div>
    );
};

export default RoomList;