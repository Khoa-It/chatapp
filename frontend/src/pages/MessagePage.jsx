import React, { useContext } from 'react'
import Friends from '../components/Friends'
import Messages from '../components/Messages'
import { AppContext } from '../api/AppContext'

export default function MessagePage() {
  const {loadding, setLoadding} = useContext(AppContext);
  return (
    <>
      <div className='message'>
          <div className="message-panel">
              <Friends/>
              <Messages/>
          </div>
      </div>
    {loadding &&  <div className='overlay'>
        <div className='loader'></div>
      </div>}
    </>
  )
}
