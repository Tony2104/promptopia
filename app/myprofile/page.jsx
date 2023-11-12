"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Profile } from "@components";

function MyProfile() {
	const router = useRouter();
	const { data: session } = useSession();
	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setMyPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		// console.log(post, "ola");
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const HasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);
		if (HasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

				const filteredPosts = myPosts.filter((item) => item._id !== post._id);

				setMyPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page"
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}

export default MyProfile;
