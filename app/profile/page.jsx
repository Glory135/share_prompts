'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const ProfilePage = () => {
	const { data: session } = useSession();
	const [myPosts, setMyPosts] = useState([]);

	const router = useRouter();

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			'Are you sure you want to delete this prompt?'
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				const filteredPosts = myPosts.filter((p) => p._id !== post._id);

				setMyPosts(filteredPosts)
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const fetchPost = async () => {
			const res = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await res.json();
			console.log(data);
			setMyPosts(data);
		};
		if (session?.user.id) {
			fetchPost();
		}
	}, []);

	return (
		<Profile
			name='My'
			desc='Welcome To Your Personalized Profile Page'
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;
