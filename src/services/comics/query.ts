import {Md5} from 'ts-md5';
import axios from 'axios'
import { getAuthString } from '@/utils/marvel';
import { search } from '../../../pages/query';

export default async function handler(req, res) {
   
let errorMsg = ""
    try {
        console.log("hitting marvel")
        const response = await search()
        console.log(response.data);
        res.status(200).json(response.data);
    }
    catch(error) {
        console.log("hitting marvel failed ")
        const response = await search()
        console.log(response);
        res.status(500).json({error});
    }
  }