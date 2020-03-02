import React, { useEffect, useState } from "react";
import axios from "axios";

const Articles = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axios
			.get(
				"http://newsapi.org/v2/top-headlines?country=us&apiKey=a53c52ba003545dda97ada94feece5a7"
			)
			.then(res => {
				console.log(res.data.articles);
				setArticles(res.data.articles);
			})
			.catch(err => {
				console.log("err fetching api data", err);
			});
	}, []);

	// source: {id: null, name: "Nytimes.com"}
	// author: "Nick Corasaniti, Alexander Burns"
	// title: "Amy Klobuchar Drops Out of Presidential Race and Plans to Endorse Biden - The New York Times"
	// description: "Ms. Klobuchar made her decision hours before Super Tuesday. She shocked the primary field with a third-place finish in New Hampshire, but ultimately could not compete with better-funded rivals."
	// url: "https://www.nytimes.com/2020/03/02/us/politics/amy-klobuchar-drops-out.html"
	// urlToImage: "https://static01.nyt.com/images/2020/03/02/us/politics/02klobuchar-out1/02klobuchar-out1-facebookJumbo.jpg"
	// publishedAt: "2020-03-02T18:31:00Z"
	// content: "The senator from Minnesota shocked her rival

	return (
        <section>
            <h2>Top Articles</h2>
			<div className="articles-container">
				{articles.map(article => {
					return (
						<div className="article-cards" key={article.publishedAt}>
							<img src={article.urlToImage} />
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <p>{article.author}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Articles;


