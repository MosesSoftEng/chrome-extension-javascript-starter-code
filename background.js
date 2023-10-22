console.log("Log from background script");

function setBadgeText(state = "OFF") {
	chrome.action.setBadgeText({
		text: state,
	});
}

async function wideGpt(tab, state = "OFF") {
	const wideGptCssFile = "scripts/wide-gpt.css";

	if (state === "ON") {
		// Insert the CSS file when the user turns the extension on
		await chrome.scripting.insertCSS({
			files: [wideGptCssFile],
			target: { tabId: tab.id },
		});
	} else if (state === "OFF") {
		// Remove the CSS file when the user turns the extension off
		await chrome.scripting.removeCSS({
			files: [wideGptCssFile],
			target: { tabId: tab.id },
		});
	}
}

chrome.runtime.onInstalled.addListener(() => {
	setBadgeText();
});

chrome.action.onClicked.addListener(async (tab) => {
	// Handle badge state.
	const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
	const nextState = prevState === "ON" ? "OFF" : "ON";

	setBadgeText(nextState);
	wideGpt(tab, nextState);
});
