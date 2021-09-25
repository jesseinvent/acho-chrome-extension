/**
 * Gets the current active tab URL and opens a new tab with the same URL
 */

function duplicateTab() {
    const query = { active: true, currentWindow: true }
    chrome.tabs.query(query, (tabs) => {
        chrome.tabs.create({ url: tabs[0].url, active: false })
    })
}

/**
 * Gets the current tab URL and opens a new tab with the same URL
 */
chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'duplicate-tab':
            duplicateTab()
            break

        case 'bark':
            barkTitle()
            break

        default:
            console.log(`Command ${command} not found`)
    }
});

/**
 * Sends message to the content script with the currently active tab title
 */

const barkTitle = async () => {

    const acho = new Acho()
    const tab = await acho.getActiveTab()

    chrome.tabs.sendMessage(tab.id, {
        tabTitle: tab.title
    });

    await PageService.savePage(tab.title, tab.url)
}