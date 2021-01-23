function getCount() {
  const dom = document.querySelector("em.KuchisuBar-module__progressCounter1__1NVVE")
  if(dom) {
    return +dom.textContent
  }

  return 30
}

function sendCount(count) {
  chrome.runtime.sendMessage({count})
}

window.addEventListener("load", e => {
  sendCount(getCount())
})
