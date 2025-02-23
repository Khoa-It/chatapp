import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../api/AppContext'
import { useNavigate } from 'react-router-dom';
import { apiGetAllMessage, apiSendMessage } from '../api/message';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

export default function Messages() {
    const {messages, setMessages, contactUser, setContactUser, user, setUser, loadding, setLoadding} = useContext(AppContext);
    const navigate = useNavigate();
    const [messageInputValue , setMessageInputValue] = useState('');
    const [image, setImage] = useState(null);
    const endElement = useRef(null);

    const scrollToBottom = () => {
        endElement.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    
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

    const handleSendMessageWithContent = async (content) => {
        const room_id = idCreate(contactUser.id, user.id);
        const message = schemaMessage(room_id, content, user.id);
        let responseApi = await apiSendMessage(message);
        responseApi = responseApi.data;
        if(!responseApi) return;
        setMessages(()=> [...messages,responseApi]); 
        const payLoad = {
            ...responseApi,
            receiver_id: contactUser.id,
        }
        socket.emit('messageFromClient', payLoad);
    }

    const handleSendMessageAndImage = async (event) => {
        if (event.key === 'Enter') {
            if(image) await handleUploadImage();
            if(!messageInputValue) return;
            handleSendMessageWithContent(messageInputValue);
            setMessageInputValue('');
        }
    }

    const handleAvt = (avt) => {
        return avt ? avt : '/src/assets/nullavartar.jpg';
    }

    const checkNullData = () => {
       if(!user) navigate('/');
    }

    const handleImageSeleted = (event) => {
        setImage(()=> event.target.files[0]);
    }

    const handleUploadImage = async () => {
        setLoadding(()=>true);
        const formData = new FormData();
        formData.append("file", image);
        try {
            const response = await axios.post("http://localhost:3001/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            // {
            //     filename: "file-1739897499183.jpg"
            //     message: "File đã nhận thành công!"
            //     mimetype: "image/jpeg"
            //     path: "uploads/file-1739897499183.jpg"
            //     success: true
            //     url: "https://lh3.googleusercontent.com/d/1EBktmr9DOloefmGUq9d8p3gSf5TE-U7d=s220"
            //     webContentLink: "https://drive.google.com/uc?id=1EBktmr9DOloefmGUq9d8p3gSf5TE-U7d&export=download"
            //     webViewLink: "https://drive.google.com/file/d/1EBktmr9DOloefmGUq9d8p3gSf5TE-U7d/view?usp=drivesdk"
            // }
            const {url} = response.data;
            await handleSendMessageWithContent(url);
            setImage(null);
            setLoadding(()=>false);

        } catch (error) {
            setImage(null);
            setLoadding(()=>false);
            alert("Upload thất bại!");
        }
    }

    const isGoogleDriveImage = (url) => {
        return url.startsWith("https://lh3.googleusercontent.com/d/") || url.startsWith("https://drive.google.com/uc?id=");
    };

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

    useEffect(() => {
      scrollToBottom();
    }, [messages])
    
    

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
                <div key={item._id} className={handleClassName(item.sender_id)} >
                    {isGoogleDriveImage(item.content) ? (
                        <img src={item.content} alt="Sent Image" style={{ maxWidth: "300px", borderRadius: "8px" }} />
                    ) : (
                        item.content
                    )}

                    <div ref={endElement}/>
                </div>
            ))}
        </div>
        <div className="message-panel-messages-input">
            <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            onChange={handleImageSeleted}
            />

            <label htmlFor="file-upload">
                <img src="/src/assets/icons8-img-30.png" alt="" />
            </label>

            <input 
                type="text" 
                value={messageInputValue}
                onChange={(e)=> setMessageInputValue(e.target.value)} 
                onKeyDown={(e)=> handleSendMessageAndImage(e)}
                disabled={!contactUser}
            />
            <img src="/src/assets/icons8-smile-67.png" alt="" />

            {image && <img src={URL.createObjectURL(image)} alt="Selected" className='message-panel-messages-input-preview-image' />}

        </div>
    </div>
  )
}

