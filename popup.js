
const displayPages = async() => {
    const visitedPages = await PageService.getPages()
    const pageList = document.querySelector('#page-list')
    // pageList.innerHTML = ''

    visitedPages.forEach(page => {
        const pageItem = document.createElement('li')

        const pageLink = document.createElement('a')
        pageLink.title = page.title
        pageLink.innerHTML = page.title
        pageLink.href = page.url

        pageLink.onclick = async (ev) => {
            ev.preventDefault()
            chrome.tabs.create({url: ev.target.href, active: false})
        }

        pageItem.appendChild(pageLink)
        pageList.appendChild(pageItem)

    })
}


document.addEventListener('DOMContentLoaded', async () => {

    const dialogBox = document.querySelector('#dialog-box')

    const acho = new Acho()
    const tab = await acho.getActiveTab()
    const bark = acho.getBarkedTitle(tab.title)

    dialogBox.innerHTML = bark

    // Store Page
    await PageService.savePage(tab.title, tab.url)

    // Display history
    await displayPages()

    // Clear History
    const clearHistoryBtn = document.querySelector('#clear-history')
    clearHistoryBtn.onclick = async () => {
        await PageService.clearPages()
        await displayPages()
    }

    await acho.quiet()

})