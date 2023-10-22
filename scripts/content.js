console.log("content.js");

// function makeChatGptConversationFullWidth(isActive) {

// }

// function handlePluginActivation(isActive) {
// 	makeChatGptConversationFullWidth(isActive);
// }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	if (request.type === "pluginActive") {
// 		// handlePluginActivation(request.isActive);

// 		console.log("pluginActive: ", request.isActive);
// 	}

// 	sendResponse({ Response: "success" });
// });

// handlePluginActivation(localStorage.getItem("plugin-active") === "true");

// chrome.storage.local.get(["key"]).then((result) => {
// 	console.log("Value currently is " + result.key);
// });

// 	(async function () {
// 		console.log("+");

// 		chrome.scripting.executeScript({
// 			target: { tabId: tab.id },
// 			files: ["content.css"],
// 		});
// 	})();


// TODO Get active tab from background.js
// TODO Inject script
