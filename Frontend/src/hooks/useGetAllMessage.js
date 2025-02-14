import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages } from '../redux/messageSlice';

export default function useGetAllMessage() {
    const {allMessage,messages} = useSelector(store=>store.message);
     const dispatch = useDispatch()
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8080/api/v1/chatty/messege/allmessage`);
                // store
                 dispatch(setAllMessages(res.data.allMessage))
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [allMessage,,messages])
}
