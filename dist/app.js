document.documentElement.classList.add("js-enhanced");

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

function setupTimelineReveal() {
  const items = document.querySelectorAll(".timeline-node");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!items.length || prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

setupCopyButtons();
setupTimelineReveal();
