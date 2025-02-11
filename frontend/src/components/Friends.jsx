import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../api/AppContext';
import { useNavigate } from 'react-router-dom';
import { getAllMessage } from '../api/message';
import { getAllUser, getOthers } from '../api/user';
import { getRelationShip } from '../api/friendship';

export default function Friends() {
    const [friends, setFriends] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const {user, setUser, messages, setMessages} = useContext(AppContext);
    const [othersWindow, setOthersWindow] = useState(false);
    const [othersData, setOthersData] = useState(null);
    const navigate = useNavigate();

    const testData = [{
        room_id: '1#2',
        content: 'haha',
        sender_id: 1,
    },
    {
        room_id: '1#3',
        content: 'haha',
        sender_id: 1,
    } 
    ];



    const getFriends = async (data=[{room_id:'1#2'}]) => {
        let responseApi;
        let otherIds = [];
        for (const element of data) {
            const arrId = element.room_id.split('#');
            const otherId = arrId[0] == user.id ? arrId[1] : arrId[0];
            otherIds.push(otherId);
        }
        otherIds = otherIds.map(id => parseInt(id, 10));
        responseApi = await getOthers(otherIds);
        setFriends(()=> responseApi.data);
    }

    const idIncludes = (db_id = "", id = 2) => {
        return db_id.startsWith(`${id}#`) || db_id.endsWith(`#${id}`);
    }

    const handleOtherData = async () => {
        let responseApi, handleData;
        responseApi = await getAllUser();
        handleData = responseApi.data;
        for (const element of handleData) {
            element.nofriend = true;
            element.accept = false;
        }
        responseApi = await getRelationShip(user.id);
        setOthersData(()=> handleData);
    }

    useEffect(() => {
        const fetchData = async () =>{
            try {
                if (!user) navigate('/');
                const messages = await getAllMessage(user.id);
                getFriends(testData);
                handleOtherData();
            } catch (error) {
                console.log(error);
                navigate('/');
            }    
        };
        fetchData();
    }, []);

    const handleClassName = (id) => {
        const classname = "message-panel-friends-items-item"
      if(!selectedItem) return classname;
      if(id == selectedItem) return classname + " active";
      return classname;
    }


  return (
    <>
        <div className='message-panel-friends'>
            <h1>Messages</h1>
            <p className='message-panel-friends-hello'>Hello {user.username} 👋</p>
            <button className='message-panel-friends-findbtn' onClick={()=> setOthersWindow(()=>true)}>Find</button>

            <div className="message-panel-friends-items">
                { friends && friends.map(item => (
                    <div key={item.id} className={handleClassName(item.id)} onClick={()=> setSelectedItem(item.id)} >
                        <img src="/src/assets/nullavartar.jpg" alt="" />
                        <p>{item.username}</p>
                    </div>
                )) }
            </div>
            
            <div className="message-panel-friends-logout" onClick={()=> navigate('/')}>
                <p>logout</p>
                <img src="src/assets/icons8-logout-50.png" alt="" />
            </div>
        </div>

        {
        othersWindow && 
        <div className='overlay'>
            <div className='others'>
                <h1>Others</h1>

                <div className='scroll-bar'>
                    {othersData && othersData.map(item => (
                        <div className="others-item" >
                            <img src="/src/assets/nullavartar.jpg" alt="" />
                            <p>{item.username}</p>
                            <button className='others-item-send'>Send</button>
                            <button className='others-item-add'>Add friend</button>
                            <button className='others-item-accept'>Accept</button>
                        </div>
                    ))}
                </div>

                <img src="src/assets/icons8-close-64.png" alt="" className='others-close' onClick={()=> setOthersWindow(()=>false)} />
            </div>
        </div>
        }
        
    </>
  )
}
