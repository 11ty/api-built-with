const BuiltWith = require("./built-with-type.js");

class Host extends BuiltWith {
	static tests = {
		netlify: (headers) => {
			return headers.get("server")?.includes("Netlify") || headers.get("cache-status")?.includes("Netlify");
		},
		vercel: (headers) => {
			return headers.get("server")?.includes("Vercel") || headers.get("x-vercel-cache");
		},
		cloudflare: (headers) => {
			return headers.get("server")?.includes("cloudflare") || headers.get("cf-ray");
		},
		github: (headers) => {
			return headers.get("server")?.includes("GitHub.com") || headers.get("x-github-request-id");
		},
		gitlab: () => {
			// I couldn’t find any unique headers for this
			return false;
		}
	};

	async getProvider() {
		let { headers } = await this.fetch();

		for(let key in Host.tests) {
			let test = Host.tests[key];
			if(test(headers)) {
				return key;
			}
		}

		return false;
	}
}

module.exports = Host;
