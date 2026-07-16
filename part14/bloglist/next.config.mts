import createMDX from "@next/mdx"
import type { NextConfig } from "next"

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
}

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig)
