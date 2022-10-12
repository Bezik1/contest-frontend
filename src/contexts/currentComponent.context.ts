import { createContext } from "react";

export const CurrentComponentContext = createContext<React.Dispatch<React.SetStateAction<string>> | undefined>(undefined)