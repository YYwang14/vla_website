(function () {
  const content = window.SITE_CONTENT;
  if (!content) return;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const byId = (value) => document.getElementById(value);

  function renderHero() {
    byId("hero-root").innerHTML = `
      <div class="hero">
        <h1 class="hero-title">${escapeHtml(content.hero.title)}</h1>
        <p class="hero-subtitle">${escapeHtml(content.hero.subtitle)}</p>
        <div class="hero-links">
          ${content.hero.links
            .map(
              (link) =>
                `<a href="${escapeHtml(link.href)}"${link.external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(link.label)}</a>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderCoreClaim() {
    byId("core-claim-root").innerHTML = `
      <div class="claim-grid">
        ${content.core_claim_stats
          .map(
            (item) => `
              <article class="claim-card">
                <div class="claim-card-label">${escapeHtml(item.label)}</div>
                <div class="claim-card-value">${escapeHtml(item.value)}</div>
                <div class="claim-card-note">${escapeHtml(item.note)}</div>
              </article>
            `
          )
          .join("")}
      </div>
      <p class="section-text">${escapeHtml(content.sections.core_claim.intro)}</p>
    `;
  }

  function renderParagraphs(rootId, paragraphs) {
    byId(rootId).innerHTML = paragraphs
      .map((paragraph) => `<p class="section-text">${escapeHtml(paragraph)}</p>`)
      .join("");
  }

  function renderOpenVlaTable(rows) {
    const suiteOrder = ["libero_spatial", "libero_object", "libero_goal"];
    const promptOrder = ["task", "empty", "do_nothing"];
    const suiteLabels = {
      libero_spatial: "Spatial",
      libero_object: "Object",
      libero_goal: "Goal",
    };
    const promptLabels = {
      task: "Task",
      empty: "Empty",
      do_nothing: "Do nothing",
    };

    return `
      <div class="table-block">
        <div class="table-title">OpenVLA-OFT prompt sweep (900 episodes)</div>
        <table class="openvla-table">
          <thead>
            <tr>
              <th>Suite</th>
              ${promptOrder.map((prompt) => `<th>${escapeHtml(promptLabels[prompt])}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${suiteOrder
              .map((suite) => {
                const rowClass = suite === "libero_goal" ? "control-row" : "primary-evidence";
                return `
                  <tr class="${rowClass}">
                    <td>${escapeHtml(suiteLabels[suite])}</td>
                    ${promptOrder
                      .map((prompt) => {
                        const row = rows.find((item) => item.task_suite === suite && item.prompt_condition === prompt);
                        return `<td>${escapeHtml((row.success_rate * 100).toFixed(0) + "%")}</td>`;
                      })
                      .join("")}
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderPi05Table(rows) {
    return `
      <div class="table-block">
        <div class="table-title">pi0.5 baseline and prompt/scene probes</div>
        <table class="pi05-table">
          <thead>
            <tr>
              <th>Setting</th>
              <th>Suite</th>
              <th>Episodes</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <td>${escapeHtml(row.setting)}</td>
                    <td>${escapeHtml(row.suite)}</td>
                    <td>${escapeHtml(row.episodes)}</td>
                    <td>${escapeHtml(row.success)}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderVideoModules(modules) {
    return `
      <div class="module-stack">
        ${modules
          .map(
            (module) => `
              <article class="module">
                <div class="module-header">
                  <div>
                    <h3 class="module-title">${escapeHtml(module.title)}</h3>
                    <p class="module-caption">${escapeHtml(module.caption)}</p>
                  </div>
                  <div class="module-actions">
                    <button class="module-button" type="button" data-action="play-group">Play all</button>
                    <button class="module-button" type="button" data-action="reset-group">Reset</button>
                  </div>
                </div>
                <div class="video-grid ${module.videos.length === 4 ? "four-up" : ""}">
                  ${module.videos
                    .map(
                      (video) => `
                        <article class="video-card">
                          <div class="video-shell">
                            <video
                              controls
                              muted
                              playsinline
                              preload="none"
                              data-lazy-video="true"
                              data-src="${escapeHtml(video.src)}"
                              title="${escapeHtml(video.title)}"
                            ></video>
                          </div>
                          <div class="video-meta">
                            <div class="video-meta-top">
                              <span class="video-result ${escapeHtml(video.result)}">${escapeHtml(video.result)}</span>
                              <span>${escapeHtml(video.condition)}</span>
                            </div>
                            <p class="video-title">${escapeHtml(video.title)}</p>
                            <p class="video-caption">${escapeHtml(video.caption)}</p>
                            ${video.notes ? `<p class="video-notes">${escapeHtml(video.notes)}</p>` : ""}
                          </div>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderOpenVla() {
    byId("openvla-root").innerHTML = `
      <p class="section-text">${escapeHtml(content.sections.openvla.intro)}</p>
      <p class="section-note">${escapeHtml(content.sections.openvla.note)}</p>
      ${renderOpenVlaTable(content.table_rows.openvla)}
      ${renderVideoModules(content.openvla_modules)}
    `;
  }

  function renderPi05() {
    byId("pi05-root").innerHTML = `
      <p class="section-text">${escapeHtml(content.sections.pi05.intro)}</p>
      ${renderPi05Table(content.table_rows.pi05)}
      <div class="note-block">
        <strong>Important caveat.</strong>
        <p class="section-text">${escapeHtml(content.sections.pi05.caveat)}</p>
      </div>
      ${renderVideoModules(content.pi05_modules)}
    `;
  }

  function renderMethod() {
    byId("method-root").innerHTML = `
      <div class="method-grid">
        ${content.sections.method.cards
          .map(
            (card) => `
              <article class="method-card">
                <h3>${escapeHtml(card.title)}</h3>
                <p class="section-text">${escapeHtml(card.body)}</p>
              </article>
            `
          )
          .join("")}
      </div>
      ${content.sections.method.notes
        .map((note) => `<p class="section-note">${escapeHtml(note)}</p>`)
        .join("")}
    `;
  }

  function renderArtifacts() {
    byId("artifacts-root").innerHTML = `
      <p class="artifact-intro">${escapeHtml(content.sections.artifacts.intro)}</p>
      <div class="download-grid">
        ${content.downloads
          .map(
            (download) => `
              <article class="download-card">
                <a href="${escapeHtml(download.href)}">${escapeHtml(download.label)}</a>
              </article>
            `
          )
          .join("")}
      </div>
      <div class="artifact-browser">
        ${content.artifact_groups
          .map(
            (group) => `
              <details class="artifact-group">
                <summary>
                  <div class="artifact-summary">
                    <span class="artifact-title">${escapeHtml(group.title)}</span>
                    <span class="artifact-count">${group.files.length} files</span>
                  </div>
                </summary>
                <div class="artifact-body">
                  <p class="artifact-description">${escapeHtml(group.description)}</p>
                  <ul class="artifact-list">
                    ${group.files
                      .map(
                        (file) => `
                          <li><a href="${escapeHtml(file.src)}">${escapeHtml(file.name)}</a></li>
                        `
                      )
                      .join("")}
                  </ul>
                </div>
              </details>
            `
          )
          .join("")}
      </div>
    `;
  }

  function loadVideo(video) {
    if (!video || video.getAttribute("src")) return;
    const src = video.dataset.src;
    if (src) {
      video.setAttribute("src", src);
      video.load();
    }
  }

  function wireLazyVideos() {
    const videos = Array.from(document.querySelectorAll("[data-lazy-video='true']"));
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideo(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "240px 0px" }
    );

    videos.forEach((video) => {
      observer.observe(video);
      video.addEventListener(
        "play",
        () => {
          loadVideo(video);
        },
        { once: true }
      );
    });
  }

  function wirePlaybackControls() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;

      const module = button.closest(".module");
      if (!module) return;

      const videos = Array.from(module.querySelectorAll("video"));
      if (!videos.length) return;

      if (button.dataset.action === "play-group") {
        videos.forEach((video) => {
          loadVideo(video);
          const promise = video.play();
          if (promise && typeof promise.catch === "function") {
            promise.catch(() => {});
          }
        });
      }

      if (button.dataset.action === "reset-group") {
        videos.forEach((video) => {
          video.pause();
          try {
            video.currentTime = 0;
          } catch (error) {
            // Ignore seek failures on unloaded media.
          }
        });
      }
    });
  }

  renderHero();
  renderCoreClaim();
  renderParagraphs("why-problem-root", content.sections.why_problem.paragraphs);
  renderOpenVla();
  renderPi05();
  byId("shortcut-root").innerHTML = `
    <p class="section-text">${escapeHtml(content.sections.shortcuts.intro)}</p>
    ${renderVideoModules(content.shortcut_modules)}
  `;
  byId("composition-root").innerHTML = `
    <p class="section-text">${escapeHtml(content.sections.composition.intro)}</p>
    ${renderVideoModules(content.composition_modules)}
  `;
  renderMethod();
  renderArtifacts();
  wireLazyVideos();
  wirePlaybackControls();
})();
