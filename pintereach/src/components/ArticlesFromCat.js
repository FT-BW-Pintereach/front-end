import React, { useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { ArticlesContext } from "../contexts/ArticlesContext";

const ArticlesFromCat = props => {
	const userId = window.localStorage.getItem("id");

	const { state, dispatch, fetchArtFromCat } = useContext(ArticlesContext);

    const catId = props.match.params.id;
   

	useEffect(() => {
		
		fetchArtFromCat();
	}, []);
   
    const filtered = state.userArticles.filter(item => {
        
        return catId == item.category_id
    });
    console.log("filtered", filtered)
	return (
		<div>
			{filtered.map(article => {
				console.log("from articles", article);
				return (
					<div key={article.title}>
						<p>{article.title}</p>
					</div>
				);
			})}
		</div>
	);
};

export default ArticlesFromCat;
