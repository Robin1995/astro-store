declare module "astro:actions" {
	type Actions = typeof import("C:/Users/robinson.rodriguez/projects/Astro/07-store/src/actions/index.ts")["server"];

	export const actions: Actions;
}