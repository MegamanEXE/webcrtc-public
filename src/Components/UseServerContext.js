//if true, the whole app will use server-related code (requires a running server on http://localhost:27017)
//if false, it will use the dummy data from the "data" folder which helps in development
import { createContext } from 'react';

//IMPORTANT NOTE: These default values don't really matter here, they need to be specified in App.js to take effect
const serverAddress = "http://localhost:5000/";
export const UseServerContext = createContext({serverEnabled:false, serverAddress:serverAddress});