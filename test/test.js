const test = require("ava");
const { Host, LogoFromUrl } = require("../built-with.js");

test("Get provider from 11ty.dev", async t => {
	let g = new Host("https://www.11ty.dev/");
	let provider = await g.getProvider();
	t.is(provider, "netlify");
});

test("Get image from 11ty.dev", async t => {
	let g = new Host("https://www.11ty.dev/");
	let provider = await g.getProvider();
	let image = await LogoFromUrl.getImage(provider, 30);
	t.is(image.format, "png");
	t.truthy(image.body);
});


// This didn’t exit correctly (though it passed)
test.skip("Get provider from cloudflare.com", async t => {
	let g = new Host("https://www.cloudflare.com/");
	let provider = await g.getProvider();
	t.is(provider, "cloudflare");
});

test("Get provider from vercel.com", async t => {
	let g = new Host("https://vercel.com/");
	let provider = await g.getProvider();
	t.is(provider, "vercel");
});

test("Get provider from netlify.com", async t => {
	let g = new Host("https://www.netlify.com/");
	let provider = await g.getProvider();
	t.is(provider, "netlify");
});

test("Get provider from 11ty.github.io/eleventy-base-blog/", async t => {
	let g = new Host("https://11ty.github.io/eleventy-base-blog/");
	let provider = await g.getProvider();
	t.is(provider, "github");
});

