/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "media",
	plugins: [require("rippleui")],
	rippleui: {
		removeThemes: ["dark"],
	},
};
