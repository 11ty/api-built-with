import { Url, Host, LogoFromUrl } from "../built-with.js";

const DEFAULT_IMAGE_DIMENSIONS = [60, 60];

const ONE_DAY = 60*60*24;
const ONE_WEEK = ONE_DAY*7;

export async function GET(request, context) {
	// // e.g. /https%3A%2F%2Fwww.11ty.dev%2F/json/
	// // e.g. /https%3A%2F%2Fwww.11ty.dev%2F/image/host/
	let requestUrl = new URL(request.url);
	let [url, format, subtype] = requestUrl.pathname.split("/").filter(entry => !!entry);

	if(url?.endsWith("favicon.ico")) {
		return;
	}

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

			return new Response(Buffer.from(image.body, 'base64'), {
				headers: {
					"content-type": image.contentType,
					"x-11ty-host": hostKey,
					"cache-control": `public, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_DAY}`
				}
			});
		}

		return new Response(JSON.stringify({ host: hostKey }, null, 2), {
			headers: {
				"content-type": "application/json",
				"cache-control": `public, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_DAY}`
			}
		});
	} catch (error) {
		console.log("Error", error);

		if(format === "image") {
			// We need to return 200 here or Firefox won’t display the image
			// empty svg
			return new Response(`<svg xmlns="http://www.w3.org/2000/svg" width="${DEFAULT_IMAGE_DIMENSIONS[0]}" height="${DEFAULT_IMAGE_DIMENSIONS[1]}"/>`, {
				headers: {
					"content-type": "image/svg+xml",
					"x-11ty-error-message": error.message,
					"cache-control": `public, s-maxage=${ONE_WEEK}, stale-while-revalidate=${ONE_DAY}`,
				}
			});
		}

		return new Response(JSON.stringify({ error: error.message }, null, 2), {
			status: 500,
			headers: {
				"content-type": "application/json"
			}
		});
	}
}

export const config = {};