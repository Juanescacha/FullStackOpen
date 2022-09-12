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

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
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
})
