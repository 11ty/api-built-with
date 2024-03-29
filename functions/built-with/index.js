const { builder } = require("@netlify/functions");

const { Url, Host, LogoFromUrl } = require("../../built-with.js");

const DEFAULT_IMAGE_DIMENSIONS = [60, 60];

const ONE_WEEK = 60*60*24*7;

async function handler(event, context) {
	// e.g. /https%3A%2F%2Fwww.11ty.dev%2F/json/
	// e.g. /https%3A%2F%2Fwww.11ty.dev%2F/image/host/
	let [url, format, subtype] = event.path.split("/").filter(entry => !!entry);

	url = decodeURIComponent(url);

	try {
		// output to Function logs
		console.log("Fetching", url);

		let u = new Url(url);
		let host = new Host(u);
		let hostKey = await host.getProvider();

		if(format === "image") {
			let image;
			if(subtype === "host") {
				image = await LogoFromUrl.getImage(hostKey, DEFAULT_IMAGE_DIMENSIONS[0]);
			} else {
				throw new Error("Invalid subtype");
			}

			return {
				statusCode: 200,
				ttl: ONE_WEEK,
				headers: {
					"content-type": image.contentType,
					"x-host": hostKey,
				},
				body: image.body,
				isBase64Encoded: true
			};
		}

		return {
			statusCode: 200,
			ttl: ONE_WEEK,
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ host: hostKey }, null, 2)
		};
	} catch (error) {
		console.log("Error", error);

		if(format === "image") {
			return {
				// We need to return 200 here or Firefox won’t display the image
				statusCode: 200,
				ttl: ONE_WEEK,
				headers: {
					"content-type": "image/svg+xml",
					"x-error-message": error.message
				},
				// empty svg
				body: `<svg xmlns="http://www.w3.org/2000/svg" width="${DEFAULT_IMAGE_DIMENSIONS[0]}" height="${DEFAULT_IMAGE_DIMENSIONS[1]}"/>`,
				isBase64Encoded: false,
			};
		}

		return {
			statusCode: 500,
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ error: error.message }),
		};
	}
}

exports.handler = builder(handler);
