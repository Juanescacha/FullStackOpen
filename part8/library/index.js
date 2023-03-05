const { ApolloServer, AuthenticationError } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const jwt = require("jsonwebtoken")
// Connect to MongoDB

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

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

const typeDefs = `
type User {
	username: String!
	favoriteGenre: String!
	id: ID!
}

type Token {
	value: String!
}

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
	me: User
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

	createUser(
		username: String!
		favoriteGenre: String!
	): User

	login(
		username: String!
		password: String!
	): Token
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
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Author: {
		bookCount: root => {
			const books = Book.find({})
			const authorBooks = books.filter(b => b.author === root.name)
			return authorBooks.length
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}

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
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}

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
		createUser: async (root, args) => {
			const user = new User({ username: args.username })
			try {
				return await user.save()
			} catch (error) {
				throw new GraphQLError("Error saving user", {
					code: "BAD_USER_INPUT",
					invalidArgs: args.name,
					error,
				})
			}
		},
		login: async (root, args) => {
			const User = await User.findOne({ username: args.username })

			if (!User || args.password !== "secret") {
				throw new GraphQLError("Wrong credentials", {
					code: "BAD_USER_INPUT",
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null

		if (auth && auth.startsWith("bearer ")) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
