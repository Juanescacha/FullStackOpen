import { Page } from "@playwright/test"

const baseUrl = "http://localhost:3000"

export const resetDatabase = async () => {
  const response = await fetch(`${baseUrl}/api/testing/reset`, {
    method: "DELETE",
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to reset database: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }
}

export const createUser = async (
  username: string,
  name: string,
  password: string,
) => {
  const response = await fetch(`${baseUrl}/api/testing/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, name, password }),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to create user: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }
  return response.json()
}

export const loginUser = async (
  page: Page,
  username: string,
  password: string,
) => {
  await page.goto("/login")
  await page.getByLabel("Username", { exact: true }).fill(username)
  await page.getByLabel("Password", { exact: true }).fill(password)
  await page.getByRole("button", { name: "Login" }).click()
  // Wait for navigation or notification
  await page.waitForURL("/")
}

export const createBlog = async (
  page: Page,
  title: string,
  author: string,
  url: string,
) => {
  await page.goto("/blogs/new")
  await page.getByLabel("Title", { exact: true }).fill(title)
  await page.getByLabel("Author", { exact: true }).fill(author)
  await page.getByLabel("URL", { exact: true }).fill(url)
  await page.getByRole("button", { name: "Create" }).click()
  // Wait for navigation to blogs page
  await page.waitForURL("/blogs")
}
