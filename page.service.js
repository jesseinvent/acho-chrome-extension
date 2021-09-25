const PAGES_KEY = 'pages'

const toPromise = (callback) => {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject)
        } catch (err) {
            reject(err)
        }
    })

    return promise
}

class PageService {

    static getPages = () => {
        return toPromise((resolve, reject) => {
            chrome.storage.local.get([PAGES_KEY], (result) => {
                if(chrome.runtime.lastError)
                    reject(chrome.runtime.lastError)

                const researches = result.pages ?? []
                resolve(researches)
            })
        })
    }

    static savePage = async (title, url) => {
        const pages = await this.getPages()
        const updatedPages = [...pages, {title, url}]

        return toPromise((resolve, reject) => {
            chrome.storage.local.set({ [PAGES_KEY]: updatedPages}, () => {
                if(chrome.runtime.lastError)
                    reject(chrome.runtime.lastError)
                    
                resolve(updatedPages)
            })
        })
    }

    static clearPages = () => {
        return toPromise((resolve, reject) => {
            chrome.storage.local.remove([PAGES_KEY], () => {
                if(chrome.runtime.lastError)
                    reject(chrome.runtime.lastError)

                resolve()
            })
        })
    }

}