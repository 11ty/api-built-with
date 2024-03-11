<p align="center"><img src="https://www.11ty.dev/img/logo-github.svg" width="200" height="200" alt="11ty Logo"></p>

# api-built-with

A runtime service to return metadata about any given web site URL.

Types of metadata currently supported:

* Hosting provider, with support for:
	* Cloudflare
	* Vercel
	* GitHub Pages
	* Netlify

## Usage

URLs have the formats:

```
/json/:url/
/image/host/:url/
```

* `url` must be URI encoded.

## Examples

* Eleventy Base Blog is hosted by: <img src="https://v1.generator.11ty.dev/image/https%3A%2F%2F11ty.github.io%2Feleventy-base-blog%2F/" width="30" height="30" alt="11ty Base Blog">
* vercel.com is built with: <img src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fvercel.com%2Fen-us%2F/" width="30" height="30" alt="Vercel">
* netlify.com is hosted by: <img src="https://v1.generator.11ty.dev/image/host/https%3A%2F%2Fwww.netlify.com/" width="30" height="30" alt="Eleventy">
