document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".hero_section",
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
    scrub: true,
  });

  ScrollTrigger.create({
    trigger: ".work-with-us-video",
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
    scrub: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".work-with-us-section");
  if (!section) return;

  const revealWrap = section.querySelector(".video-reveal-wrap");
  if (!revealWrap) return;

  gsap.fromTo(
    revealWrap,
    {
      clipPath: "inset(0% 31% 0% 31% round 28px)",
    },
    {
      clipPath: "inset(0% 0% 0% 0% round 18px)",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "top 15%",
        scrub: 1.4,
        invalidateOnRefresh: true,
      },
    },
  );
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  function setupPinnedScroll(sectionSelector, movingSelector) {
    const section = document.querySelector(sectionSelector);
    const moving = section?.querySelector(movingSelector);

    if (!section || !moving) return;

    function getDistance() {
      return Math.max(
        1,
        moving.scrollHeight - section.offsetHeight + window.innerHeight * 0.7,
      );
    }

    gsap.to(moving, {
      y: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + getDistance(),
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  setupPinnedScroll(".breakdown-section", ".breakdown-col-2");

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 700);
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const oldText = document.querySelector(".breakdown-col-1");
  const headingText = document.querySelector(
    ".breakdown-col-1 .heading-container-left-align .h2-with-underline",
  );
  const subTitle = document.querySelector(
    ".breakdown-col-1 .section-sub-title",
  );
  const bodyText = document.querySelector(".breakdown-col-1 p");

  const steps = gsap.utils.toArray(".bd-steps");
  const lastStep = steps[steps.length - 1];

  if (!oldText || !headingText || !subTitle || !bodyText || !lastStep) return;

  const originalHeading = headingText.textContent;
  const originalSubTitle = subTitle.textContent;
  const originalBodyText = bodyText.textContent;

  let changed = false;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: lastStep,
      start: "bottom center",
      end: "+=400",
      scrub: 1,
      markers: false,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (self.progress >= 0.5 && !changed) {
          headingText.textContent = "VIDEO THAT CONVERTS";
          subTitle.textContent = "WHY VIDEO";
          bodyText.textContent =
            "We love bringing ideas to life, and we’ve fine-tuned a process that makes it easy, fun, and effective. Whether you’ve got a clear vision or just a rough idea, we’ll guide you through every step.";
          changed = true;
        }

        if (self.progress < 0.5 && changed) {
          headingText.textContent = originalHeading;
          subTitle.textContent = originalSubTitle;
          bodyText.textContent = originalBodyText;
          changed = false;
        }
      },
    },
  });

  tl.to(
    oldText,
    {
      x: "663.13px",
      ease: "none",
      duration: 1,
    },
    0,
  );

  tl.to(
    [headingText, subTitle, bodyText],
    {
      y: -20,
      filter: "blur(6px)",
      ease: "none",
      duration: 0.5,
    },
    0,
  );

  tl.to(
    [headingText, subTitle, bodyText],
    {
      y: 0,
      filter: "blur(0px)",
      ease: "none",
      duration: 0.5,
    },
    0.5,
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".ta-cards-number");

  counters.forEach(function (el) {
    const originalText = el.textContent.trim();
    const number = originalText.replace(/[^0-9.]/g, "");
    const suffix = originalText.replace(/[0-9.,]/g, "");

    el.dataset.number = number;
    el.dataset.suffix = suffix;
    el.textContent = "0" + suffix;
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const el = entry.target;

        if (entry.isIntersecting) {
          const counter = new countUp.CountUp(el, el.dataset.number, {
            duration: 2,
            suffix: el.dataset.suffix,
          });

          counter.start();
        } else {
          el.textContent = "0" + el.dataset.suffix;
        }
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
});

$("[carousel='component']").each(function () {
  let componentEl = $(this);
  let wrapEl = componentEl.find("[carousel='wrap']");

  let logoEl = componentEl.find("#featured-work-logo");

  // if (logoEl.length && !logoEl.parent().is(wrapEl)) {
  //   wrapEl.append(logoEl);
  // }

  let swiperEl = componentEl.find(".swiper");
  let listEl = wrapEl.find(".carousel_list");
  let itemEl = listEl.children();
  let nextEl = componentEl.find("[carousel='next']");
  let prevEl = componentEl.find("[carousel='prev']");
  let totalArc = 180;
  let rotateAmount = totalArc / (itemEl.length - 1);
  let zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
  let negTranslate = `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
  let posTranslate = `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;

  wrapEl.css("--3d-carousel-z", negTranslate);
  wrapEl.css("perspective", posTranslate);

  itemEl.each(function (index) {
    $(this).css(
      "transform",
      `rotateY(${rotateAmount * index - 300}deg) translateZ(${posTranslate})`,
    );
  });

  let introTl = gsap.timeline({
    onComplete: () => {
      swiperCode();
    },
  });
  introTl.to(wrapEl, { opacity: 1, duration: 0.3 });
  introTl.fromTo(
    wrapEl,
    { "--3d-carousel-rotate": 100, "--3d-carousel-rotate-x": -90 },
    {
      "--3d-carousel-rotate": 0,
      "--3d-carousel-rotate-x": -4,
      duration: 4,
      ease: "power2.inOut",
    },
    "<",
  );
  introTl.to("[fade-up]", { opacity: 1 }, ">-0.3");

  function swiperCode() {
    console.log("swiperCode running");
    const logo = document.querySelector("#featured-work-logo");
    let tl = gsap.timeline({ paused: true });
    tl.fromTo(
      wrapEl,
      { "--3d-carousel-rotate": 0 },
      {
        "--3d-carousel-rotate": -(totalArc + rotateAmount + 180),
        duration: 1,
        ease: "none",
      },
    );

    let progress = { value: 0 };

    const swiper = new Swiper(swiperEl[0], {
      effect: "creative",
      creativeEffect: {
        prev: { translate: [0, "-100%", 0], scale: 0.5, opacity: 0 },
        next: { translate: [0, "100%", 0], scale: 0.5, opacity: 0 },
      },
      grabCursor: true,
      keyboard: true,
      speed: 500,
      mousewheel: false,
      navigation: { nextEl: nextEl[0], prevEl: prevEl[0] },
    });

    let vimeoPlayers = [];
    let hiddenSlides = new Set();
    let seenSlides = new Set();
    let logoActivated = false;

    function setupVimeoPlayers() {
      itemEl.each(function (index) {
        const slide = $(this);
        const oldIframe = slide.find("iframe")[0];
        if (!oldIframe) return;

        let oldSrc = oldIframe.getAttribute("src") || "";
        if (oldSrc.startsWith("//")) {
          oldSrc = window.location.protocol + oldSrc;
        }

        let directVimeoSrc = null;
        try {
          const oldUrl = new URL(oldSrc, window.location.href);
          if (oldUrl.hostname.includes("player.vimeo.com")) {
            directVimeoSrc = oldUrl.href;
          }
          if (oldUrl.hostname.includes("embedly.com")) {
            const embeddedSrc = oldUrl.searchParams.get("src");
            if (embeddedSrc && embeddedSrc.includes("player.vimeo.com")) {
              directVimeoSrc = embeddedSrc;
            }
          }
        } catch (e) {
          console.log("Could not parse iframe src", e);
        }

        if (!directVimeoSrc) return;

        const vimeoUrl = new URL(directVimeoSrc, window.location.href);
        vimeoUrl.searchParams.set("muted", "1");
        vimeoUrl.searchParams.set("autoplay", "0");
        vimeoUrl.searchParams.set("loop", "1");
        vimeoUrl.searchParams.set("playsinline", "1");
        vimeoUrl.searchParams.set("autopause", "0");
        vimeoUrl.searchParams.set("controls", "0");

        const newIframe = document.createElement("iframe");
        newIframe.src = vimeoUrl.toString();
        newIframe.className = oldIframe.className;
        newIframe.width = oldIframe.getAttribute("width") || "1920";
        newIframe.height = oldIframe.getAttribute("height") || "1080";
        newIframe.title = oldIframe.getAttribute("title") || "Vimeo video";
        newIframe.setAttribute("frameborder", "0");
        newIframe.setAttribute("scrolling", "no");
        newIframe.setAttribute(
          "allow",
          "autoplay; fullscreen; encrypted-media; picture-in-picture",
        );
        newIframe.setAttribute("allowfullscreen", "true");

        oldIframe.parentNode.replaceChild(newIframe, oldIframe);

        if (window.Vimeo && Vimeo.Player) {
          const player = new Vimeo.Player(newIframe);
          player.setMuted(true).catch(() => {});
          player.pause().catch(() => {});
          vimeoPlayers[index] = player;
        }
      });
    }

    function playSlideVideo(slideIndex) {
      vimeoPlayers.forEach(function (player, index) {
        if (!player) return;
        if (index === slideIndex) {
          player.pause().catch(() => {});
        } else {
          player.pause().catch(() => {});
        }
      });
    }

    setupVimeoPlayers();

    function normalizeAngle(angle) {
      angle = angle % 360;
      if (angle < 0) angle += 360;
      return angle;
    }

    function hidePassedSlides(scrollDirection) {
      const ringRotation = Number(
        gsap.getProperty(wrapEl[0], "--3d-carousel-rotate"),
      );

      itemEl.each(function (index) {
        const baseAngle = rotateAmount * index - 300;
        const currentAngle = normalizeAngle(baseAngle + ringRotation);

        if (currentAngle >= 320 || currentAngle <= 20) {
          seenSlides.add(index);
        }

        const rect = this.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;

        if (seenSlides.has(index) && slideCenter < window.innerWidth * 0.05) {
          this.classList.add("ready-to-hide");
        }

        let opacity = 1;

        if (
          scrollDirection === -1 &&
          hiddenSlides.has(index) &&
          currentAngle > 205
        ) {
          hiddenSlides.delete(index);
        }

        if (
          seenSlides.has(index) &&
          currentAngle <= 225 &&
          currentAngle >= 205
        ) {
          if (!logoActivated) {
            logoActivated = true;
            logo?.classList.add("show");
          }
          const progress = (225 - currentAngle) / 20;
          opacity = 1 - progress;
        }

        if (
          scrollDirection === 1 &&
          seenSlides.has(index) &&
          currentAngle <= 205 &&
          currentAngle >= 90
        ) {
          hiddenSlides.add(index);
        }

        if (hiddenSlides.has(index)) {
          opacity = 0;
        }

        this.style.opacity = opacity;
        this.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
      });

      const sliderContainer = document.querySelector(
        "#featured-work-slider-container",
      );

      if (logoActivated) {
        sliderContainer?.classList.add("logo-active");
        logo?.classList.add("show");
      }

      if (scrollDirection === -1 && hiddenSlides.size === 0) {
        logoActivated = false;
        sliderContainer?.classList.remove("logo-active");
        logo?.classList.remove("show");
      }
    }

    const sliderNode = componentEl[0];
    const triggerId = "featured-work-slider-pin-" + componentEl.index();

    if (ScrollTrigger.getById(triggerId)) {
      ScrollTrigger.getById(triggerId).kill(true);
    }

    function getSliderScrollLength() {
      return Math.max(
        window.innerHeight * 2.2,
        (itemEl.length + 1) * window.innerHeight * 0.65,
      );
    }

    ScrollTrigger.create({
      trigger: sliderNode,
      pin: sliderNode,
      start: "top top",
      end: () => "+=" + getSliderScrollLength(),
      scrub: true,
      animation: tl,

      onUpdate: (self) => {
        hidePassedSlides(self.direction);
      },

      onLeave: () => {
        const featuredWorks = document.querySelector(
          "#vertical-featured-works-section",
        );
        if (!featuredWorks) return;
        gsap.set(featuredWorks, { zIndex: 100, clearProps: "transform" });
        ScrollTrigger.refresh();
      },

      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.create({
      trigger: sliderNode,
      onLeaveBack: () => {
        hiddenSlides.clear();
        seenSlides.clear();
        logoActivated = false;

        document
          .querySelector("#featured-work-slider-container")
          ?.classList.remove("logo-active");

        logo?.classList.remove("show");

        itemEl.each(function () {
          this.style.opacity = "1";
          this.style.pointerEvents = "auto";
        });
      },
    });

    requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const sliderContainer = document.querySelector(
    "#featured-work-slider-container",
  );

  if (!sliderContainer) return;

  gsap.to(sliderContainer, {
    x: "0%",
    rotation: 0,
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: sliderContainer,
      start: "top 90%",
      end: "top 4%",
      scrub: true,
    },
  });
});
window.addEventListener("load", function () {
  gsap.delayedCall(0.2, function () {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
});

$("[carousel='component']").each(function () {
  let componentEl = $(this);
  let wrapEl = componentEl.find("[carousel='wrap']");

  let logoEl = componentEl.find("#featured-work-logo");

  if (logoEl.length && !logoEl.parent().is(wrapEl)) {
    wrapEl.append(logoEl);
  }

  let swiperEl = componentEl.find(".swiper");
  let listEl = wrapEl.find(".carousel_list");
  let itemEl = listEl.children();
  let nextEl = componentEl.find("[carousel='next']");
  let prevEl = componentEl.find("[carousel='prev']");
  let totalArc = 180;
  let rotateAmount = totalArc / (itemEl.length - 1);
  let zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
  let negTranslate = `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
  let posTranslate = `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;

  wrapEl.css("--3d-carousel-z", negTranslate);
  wrapEl.css("perspective", posTranslate);

  itemEl.each(function (index) {
    $(this).css(
      "transform",
      `rotateY(${rotateAmount * index - 300}deg) translateZ(${posTranslate})`,
    );
  });

  let introTl = gsap.timeline({
    onComplete: () => {
      swiperCode();
    },
  });
  introTl.to(wrapEl, { opacity: 1, duration: 0.3 });
  introTl.fromTo(
    wrapEl,
    { "--3d-carousel-rotate": 100, "--3d-carousel-rotate-x": -90 },
    {
      "--3d-carousel-rotate": 0,
      "--3d-carousel-rotate-x": -4,
      duration: 4,
      ease: "power2.inOut",
    },
    "<",
  );
  introTl.to("[fade-up]", { opacity: 1 }, ">-0.3");

  function swiperCode() {
    console.log("swiperCode running");
    const logo = document.querySelector("#featured-work-logo");
    let tl = gsap.timeline({ paused: true });
    tl.fromTo(
      wrapEl,
      { "--3d-carousel-rotate": 0 },
      {
        "--3d-carousel-rotate": -(totalArc + rotateAmount + 180),
        duration: 1,
        ease: "none",
      },
    );

    let progress = { value: 0 };

    const swiper = new Swiper(swiperEl[0], {
      effect: "creative",
      creativeEffect: {
        prev: { translate: [0, "-100%", 0], scale: 0.5, opacity: 0 },
        next: { translate: [0, "100%", 0], scale: 0.5, opacity: 0 },
      },
      grabCursor: true,
      keyboard: true,
      speed: 500,
      mousewheel: false,
      navigation: { nextEl: nextEl[0], prevEl: prevEl[0] },
    });

    let vimeoPlayers = [];
    let hiddenSlides = new Set();
    let seenSlides = new Set();
    let logoActivated = false;

    function setupVimeoPlayers() {
      itemEl.each(function (index) {
        const slide = $(this);
        const oldIframe = slide.find("iframe")[0];
        if (!oldIframe) return;

        let oldSrc = oldIframe.getAttribute("src") || "";
        if (oldSrc.startsWith("//")) {
          oldSrc = window.location.protocol + oldSrc;
        }

        let directVimeoSrc = null;
        try {
          const oldUrl = new URL(oldSrc, window.location.href);
          if (oldUrl.hostname.includes("player.vimeo.com")) {
            directVimeoSrc = oldUrl.href;
          }
          if (oldUrl.hostname.includes("embedly.com")) {
            const embeddedSrc = oldUrl.searchParams.get("src");
            if (embeddedSrc && embeddedSrc.includes("player.vimeo.com")) {
              directVimeoSrc = embeddedSrc;
            }
          }
        } catch (e) {
          console.log("Could not parse iframe src", e);
        }

        if (!directVimeoSrc) return;

        const vimeoUrl = new URL(directVimeoSrc, window.location.href);
        vimeoUrl.searchParams.set("muted", "1");
        vimeoUrl.searchParams.set("autoplay", "0");
        vimeoUrl.searchParams.set("loop", "1");
        vimeoUrl.searchParams.set("playsinline", "1");
        vimeoUrl.searchParams.set("autopause", "0");
        vimeoUrl.searchParams.set("controls", "0");

        const newIframe = document.createElement("iframe");
        newIframe.src = vimeoUrl.toString();
        newIframe.className = oldIframe.className;
        newIframe.width = oldIframe.getAttribute("width") || "1920";
        newIframe.height = oldIframe.getAttribute("height") || "1080";
        newIframe.title = oldIframe.getAttribute("title") || "Vimeo video";
        newIframe.setAttribute("frameborder", "0");
        newIframe.setAttribute("scrolling", "no");
        newIframe.setAttribute(
          "allow",
          "autoplay; fullscreen; encrypted-media; picture-in-picture",
        );
        newIframe.setAttribute("allowfullscreen", "true");

        oldIframe.parentNode.replaceChild(newIframe, oldIframe);

        if (window.Vimeo && Vimeo.Player) {
          const player = new Vimeo.Player(newIframe);
          player.setMuted(true).catch(() => {});
          player.pause().catch(() => {});
          vimeoPlayers[index] = player;
        }
      });
    }

    function playSlideVideo(slideIndex) {
      vimeoPlayers.forEach(function (player, index) {
        if (!player) return;
        if (index === slideIndex) {
          player.pause().catch(() => {});
        } else {
          player.pause().catch(() => {});
        }
      });
    }

    setupVimeoPlayers();

    function normalizeAngle(angle) {
      angle = angle % 360;
      if (angle < 0) angle += 360;
      return angle;
    }

    function hidePassedSlides(scrollDirection) {
      const ringRotation = Number(
        gsap.getProperty(wrapEl[0], "--3d-carousel-rotate"),
      );

      itemEl.each(function (index) {
        const baseAngle = rotateAmount * index - 300;
        const currentAngle = normalizeAngle(baseAngle + ringRotation);

        if (currentAngle >= 320 || currentAngle <= 20) {
          seenSlides.add(index);
        }

        const rect = this.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;

        if (seenSlides.has(index) && slideCenter < window.innerWidth * 0.05) {
          this.classList.add("ready-to-hide");
        }

        let opacity = 1;

        if (
          scrollDirection === -1 &&
          hiddenSlides.has(index) &&
          currentAngle > 205
        ) {
          hiddenSlides.delete(index);
        }

        if (
          seenSlides.has(index) &&
          currentAngle <= 225 &&
          currentAngle >= 205
        ) {
          if (!logoActivated) {
            logoActivated = true;
            logo?.classList.add("show");
          }
          const progress = (225 - currentAngle) / 20;
          opacity = 1 - progress;
        }

        if (
          scrollDirection === 1 &&
          seenSlides.has(index) &&
          currentAngle <= 205 &&
          currentAngle >= 90
        ) {
          hiddenSlides.add(index);
        }

        if (hiddenSlides.has(index)) {
          opacity = 0;
        }

        this.style.opacity = opacity;
        this.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
      });

      const sliderContainer = document.querySelector(
        "#featured-work-slider-container",
      );

      if (logoActivated) {
        sliderContainer?.classList.add("logo-active");
        logo?.classList.add("show");
      }

      if (scrollDirection === -1 && hiddenSlides.size === 0) {
        logoActivated = false;
        sliderContainer?.classList.remove("logo-active");
        logo?.classList.remove("show");
      }
    }

    const sliderNode = componentEl[0];
    const triggerId = "featured-work-slider-pin-" + componentEl.index();

    if (ScrollTrigger.getById(triggerId)) {
      ScrollTrigger.getById(triggerId).kill(true);
    }

    function getSliderScrollLength() {
      return Math.max(
        window.innerHeight * 2.2,
        (itemEl.length + 1) * window.innerHeight * 0.65,
      );
    }

    ScrollTrigger.create({
      trigger: sliderNode,
      pin: sliderNode,
      start: "top top",
      end: () => "+=" + getSliderScrollLength(),
      scrub: true,
      animation: tl,

      onUpdate: (self) => {
        hidePassedSlides(self.direction);
      },

      onLeave: () => {
        const featuredWorks = document.querySelector(
          "#vertical-featured-works-section",
        );
        if (!featuredWorks) return;
        gsap.set(featuredWorks, { zIndex: 100, clearProps: "transform" });
        ScrollTrigger.refresh();
      },

      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.create({
      trigger: sliderNode,
      onLeaveBack: () => {
        hiddenSlides.clear();
        seenSlides.clear();
        logoActivated = false;

        document
          .querySelector("#featured-work-slider-container")
          ?.classList.remove("logo-active");

        logo?.classList.remove("show");

        itemEl.each(function () {
          this.style.opacity = "1";
          this.style.pointerEvents = "auto";
        });
      },
    });

    requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  }
});

window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const IMAGE_URL =
    "https://cdn.prod.website-files.com/6a142cb034a033b145ebd1f5/6a39b93f2e322725c880106f_6a16a49876dae3dc706d08bc_3babd786db30d821d2cefbe0e9f85e9bd9c737d8%20(1)-modified.jpg";

  const section = document.querySelector(".webgl-reveal-section");
  const sticky = document.querySelector(".webgl-reveal-sticky");
  const canvas = document.querySelector(".webgl-reveal-canvas");
  const img = document.querySelector(".webgl-reveal-img");

  if (!section || !sticky || !canvas || !img) {
    console.error("WebGL reveal elements missing");
    return;
  }

  img.src = IMAGE_URL;
  img.crossOrigin = "anonymous";

  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setClearColor(0x111111, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = "anonymous";

  const texture = textureLoader.load(
    IMAGE_URL,
    function () {
      resize();
      ScrollTrigger.refresh();
      console.log("WebGL reveal image loaded");
    },
    undefined,
    function (error) {
      console.error("Texture failed to load:", error);
    },
  );

  const uniforms = {
    uTexture: { value: texture },
    uProgress: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uImageResolution: { value: new THREE.Vector2(1, 1) },

    // Higher value = smaller pixels
    uPixelSize: { value: window.innerWidth < 768 ? 48 : 80 },
  };

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uProgress;
    uniform vec2 uResolution;
    uniform vec2 uImageResolution;
    uniform float uPixelSize;

    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    vec2 coverUv(vec2 uv, vec2 screenSize, vec2 imageSize) {
      vec2 s = screenSize;
      vec2 i = imageSize;

      float screenRatio = s.x / s.y;
      float imageRatio = i.x / i.y;

      vec2 newSize = screenRatio < imageRatio
        ? vec2(i.x * s.y / i.y, s.y)
        : vec2(s.x, i.y * s.x / i.x);

      vec2 offset = (screenRatio < imageRatio
        ? vec2((newSize.x - s.x) / 2.0, 0.0)
        : vec2(0.0, (newSize.y - s.y) / 2.0)) / newSize;

      return uv * s / newSize + offset;
    }

    void main() {
      vec2 uv = coverUv(vUv, uResolution, uImageResolution);

      // Top-to-bottom reveal direction
      float topToBottom = 1.0 - vUv.y;

      // Smaller pixel grid
      vec2 gridUv = floor(vUv * uPixelSize) / uPixelSize;
      float noise = random(gridUv);

      // Slight organic edge
      float threshold = topToBottom + noise * 0.12;

      // Main reveal mask
      float reveal = smoothstep(
        threshold - 0.12,
        threshold + 0.12,
        uProgress * 1.12
      );

      // Start pixelated, then sharpen quickly
      vec2 pixelUv = floor(uv * uPixelSize) / uPixelSize + 0.5 / uPixelSize;
      vec2 finalUv = mix(pixelUv, uv, smoothstep(0.18, 0.85, uProgress));

      // More subtle distortion
      finalUv.y += (1.0 - reveal) * 0.025 * sin(vUv.x * 18.0 + uProgress * 5.0);

      vec4 color = texture2D(uTexture, finalUv);

      gl_FragColor = vec4(color.rgb, reveal);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
  });

  const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  function resize() {
    const width = sticky.offsetWidth;
    const height = sticky.offsetHeight;

    renderer.setSize(width, height, false);

    uniforms.uResolution.value.set(width, height);

    // Higher number = smaller pixels
    uniforms.uPixelSize.value = window.innerWidth < 768 ? 48 : 80;

    if (texture.image) {
      uniforms.uImageResolution.value.set(
        texture.image.width,
        texture.image.height,
      );
    }
  }

  window.addEventListener("resize", function () {
    resize();
    ScrollTrigger.refresh();
  });

  gsap.to(uniforms.uProgress, {
    value: 1,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",

      // Reduced scroll distance
      end: "+=80%",

      scrub: true,
      pin: sticky,
      markers: true,
    },
  });

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  resize();
  animate();
});

window.onresize = function () {
  if (screen.width > 991) {
    //location.reload();
    $(".splide__arrow--next").click();
  }
};

let mySplide = new Splide(".splide2", {
  perPage: 1.66,
  gap: "20px",

  perMove: 1,
  direction: "ttb",
  autoHeight: false,
  height: "100vh",
  focus: "center",
  type: "loop",
  arrows: true,
  pagination: false,
  speed: 600,
  dragAngleThreshold: 60,
  waitForTransition: true,
  updateOnMove: true,

  breakpoints: {
    991: {
      focus: 0,
    },
    767: {
      focus: 0,
    },
    479: {
      focus: 0,
    },
  },
}).mount();

function slideChange() {
  let activeSlide = $(".splide__slide.is-active:not(.splide__slide--clone)");
  // Change background color
  let myColor = activeSlide.find(".color").css("background-color");
  $(".section.hero").css("background-color", myColor);
  // Replace button link
  let mainLink = activeSlide.find(".link1").eq(0).attr("href");
  $(".button.is--hero").eq(0).attr("href", mainLink);
  // Text Animation
  // Slide down
  $(".hero_text").eq(1).addClass("is--move");
  setTimeout(() => {
    $(".hero_text").eq(0).addClass("is--move");
  }, 100);
  // Replace text
  setTimeout(() => {
    $(".hero_text").eq(1).text(activeSlide.find(".text2").text());
  }, 300);
  setTimeout(() => {
    $(".hero_text").eq(0).text(activeSlide.find(".text1").text());
  }, 400);
  // Slide up
  setTimeout(() => {
    $(".hero_text").eq(1).removeClass("is--move");
  }, 400);
  setTimeout(() => {
    $(".hero_text").eq(0).removeClass("is--move");
  }, 500);
}

mySplide.on("move", function () {
  slideChange();
});
slideChange();

// Slide indicator
$("#tabs-section-slides-indicator h3").eq(2).text(mySplide.length);

function updateIndicator() {
  $("#tabs-section-slides-indicator h3")
    .eq(0)
    .text(mySplide.index + 1);
}

updateIndicator();

mySplide.on("moved", function () {
  updateIndicator();
});

// Arrow clicks
$(".arrow.next").click(function () {
  $(".splide__arrow--next").click();
});
$(".arrow.prev").click(function () {
  $(".splide__arrow--prev").click();
});

$("#accordion-buttons-list .w-dyn-item").each(function (index) {
  $(this).on("click", function () {
    mySplide.go(index);

    setTimeout(() => {
      playActiveSlide(index);
    }, 700);
  });
});

$("#accordion-buttons-list .w-dyn-item").click(function () {
  $("#accordion-buttons-list .w-dyn-item").each(function () {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
});

$("#accordion-buttons-list .w-dyn-item").first().addClass("active");

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector("#vertical-featured-works-section");

  if (!section) return;

  let vimeoPlayers = [];

  function setupVerticalVimeo() {
    const slides = section.querySelectorAll(
      ".splide__slide:not(.splide__slide--clone)",
    );

    slides.forEach((slide, index) => {
      const iframe = slide.querySelector("iframe");

      if (!iframe) return;

      let src = iframe.getAttribute("src");

      if (!src) return;

      // Convert Embedly Vimeo to direct Vimeo
      if (src.includes("embedly.com")) {
        const url = new URL(src, window.location.href);

        const embedSrc = url.searchParams.get("src");

        if (embedSrc) {
          iframe.src = decodeURIComponent(embedSrc);
        }
      }

      iframe.src +=
        (iframe.src.includes("?") ? "&" : "?") +
        "autoplay=0&muted=1&loop=1&background=1";

      if (window.Vimeo && Vimeo.Player) {
        const player = new Vimeo.Player(iframe);

        player.setMuted(true);

        vimeoPlayers[index] = player;
      }
    });

    playActiveSlide(0);
  }

  window.playActiveSlide = function (index) {
    vimeoPlayers.forEach((player, i) => {
      if (!player) return;

      if (i === index) {
        player.play().catch(() => {});
      } else {
        player.pause().catch(() => {});
        player.setCurrentTime(0).catch(() => {});
      }
    });
  };

  ScrollTrigger.create({
    trigger: section,

    start: "top 80%",

    once: true,

    onEnter: () => {
      setupVerticalVimeo();
    },
  });
});

$(document).ready(function () {
  function checkUnderlineAnimation() {
    var scrollTop = $(window).scrollTop();
    var viewportHeight = $(window).height();
    var viewportMiddle = scrollTop + viewportHeight / 2;
    var viewportBottom = scrollTop + viewportHeight;

    $(".txt-orrange-underline").each(function () {
      var $el = $(this);

      var top = $el.offset().top;
      var bottom = top + $el.outerHeight();

      // Add when it reaches the middle
      if (viewportMiddle >= top && viewportMiddle <= bottom) {
        $el.addClass("animate");
      }

      // Remove only when completely out of view
      if (bottom < scrollTop || top > viewportBottom) {
        $el.removeClass("animate");
      }
    });
  }

  checkUnderlineAnimation();

  $(window).on("scroll resize", checkUnderlineAnimation);
});
