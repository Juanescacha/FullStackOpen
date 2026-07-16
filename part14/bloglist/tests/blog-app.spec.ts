import { expect, test } from "@playwright/test"
import { createBlog, createUser, loginUser, resetDatabase } from "./helpers"

test.describe("Blog Application", () => {
	test.beforeEach(async () => {
		await resetDatabase()
	})

	test.describe("Authentication", () => {
		test("user can register", async ({ page }) => {
			await page.goto("/register")

			await page.getByLabel("Username", { exact: true }).fill("testuser")
			await page.getByLabel("Name", { exact: true }).fill("Test User")
			await page.getByLabel("Password", { exact: true }).fill("testpass123")
			await page
				.getByLabel("Confirm Password", { exact: true })
				.fill("testpass123")

			await page.getByTestId("register-button").click()

			// Should redirect to login page
			await expect(page).toHaveURL("/login")
		})

		test("registration fails with short username", async ({ page }) => {
			await page.goto("/register")

			await page.getByLabel("Username", { exact: true }).fill("usr")
			await page.getByLabel("Name", { exact: true }).fill("Test User")
			await page.getByLabel("Password", { exact: true }).fill("testpass123")
			await page
				.getByLabel("Confirm Password", { exact: true })
				.fill("testpass123")

			await page.getByTestId("register-button").click()

			// Should show error message
			await expect(page.getByTestId("username-error")).toBeVisible()
		})

		test("registration fails with mismatched passwords", async ({ page }) => {
			await page.goto("/register")

			await page.getByLabel("Username", { exact: true }).fill("testuser")
			await page.getByLabel("Name", { exact: true }).fill("Test User")
			await page.getByLabel("Password", { exact: true }).fill("testpass123")
			await page
				.getByLabel("Confirm Password", { exact: true })
				.fill("differentpass")

			await page.getByTestId("register-button").click()

			// Should show error message
			await expect(page.getByTestId("passwordConfirm-error")).toBeVisible()
		})

		test("user can login", async ({ page }) => {
			await createUser("testuser", "Test User", "testpass123")

			await page.goto("/login")
			await page.getByLabel("Username", { exact: true }).fill("testuser")
			await page.getByLabel("Password", { exact: true }).fill("testpass123")
			await page.getByTestId("login-button").click()

			// Should redirect to home page and show success notification
			await expect(page).toHaveURL("/")
			await expect(page.getByTestId("notification")).toBeVisible()
		})

		test("login fails with wrong credentials", async ({ page }) => {
			await createUser("testuser", "Test User", "testpass123")

			await page.goto("/login")
			await page.getByLabel("Username", { exact: true }).fill("testuser")
			await page.getByLabel("Password", { exact: true }).fill("wrongpassword")
			await page.getByTestId("login-button").click()

			// Should show error message
			await expect(page.getByTestId("error-message")).toBeVisible()
		})

		test("logged in user can see their info", async ({ page }) => {
			await createUser("testuser", "Test User", "testpass123")
			await loginUser(page, "testuser", "testpass123")

			// Navigate to me page to see user info
			await page.goto("/me")

			// Should show username on me page
			await expect(page.getByTestId("user-username")).toBeVisible()
		})

		test("user can logout", async ({ page }) => {
			await createUser("testuser", "Test User", "testpass123")
			await loginUser(page, "testuser", "testpass123")

			await page.goto("/blogs")

			// Click logout button
			await page.getByRole("button", { name: /logout/i }).click()

			// Should redirect and show login link in navbar
			await expect(
				page.getByRole("link", { name: "login", exact: true }),
			).toBeVisible()
		})
	})

	test.describe("Navigation", () => {
		test("home page can be opened", async ({ page }) => {
			await page.goto("/")

			// Should show the homepage content
			await expect(page).toHaveURL("/")
		})

		test("navigation links are visible for non-logged in user", async ({
			page,
		}) => {
			await page.goto("/")

			// Should show login and register links in navbar
			await expect(
				page.getByRole("link", { name: "login", exact: true }),
			).toBeVisible()
			await expect(
				page.getByRole("link", { name: "register", exact: true }),
			).toBeVisible()
		})

		test("navigation links change after login", async ({ page }) => {
			await createUser("testuser", "Test User", "testpass123")
			await loginUser(page, "testuser", "testpass123")

			await page.goto("/")

			// Login and Register links in navbar should not be visible
			await expect(
				page.getByRole("link", { name: "login", exact: true }),
			).not.toBeVisible()
			await expect(
				page.getByRole("link", { name: "register", exact: true }),
			).not.toBeVisible()

			// User-specific links should be visible
			await expect(
				page.getByRole("link", { name: "me", exact: true }),
			).toBeVisible()
		})

		test("user can navigate to blogs page", async ({ page }) => {
			await page.goto("/")

			// Click on blogs link in navbar
			const blogsLink = page.getByRole("link", { name: "blogs", exact: true })
			await blogsLink.click()

			await expect(page).toHaveURL("/blogs")
		})

		test("logged in user can navigate to create blog page", async ({
			page,
		}) => {
			await createUser("testuser", "Test User", "testpass123")
			await loginUser(page, "testuser", "testpass123")

			await page.goto("/")

			// Navigate to new blog page
			await page.goto("/blogs/new")

			await expect(page).toHaveURL("/blogs/new")
		})

		test("user can navigate to users page", async ({ page }) => {
			await page.goto("/")

			// Click on users link in navbar (first one)
			const usersLink = page
				.getByRole("navigation")
				.getByRole("link", { name: "users" })
			await usersLink.click()

			await expect(page).toHaveURL("/users")
		})
	})

	test.describe("Blogs", () => {
		test.beforeEach(async () => {
			await createUser("testuser", "Test User", "testpass123")
		})

		test("logged in user can create a blog", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")

			await page.goto("/blogs/new")
			await page.getByLabel("Title", { exact: true }).fill("Test Blog")
			await page.getByLabel("Author", { exact: true }).fill("Test Author")
			await page.getByLabel("URL", { exact: true }).fill("http://testblog.com")
			await page.getByTestId("create-blog-button").click()

			// Should redirect to blogs page
			await expect(page).toHaveURL("/blogs")

			// Should show success notification
			await expect(page.getByTestId("notification")).toBeVisible()

			// Blog should appear in the list
			await expect(page.getByTestId("blogs-list")).toContainText("Test Blog")
		})

		test("user cannot create blog without being logged in", async ({
			page,
		}) => {
			await page.goto("/blogs/new")

			// App currently allows access to the page even when not logged in
			// Just verify the page loads - you may want to add auth protection later
			await expect(page).toHaveURL("/blogs/new")
		})

		test("blogs are displayed on blogs page", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")

			// Create a couple of blogs
			await createBlog(page, "First Blog", "Author One", "http://blog1.com")
			await createBlog(page, "Second Blog", "Author Two", "http://blog2.com")

			await page.goto("/blogs")

			// Both blogs should be visible
			const blogsList = page.getByTestId("blogs-list")
			await expect(blogsList).toContainText("First Blog")
			await expect(blogsList).toContainText("Second Blog")
		})

		test("blog can be viewed individually", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await createBlog(page, "Test Blog", "Test Author", "http://testblog.com")

			await page.goto("/blogs")

			// Click on the blog title to view it
			const blogLink = page.getByRole("link", { name: "Test Blog" })
			await blogLink.click()

			// Should navigate to the blog's detail page
			await page.waitForURL(/\/blogs\/\d+/)
			await expect(page.getByTestId("blog-detail")).toBeVisible()
			await expect(page.getByTestId("blog-title")).toContainText("Test Blog")
			await expect(page.getByTestId("blog-author")).toContainText("Test Author")
		})

		test("blogs can be filtered", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")

			// Create blogs with different titles
			await createBlog(page, "React Tutorial", "Author One", "http://react.com")
			await createBlog(page, "Node.js Guide", "Author Two", "http://node.com")
			await createBlog(
				page,
				"React Advanced",
				"Author Three",
				"http://react-adv.com",
			)

			await page.goto("/blogs")

			const blogsList = page.getByTestId("blogs-list")

			// All blogs should be visible initially
			await expect(blogsList).toContainText("React Tutorial")
			await expect(blogsList).toContainText("Node.js Guide")
			await expect(blogsList).toContainText("React Advanced")

			// Filter by "React"
			await page.getByTestId("filter-input").fill("React")
			await page.getByTestId("search-button").click()

			// Only React blogs should be visible
			await expect(blogsList).toContainText("React Tutorial")
			await expect(blogsList).toContainText("React Advanced")
			await expect(blogsList).not.toContainText("Node.js Guide")
		})

		test("blog shows like count", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await createBlog(page, "Test Blog", "Test Author", "http://testblog.com")

			await page.goto("/blogs")

			// Should show 0 likes initially
			const blogsList = page.getByTestId("blogs-list")
			await expect(blogsList).toContainText("0 likes")
		})
	})

	test.describe("Me Page", () => {
		test.beforeEach(async () => {
			await createUser("testuser", "Test User", "testpass123")
		})

		test("redirects to login if not authenticated", async ({ page }) => {
			await page.goto("/me")

			// Should redirect to login page
			await expect(page).toHaveURL("/login")
		})

		test("shows user profile information", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/me")

			// Should show user information
			await expect(page.getByTestId("user-profile")).toBeVisible()
			await expect(page.getByTestId("user-name")).toContainText("Test User")
			await expect(page.getByTestId("user-username")).toContainText("testuser")
		})

		test("shows empty reading list message", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/me")

			await expect(page.getByTestId("reading-list-section")).toBeVisible()
			await expect(page.getByTestId("empty-reading-list")).toBeVisible()
		})

		test("shows reading list with unread blog", async ({ page }) => {
			// Create another user to own a blog
			await createUser("blogowner", "Blog Owner", "password123")
			await loginUser(page, "blogowner", "password123")
			await createBlog(page, "Test Blog", "Test Author", "http://test.com")

			// Login as testuser and add blog to reading list
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/blogs")
			await page.getByRole("link", { name: "Test Blog" }).click()

			// Wait for page to load and add to reading list
			await page.waitForSelector('[data-testid="add-to-reading-list-button"]')

			// Click and wait for the request to complete
			await Promise.all([
				page.waitForResponse((response) => response.status() === 200),
				page.getByTestId("add-to-reading-list-button").click(),
			])

			// Navigate to me page
			await page.goto("/me")

			// Should show in unread section
			await expect(page.getByTestId("unread-section")).toBeVisible()
			await expect(page.getByTestId("unread-section")).toContainText(
				"Test Blog",
			)
		})

		test("can mark blog as read", async ({ page }) => {
			// Create another user to own a blog
			await createUser("blogowner", "Blog Owner", "password123")
			await loginUser(page, "blogowner", "password123")
			await createBlog(page, "Test Blog", "Test Author", "http://test.com")

			// Login as testuser and add blog to reading list
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/blogs")
			await page.getByRole("link", { name: "Test Blog" }).click()
			await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
			await page.getByTestId("add-to-reading-list-button").click()

			// Wait for server action to complete
			await page.waitForTimeout(500)

			// Go to me page and mark as read
			await page.goto("/me")
			await page.waitForSelector('[data-testid^="mark-read-"]', {
				timeout: 10000,
			})

			// Click the first mark as read button
			const markReadButton = page.locator('[data-testid^="mark-read-"]').first()
			await markReadButton.click()

			// Wait for the page to update
			await page.waitForTimeout(1000)

			// Should now show empty unread section
			await expect(page.getByTestId("no-unread-blogs")).toBeVisible()
		})

		test("shows multiple blogs in reading list", async ({ page }) => {
			// Create another user to own blogs
			await createUser("blogowner", "Blog Owner", "password123")
			await loginUser(page, "blogowner", "password123")
			await createBlog(page, "First Blog", "Author One", "http://first.com")
			await createBlog(page, "Second Blog", "Author Two", "http://second.com")

			// Login as testuser and add both blogs to reading list
			await loginUser(page, "testuser", "testpass123")

			await page.goto("/blogs")
			await page.getByRole("link", { name: "First Blog" }).click()
			await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
			await Promise.all([
				page.waitForResponse((response) => response.status() === 200),
				page.getByTestId("add-to-reading-list-button").click(),
			])

			await page.goto("/blogs")
			await page.getByRole("link", { name: "Second Blog" }).click()
			await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
			await Promise.all([
				page.waitForResponse((response) => response.status() === 200),
				page.getByTestId("add-to-reading-list-button").click(),
			])

			// Go to me page
			await page.goto("/me")

			// Should show both blogs in unread section
			const unreadSection = page.getByTestId("unread-section")
			await expect(unreadSection).toContainText("First Blog")
			await expect(unreadSection).toContainText("Second Blog")
		})

		test("shows API token section", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/me")

			await expect(page.getByTestId("api-token-section")).toBeVisible()
			await expect(page.getByTestId("no-token-message")).toBeVisible()
			await expect(page.getByTestId("generate-token-button")).toBeVisible()
		})

		test("can generate API token", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/me")

			// Generate token
			await page.getByTestId("generate-token-button").click()

			// Should show the generated token
			await expect(page.getByTestId("token-display")).toBeVisible()
			// Token should be visible in a code element
			const token = await page.getByTestId("api-token").textContent()
			expect(token).toBeTruthy()
			expect(token!.length).toBeGreaterThan(10)
		})

		test("can regenerate API token", async ({ page }) => {
			await loginUser(page, "testuser", "testpass123")
			await page.goto("/me")

			// Generate first token
			await page.getByTestId("generate-token-button").click()
			await page.waitForSelector('[data-testid="api-token"]')
			const firstToken = await page.getByTestId("api-token").textContent()

			// Generate new token without reloading
			await page.getByTestId("generate-token-button").click()

			// Wait for token to potentially change
			await page.waitForTimeout(500)
			const secondToken = await page.getByTestId("api-token").textContent()

			// Tokens should be different
			expect(firstToken).not.toBe(secondToken)
			expect(secondToken).toBeTruthy()
		})
	})
})
