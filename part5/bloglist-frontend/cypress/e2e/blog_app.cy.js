describe("blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset")

		const user = {
			username: "AlmamarcelaGozo",
			name: "Maria Marcela",
			password: "alvaro2010",
		}

		cy.request("POST", "http://localhost:3003/api/users", user)

		cy.visit("http://localhost:3000")
	})

	it("login form is shown", function () {
		cy.contains("login")
	})

	describe("login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#login").click()
			cy.get("#username").type("AlmamarcelaGozo")
			cy.get("#password").type("alvaro2010")
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
})
