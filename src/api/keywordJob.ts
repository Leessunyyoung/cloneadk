import axios from "axios";

export async function siteNo(): Promise<any>{
    const response = await axios.get('/kj?size=10&siteNo=6');
    return response;
}