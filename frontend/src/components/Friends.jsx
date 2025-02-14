import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../api/AppContext';
import { useNavigate } from 'react-router-dom';
import { castResponseToArray, apiGetAllMessage, apiGetMessageByRoomId } from '../api/message';
import { getAllUser, getOthers } from '../api/user';
import { getRelationShip } from '../api/friendship';
import { formToJSON } from 'axios';

export default function Friends() {
    const [friends, setFriends] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const {user, setUser, messages, setMessages, contactUser, setContactUser} = useContext(AppContext);
    const [othersWindow, setOthersWindow] = useState(false);
    const [othersData, setOthersData] = useState(null);
    const [mappingUst, setMappingUst] = useState(null);

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

    const idIncludes = (db_id = "", id = 2) => {
        return db_id.startsWith(`${id}#`) || db_id.endsWith(`#${id}`);
    }

    const idCreate = (a, b) => {
       return a < b ? `${a}#${b}` : `${b}#${a}`;
    }

    const addContact = async (id) => {
        // add other person for left menu
        for (const element of friends){
            if (element.id == id){
                setSelectedItem(()=> id);
                setOthersWindow(()=> false);
                await handleMenuEvent(id);
                return;
            }
        }
        const index = mappingUst[idCreate(id, user.id)];
        const item = othersData[index];
        setFriends(()=> [...friends, item]);
        
        // active click event
        setOthersWindow(()=> false);
        await handleMenuEvent(id);
    }

    const handleRecentContactData = async (data=[{room_id:'1#2'}]) => {
        let responseApi;
        let otherIds = [];
        for (const element of data) {
            const arrId = element.room_id.split('#');
            const otherId = arrId[0] == user.id ? arrId[1] : arrId[0];
            if (otherIds.includes(otherId)) continue;
            otherIds.push(otherId);
        }
        otherIds = otherIds.map(id => parseInt(id, 10));
        responseApi = await getOthers(otherIds);
        responseApi = responseApi.data;
        responseApi = castResponseToArray(responseApi);        
        setFriends(()=> responseApi);
    }

    const handleOtherContactData = async () => {
        let responseApi, handleData;
        let mapping = {};
        // get all user data
        responseApi = await getAllUser();
        handleData = responseApi.data;
        handleData = handleData.filter(item => item.id != user.id);

        // build mapping used for relation data with other user data
        for (let i = 0; i < handleData.length; i++) {
            const element = handleData[i];
            element.sender_id = -1;
            element.status = "";
            mapping[idCreate(element.id, user.id)] = i;
        }

        // get relation between other with current user
        responseApi = await getRelationShip(user.id);
        responseApi = responseApi.data;
        
        for (const element of responseApi) {
            const index = mapping[element.id];
            handleData[index].sender_id = element.sender_id;
            handleData[index].status = element.status;
        }

        setOthersData(()=> handleData);
        setMappingUst(()=> mapping);
    }

    useEffect(() => {
        const fetchData = async () =>{
            try {
                if (!user) {
                    const data = localStorage.getItem('user');
                    setUser(JSON.parse(data))
                    if(!user) navigate('/');
                }
                console.log(user);
                
                let handleRelation = await apiGetAllMessage(user.id);
                handleRelation = handleRelation.data;
                handleRelation = castResponseToArray(handleRelation);
                handleRecentContactData(handleRelation);
                handleOtherContactData();
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

    const handleMenuEvent = async (id) => {
        const index = mappingUst[idCreate(user.id, id)];
        setSelectedItem(() => id);

        let responseApi = await apiGetMessageByRoomId(idCreate(user.id, id));
        responseApi = responseApi.data;
        responseApi = castResponseToArray(responseApi);
        setMessages(()=> responseApi);
        setContactUser(()=> othersData[index]);
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }


  return (
    <>
        <div className='message-panel-friends'>
            <h1>Messages</h1>
            <p className='message-panel-friends-hello'>Hello {user && user.username} 👋</p>
            <button className='message-panel-friends-findbtn' onClick={()=> setOthersWindow(()=>true)}>Find</button>

            <div className="message-panel-friends-items">
                { friends && friends.map(item => (
                    <div key={item.id} className={handleClassName(item.id)} onClick={()=> handleMenuEvent(item.id)} >
                        <img src="/src/assets/nullavartar.jpg" alt="" />
                        <p>{item.username}</p>
                    </div>
                )) }
            </div>
            
            <div className="message-panel-friends-logout" onClick={()=> handleLogout()}>
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
                        <div className="others-item" key={item._id}  >
                            <img src="/src/assets/nullavartar.jpg" alt="" />
                            <p>{item.username}</p>
                            <button className='others-item-send' onClick={()=> addContact(item.id)}>Send</button>
                            {item.sender_id == -1 && <button className='others-item-add'>Add friend</button>}
                            {item.sender_id != user.id && item.status != "accepted" && item.status != "" && <button className='others-item-accept'>Accept</button>}
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
