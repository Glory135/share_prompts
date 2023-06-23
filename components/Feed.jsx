'use client';

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((eachPost, index) => (
				<PromptCard
					key={index}
					post={eachPost}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);
	const handleChange = (e) => {};

	useEffect(() => {
		const fetchPost = async () => {
			const res = await fetch('/api/prompt');
			const data = await res.json();
			console.log(data);
			setPosts(data);
		};
		fetchPost();
	}, []);

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or username'
					value={searchText}
					onChange={handleChange}
					required
					className='search_input'
				/>
			</form>

			<PromptCardList data={posts} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
