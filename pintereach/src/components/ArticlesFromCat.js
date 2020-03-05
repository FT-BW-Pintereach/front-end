import React, { useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ArticlesContext } from "../contexts/ArticlesContext";

const ArticlesFromCat = () => {
    
	const userId = window.localStorage.getItem("id");

    const { state, dispatch } = useContext(ArticlesContext);

	useEffect(() => {
		axiosWithAuth()
			.get(`/categories/${userId}/articles`)
			.then(res => {
                console.log(res);
                // dispatch({typed: "FETCH_USERARTICLES", payload: res})
			})
			.catch(err => {
				console.log(err);
			});
	},[]);

    return (<div>
        ARTICLES
    </div>);
};

export default ArticlesFromCat;
