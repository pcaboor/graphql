import { type Config } from "tailwindcss";

export default {
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'var(--font-IBM-sans)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Ubuntu',
					'Helvetica',
				]
			},
		}
	}
} satisfies Config;
