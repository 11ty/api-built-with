const fetch = require("node-fetch");

class Url {
	constructor(url) {
		this.url = url;

		if(!Url.isFullUrl(url)) {
			throw new Error(`Invalid \`url\`: ${url}`);
		}
	}

	static isFullUrl(url) {
		try {
			new URL(url);
			return true;
		} catch(e) {
			// invalid url OR local path
			return false;
		}
	}

	/* async */
	fetch() {
		if(!this._fetchPromise) {
			this._fetchPromise = fetch(this.url);
		}

		return this._fetchPromise;
	}
}

module.exports = Url;