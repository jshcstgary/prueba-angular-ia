import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.spec.ts"],
		poolOptions: {
			threads: {
				singleThread: true,
				isolate: false
			}
		},
		testTimeout: 30000,
		hookTimeout: 30000
	}
});
