chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: () => {
      const el = document.activeElement;
      if (!el) return;

      let changed = false;

      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
        const fixed = el.value.replace(/\n\s*\n+/g, "\n\n");
        changed = fixed !== el.value;
        el.value = fixed;
      }

      if (el.isContentEditable) {
        const fixed = el.innerText.replace(/\n\s*\n+/g, "\n\n");
        changed = fixed !== el.innerText;
        el.innerText = fixed;
      }

      if (changed) {
        console.log("Spacing fixed");
      }
    }
  });
});
