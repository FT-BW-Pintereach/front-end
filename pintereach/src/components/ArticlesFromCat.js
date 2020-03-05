import React, { useEffect, useContext } from "react";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { Card, CardImg, CardBody, CardTitle, CardFooter } from "reactstrap";

const ArticlesFromCat = props => {
	
	const { state, fetchArtFromCat } = useContext(ArticlesContext);

    const catId = props.match.params.id;
   

	useEffect(() => {
		
		fetchArtFromCat();
	}, []);
   
    const filtered = state.userArticles.filter(item => {
        
        return catId == item.category_id
    });
    
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
							</CardFooter>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

// title: "Mnuchin to work with Congress on funding package for coronavirus"
// url: "https://www.wsj.com/articles/g7-finance-ministers-central-bankers-stand-ready-to-cooperate-further-to-address-coronavirus-11583240339"
// urlToImage: "http://s.marketwatch.com/public/resources/MWimages/MW-GK371_mnuchi_ZG_20180605201729.jpg"
// user_id: 1
// author: "Kate Davidson"

export default ArticlesFromCat;
