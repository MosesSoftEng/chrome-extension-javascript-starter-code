console.log("Log from background script");

/*
 * Global variables.
 */
const URL_CHAT_GPT = "https://chat.openai.com";

function setBadgeText(state = "OFF") {
	chrome.action.setBadgeText({
		text: state,
	});
}

function saveToChromeStorage(key, value) {
	chrome.storage.local.set({ [key]: value }).then(() => {
		console.log(`${key} saved`);
	});
}

/*
 * Fetch from storage.
 */
// chrome.storage.local.get(["isPluginActive"]).then((result) => {
// 	console.log("Value currently is " + result.key);
// 	console.log("Value currently is " + result.isPluginActive);

// 	setBadgeText(result.key === true ? "ON" : "OFF");
// });


async function wideGpt(tab, state = "OFF") {
	const wideGptCssFile = "scripts/wide-gpt.css";

	console.log("tab.url", tab.url);

	// if (state === "ON") {
	// 	// Insert the CSS file when the user turns the extension on
	// 	await chrome.scripting.insertCSS({
	// 		files: [wideGptCssFile],
	// 		target: { tabId: tab.id },
	// 	});
	// } else if (state === "OFF") {
	// 	// Remove the CSS file when the user turns the extension off
	// 	await chrome.scripting.removeCSS({
	// 		files: [wideGptCssFile],
	// 		target: { tabId: tab.id },
	// 	});
	// }
}


/*
 * On start
 */
chrome.runtime.onInstalled.addListener(() => {

});

chrome.action.onClicked.addListener(async (tab) => {
	// Handle badge state.
	const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
	const nextState = prevState === "ON" ? "OFF" : "ON";

	setBadgeText(nextState);
	wideGpt(tab, nextState);
	saveToChromeStorage("isPluginActive", prevState);
});

// Get the active tab's ID.
chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
	// tabs probably has only one item.
	const activeTabId = tabs[0].id;



   /*
	* Fetch from storage.
	*/
	chrome.storage.local.get(["isPluginActive"]).then((result) => {
		console.log("activeTabId", activeTabId);

		setBadgeText(result.isPluginActive);
		wideGpt(activeTabId, result.isPluginActive);
	});
});


/*
 * Tab events.
 */ 
chrome.tabs.onCreated.addListener(function (tab) {
	console.log("Tab created", tab.url);
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	chrome.tabs.get(tabId, function (tab) {
		console.log("Tab updated", tab.url);
	});
});
