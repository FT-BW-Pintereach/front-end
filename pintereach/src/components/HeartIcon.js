import React, { useState } from "react";
import { FaHeart, FaFire } from "react-icons/fa";


export const HeartIcon = () => {
    
    const [heart, setHeart] = useState(false);

    const toggleFav = () => setHeart(!heart);
    
	return (
		<FaFire
			className={heart ? "heart-red" : "heart-icon"}
			onClick={toggleFav}
		/>
	);
};
