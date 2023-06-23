'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [drop, setDrop] = useState(false);
	useEffect(() => {
		const setupProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setupProviders();
	}, []);
	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					alt='logo'
					width={30}
					height={30}
					className='object-contain'
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>

			{/* Desktop nav */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>
						<button
							type='button'
							onClick={() => signOut()}
							className='outline_btn'>
							Sign Out
						</button>
						<Link href='/profile'>
							<Image
								src={session?.user?.image}
								width={35}
								height={35}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((eachProvider) => {
								return (
									<button
										type='button'
										key={eachProvider.name}
										onClick={() => signIn(eachProvider.id)}
										className='black_btn'>
										Sign In With Google
									</button>
								);
							})}
					</>
				)}
			</div>

			{/* mobile navigation */}
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user?.image}
							width={35}
							height={35}
							className='rounded-full'
							alt='profile'
							onClick={() => setDrop((prev) => !prev)}
						/>

						{drop && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setDrop(false)}>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setDrop(false)}>
									Create Prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										setDrop(false);
										signOut();
									}}
									className='mt-5 w-full black_btn'>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((eachProvider) => {
								return (
									<button
										type='button'
										key={eachProvider.name}
										onClick={() => signIn(eachProvider.id)}
										className='black_btn'>
										Sign In With Google
									</button>
								);
							})}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
