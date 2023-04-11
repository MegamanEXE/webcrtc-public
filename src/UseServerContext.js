//if true, the whole app will use server-related code (requires a running server on http://localhost:27017)
//if false, it will use the dummy data from the "data" folder which helps in development
import { createContext } from 'react';

//false is the default value, which isn't important here. Set it at the Provider level in App.js
export const UseServerContext = createContext(false);