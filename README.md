<p align="center"><img src="https://www.11ty.dev/img/logo-github.svg" width="200" height="200" alt="11ty Logo"></p>

# api-built-with

A runtime service to return metadata about any given web site URL.

Types of metadata currently supported:

* Hosting provider, with support for:
	* Cloudflare
	* Vercel
	* GitHub Pages
	* Netlify
	* Gatsby
	* Fly.io
	* Amazon (S3, Cloudfront)

## Usage

URLs have the formats:

```
/:url/json/
/:url/image/host/
```

* `url` must be URI encoded (via `encodeURIComponent`).

## Examples

* Eleventy Base Blog is hosted by: <a href="https://v1.builtwith.11ty.dev/https%3A%2F%2F11ty.github.io%2Feleventy-base-blog%2F/image/host/"><img src="https://v1.builtwith.11ty.dev/https%3A%2F%2F11ty.github.io%2Feleventy-base-blog%2F/image/host/" width="30" height="30" alt="Eleventy Base Blog"></a>
* vercel.com is hosted by: <a href="https://v1.builtwith.11ty.dev/https%3A%2F%2Fvercel.com%2Fen-us%2F/image/host/"><img src="https://v1.builtwith.11ty.dev/https%3A%2F%2Fvercel.com%2Fen-us%2F/image/host/" width="30" height="30" alt="Vercel"></a>
* netlify.com is hosted by: <a href="https://v1.builtwith.11ty.dev/https%3A%2F%2Fwww.netlify.com/image/host/"><img src="https://v1.builtwith.11ty.dev/https%3A%2F%2Fwww.netlify.com/image/host/" width="30" height="30" alt="Netlify"></a>
