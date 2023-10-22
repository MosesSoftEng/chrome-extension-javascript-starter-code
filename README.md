# Wide GPT


# Dynamic Content script injection.

#

```
{
	"manifest_version": 3,
	"name": "Wide GPT",
	"version": "1.0.0",
	"description": "Make ChatGPT conversation occupy full width in large screens.",
	"icons": {
		"128": "images/icon128.png",
		"48": "images/icon48.png",
		"16": "images/icon16.png"
	},
	"permissions": ["activeTab", "storage"],
	"host_permissions": ["<all_urls>"],
	"action": {
		"default_popup": "popup/popup.html",
		"width": 400,
		"height": 300,
	},
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["<all_urls>"],
			"js": ["./scripts/content.js"],
			"css": ["scripts/content.css"],
			"runAt": "document_end"
		}
	]
}
```

# References.
1. [Inject scripts into the active tab](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-focus-mode/)
2. 