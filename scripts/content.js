console.log("Log from content script");

/*
 * Messaging
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type === "pluginActive") {
		if (request.isActive) {
			console.log("Activate plugin effect");
		} else {
			console.log("Dectivate plugin effect");
		}
	}

	sendResponse({ Response: "success" });
});
