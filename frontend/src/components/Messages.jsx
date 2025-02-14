import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../api/AppContext'
import { useNavigate } from 'react-router-dom';
import { apiGetAllMessage, apiSendMessage } from '../api/message';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Messages() {
    const {messages, setMessages, contactUser, setContactUser, user, setUser} = useContext(AppContext);
    const navigate = useNavigate();
    const [messageInputValue , setMessageInputValue] = useState('');
    
    const schemaMessage = (room_id, content, sender_id) => {
        if (!room_id || !content || !sender_id) return null;
        return {room_id, content, sender_id};
    }

    const idCreate = (a, b) => {
        return a < b ? `${a}#${b}` : `${b}#${a}`;
     }

    const handleClassName = (sender_id) => {
        const className = "message-panel-messages-content";
       if (sender_id == user.id) return `${className}-owner`;
       return `${className}-other`;
    }


    const handleSendMessage = async (event) => {
        if (event.key === 'Enter') {
            if(!messageInputValue) return;
            const room_id = idCreate(contactUser.id, user.id);
            const message = schemaMessage(room_id, messageInputValue, user.id);
            let responseApi = await apiSendMessage(message);
            responseApi = responseApi.data;
            if(!responseApi) return;
            setMessages(()=> [...messages,responseApi]); 
            const payLoad = {
                ...responseApi,
                receiver_id: contactUser.id,
            }
            socket.emit('messageFromClient', payLoad);
            setMessageInputValue('');
        }
    }

    const handleAvt = (avt) => {
        return avt ? avt : '/src/assets/nullavartar.jpg';
    }

    const checkNullData = () => {
       if(!user) navigate('/');
    }

    useEffect(() => {
        checkNullData();
        socket.on('connect', () => {
            // Sau khi kết nối, gửi userId lên server
            socket.emit('userIdFromClient', user.id);
            socket.on('messageFromServer', (mes) => {
                console.log(mes);
                
                setMessages(()=> [...messages, mes]);
            })
        });
        return () => {
            socket.off('messageFromServer');
            socket.off('connect');
        };
    }, [])
    

  return (
    <div className='message-panel-messages'>
        <div className="message-panel-messages-user">
            <div className="message-panel-messages-user-info">
                {/* <img src={handleAvt(contactUser.avt)} alt="" /> */}
                <img src="/src/assets/nullavartar.jpg" alt="" />
                <p>{contactUser && contactUser.username}</p>
            </div>
            <div className="message-panel-messages-user-action">
                <img src="/src/assets/icons8-phone-50.png" alt="" />
                <img src="/src/assets/icons8-video-call-50.png" alt="" />
                <img src="/src/assets/icons8-info-30.png" alt="" />
            </div>
        </div>
        <div className="message-panel-messages-content" >
            {messages && messages.map(item => (
                <div key={item._id} className={handleClassName(item.sender_id)} >{item.content}</div>
            ))}
        </div>
        <div className="message-panel-messages-input">
            <img src="/src/assets/icons8-img-30.png" alt="" />
            <input 
                type="text" 
                value={messageInputValue}
                onChange={(e)=> setMessageInputValue(e.target.value)} 
                onKeyDown={(e)=> handleSendMessage(e)}
                disabled={!contactUser}
            />
            <img src="/src/assets/icons8-smile-67.png" alt="" />
        </div>
    </div>
  )
}
