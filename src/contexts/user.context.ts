import { createContext } from "react";
import { User } from "../interfaces/interfaces";

export const UserContext = createContext<User | undefined>(undefined)