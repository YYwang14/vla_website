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
        <p class="hero-lab">${escapeHtml(content.hero.lab)}</p>
        <p class="hero-subtitle">${escapeHtml(content.hero.subtitle)}</p>
      </div>
    `;
  }

  function renderIntroduction() {
    byId("introduction-root").innerHTML = `
      ${content.sections.introduction.paragraphs
        .map((paragraph) => `<p class="section-text">${escapeHtml(paragraph)}</p>`)
        .join("")}
    `;
  }

  function renderOverallResultsTable(rows) {
    return `
      <div class="table-block">
        <div class="table-title">Overall results on Spatial and Object</div>
        <table class="results-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Condition</th>
              <th>Scope</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <td>${escapeHtml(row.model)}</td>
                    <td>${escapeHtml(row.condition)}</td>
                    <td>${escapeHtml(row.scope)}</td>
                    <td>${escapeHtml(row.result)}</td>
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

  function renderResults() {
    byId("results-root").innerHTML = `
      <p class="section-text">${escapeHtml(content.sections.results.intro)}</p>
      ${renderOverallResultsTable(content.overall_results)}
      <div class="highlight-claim">${escapeHtml(content.sections.results.highlight)}</div>
    `;
  }

  function renderOpenVla() {
    byId("openvla-root").innerHTML = `
      <p class="section-text">${escapeHtml(content.sections.openvla.intro)}</p>
      ${renderVideoModules(content.openvla_modules)}
      <div class="section-conclusion">${escapeHtml(content.sections.openvla.conclusion)}</div>
    `;
  }

  function renderPi05() {
    byId("pi05-root").innerHTML = `
      <p class="section-text">${escapeHtml(content.sections.pi05.intro)}</p>
      ${renderVideoModules(content.pi05_modules)}
      <p class="section-note">${escapeHtml(content.sections.pi05.note)}</p>
    `;
  }

  function renderShuffle() {
    byId("shuffle-root").innerHTML = `
      <p class="section-text">${escapeHtml(content.sections.shuffle.intro)}</p>
      ${renderVideoModules(content.shortcut_modules)}
    `;
  }

  function renderConclusion() {
    byId("conclusion-root").innerHTML = `
      ${content.sections.conclusion.paragraphs
        .map((paragraph) => `<p class="section-text">${escapeHtml(paragraph)}</p>`)
        .join("")}
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
  renderIntroduction();
  renderResults();
  renderOpenVla();
  renderPi05();
  renderShuffle();
  renderConclusion();
  wireLazyVideos();
  wirePlaybackControls();
})();
