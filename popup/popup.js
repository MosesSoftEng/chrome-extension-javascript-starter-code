/**
 * This function sends a message to the active tab.
 *
 * @param {Object} message - The message to be sent.
 * @returns void
 */
async function sendMessage(message) {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	const response = await chrome.tabs.sendMessage(tab.id, message);
}

/**
 * Event handler for when the DOM content has loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
	const checkbox = document.getElementById("plugin-active");

	/** @type {boolean} */
	const pluginActive = localStorage.getItem("plugin-active") === "true";

	// Set the initial checkbox state
	checkbox.checked = pluginActive;

	// Send the initial state to the content script
	sendMessage({
		type: "pluginActive",
		isActive: pluginActive,
	});

	/**
	 * Event handler for when the checkbox state changes.
	 */
	checkbox.addEventListener("change", function () {
		// Save plugin active state
		localStorage.setItem("plugin-active", this.checked);

		// Send the updated state to the content script
		sendMessage({
			type: "pluginActive",
			isActive: this.checked,
		});
	});
});
