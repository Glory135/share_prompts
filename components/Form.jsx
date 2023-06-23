import Link from 'next/link';
import React from 'react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left'>
				{' '}
				<span className='blue-gradient'>{type} Post</span>
			</h1>
			<p className='desc text-left max-w-md'>
				{type} and share amazing prompts with the world and let your
				imagination fly with any AI powered platform
			</p>

			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
				<label>
					<span className='font-satoshi font-semibold text-base text-grey-700'>
						Your AI Prompt
					</span>
					<textarea
						value={post.prompt}
						onChange={(e) =>
							setPost((prev) => ({
								...prev,
								prompt: e.target.value,
							}))
						}
						placeholder='Write Your Prompt Here'
						required
						className='form_textarea'
					/>
				</label>

				<label>
					<span className='font-satoshi font-semibold text-base text-grey-700'>
						Tag{' '}
						<span className='font-normal'>
							£product, £webdevelopment, £idea
						</span>
					</span>
					<input
						type='text'
						value={post.tag}
						onChange={(e) =>
							setPost((prev) => ({
								...prev,
								tag: e.target.value,
							}))
						}
						placeholder='£tag'
						className='form_input'
					/>
				</label>

				<div className='flex-end mx-3 mb-5 gap-3'>
					<Link href='/' className='text-grey-500 text-sm'>
						Cancel
					</Link>

					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text--sm bg-primary-orange rounded-full text-white'>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;