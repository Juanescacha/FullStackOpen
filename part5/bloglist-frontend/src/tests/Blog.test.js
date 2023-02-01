import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../components/Blog"

describe("<Blog />", () => {
	const blog = {
		title: "titulo",
		author: "Autor",
		url: "http://url.com",
		likes: "10",
		user: {
			id: "1234",
		},
	}
	const user = {
		id: "1234",
	}

	let container
	let onClick = jest.fn()

	beforeEach(() => {
		container = render(
			<Blog blog={blog} updateLike={onClick} user={user} />
		).container
	})

	test("al inicio el componente hijo no se muestra", () => {
		const div = container.querySelector(".hidden")
		expect(div).toHaveStyle("display: none")
	})

	test("despues de dar click, los componentes hijos se muestran", async () => {
		const usuario = userEvent.setup()
		const boton = screen.getByText("view")
		await usuario.click(boton)

		const div = container.querySelector(".hidden")
		expect(div).not.toHaveStyle("display: none")
	})

	test("despues de dar dos clicksboton de like, el controlador del evento se llama 2 veces", async () => {
		const usuario = userEvent.setup()
		const botonLike = screen.getByText("like")
		await usuario.click(botonLike)
		await usuario.click(botonLike)
		expect(onClick).toHaveBeenCalledTimes(2)
	})
})
