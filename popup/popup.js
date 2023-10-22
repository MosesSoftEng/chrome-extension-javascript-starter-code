/**
 * This function sends a message to the active tab.
 *
 * @param {Object} message - The message to be sent.
 * @returns void
 */
async function sendMessage(message) {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

	const response = await chrome.tabs.sendMessage(tab.id, {
		type: "pluginActive",
		isActive: this.checked,
	});

	console.log(response);
}

function saveToChromeStorage(key, value) {
	chrome.storage.local.set({ key: value }).then(() => {
		console.log("Value is set");
	});
}

/**
 * Event handler for when the DOM content has loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
	const checkbox = document.getElementById("plugin-active");

	chrome.storage.local.get(["key"]).then((result) => {
		console.log("Value currently is " + result.key);

		checkbox.checked = result.key;
	});

	/**
	 * Event handler for when the checkbox state changes.
	 */
	checkbox.addEventListener("change", function () {
		// Save plugin active state
		saveToChromeStorage("isPluginActive", this.checked);

		// Send the updated state to the content script
		sendMessage({
			type: "pluginActive",
			isActive: this.checked,
		});
	});
});
