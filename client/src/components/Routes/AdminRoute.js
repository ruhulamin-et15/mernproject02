import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from "../Spinner"


export default function AdminRoute () {
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(()=>{
        const authCheck = async () => {
            const response = await axios.get("/api/auth/admin-auth");
            if(response.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        };
        if(auth?.accessToken)authCheck()
    },[auth?.accessToken]);
    return ok ? <Outlet/> : <Spinner/>
}