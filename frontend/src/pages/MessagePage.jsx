import React from 'react'
import Friends from '../components/Friends'
import Messages from '../components/Messages'

export default function MessagePage() {
  return (
    <div className='message'>
        <div className="message-panel">
            <Friends/>
            <Messages/>
        </div>
    </div>
  )
}
