/* Media + bookings + lightbox helpers for RSHÏ EPK */

(function () {
  const EMAIL = "rmanoj2717@gmail.com";
  const video = document.getElementById("floor-video");
  const playBtn = document.getElementById("video-play");
  const copyBtn = document.getElementById("copy-email");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  const tiles = document.querySelectorAll(".visual-tile[data-full]");

  function syncPlayButton() {
    if (!playBtn || !video) return;
    const show = video.paused;
    playBtn.hidden = !show;
    playBtn.setAttribute("aria-label", show ? "Play video" : "Pause video");
  }

  function tryPlay() {
    if (!video) return Promise.resolve();
    video.muted = true;
    video.setAttribute("muted", "");
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      return playPromise.then(syncPlayButton).catch(() => {
        syncPlayButton();
      });
    }
    syncPlayButton();
    return Promise.resolve();
  }

  function togglePlay() {
    if (!video) return;
    if (video.paused) {
      tryPlay();
    } else {
      video.pause();
      syncPlayButton();
    }
  }

  if (video) {
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.playsInline = true;

    if (playBtn) {
      playBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        togglePlay();
      });
    }

    // Tap the video itself to play/pause (needed on mobile)
    video.addEventListener("click", (event) => {
      event.preventDefault();
      togglePlay();
    });

    video.addEventListener("play", syncPlayButton);
    video.addEventListener("playing", syncPlayButton);
    video.addEventListener("pause", syncPlayButton);
    video.addEventListener("ended", syncPlayButton);
    video.addEventListener("loadeddata", syncPlayButton);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            tryPlay();
          } else if (!video.paused) {
            video.pause();
            syncPlayButton();
          }
        });
      },
      { threshold: [0, 0.35, 0.6] }
    );

    observer.observe(video);
    syncPlayButton();
  }

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage || !src) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    document.body.classList.remove("lightbox-open");
  }

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const src = tile.getAttribute("data-full");
      const img = tile.querySelector("img");
      openLightbox(src, img ? img.alt : "");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  if (copyBtn) {
    let resetTimer;

    copyBtn.addEventListener("click", async () => {
      clearTimeout(resetTimer);
      try {
        await navigator.clipboard.writeText(EMAIL);
      } catch (error) {
        const input = document.createElement("input");
        input.value = EMAIL;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }

      copyBtn.classList.add("is-copied");
      copyBtn.setAttribute("aria-label", "Copied");
      copyBtn.setAttribute("title", "Copied");

      resetTimer = setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        copyBtn.setAttribute("aria-label", "Copy email");
        copyBtn.setAttribute("title", "Copy");
      }, 1600);
    });
  }
})();
