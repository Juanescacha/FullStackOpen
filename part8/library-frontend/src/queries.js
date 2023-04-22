import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author {
				name
			}
			published
		}
	}
`

export const ADD_BOOK = gql`
	mutation addBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation EditAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			born
			name
		}
	}
`

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
