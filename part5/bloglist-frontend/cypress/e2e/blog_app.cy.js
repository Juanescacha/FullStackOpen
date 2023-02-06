describe("blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset")

		const user = {
			username: "AlmamarcelaGozo",
			name: "Maria Marcela",
			password: "julian2010",
		}

		const user2 = {
			username: "AlejandraGozo",
			name: "Alejandro",
			password: "julian2010",
		}

		cy.request("POST", "http://localhost:3003/api/users", user)
		cy.request("POST", "http://localhost:3003/api/users", user2)

		cy.visit("http://localhost:3000")
	})

	it("login form is shown", function () {
		cy.contains("login")
	})

	describe("login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#login").click()
			cy.get("#username").type("AlmamarcelaGozo")
			cy.get("#password").type("julian2010")
			cy.get("#login-button").click()
			cy.get(".success").contains("Successfully logged in")
		})

		it("fails with wrong credentials", function () {
			cy.get("#login").click()
			cy.get("#username").type("AlmamarcelaGozo")
			cy.get("#password").type("wrongPassword")
			cy.get("#login-button").click()

			cy.get(".error")
				.should("contain", "Wrong Credentials")
				.and("have.css", "color", "rgb(255, 0, 0)")
				.and("have.css", "border-style", "solid")

			cy.get("html").should("not.contain", "Maria Marcela logged in")
		})
	})

	describe("when logged in", () => {
		beforeEach(() => {
			cy.login({ username: "AlmamarcelaGozo", password: "julian2010" })
		})

		it("A blog can be created", () => {
			cy.get("#create").contains("Create new blog").click()
			cy.get("#title").type("A new blog created by cypress")
			cy.get("#author").type("Cypress")
			cy.get("#url").type("https://www.cypress.com")
			cy.get("#create-button").click()
			cy.get(".success").contains("Successfully created blog")
			cy.contains("A new blog created by cypress")
		})

		it("A blog can be liked", () => {
			cy.createBlog({
				title: "A second blog created by cypress",
				author: "Cypress",
				url: "https://www.cypress.com",
			})

			cy.contains("A second blog created by cypress")
				.contains("view")
				.click()
			cy.contains("like").click()
		})

		it("A blog can be deleted", () => {
			cy.createBlog({
				title: "A third blog created by cypress",
				author: "Cypress",
				url: "https://www.cypress.com",
			})

			cy.contains("A third blog created by cypress")
				.contains("view")
				.click()
			cy.contains("remove").click()
		})

		it("A blog cant be deleted only but his owner", () => {
			cy.createBlog({
				title: "A fourth blog created by cypress",
				author: "Cypress",
				url: "https://www.cypress.com",
			})

			cy.contains("logout").click()

			cy.login({ username: "AlejandraGozo", password: "julian2010" })

			cy.contains("A fourth blog created by cypress")
				.contains("view")
				.click()

			cy.contains("remove").should("not.exist")
		})

		it.only("Blogs are ordered by likes", () => {
			cy.createBlog({
				title: "The title with most likes",
				author: "Cypress",
				url: "https://www.cypress.com",
			})

			cy.createBlog({
				title: "The title with the second most likes",
				author: "Cypress",
				url: "https://www.cypress.com",
			})

			cy.contains("The title with most likes").contains("view").click()
			cy.get("button").contains("like").click()

			cy.get(".blog").eq(0).should("contain", "The title with most likes")
			cy.get(".blog")
				.eq(1)
				.should("contain", "The title with the second most likes")
		})
	})
})
