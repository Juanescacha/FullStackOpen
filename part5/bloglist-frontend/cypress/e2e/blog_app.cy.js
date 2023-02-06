describe("blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset")
		cy.visit("http://localhost:3000")
	})

	it("login form is shown", function () {
		cy.contains("login")
	})
})
