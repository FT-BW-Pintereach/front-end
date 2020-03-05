import React, { useEffect, useContext } from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { DeleteArticle } from "./DeleteArticle";

import { Card, CardImg, CardBody, CardTitle, CardFooter, Button } from "reactstrap";


const ArticlesFromCat = props => {
	
	const { state, fetchArtFromCat } = useContext(ArticlesContext);

    const catId = props.match.params.id;
   

	useEffect(() => {
		
		fetchArtFromCat();
	}, []);
   
    const filtered = state.userArticles.filter(item => {
        
        return catId == item.category_id
	});
	
	console.log("userARt", state.userArticles);

	return (
		<div className="articles-container">
			{filtered.map(article => {
				console.log("from articles", article);
				return (
					<Card className="article-cards" key={article.url}>
						<a href={article.url} target="_blank">
							<CardImg src={article.urlToImage} />
						</a>
						<CardBody className="card-text">
							<CardTitle>
								<h3>{article.title}</h3>
							</CardTitle>
							<CardFooter>
								<p>{article.author}</p>
								<DeleteArticle catId={catId}/>
							</CardFooter>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default ArticlesFromCat;
