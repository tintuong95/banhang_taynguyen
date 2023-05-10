import React, { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../common/Navbar"
import Footer from "../common/Footer";
import { axiosClient } from "../../configs/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { actionUserCookie } from "../../store/action.js";
import Chatbox from "../common/Chatbox";
import Loading from "../common/Loading";
import { setLoading } from "../../store/reducer";


const fetcher = async (URL) => {
    return axiosClient({
        method: "get",
        url: URL,
    });
};



const Layout = ({ children }) => {
    const router = useRouter();
    const { data } = useSWR("/group-product", fetcher);
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.reducerStore)
    //  const handleTabClose = event => {
    //       event.preventDefault();

    //       console.log('beforeunload event triggered');

    //       return (event.returnValue = 'Are you sure you want to exit?');
    //     };

    //     const handleTabClosing = () => {
    //     removePlayerFromGame()
    // }

    // const alertUser = (event) => {
    //     event.preventDefault()
    //     event.returnValue = ''
    // }

    // useEffect(() => {
    //     window.addEventListener('beforeunload', alertUser)
    //     window.addEventListener('unload', handleTabClosing)
    //     return () => {
    //         window.removeEventListener('beforeunload', alertUser)
    //         window.removeEventListener('unload', handleTabClosing)
    //     }
    // })
    useEffect(() => {


        if (loading){
            setTimeout(() => { dispatch(setLoading()) },5000)
        }

        dispatch(actionUserCookie());

    }, []);

    return (<>

        {loading ? <Loading /> :null}
         <>
           <div>
                < Navbar {...data} />
           </div>
            <div className=""> {children}</div>
            <div>
                <   Footer />
            </div></>
    </>
    );
};

export default Layout;