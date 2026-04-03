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

function renderBilingualStack(zh, en, className = "") {
  return `<span class="bilingual-stack${className ? ` ${className}` : ""}">
    <span class="bilingual-stack-zh">${escapeHtml(zh || en || "")}</span>
    ${en ? `<span class="bilingual-stack-en">${escapeHtml(en)}</span>` : ""}
  </span>`;
}

function renderList(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补充", "Pending"))}</p>`;
  return `<ul class="bullet-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderStaticPills(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补充", "Pending"))}</p>`;
  return `<div class="pill-row">
    ${items
      .map((item) => `<span class="pill is-static"><span class="pill-text">${escapeHtml(item)}</span></span>`)
      .join("")}
  </div>`;
}

function renderLinkedPills(items = []) {
  if (!items.length) return `<p class="empty-note">${escapeHtml(bilingualText("待补充", "Pending"))}</p>`;
  return `<div class="pill-row">
    ${items
      .map(
        (item) =>
          `<a class="pill" href="${escapeHtml(item.href)}">${escapeHtml(
            bilingualText(item.titleZh, item.titleEn || item.title || "")
          )}</a>`
      )
      .join("")}
  </div>`;
}

function renderImageFrame(fileName, altText, className = "") {
  const cls = className ? ` ${className}` : "";
  if (!fileName) {
    return `<div class="image-placeholder${cls}">${escapeHtml(bilingualText("图片待补充", "Image Pending"))}</div>`;
  }

  return `<div class="image-frame${cls}">
    <img src="/screenshots/${escapeHtml(fileName)}" alt="${escapeHtml(altText || fileName)}" loading="lazy" />
  </div>`;
}

async function copyPrompt(button) {
  const code = button.closest("[data-copy-container], .prompt-card, .prompt-panel, .detail-card")?.querySelector("code");
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
  if (document.body.dataset.copyButtonsReady === "true") return;
  document.body.dataset.copyButtonsReady = "true";

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy-prompt]");
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

function normalizeKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function dedupeStrings(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const normalized = String(item || "").trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function selectorToneLabel(data, id = "auto") {
  const option = data.toneOptions.find((entry) => entry.id === id) || data.toneOptions[0];
  return bilingualText(option?.titleZh, option?.titleEn);
}

function selectorModeLabel(data, id = "auto") {
  const option = data.modeOptions.find((entry) => entry.id === id) || data.modeOptions[0];
  return bilingualText(option?.titleZh, option?.titleEn);
}

function selectorFamilyCandidates(data, useCase) {
  return dedupeStrings([useCase?.primaryFamilyId, ...(useCase?.secondaryFamilyIds || [])])
    .map((id) => data.familyMap.get(id))
    .filter(Boolean);
}

function selectorStructureCandidates(data, useCase, family = null) {
  const useCaseIds = useCase?.structureIds || [];
  const familyIds = family?.structureIds || [];
  const intersected = family ? useCaseIds.filter((id) => familyIds.includes(id)) : useCaseIds;
  const fallbackIds = intersected.length ? intersected : familyIds.length ? familyIds : useCaseIds;

  return dedupeStrings(fallbackIds)
    .map((id) => data.structureMap.get(id))
    .filter(Boolean);
}

function selectorResolveFamily(data, { useCase, familyId = "", tone = "auto" }) {
  const candidates = selectorFamilyCandidates(data, useCase);
  if (!candidates.length) return null;

  const explicit = familyId ? candidates.find((entry) => entry.id === familyId) : null;
  if (explicit) return explicit;

  if (tone && tone !== "auto") {
    const toned = candidates.find((entry) => data.familyToneMap?.[entry.id] === tone);
    if (toned) return toned;
  }

  return candidates[0];
}

function selectorResolveStructure(data, { useCase, family, structureId = "", mode = "auto" }) {
  const candidates = selectorStructureCandidates(data, useCase, family);
  if (!candidates.length) return null;

  const explicit = structureId ? candidates.find((entry) => entry.id === structureId) : null;
  if (explicit) return explicit;

  if (mode && mode !== "auto") {
    const matched = candidates.find((entry) => data.structureModeMap?.[entry.id] === mode);
    if (matched) return matched;
  }

  return candidates[0];
}

function selectorResolveMovement(data, family) {
  if (!family) return null;
  return family.movementIds?.map((id) => data.movementMap.get(id)).filter(Boolean)[0] || null;
}

function selectorReferenceEntries(family) {
  if (!family) return [];

  const visuals = (family.samples || []).slice(0, 3);
  const references = family.references || [];

  return visuals.map((sample, index) => {
    const sampleKey = normalizeKey(sample.label);
    const matched =
      references.find((reference) => {
        const refKey = normalizeKey(reference.label);
        return sampleKey && (refKey.includes(sampleKey) || sampleKey.includes(refKey));
      }) ||
      references[index] ||
      null;

    return {
      label: matched?.label || sample.label || family.titleEn || family.titleZh || family.id,
      href: matched?.href || family.href,
      screenshot: sample.screenshot,
      alt: sample.alt || matched?.label || sample.label || family.titleEn || family.titleZh || family.id
    };
  });
}

function buildSelectorPrompt(data, packet) {
  const referencePacket = packet.references.length
    ? packet.references.map((item) => `${item.label}: ${item.href}`).join(" / ")
    : bilingualText("待补充", "Pending");

  return `内容类型 Content Type: ${bilingualText(packet.useCase.titleZh, packet.useCase.titleEn)}
历史线索 Historical Movement: ${packet.movement ? bilingualText(packet.movement.titleZh, packet.movement.titleEn) : bilingualText("按家族自动匹配", "Auto from family")}
网页家族 Visual Family: ${bilingualText(packet.family.titleZh, packet.family.titleEn)}
信息结构 IA Layer: ${bilingualText(packet.structure.titleZh, packet.structure.titleEn)}
参考网站 Reference Packet: ${referencePacket}
内容形状 Content Shape: ${packet.useCase.contentShape}
用户目标 User Goal: ${packet.useCase.userGoal}
场景气质 Tone: ${selectorToneLabel(data, packet.state.tone)}
交互倾向 Mode: ${selectorModeLabel(data, packet.state.mode)}
可借 Borrow: ${packet.borrow.join(" / ")}
避免 Avoid: ${packet.avoid.join(" / ")}
风格提示 Family Prompt: ${packet.family.prompt || ""}`;
}

function resolveSelectorPacket(data, state) {
  const tone = data.toneOptions.some((entry) => entry.id === state.tone) ? state.tone : "auto";
  const mode = data.modeOptions.some((entry) => entry.id === state.mode) ? state.mode : "auto";
  const useCase = data.useCaseMap.get(state.useCaseId) || data.useCases[0] || null;
  const family = selectorResolveFamily(data, { useCase, familyId: state.familyId || "", tone });
  const structure = selectorResolveStructure(data, {
    useCase,
    family,
    structureId: state.structureId || "",
    mode
  });
  const movement = selectorResolveMovement(data, family);
  const references = selectorReferenceEntries(family);
  const borrow = dedupeStrings([...(family?.borrow || []), ...(structure?.signals || [])]).slice(0, 4);
  const avoid = dedupeStrings([...(useCase?.avoid || []), ...(family?.avoidWhen || []), ...(structure?.watchouts || [])]).slice(
    0,
    4
  );
  const alternatives = selectorFamilyCandidates(data, useCase).filter((entry) => entry.id !== family?.id);
  const structureAlternatives = selectorStructureCandidates(data, useCase, family).filter((entry) => entry.id !== structure?.id);

  const packet = {
    state: {
      useCaseId: useCase?.id || "",
      familyId: state.familyId || "",
      structureId: state.structureId || "",
      tone,
      mode
    },
    useCase,
    family,
    structure,
    movement,
    references,
    borrow,
    avoid,
    alternatives,
    structureAlternatives
  };

  packet.prompt = buildSelectorPrompt(data, packet);
  return packet;
}

function renderSelectorChoiceCard({ kickerZh, kickerEn, item, href, summary, metaMarkup = "", emptyLabel = "" }) {
  if (!item) {
    return `<article class="detail-card relation-card selector-choice-card card-surface">
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText(kickerZh, kickerEn))}</p>
        <h3 class="card-title">${escapeHtml(emptyLabel || bilingualText("待补充", "Pending"))}</h3>
      </div>
    </article>`;
  }

  return `<article class="detail-card relation-card selector-choice-card card-surface">
    <div class="card-body">
      <p class="card-kicker">${escapeHtml(bilingualText(kickerZh, kickerEn))}</p>
      <h3 class="card-title">${renderBilingualStack(item.titleZh, item.titleEn || item.title)}</h3>
      <p class="card-summary">${escapeHtml(summary || item.summary || item.summaryZh || "")}</p>
      ${metaMarkup}
      <a class="text-link" href="${escapeHtml(href)}">${escapeHtml(bilingualText("查看详情", "Open Detail"))}</a>
    </div>
  </article>`;
}

function renderSelectorReferenceCard(item) {
  return `<article class="selector-reference-card card-surface">
    <a class="card-media selector-reference-media" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer noopener">
      ${renderImageFrame(item.screenshot, item.alt || item.label)}
      <div class="card-overlay">
        <span class="card-overlay-label">${escapeHtml(bilingualText("真实参考", "Live Reference"))}</span>
        <h3 class="card-overlay-title">${escapeHtml(item.label)}</h3>
      </div>
    </a>
    <div class="card-body">
      <a class="text-link" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(
        bilingualText("打开网站", "Open Site")
      )}</a>
    </div>
  </article>`;
}

function renderSelectorResults(data, packet) {
  const alternativeFamilies = packet.alternatives.slice(0, 2);
  const alternativeStructures = packet.structureAlternatives.slice(0, 2);

  return `<div class="selector-results" data-selector-results>
    <article class="selector-summary card-surface">
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText("推荐建站方案", "Recommended Packet"))}</p>
        <h2 class="section-title">${renderBilingualStack(packet.useCase.titleZh, packet.useCase.titleEn || packet.useCase.title)}</h2>
        <p class="section-summary">${escapeHtml(packet.useCase.summary)}</p>
        <div class="selector-summary-grid">
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("内容形状", "Content Shape"))}</h4>
            <p>${escapeHtml(packet.useCase.contentShape)}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("用户目标", "User Goal"))}</h4>
            <p>${escapeHtml(packet.useCase.userGoal)}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("场景气质", "Tone"))}</h4>
            <p>${escapeHtml(selectorToneLabel(data, packet.state.tone))}</p>
          </div>
          <div class="meta-block">
            <h4>${escapeHtml(bilingualText("交互倾向", "Mode"))}</h4>
            <p>${escapeHtml(selectorModeLabel(data, packet.state.mode))}</p>
          </div>
        </div>
      </div>
    </article>
    <div class="selector-choice-grid">
      ${renderSelectorChoiceCard({
        kickerZh: "风格来源",
        kickerEn: "Historical Movement",
        item: packet.movement,
        href: packet.movement?.href || "/movements",
        summary: packet.movement?.whyItMatters || packet.movement?.summary || "",
        metaMarkup: packet.movement
          ? `<div class="meta-block">
              <h4>${escapeHtml(bilingualText("时期", "Period"))}</h4>
              <p>${escapeHtml(packet.movement.era || "")}</p>
            </div>`
          : "",
        emptyLabel: bilingualText("按家族自动匹配", "Auto from family")
      })}
      ${renderSelectorChoiceCard({
        kickerZh: "页面感觉",
        kickerEn: "Visual Family",
        item: packet.family,
        href: packet.family?.href || "/families",
        summary: packet.family?.summaryZh || packet.family?.summary || "",
        metaMarkup: packet.family
          ? `<div class="meta-block">
              <h4>${escapeHtml(bilingualText("适合内容", "Best For"))}</h4>
              ${renderStaticPills((packet.family.bestFor || []).slice(0, 3))}
            </div>`
          : ""
      })}
      ${renderSelectorChoiceCard({
        kickerZh: "页面组织",
        kickerEn: "Structure Pattern",
        item: packet.structure,
        href: packet.structure?.href || "/structures",
        summary: packet.structure?.summary || "",
        metaMarkup: packet.structure
          ? `<div class="meta-block">
              <h4>${escapeHtml(bilingualText("识别信号", "Signals"))}</h4>
              ${renderStaticPills((packet.structure.signals || []).slice(0, 3))}
            </div>`
          : ""
      })}
    </div>
    <div class="selector-meta-grid">
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("借法", "Borrow"))}</p>
          ${renderList(packet.borrow)}
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("避免", "Avoid"))}</p>
          ${renderList(packet.avoid)}
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("备选路径", "Alternatives"))}</p>
          <div class="selector-alternative-stack">
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("备选家族", "Family Alternatives"))}</h4>
              ${
                alternativeFamilies.length
                  ? renderLinkedPills(alternativeFamilies)
                  : `<p>${escapeHtml(bilingualText("当前已是最直接匹配", "Current match is already the primary fit"))}</p>`
              }
            </div>
            <div class="meta-block">
              <h4>${escapeHtml(bilingualText("备选结构", "Structure Alternatives"))}</h4>
              ${
                alternativeStructures.length
                  ? renderLinkedPills(alternativeStructures)
                  : `<p>${escapeHtml(bilingualText("当前结构已是最直接匹配", "Current structure is already the primary fit"))}</p>`
              }
            </div>
          </div>
        </div>
      </article>
      <article class="detail-card card-surface">
        <div class="card-body">
          <p class="card-kicker">${escapeHtml(bilingualText("接下来这样做", "Next Steps"))}</p>
          ${renderList([
            "先打开 2 到 3 个真实参考站，确认图像大小、导航和留白是不是你要的感觉。",
            "复制下面的 Prompt 包给 AI，先让它出首页草图，不要一开始就做全站。",
            "如果结果太花、太冷或太像模板，再回来切换页面感觉或页面组织。"
          ])}
        </div>
      </article>
    </div>
    <section class="selector-reference-section">
      <div class="section-head">
        <div class="section-head-main">
          <p class="eyebrow">${escapeHtml(bilingualText("真实参考", "Live References"))}</p>
          <h2 class="section-title">${escapeHtml(bilingualText("直接打开真实站点", "Open the closest real websites"))}</h2>
        </div>
      </div>
      <div class="selector-reference-grid">
        ${packet.references.map((item) => renderSelectorReferenceCard(item)).join("")}
      </div>
    </section>
    <article class="selector-prompt-panel detail-card card-surface" data-copy-container>
      <div class="card-body">
        <p class="card-kicker">${escapeHtml(bilingualText("Prompt 包", "Prompt Packet"))}</p>
        <h3 class="card-title">${escapeHtml(bilingualText("这就是可以直接交给 AI 的版本", "This is the AI-ready packet"))}</h3>
        <code>${escapeHtml(packet.prompt)}</code>
        <div class="hero-actions">
          <button class="copy-button" type="button" data-copy-prompt>${escapeHtml(bilingualText("复制", "Copy"))}</button>
        </div>
      </div>
    </article>
  </div>`;
}

function readSelectorState(form, data) {
  const state = {
    useCaseId: form.elements.useCaseId?.value || data.initialState.useCaseId || "",
    familyId: form.elements.familyId?.value || "",
    structureId: form.elements.structureId?.value || "",
    tone: form.elements.tone?.value || "auto",
    mode: form.elements.mode?.value || "auto"
  };

  return state;
}

function fillSelect(select, options, { selected = "", allowAuto = false, autoLabel = bilingualText("自动匹配", "Auto") } = {}) {
  if (!select) return;

  const autoMarkup = allowAuto ? `<option value="">${escapeHtml(autoLabel)}</option>` : "";
  select.innerHTML = `${autoMarkup}${options
    .map((item) => {
      const text = bilingualText(item.titleZh, item.titleEn || item.title || item.id || "");
      return `<option value="${escapeHtml(item.id)}"${item.id === selected ? " selected" : ""}>${escapeHtml(text)}</option>`;
    })
    .join("")}`;
}

function syncSelectorControls(form, data, draftState) {
  const useCase = data.useCaseMap.get(draftState.useCaseId) || data.useCases[0] || null;
  if (!useCase) return draftState;

  const familyOptions = selectorFamilyCandidates(data, useCase);
  const familyValid = familyOptions.some((entry) => entry.id === draftState.familyId);
  const normalizedFamilyId = familyValid ? draftState.familyId : "";
  fillSelect(form.elements.familyId, familyOptions, { selected: normalizedFamilyId, allowAuto: true });

  const family = selectorResolveFamily(data, {
    useCase,
    familyId: normalizedFamilyId,
    tone: draftState.tone
  });
  const structureOptions = selectorStructureCandidates(data, useCase, family);
  const structureValid = structureOptions.some((entry) => entry.id === draftState.structureId);
  const normalizedStructureId = structureValid ? draftState.structureId : "";
  fillSelect(form.elements.structureId, structureOptions, { selected: normalizedStructureId, allowAuto: true });

  return {
    ...draftState,
    useCaseId: useCase.id,
    familyId: normalizedFamilyId,
    structureId: normalizedStructureId
  };
}

function updateSelectorUrl(state) {
  const url = new URL(window.location.href);
  url.searchParams.set("useCase", state.useCaseId);

  if (state.familyId) url.searchParams.set("family", state.familyId);
  else url.searchParams.delete("family");

  if (state.structureId) url.searchParams.set("structure", state.structureId);
  else url.searchParams.delete("structure");

  if (state.tone && state.tone !== "auto") url.searchParams.set("tone", state.tone);
  else url.searchParams.delete("tone");

  if (state.mode && state.mode !== "auto") url.searchParams.set("mode", state.mode);
  else url.searchParams.delete("mode");

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function setupSelector() {
  const root = document.querySelector("[data-style-selector]");
  const dataScript = document.getElementById("selector-data");
  if (!root || !dataScript) return;

  let data;
  try {
    data = JSON.parse(dataScript.textContent || "{}");
  } catch {
    return;
  }

  data.useCaseMap = new Map((data.useCases || []).map((item) => [item.id, item]));
  data.familyMap = new Map((data.families || []).map((item) => [item.id, item]));
  data.structureMap = new Map((data.structures || []).map((item) => [item.id, item]));
  data.movementMap = new Map((data.movements || []).map((item) => [item.id, item]));

  const form = root.querySelector("[data-selector-form]");
  if (!form || !root.querySelector("[data-selector-results]")) return;

  const params = new URLSearchParams(window.location.search);
  const initialState = {
    useCaseId: params.get("useCase") || data.initialState.useCaseId || "",
    familyId: params.get("family") || "",
    structureId: params.get("structure") || "",
    tone: params.get("tone") || data.initialState.tone || "auto",
    mode: params.get("mode") || data.initialState.mode || "auto"
  };

  fillSelect(form.elements.useCaseId, data.useCases || [], { selected: initialState.useCaseId });
  fillSelect(form.elements.tone, data.toneOptions || [], { selected: initialState.tone });
  fillSelect(form.elements.mode, data.modeOptions || [], { selected: initialState.mode });

  const render = () => {
    const draftState = readSelectorState(form, data);
    const normalizedState = syncSelectorControls(form, data, draftState);
    form.elements.useCaseId.value = normalizedState.useCaseId;
    form.elements.tone.value = normalizedState.tone;
    form.elements.mode.value = normalizedState.mode;
    form.elements.familyId.value = normalizedState.familyId;
    form.elements.structureId.value = normalizedState.structureId;

    const packet = resolveSelectorPacket(data, normalizedState);
    const currentResults = root.querySelector("[data-selector-results]");
    if (currentResults) {
      currentResults.outerHTML = renderSelectorResults(data, packet);
    }
    updateSelectorUrl(normalizedState);
  };

  syncSelectorControls(form, data, initialState);
  form.elements.useCaseId.value = initialState.useCaseId;
  form.elements.tone.value = initialState.tone;
  form.elements.mode.value = initialState.mode;
  render();

  form.addEventListener("change", render);
}

setupCopyButtons();
setupTimelineReveal();
setupSelector();
