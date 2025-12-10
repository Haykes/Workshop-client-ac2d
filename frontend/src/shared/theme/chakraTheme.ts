import {
	createSystem,
	defineConfig,
	defineSemanticTokens,
	defaultConfig,
} from "@chakra-ui/react";

const semanticTokens = defineSemanticTokens({
	colors: {
		primary: {
			DEFAULT: { value: "var(--color-primary)" },
			fg: { value: "colors.white" },
		},
		accent: {
			DEFAULT: { value: "var(--color-accent)" },
			fg: { value: "colors.white" },
		},
		muted: { value: "var(--color-muted)" },
	},
});

const config = defineConfig({
	theme: {
		tokens: {
			colors: {},
			radii: {
				xl: { value: "1rem" },
			},
		},
		semanticTokens,
	},
});

export const appSystem = createSystem(defaultConfig, config);
