const BuiltWith = require("./built-with-type.js");

class Host extends BuiltWith {
	static tests = {
		gatsby: (headers) => {
			return headers.get("server")?.includes("GatsbyHosting");
		},
		flyio: (headers) => {
			return headers.get("server")?.startsWith("Fly/");
		},
		amazon: (headers) => {
			// AmazonS3
			return headers.get("server")?.includes("Amazon") || headers.get("X-Cache")?.includes("cloudfront");
		},
		gitlab: () => {
			// I couldn’t find any unique headers for this
			return false;
		},
		github: (headers) => {
			return headers.get("server")?.includes("GitHub.com") || headers.get("x-github-request-id");
		},
		cloudflare: (headers) => {
			return headers.get("server")?.includes("cloudflare") || headers.get("cf-ray");
		},
		netlify: (headers) => {
			return headers.get("server")?.includes("Netlify") || headers.get("cache-status")?.includes("Netlify");
		},
		vercel: (headers) => {
			return headers.get("server")?.includes("Vercel") || headers.get("x-vercel-cache");
		},
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
