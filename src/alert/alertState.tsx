import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "../alert/alertContext";
import AlertReducer, { Istate } from "../alert/AlertReducer"
// import { Items } from "../Components/Contacts/ContactItem";

import { SET_ALERT,REMOVE_ALERT } from "../context/type";

const initialState:Istate[] = [];

function AlertState(props: any) {
  const [state, dispatch] = useReducer(AlertReducer, initialState);
  // Set Alert
  const setAlert = (msg: string, type: string, timeout = 5000) => {
    const id:string = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
      setTimeout(() => dispatch({type:REMOVE_ALERT, payload:id})
          
      , timeout);
    };
    
 
  return (
    <AlertContext.Provider
      value={{
              state,
          setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
