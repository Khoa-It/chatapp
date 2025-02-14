import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));   
    const [messages, setMessages] = useState([]);
    const [contactUser, setContactUser] = useState(null);
    return (
        <AppContext.Provider value={{ user, setUser, messages, setMessages, contactUser, setContactUser}}>
            {children}
        </AppContext.Provider>
    );
};
