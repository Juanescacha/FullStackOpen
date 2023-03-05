const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

// Connect to MongoDB

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")

require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch(error => {
		console.log("error connecting to MongoDB:", error.message)
	})

// GraphQL

// let notAuthors = [
// 	{
// 		name: "Robert Martin",
// 		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
// 		born: 1952,
// 	},
// 	{
// 		name: "Martin Fowler",
// 		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
// 		born: 1963,
// 	},
// 	{
// 		name: "Fyodor Dostoevsky",
// 		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
// 		born: 1821,
// 	},
// 	{
// 		name: "Joshua Kerievsky", // birth year unknown
// 		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
// 	},
// 	{
// 		name: "Sandi Metz", // birth year unknown
// 		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
// 	},
// ]

// let notBooks = [
// 	{
// 		title: "Clean Code",
// 		published: 2008,
// 		author: "Robert Martin",
// 		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring"],
// 	},
// 	{
// 		title: "Agile software development",
// 		published: 2002,
// 		author: "Robert Martin",
// 		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
// 		genres: ["agile", "patterns", "design"],
// 	},
// 	{
// 		title: "Refactoring, edition 2",
// 		published: 2018,
// 		author: "Martin Fowler",
// 		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring"],
// 	},
// 	{
// 		title: "Refactoring to patterns",
// 		published: 2008,
// 		author: "Joshua Kerievsky",
// 		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring", "patterns"],
// 	},
// 	{
// 		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
// 		published: 2012,
// 		author: "Sandi Metz",
// 		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
// 		genres: ["refactoring", "design"],
// 	},
// 	{
// 		title: "Crime and punishment",
// 		published: 1866,
// 		author: "Fyodor Dostoevsky",
// 		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
// 		genres: ["classic", "crime"],
// 	},
// 	{
// 		title: "The Demon ",
// 		published: 1872,
// 		author: "Fyodor Dostoevsky",
// 		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
// 		genres: ["classic", "revolution"],
// 	},
// ]

const typeDefs = `
type Author {
	name: String!
	id: ID!
	born: Int
	bookCount: Int
}

type Book {
	title: String!
	published: Int!
	author: Author!
	id: ID!
	genres: [String!]!
}

type Query {
	bookCount: Int!
	authorCount: Int!
	allBooks(author: String, genre: String): [Book!]!
	allAuthors: [Author!]!
}

type Mutation {
	addBook(
		title: String!
		author: String!
		published: Int!
		genres: [String!]!
		): Book

	editAuthor(
		name: String!
		setBornTo: Int!
	): Author
}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			const filteredBooks = await Book.find({})
			if (args.author) {
				filteredBooks = filteredBooks.filter(
					b => b.author === args.author
				)
			}
			if (args.genre) {
				filteredBooks = filteredBooks.filter(b =>
					b.genres.includes(args.genre)
				)
			}
			return filteredBooks
		},
		allAuthors: () => Author.find({}),
	},
	Author: {
		bookCount: root => {
			const books = Book.find({})
			const authorBooks = books.filter(b => b.author === root.name)
			return authorBooks.length
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const authorExists = await Author.findOne({ name: args.author })
			if (!authorExists) {
				const author = new Author({ name: args.author })
				try {
					await author.save()
				} catch (error) {
					throw new GraphQLError("Error saving author", {
						code: "BAD_USER_INPUT",
						error,
					})
				}
			}

			const foundAuthor = await Author.findOne({ name: args.author })
			console.log(foundAuthor, "foundAuthor")

			const book = new Book({ ...args, author: foundAuthor })
			try {
				return await book.save()
			} catch (error) {
				throw new GraphQLError("Error saving book", {
					code: "BAD_USER_INPUT",
					error,
				})
			}
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name })
			if (!author) {
				return null
			}

			author.born = args.setBornTo

			try {
				return await author.save()
			} catch (error) {
				throw new GraphQLError("Error saving updated author", {
					code: "BAD_USER_INPUT",
					error,
				})
			}
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
