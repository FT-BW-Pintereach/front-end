import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Button } from "reactstrap";

export const DeleteArticle = props => {

    const [data, setData] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get(`articles/${props.catId}`)
			.then(res => {
                console.log("fetch all from cat", res.data);
                setData(res.data)
            })
			.catch(err => {
				console.log(err);
			});
	}, []);

    console.log("data", data)
    
    const id = data.map(article => {
        return article.id;
    });

    console.log("id", id);

	const deleteArticle = id => {
		axiosWithAuth()
			.delete(`/articles/${id}`)
			.then(res => {
				console.log("delete art", res);
			})
			.catch(err => {
				console.log("error", err);
			});
	};

	return <Button onClick={deleteArticle}>delete</Button>;
};
