import {QueryClient, useMutation} from 'react-query'
import axios from 'axios'
import { useToast } from '@chakra-ui/react';

axios.defaults.withCredentials = true;

export const API_URL = process.env.REACT_APP_API_URL

export const queryClient = new QueryClient();

export const checkAuth = async () => {
  const res = await axios.get(`${API_URL}/v2/auth/check`);
  return res.data;
};

export const getEvents = (zipcode) => {
  return axios.post(`${API_URL}/api/scrapers/getEvents/${zipcode}`);
};

export const useGetEvents = (filter) => {
   const toast = useToast()
   return useMutation(getEvents, {
      onError: (error) => {
        if (error.response.data.error === 'Non-US zipcode') {
          toast({
            title: "Non-US zipcode",
            description: "Please enter a US zipcode",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        } else {
          toast({
            title: "Error",
            description: "An error has occured while fetching events",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
      },
      onSuccess: (data) => {
        if (filter !== 'all') {
          
        } 
      }
   })
}
