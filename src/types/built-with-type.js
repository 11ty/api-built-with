const Url = require("../url.js");

class BuiltWith {
	constructor(url) {
		if(typeof url === "string") {
			this.url = new Url(url);
		} else if(url instanceof Url) {
			this.url = url;
		} else {
			throw new Error("Invalid constructor argument to BuiltWith.");
		}
  }

	async fetch() {
		return this.url.fetch();
	}
}

module.exports = BuiltWith;