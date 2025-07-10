import React, { useState, useEffect, useContext, createContext } from 'react';

export const userContext = createContext();

const Context=({children})=>{

    const [username, setUserName] = useState('');
     
    useEffect(()=>{
        setUserName(localStorage.getItem("name"))
        console.log(username)
    })


    return(
        <div>
       <userContext.Provider value={{username,setUserName}}>
         {children}
       </userContext.Provider>


        </div>
    )
}
export default Context