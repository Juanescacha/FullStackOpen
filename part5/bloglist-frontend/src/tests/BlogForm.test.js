import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "../components/BlogForm"

describe("<BlogForm />", () => {
	test("test para nuevo BlogForm", () => {
		const addBlog = jest.fn()

		const component = render(<BlogForm createBlog={addBlog} />)

		const titulo = component.container.querySelector("#title")
		const autor = component.container.querySelector("#author")
		const url = component.container.querySelector("#url")

		const form = component.container.querySelector("form")

		fireEvent.change(titulo, {
			target: { value: "testiando blogForm" },
		})

		fireEvent.change(autor, {
			target: { value: "Juanescacha" },
		})

		fireEvent.change(url, {
			target: { value: "www.test.com" },
		})

		fireEvent.submit(form)

		expect(addBlog.mock.calls).toHaveLength(1)
		expect(addBlog.mock.calls[0][0].title).toBe("testiando blogForm")
		expect(addBlog.mock.calls[0][0].author).toBe("Juanescacha")
		expect(addBlog.mock.calls[0][0].url).toBe("www.test.com")
	})
})
