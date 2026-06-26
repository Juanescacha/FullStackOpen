export default function Blog() {
	const blogs = [
		{ id: 1, title: "Blog 1", author: "Sergio Ramos", url: "#", likes: 10 },
		{ id: 2, title: "Blog 2", author: "Julius Caesar", url: "#", likes: 20 },
		{ id: 3, title: "Blog 3", author: "Jimmy Neutron", url: "#", likes: 30 },
		{ id: 4, title: "Blog 4", author: "Albert Einstein", url: "#", likes: 10 },
	]

	return (
		<div className="flex flex-col gap-2 p-4">
			{blogs.map(({ id, title, author, url, likes }) => (
				<div key={id} className="flex flex-col">
					<span className="font-bold">{title}</span>
					<span className="text-sm">{author}</span>
				</div>
			))}
		</div>
	)
}
