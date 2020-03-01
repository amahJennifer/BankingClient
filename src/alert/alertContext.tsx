import { createContext } from "react";
import {Istate} from './AlertReducer'

interface Ialert {
    state: Istate[],
    setAlert:any
    
}
const AlertContext = createContext({} as Ialert)


export default AlertContext