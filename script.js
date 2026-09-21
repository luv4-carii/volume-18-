/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (!page) return;

  page.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  setupYouTubeClick(pageId);

  setupPageGraphics(pageId);
}


/* =========================
   RESET ALL MUSIC
========================= */

function stopAllMusic() {

  const musicPlayers = [
    {
      id: "music1",
      src: "https://www.youtube.com/embed/yfzqoGrU35Y?start=78"
    },
    {
      id: "music2",
      src: "https://www.youtube.com/embed/VDcEJE633rM?start=90"
    },
    {
      id: "music3",
      src: "https://www.youtube.com/embed/sfDPlxAQ_vM?start=20"
    },
    {
      id: "music4",
      src: "https://www.youtube.com/embed/Ed99iHlL0Co?start=19"
    },
    {
      id: "music5",
      src: "https://www.youtube.com/embed/EogijWdUeXw?start=74"
    },
    {
      id: "music6",
      src: "https://www.youtube.com/embed/T5eIVmtHAdg?start=12"
    }
  ];

  musicPlayers.forEach(player => {

    const iframe = document.getElementById(player.id);

    if (!iframe) return;

    iframe.src = "";

    iframe.src = player.src;

  });


  /* Hide every scroll message */

  document.querySelectorAll(".scroll-after-click").forEach(hint => {
    hint.classList.remove("show");
  });


  /* Remove old click layers */

  document.querySelectorAll(".youtube-click-layer").forEach(layer => {
    layer.remove();
  });

}


/* =========================
   OPEN TRACK
========================= */

function openTrack(trackId) {

  stopAllMusic();

  showPage(trackId);

}


/* =========================
   BACK TO TRACKLIST
========================= */

function goToTracklist() {

  stopAllMusic();

  showPage("tracklist");

}


/* =========================
   YOUTUBE CLICK DETECTION
========================= */

function setupYouTubeClick(pageId) {

  if (!pageId.startsWith("track")) {
    return;
  }

  const trackNumber = pageId.replace("track", "");

  /* Track 7 has no music */

  if (trackNumber === "7") {
    return;
  }

  const iframe = document.getElementById(
    "music" + trackNumber
  );

  const hint = document.getElementById(
    "scrollHint" + trackNumber
  );

  if (!iframe || !hint) {
    return;
  }

  const player = iframe.parentElement;

  if (!player) {
    return;
  }


  /* Remove any existing overlay */

  const oldLayer = player.querySelector(
    ".youtube-click-layer"
  );

  if (oldLayer) {
    oldLayer.remove();
  }


  /* Create fresh click layer */

  const clickLayer = document.createElement("div");

  clickLayer.className = "youtube-click-layer";


  clickLayer.addEventListener(
    "click",
    function () {

      hint.classList.add("show");

      clickLayer.remove();

    },
    {
      once: true
    }
  );


  player.style.position = "relative";

  player.appendChild(clickLayer);

}


/* =====================================================
   PAGE GRAPHICS
===================================================== */

function setupPageGraphics(pageId) {

  const page = document.getElementById(pageId);

  if (!page) return;


  /* Only add particles to cover and track pages */

  if (pageId !== "cover" && !pageId.startsWith("track")) {
    return;
  }


  /* Remove particles that were previously created */

  page.querySelectorAll(
    ".album-particle, .track-particle"
  ).forEach(particle => {
    particle.remove();
  });


  const particleClass =
    pageId === "cover"
      ? "album-particle"
      : "track-particle";


  /* Create a controlled number of particles */

  const particleCount =
    pageId === "cover"
      ? 26
      : 22;


  for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement("span");

    particle.className = particleClass;


    /* Random starting position */

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.top =
      Math.random() * 100 + "%";


    /* Random animation duration */

    const duration =
      11 + Math.random() * 10;

    particle.style.animationDuration =
      duration + "s";


    /* Random delay so they don't move together */

    const delay =
      Math.random() * -18;

    particle.style.animationDelay =
      delay + "s";


    /* Slight size variation */

    const size =
      1.5 + Math.random() * 2.5;

    particle.style.width =
      size + "px";

    particle.style.height =
      size + "px";


    page.appendChild(particle);

  }

}


/* =========================
   STARTUP
========================= */

document.addEventListener("DOMContentLoaded", function () {

  setupYouTubeClick("track1");

  setupPageGraphics("cover");

});
