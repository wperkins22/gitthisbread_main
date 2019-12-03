import axios from "axios";


export default axios.create({
	baseURL: "http://localhost:8082/",
	responeType: "json"
});
