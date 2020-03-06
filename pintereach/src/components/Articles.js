import React, { useEffect, useContext } from "react";
import axios from "axios";
import { CategoryButton } from "./CategoryButton";
import {ArticlesContext} from '../contexts/ArticlesContext'

import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardFooter
} from "reactstrap";

const Articles = () => {

	const { state, dispatch} = useContext(ArticlesContext);
	


	useEffect(() => {
		axios
			.get(
				"https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&from=2020-03-03&to=2020-03-03&sortBy=popularity&apiKey=a53c52ba003545dda97ada94feece5a7"
			)
			.then(res => {
				console.log(res.data.articles);
				dispatch({ type: "FETCH_ARTICLES", payload: res.data.articles });
			})
			.catch(err => {
				console.log("err fetching api data", err);
			});
	}, []);

	return (
        <section >
			<h2>Top Articles</h2>
			<hr className="underline"/>
			<div className="articles-container">
				{state.articles.map(article => {
					return (
						<Card className="article-cards" key={article.url}>
							<a href={article.url} target="_blank">
								<CardImg src={article.urlToImage} />
							</a>
							<CardBody className="card-text">
								<CardTitle>
									<h3>{article.title}</h3>
								</CardTitle>
								<CardText>
									<p>{article.description}</p>
								</CardText>
								<CardFooter>
									<p>{article.author}</p>
									<CategoryButton article={article}/>
								</CardFooter>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</section>
	);
};

export default Articles;

	// source: {id: null, name: "Nytimes.com"}
	// author: "Nick Corasaniti, Alexander Burns"
	// title: "Amy Klobuchar Drops Out of Presidential Race and Plans to Endorse Biden - The New York Times"
	// description: "Ms. Klobuchar made her decision hours before Super Tuesday. She shocked the primary field with a third-place finish in New Hampshire, but ultimately could not compete with better-funded rivals."
	// url: "https://www.nytimes.com/2020/03/02/us/politics/amy-klobuchar-drops-out.html"
	// urlToImage: "https://static01.nyt.com/images/2020/03/02/us/politics/02klobuchar-out1/02klobuchar-out1-facebookJumbo.jpg"
	// publishedAt: "2020-03-02T18:31:00Z"
	// content: "The senator from Minnesota shocked her rival
