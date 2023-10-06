function openOptionsPage() {
  browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(openOptionsPage);