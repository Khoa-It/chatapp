import React, { useContext, useEffect } from 'react'
import { AppContext } from '../api/AppContext'
import { useNavigate } from 'react-router-dom';

export default function Messages() {
    const {messages, setMessages, contactUser, setContactUser, user, setUser} = useContext(AppContext);
    const navigate = useNavigate();
    
    const handleClassName = (sender_id) => {
        const className = "message-panel-messages-content";
       if (sender_id == user.id) return `${className}-owner`;
       return `${className}-other`;
    }

    const handleAvt = (avt) => {
        return avt ? avt : '/src/assets/nullavartar.jpg';
    }

    const checkNullData = () => {
       if(!user) navigate('/');
    }

    useEffect(() => {
        checkNullData();
      
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
            <input type="text" />
            <img src="/src/assets/icons8-smile-67.png" alt="" />
        </div>
    </div>
  )
}
