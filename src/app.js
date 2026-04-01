async function copyPrompt(button) {
  const code = button.closest(".prompt-card, .prompt-panel")?.querySelector("code");
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code.textContent || "");
    const original = button.textContent;
    button.textContent = "已复制 / Copied";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  } catch {}
}

function setupCopyButtons() {
  document.querySelectorAll("[data-copy-prompt]").forEach((button) => {
    button.addEventListener("click", () => copyPrompt(button));
  });
}

function openTimelineItemFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;
  const item = document.getElementById(id);
  if (item instanceof HTMLDetailsElement) {
    item.open = true;
  }
}

function setupTimelineHashOpen() {
  openTimelineItemFromHash();
  window.addEventListener("hashchange", openTimelineItemFromHash);
}

setupCopyButtons();
setupTimelineHashOpen();
