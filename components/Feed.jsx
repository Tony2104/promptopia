"use client";

import { useState, useEffect } from "react";
import { PromptCart } from "@components";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCart
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

function Feed() {
	const [searchText, setsearchText] = useState(() => "");
	const [post, setPost] = useState(() => []);

	const handleSearchChange = (e) => {
		setsearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();

			setPost(data);
		};
		fetchPost();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username!"
					value={searchText}
					onChange={handleSearchChange}
					className="search_input peer"
					required
				/>
			</form>

			<PromptCardList data={post} handleTagClick={() => {}} />
		</section>
	);
}

export default Feed;
