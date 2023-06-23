'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const UpdatePrompt = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	useEffect(() => {
		const getOldData = async () => {
			const res = await fetch(`/api/prompt/${promptId}`);

			const oldData = await res.json();

			setPost({ prompt: oldData.prompt, tag: oldData.tag });
		};
		if (promptId) {
			getOldData();
		}
	}, []);

	const editPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) {
			return alert('Prompt ID not found');
		}

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});
			if (res.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
		setSubmitting(false);
	};
	return (
		<div>
			<Form
				type='Edit'
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={editPrompt}
			/>
		</div>
	);
};

export default UpdatePrompt;
