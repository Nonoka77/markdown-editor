const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(_dirname, "dist"),
		filename: "index.js",
		publicPath: "dist/",
	},
};
