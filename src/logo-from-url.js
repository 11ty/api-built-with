const EleventyImage = require("@11ty/eleventy-img");

class LogoFromUrl {
	static urls = {
		netlify: "http://www.netlify.com/",
		vercel: "http://vercel.com/",
		cloudflare: "http://www.cloudflare.com/",
		github: "https://github.com/",
		gitlab: "https://gitlab.com/",
		gatsby: "https://www.gatsbyjs.com/",
		flyio: "https://fly.io/",
		amazon: "https://www.amazon.com/",
		neocities: "https://neocities.org/",
		codeberg: "https://codeberg.org/",
		nekoweb: "https://nekoweb.org/"
	};

	static getLogoImageUrl(key) {
		key = key?.toLowerCase();

		let url = this.urls[key];

		if(url) {
			return `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(url)}/`;
		} else {
			// found a host but was not supported
			if(key) {
				// notably this is different than no host found (error state is a transparent image)
				return "./x.svg";
			}

			throw new Error("No indieweb avatar known for key: " + key);
		}
	}

	static async getImage(key, width) {
		let imageUrl = this.getLogoImageUrl(key);

		let stats = await EleventyImage(imageUrl, {
			widths: [width],
			formats: ["auto"],
			dryRun: true,
		});

		let format = Object.keys(stats).pop();
		let stat = stats[format][0];

		return {
			format: format,
			contentType: stat.sourceType,
			body: stat.buffer.toString("base64"),
		}
	}
}

module.exports = LogoFromUrl;
