const urlTemplate = "https://websearch.rakuten.co.jp/Web?qt="
const firstSearch = "java"
const searchList = [
  "facebook", "apple", "amazon",
  "c820", "c710", "denon",
  "pekora", "pokemon", "aqua",
  "m50x", "ad5000x", "pro2900b",
  "hololive", "amd", "intel",
  "ibm", "hp", "capcom",
  "monster hunter", "nintendo",
  "yagoo", "google", "adata",
  "javascript", "python", "c lang",
  "golang", "rust", "amd yes"
]

let index = 0
let tabId = null

chrome.browserAction.onClicked.addListener(e => {
  chrome.tabs.create({
    active: false,
    url: `${urlTemplate}${firstSearch}`
  }, tab => {
    tabId = tab.id
  })
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(!tabId) return

    if(request.count) {
      if (+request.count < 30) {
        setTimeout(() => {
          chrome.tabs.update(tabId, {
            url: `${urlTemplate}${searchList[index]}`
          }, tab => {
            index++
            if(index >= 30) {
              index = 0
            }
          })
        }, 1000 * 2)
      }else{
        chrome.tabs.remove(tabId, () => {
          tabId = null
          index = 0
        })
      }
    }
  }
)
