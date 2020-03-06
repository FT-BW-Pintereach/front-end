import React, { useEffect, useContext } from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardFooter,
	Button
} from "reactstrap";

const ArticlesFromCat = props => {
	const { state, fetchArtFromCat } = useContext(ArticlesContext);

	const catId = props.match.params.id;

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

	useEffect(() => {
		fetchArtFromCat(catId);
	}, [state]);

	console.log("userARt", state.userArticles);

	return (
		<div className="articles-container">
			{state.userArticles.map(article => {
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
								<Button onClick={() => deleteArticle(article.id)}>delete</Button>
							</CardFooter>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default ArticlesFromCat;
