document.documentElement.classList.add("js-enhanced");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bilingualText(zh, en) {
  if (!zh && !en) return "";
  if (!zh) return en || "";
  if (!en) return zh || "";
  return `${zh} / ${en}`;
}

function renderInlineEnglishTitle(zh, en, className = "") {
  return `<span class="style-inline-title${className ? ` ${className}` : ""}">
    <span class="style-inline-title-zh">${escapeHtml(zh || en || "")}</span>
    ${en ? `<span class="style-inline-title-en">(${escapeHtml(en)})</span>` : ""}
  </span>`;
}

function renderImageFrame(fileName, altText, className = "") {
  const cls = className ? ` ${className}` : "";
  if (!fileName) return `<div class="image-placeholder${cls}">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`;
  return `<div class="image-frame${cls}">
    <img src="/screenshots/${escapeHtml(fileName)}" alt="${escapeHtml(altText || fileName)}" loading="lazy" />
  </div>`;
}

function renderList(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补充", "Pending"))}</p>`;
  return `<ul class="bullet-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

async function copyPrompt(button) {
  const targetId = button.dataset.copyTarget || "";
  const target = targetId
    ? document.getElementById(targetId)
    : button.closest("[data-copy-container], .detail-card, .prompt-card, .prompt-panel")?.querySelector("code, pre");
  if (!target) return;

  try {
    await navigator.clipboard.writeText(target.textContent || "");
    const original = button.textContent;
    button.textContent = "已复制 / Copied";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  } catch {
    // Clipboard may be unavailable in some contexts.
  }
}

function setupCopyButtons() {
  if (document.body.dataset.copyButtonsReady === "true") return;
  document.body.dataset.copyButtonsReady = "true";

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy-target], [data-copy-prompt]");
    if (!button) return;
    event.preventDefault();
    copyPrompt(button);
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

function splitTags(raw = "") {
  return String(raw || "")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function setupStyleBrowsers() {
  const roots = document.querySelectorAll("[data-browse-root]");
  if (!roots.length) return;

  roots.forEach((root) => {
    const cards = Array.from(root.querySelectorAll("[data-style-card], [data-browse-card]"));
    const filterButtons = Array.from(root.querySelectorAll("[data-browse-filter]"));
    const searchInput = root.querySelector("[data-browse-search]");
    const viewButtons = Array.from(root.querySelectorAll("[data-browse-view]"));
    const grid = root.querySelector("[data-browse-grid]");
    const empty = root.querySelector("[data-browse-empty]");

    if (!cards.length) return;

    let activeFilter = filterButtons.find((button) => button.classList.contains("is-active"))?.dataset.browseFilter || "all";
    let activeView = viewButtons.find((button) => button.classList.contains("is-active"))?.dataset.browseView || "grid";

    const apply = () => {
      const query = (searchInput?.value || "").trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const tagSource = card.dataset.styleTags || card.dataset.filterTags || "";
        const searchSource = card.dataset.styleSearch || card.dataset.search || "";
        const tags = splitTags(tagSource);
        const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
        const matchesQuery = !query || String(searchSource).toLowerCase().includes(query);
        const visible = matchesFilter && matchesQuery;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      filterButtons.forEach((button) => {
        const selected = button.dataset.browseFilter === activeFilter;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", selected ? "true" : "false");
      });

      viewButtons.forEach((button) => {
        const selected = button.dataset.browseView === activeView;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", selected ? "true" : "false");
      });

      if (grid) {
        grid.dataset.view = activeView;
        grid.classList.toggle("is-list", activeView === "list");
      }

      if (empty) empty.hidden = visibleCount > 0;
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.browseFilter || "all";
        apply();
      });
    });

    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeView = button.dataset.browseView || "grid";
        apply();
      });
    });

    if (searchInput) searchInput.addEventListener("input", apply);
    apply();
  });
}

function renderStyleFieldPreview(point) {
  const titleZh = point.dataset.fieldPointTitleZh || "";
  const titleEn = point.dataset.fieldPointTitleEn || "";
  const summary = point.dataset.fieldPointSummary || "";
  const cover = point.dataset.fieldPointCover || "";
  const alt = point.dataset.fieldPointAlt || titleZh;
  const fit = point.dataset.fieldPointFit || "";
  const href = point.dataset.fieldPointHref || "/browse";

  return `<a class="field-preview-media" href="${escapeHtml(href)}" data-field-preview-link>
    ${renderImageFrame(cover, alt)}
  </a>
  <div class="field-preview-body">
    <p class="card-kicker">${escapeHtml(bilingualText("当前风格", "Current Style"))}</p>
    <h3 class="card-title" data-field-preview-title>${renderInlineEnglishTitle(titleZh, titleEn)}</h3>
    <p class="card-summary" data-field-preview-summary>${escapeHtml(summary)}</p>
    <p class="field-preview-fit" data-field-preview-fit>${escapeHtml(`适合做：${fit}`)}</p>
    <a class="text-link" href="${escapeHtml(href)}" data-field-preview-cta>${escapeHtml(
      bilingualText("查看这个风格", "Open this style")
    )}</a>
  </div>`;
}

function setupStyleField() {
  const roots = document.querySelectorAll("[data-style-field-root]");
  if (!roots.length) return;

  roots.forEach((root) => {
    const preview = root.querySelector("[data-field-preview]");
    const points = Array.from(root.querySelectorAll("[data-field-point]"));
    if (!preview || !points.length) return;

    const setActivePoint = (point) => {
      if (!point) return;
      points.forEach((item) => item.classList.toggle("is-active", item === point));
      preview.innerHTML = renderStyleFieldPreview(point);
    };

    const defaultPoint = points.find((point) => point.dataset.fieldDefault === "true") || points[0];
    setActivePoint(defaultPoint);

    const resetToDefault = () => setActivePoint(defaultPoint);

    points.forEach((point) => {
      point.addEventListener("mouseenter", () => setActivePoint(point));
      point.addEventListener("focus", () => setActivePoint(point));
    });

    root.addEventListener("mouseleave", resetToDefault);
    root.addEventListener("focusout", () => {
      window.requestAnimationFrame(() => {
        if (!root.contains(document.activeElement)) resetToDefault();
      });
    });
  });
}

function getOptionLabel(options = [], id = "", fallback = "") {
  return options.find((item) => item.id === id)?.titleZh || fallback || id;
}

function syncSelectorWizardChoiceState(root) {
  root.querySelectorAll(".wizard-choice-pill, .selector-visual-choice").forEach((label) => {
    const input = label.querySelector("input[type='radio']");
    label.classList.toggle("is-selected", Boolean(input?.checked));
  });
}

function scoreSelectorWizardStyle(style, state) {
  let score = 0;
  const reasons = [];

  if ((style.siteTypes || []).includes(state.siteType)) {
    score += 4;
    reasons.push(`适合做${state.siteTypeLabel}`);
  }

  if ((style.audiences || []).includes(state.audience)) {
    score += 2;
    reasons.push(`更适合给${state.audienceLabel}看`);
  }

  if (style.toneAxis === state.tone) {
    score += 2;
    reasons.push(`第一眼更偏${state.tone === "quiet" ? "安静克制" : "强烈有力"}`);
  }

  if (style.orderAxis === state.order) {
    score += 2;
    reasons.push(`页面组织更偏${state.order === "structured" ? "整洁系统" : "个性独特"}`);
  }

  if (state.siteType === "other") score += 1;
  return { score, reasons };
}

function resolveSelectorWizardPacket(data, state) {
  const normalizedState = {
    ...state,
    siteTypeLabel: getOptionLabel(data.siteOptions, state.siteType, state.siteType),
    audienceLabel: getOptionLabel(data.audienceOptions, state.audience, state.audience)
  };

  const ranked = (data.styles || [])
    .map((style) => {
      const scored = scoreSelectorWizardStyle(style, normalizedState);
      return {
        style,
        score: scored.score,
        reasons: scored.reasons.slice(0, 3)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    state: normalizedState,
    results: ranked
  };
}

function renderSelectorWizardResults(packet) {
  return `<div class="selector-wizard-results" data-selector-wizard-results>
    <div class="section-head">
      <div class="section-head-main">
        <p class="eyebrow">${escapeHtml(bilingualText("推荐结果", "Recommendations"))}</p>
        <h2 class="section-title">${escapeHtml(bilingualText("推荐你先看这 2 到 3 个风格", "Start with these 2-3 styles"))}</h2>
      </div>
    </div>
    <div class="selector-recommendation-grid">
      ${packet.results
        .map(({ style, reasons }) => {
          const titleZh = style.titleZh || style.nameZh || style.id || "";
          const titleEn = style.titleEn || style.title || "";
          const cardUses = Array.isArray(style.cardUses) ? style.cardUses.slice(0, 3) : [];
          const href = style.href || (style.slug ? `/browse/${style.slug}` : "/browse");

          return `<article class="selector-result-card card-surface">
            <a class="selector-result-media" href="${escapeHtml(href)}">
              ${renderImageFrame(style.screenshot || style.cover, style.alt || style.coverAlt || titleZh)}
            </a>
            <div class="card-body">
              <h3 class="card-title">${renderInlineEnglishTitle(titleZh, titleEn)}</h3>
              <p class="card-summary">${escapeHtml(`适合做：${cardUses.join(" · ")}`)}</p>
              ${renderList(reasons)}
              <div class="hero-actions">
                <a class="text-link" href="${escapeHtml(href)}">${escapeHtml(bilingualText("查看详情", "Open Detail"))}</a>
              </div>
            </div>
          </article>`;
        })
        .join("")}
    </div>
  </div>`;
}

function updateSelectorWizardUrl(state) {
  const url = new URL(window.location.href);
  url.searchParams.set("siteType", state.siteType);
  url.searchParams.set("audience", state.audience);
  url.searchParams.set("tone", state.tone);
  url.searchParams.set("order", state.order);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function readWizardStateFromUrl(data) {
  const params = new URLSearchParams(window.location.search);
  const siteIds = new Set((data.siteOptions || []).map((item) => item.id));
  const audienceIds = new Set((data.audienceOptions || []).map((item) => item.id));
  const toneIds = new Set((data.visualOptions?.tone || []).map((item) => item.id));
  const orderIds = new Set((data.visualOptions?.order || []).map((item) => item.id));

  const fromUrl = {
    siteType: params.get("siteType") || data.initialState?.siteType || "portfolio",
    audience: params.get("audience") || data.initialState?.audience || "clients",
    tone: params.get("tone") || data.initialState?.tone || "quiet",
    order: params.get("order") || data.initialState?.order || "structured"
  };

  return {
    siteType: siteIds.has(fromUrl.siteType) ? fromUrl.siteType : data.initialState?.siteType || "portfolio",
    audience: audienceIds.has(fromUrl.audience) ? fromUrl.audience : data.initialState?.audience || "clients",
    tone: toneIds.has(fromUrl.tone) ? fromUrl.tone : data.initialState?.tone || "quiet",
    order: orderIds.has(fromUrl.order) ? fromUrl.order : data.initialState?.order || "structured"
  };
}

function setupSelectorWizard() {
  const root = document.querySelector("[data-selector-wizard]");
  const dataScript = document.getElementById("selector-wizard-data");
  if (!root || !dataScript) return;

  let data;
  try {
    data = JSON.parse(dataScript.textContent || "{}");
  } catch {
    return;
  }

  if (!root.querySelector("[data-selector-wizard-results]")) return;
  const state = readWizardStateFromUrl(data);

  ["siteType", "audience", "tone", "order"].forEach((name) => {
    const input = root.querySelector(`input[name="${name}"][value="${state[name]}"]`);
    if (input) input.checked = true;
  });

  const apply = () => {
    const packet = resolveSelectorWizardPacket(data, state);
    const current = root.querySelector("[data-selector-wizard-results]");
    if (current) current.outerHTML = renderSelectorWizardResults(packet);
    syncSelectorWizardChoiceState(root);
    updateSelectorWizardUrl(state);
  };

  root.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", () => {
      state[input.name] = input.value;
      apply();
    });
  });

  syncSelectorWizardChoiceState(root);
  apply();
}

setupCopyButtons();
setupTimelineReveal();
setupStyleBrowsers();
setupStyleField();
setupSelectorWizard();
