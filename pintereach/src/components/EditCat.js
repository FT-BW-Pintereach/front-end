import React, { useState } from "react";

export const EditCat = props => {
    
	const [cat, setCat] = useState(props.name);

	const handleChanges = e => {
		setCat({
			...cat,
			[e.target.name]: e.target.value
		});
	};
	return (
		<form>
			<input
				id="name"
				// placeholder="Finance News"
				name="name"
				type="string"
				value={cat}
				onChange={handleChanges}
				required
            />
            <button type="submit">Save</button>
		</form>
	);
};
