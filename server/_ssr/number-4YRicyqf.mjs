//#region node_modules/.nitro/vite/services/ssr/assets/number-4YRicyqf.js
var UNITS = [
	{
		value: 1e9,
		suffix: "b"
	},
	{
		value: 1e6,
		suffix: "m"
	},
	{
		value: 1e3,
		suffix: "k"
	}
];
function toCompactNumber(value) {
	const unit = UNITS.find((u) => Math.abs(value) >= u.value);
	if (!unit) return value.toString();
	const result = value / unit.value;
	return `${parseFloat(result.toFixed(3))}${unit.suffix}`;
}
//#endregion
export { toCompactNumber as t };
