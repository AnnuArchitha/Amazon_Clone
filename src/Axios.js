import axios from "axios";
import './Axios.css';
const instance=axios.create({
    baseURL : 'http://127.0.0.1:5001/clone-ff6c4/us-central1/api' // API url http://127.0.0.1:5001/clone-ff6c4/us-central1/api (cloud function)
});
export default instance;