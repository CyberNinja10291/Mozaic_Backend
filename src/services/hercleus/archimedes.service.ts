import axios from "axios";
import postData from "../../configs/archimedes.json";
import { ARCHIMEDES_URL } from "../../configs/url.config";
const archimedes = async () => {
    const url = ARCHIMEDES_URL;
    axios.post( url, postData)
        .then((response) => {
            // console.log("response", response.data);
        })
        .catch((error) => {
            console.error('Error', error);
        })  
}

const sendRequests = () => {
    const  interval = Math.floor(Math.random() * 10) + 30;
    archimedes();
    // Schedule the next batch of requests after an hour
    setTimeout(sendRequests, interval * 60 * 1000);
}

export default { archimedes, sendRequests };