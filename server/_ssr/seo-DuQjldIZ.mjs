//#region node_modules/.nitro/vite/services/ssr/assets/seo-DuQjldIZ.js
function buildSeoMeta(stored, defaults) {
	const title = stored?.title || defaults.title;
	const description = stored?.description || defaults.description;
	const ogImage = stored?.ogImage || defaults.ogImage;
	return [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		...ogImage ? [{
			property: "og:image",
			content: ogImage
		}, {
			name: "twitter:image",
			content: ogImage
		}] : [],
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		}
	];
}
//#endregion
export { buildSeoMeta as t };
