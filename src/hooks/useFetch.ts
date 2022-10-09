import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import { Data, Response } from "../interfaces/interfaces";

export const useFetch = <T>(url: string) =>{
    const [data, setData] = useState<Response<T>>()

    const fetchData = useCallback(async () =>{
        const res: Data<T>= await axios.get(url)
    
        setData(res.data)
      }, [url])

    useEffect(() =>{
      fetchData()
    }, [fetchData])

    return [data, setData] as [Response<T>, React.Dispatch<React.SetStateAction<Response<T>>>]
}