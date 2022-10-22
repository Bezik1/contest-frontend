import { createContext } from "react";

export const WalletContext = createContext<[string, number]>(['', 0])