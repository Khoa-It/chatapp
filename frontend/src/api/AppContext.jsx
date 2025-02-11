import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);   
    const [messages, setMessages] = useState(null)   
    return (
        <AppContext.Provider value={{ user, setUser, messages, setMessages}}>
            {children}
        </AppContext.Provider>
    );
};
