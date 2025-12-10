import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{ts,tsx}",
		"./src/interfaces/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
		"./src/app/**/*.{ts,tsx}",
		"./index.html",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "var(--color-primary)",
					50: "var(--color-primary-50)",
					100: "var(--color-primary-100)",
					200: "var(--color-primary-200)",
					300: "var(--color-primary-300)",
					400: "var(--color-primary-400)",
					500: "var(--color-primary-500)",
					600: "var(--color-primary-600)",
					700: "var(--color-primary-700)",
					800: "var(--color-primary-800)",
					900: "var(--color-primary-900)",
				},
				accent: {
					DEFAULT: "var(--color-accent)",
				},
				muted: {
					DEFAULT: "var(--color-muted)",
				},
			},
			borderRadius: {
				xl: "1rem",
			},
		},
	},
	plugins: [],
};

export default config;


