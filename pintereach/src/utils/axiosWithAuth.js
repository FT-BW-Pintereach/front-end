import axios from "axios";

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");
    const id = window.localStorage.getItem("id");
// add id to local storage
    
	return axios.create({
		headers: {
			authorization: token,
			user_id: id
		},
		baseURL: "https://pinter-each.herokuapp.com/api"
		
	});
};
