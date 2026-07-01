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

$(document).ready(function () {
  var $header = $("#site-header");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 0) {
      $header.addClass("header-scrolling");
    } else {
      $header.removeClass("header-scrolling");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (typeof THREE === "undefined" || typeof gsap === "undefined") {
    console.warn("Unified logo: needs THREE + GSAP loaded first");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const logo = document.querySelector("#featured-work-logo");
  const stage = document.querySelector(".brand_work");
  const carousel = document.querySelector("#featured-work-slider-container");
  if (!stage) {
    console.warn("Unified logo: .brand_work not found");
    return;
  }
  if (!logo || logo.tagName !== "CANVAS") {
    console.warn("Unified logo: #featured-work-logo must be a <canvas>");
    return;
  }

  const cols = gsap.utils.toArray(".our-brand-col-1, .our-brand-col-2"); // content to sit ABOVE logo
  const leftKids = gsap.utils.toArray(".our-brand-col-1 > *");
  const reel = document.querySelector(".our-brand-col-2 .splide2");
  const rightRows = gsap.utils.toArray("#accordion-buttons-list .w-dyn-item");

  /* ---------- tunables ---------- */
  const CFG = {
    restPitch: (-12 * Math.PI) / 180,
    tip: (80 * Math.PI) / 180,
    swivel: (22 * Math.PI) / 180,
    baseScale: 1.15,
    endScale: 0.5,
    cameraZ: 2.3,
    logoSpan: 0.55,
    end: "+=260%",
    freezeLeadVh: 0.4,
    overlayZ: 1000, // z used only during the gap (logo alone on top)
  };

  if (stage.parentElement)
    gsap.set(stage.parentElement, { clearProps: "transform" });

  /* ---------- embedded GLB + inline parser ---------- */
  const GLB_B64 =
    "Z2xURgIAAAD0FQAAkAgAAEpTT057ImFzc2V0Ijp7ImdlbmVyYXRvciI6Iktocm9ub3MgZ2xURiBCbGVuZGVyIEkvTyB2NS4xLjE5IiwidmVyc2lvbiI6IjIuMCJ9LCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3NwZWN1bGFyIl0sInNjZW5lIjowLCJzY2VuZXMiOlt7Im5hbWUiOiJTY2VuZSIsIm5vZGVzIjpbMF19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJUTV9UIiwicm90YXRpb24iOlswLjcwNzEwNjgyODY4OTU3NTIsMCwwLDAuNzA3MTA2ODI4Njg5NTc1Ml0sInRyYW5zbGF0aW9uIjpbLTAuMDY2MDIyMjAyMzcyNTUwOTYsLTAuMDAzNzE2MjgyMDgwODU4OTQ2LDAuMDIzMzMyMjA0NjY5NzEzOTc0XX1dLCJtYXRlcmlhbHMiOlt7ImRvdWJsZVNpZGVkIjp0cnVlLCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfc3BlY3VsYXIiOnsic3BlY3VsYXJGYWN0b3IiOjB9fSwibmFtZSI6IlNWR01hdC4wMDIiLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJtZXRhbGxpY0ZhY3RvciI6MH19LHsiZG91YmxlU2lkZWQiOnRydWUsIm5hbWUiOiJTVkdNYXQuMDAzIiwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMSwwLjA4NDM3NjIzODI4NjQ5NTIxLDAuMDAwOTEwNTgxMDMxMzQ4NTU2MywxXSwibWV0YWxsaWNGYWN0b3IiOjB9fV0sIm1lc2hlcyI6W3sibmFtZSI6IkN1cnZlLjAwMiIsInByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIk5PUk1BTCI6MSwiVEVYQ09PUkRfMCI6Mn0sImluZGljZXMiOjMsIm1hdGVyaWFsIjowfSx7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjQsIk5PUk1BTCI6NSwiVEVYQ09PUkRfMCI6Nn0sImluZGljZXMiOjcsIm1hdGVyaWFsIjoxfV19XSwiYWNjZXNzb3JzIjpbeyJidWZmZXJWaWV3IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MzgsIm1heCI6WzAuMDY1NzU5MTIyMzcxNjczNTgsMC4wNTAwMDAwMDA3NDUwNTgwNiwtMC4wMDM1MjcxMDQ4NTQ1ODM3NDAyXSwibWluIjpbMCwtMC4wNTAwMDAwMDA3NDUwNTgwNiwtMC4wNTQzMTc0MTQ3NjA1ODk2XSwidHlwZSI6IlZFQzMifSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjozOCwidHlwZSI6IlZFQzMifSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjozOCwidHlwZSI6IlZFQzIifSx7ImJ1ZmZlclZpZXciOjMsImNvbXBvbmVudFR5cGUiOjUxMjMsImNvdW50Ijo4NCwidHlwZSI6IlNDQUxBUiJ9LHsiYnVmZmVyVmlldyI6NCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjU0LCJtYXgiOlswLjE2NDUzODkxOTkyNTY4OTcsMC4wNTAwMDAwMDA3NDUwNTgwNiwtMC4wMDM1MjcxMDQ4NTQ1ODM3NDAyXSwibWluIjpbMC4wNzcwNDgyNDIwOTIxMzI1NywtMC4wNTAwMDAwMDA3NDUwNTgwNiwtMC4wNTQzMTc0MTQ3NjA1ODk2XSwidHlwZSI6IlZFQzMifSx7ImJ1ZmZlclZpZXciOjUsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo1NCwidHlwZSI6IlZFQzMifSx7ImJ1ZmZlclZpZXciOjYsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo1NCwidHlwZSI6IlZFQzIifSx7ImJ1ZmZlclZpZXciOjcsImNvbXBvbmVudFR5cGUiOjUxMjMsImNvdW50IjoxNDQsInR5cGUiOiJTQ0FMQVIifV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVMZW5ndGgiOjQ1NiwiYnl0ZU9mZnNldCI6MCwidGFyZ2V0IjozNDk2Mn0seyJidWZmZXIiOjAsImJ5dGVMZW5ndGgiOjQ1NiwiYnl0ZU9mZnNldCI6NDU2LCJ0YXJnZXQiOjM0OTYyfSx7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AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAPQENT8AAAAA9AQ1v/QENT8AAAAA9AQ1v/QENT8AAAAA9AQ1v/QENT8AAAAA9AQ1v/QENT8AAAAA9AQ1P/QENT8AAAAA9AQ1P/QENb8AAAAA9AQ1P/QENb8AAAAA9AQ1P/7EnL4AAAAAU7RzP/7EnL4AAAAAU7RzP1LL6T4AAAAAkcBjP1LL6T4AAAAAkcBjP1LL6b4AAAAAkcBjP1LL6b4AAAAAkcBjP/7EnD4AAAAAU7RzP/7EnD4AAAAAU7RzP/QENT8AAAAA9AQ1P/QENT8AAAAA9AQ1P/QENb8AAAAA9AQ1P/QENb8AAAAA9AQ1P/QENb8AAAAA9AQ1v/QENb8AAAAA9AQ1v0jC4j4AAAAADYZlv0jC4j4AAAAADYZlv1JJnTkAAAAAAACAv1JJnTkAAAAAAACAv3ed4r4AAAAAJI9lv3ed4r4AAAAAJI9lvwAAAAAAAIA/q6qqPQAAgD+rqio+AACAPwAAgD4AAIA/q6qqPgAAgD9VVdU+AACAPwAAAD8AAIA/VVUVPwAAgD+rqio/AACAPwAAQD8AAIA/VVVVPwAAgD+rqmo/AACAPwAAgD8AAIA/AAAAAAAAgD+rqqo9AACAP6uqKj4AAIA/AACAPgAAgD+rqqo+AACAP1VV1T4AAIA/AAAAPwAAgD9VVRU/AACAP6uqKj8AAIA/AABAPwAAgD9VVVU/AACAP6uqaj8AAIA/AACAPwAAgD8AAAAAAACAPwAAgD8AAIA/AAAAAAAAAAAAAIA/AAAAANmJnT0AAIA/2YmdPQAAAADZiR0+AACAP9mJHT4AAAAAxU5sPgAAgD/FTmw+AAAAANmJnT4AAIA/2YmdPgAAAABP7MQ+AACAP0/sxD4AAAAAxU7sPgAAgD/FTuw+AAAAAJ7YCT8AAIA/ntgJPwAAAADZiR0/AACAP9mJHT8AAAAAFDsxPwAAgD8UOzE/AAAAAE/sRD8AAIA/T+xEPwAAAACKnVg/AACAP4qdWD8AAAAAxU5sPwAAgD/FTmw/AAAAAAgACgAJAAgABgAKAAYACwAKAAsAAAAMAAsAAwAAAAMAAQAAAAgABwAGAAUACwAGAAsABAADAAIAAQADAAUABAALABUAFgAXABUAFwATABMAFwAYABgAGQANABgADQAQABAADQAOABUAEwAUABIAEwAYABgAEAARAA8AEAAOABIAGAARABwAHwAeABwAHgAaAB8AIQAgAB8AIAAeACEAIwAiACEAIgAgACMAJQAkACMAJAAiACUAJwAmACUAJgAkACcAKQAoACcAKAAmACkAKwAqACkAKgAoACsALQAsACsALAAqAC0ALwAuAC0ALgAsAC8AMQAwAC8AMAAuADEAMwAyADEAMgAwADMANQA0ADMANAAyADUAHQAbADUAGwA0AA==";
  function b64buf(b) {
    const s = atob(b),
      n = s.length,
      u = new Uint8Array(n);
    for (let i = 0; i < n; i++) u[i] = s.charCodeAt(i);
    return u.buffer;
  }
  function parseGLB(buf) {
    const dv = new DataView(buf),
      total = dv.getUint32(8, true);
    let off = 12,
      json = null,
      bin = null;
    while (off < total) {
      const clen = dv.getUint32(off, true),
        ct = dv.getUint32(off + 4, true),
        st = off + 8;
      if (ct === 0x4e4f534a)
        json = JSON.parse(
          new TextDecoder().decode(new Uint8Array(buf, st, clen)),
        );
      else if (ct === 0x004e4942) bin = buf.slice(st, st + clen);
      off = st + clen;
    }
    const CT = {
      5126: Float32Array,
      5123: Uint16Array,
      5125: Uint32Array,
      5121: Uint8Array,
    };
    const NUM = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
    const read = (i) => {
      const a = json.accessors[i],
        bv = json.bufferViews[a.bufferView];
      return new CT[a.componentType](
        bin,
        (bv.byteOffset || 0) + (a.byteOffset || 0),
        a.count * NUM[a.type],
      );
    };
    const g = new THREE.Group();
    json.meshes[0].primitives.forEach((p) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(read(p.attributes.POSITION), 3),
      );
      if (p.attributes.NORMAL != null)
        geo.setAttribute(
          "normal",
          new THREE.BufferAttribute(read(p.attributes.NORMAL), 3),
        );
      if (p.indices != null)
        geo.setIndex(new THREE.BufferAttribute(read(p.indices), 1));
      const mat = (json.materials && json.materials[p.material]) || {},
        pbr = mat.pbrMetallicRoughness || {};
      const c = pbr.baseColorFactor || [1, 1, 1, 1],
        col = new THREE.Color(c[0], c[1], c[2]);
      col.convertSRGBToLinear();
      g.add(
        new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color: col,
            metalness: pbr.metallicFactor ?? 0,
            roughness: pbr.roughnessFactor ?? 0.55,
          }),
        ),
      );
    });
    const n = json.nodes[0];
    if (n.translation) g.position.fromArray(n.translation);
    if (n.rotation) g.quaternion.fromArray(n.rotation);
    if (n.scale) g.scale.fromArray(n.scale);
    return g;
  }

  /* ---------- scene ---------- */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
  camera.position.set(0, 0, CFG.cameraZ);
  const renderer = new THREE.WebGLRenderer({
    canvas: logo,
    antialias: true,
    alpha: true,
  });
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x22222a, 0.75));
  [
    [2, 3, 4, 2.0],
    [-3, 1, 2, 0.6],
    [0, 2, -4, 0.9],
  ].forEach(([x, y, z, i]) => {
    const d = new THREE.DirectionalLight(0xffffff, i);
    d.position.set(x, y, z);
    scene.add(d);
  });

  let logoGroup = null;
  try {
    const model = parseGLB(b64buf(GLB_B64));
    let box = new THREE.Box3().setFromObject(model);
    const sz = box.getSize(new THREE.Vector3());
    model.scale.multiplyScalar(1 / (Math.max(sz.x, sz.y, sz.z) || 1));
    box = new THREE.Box3().setFromObject(model);
    model.position.sub(box.getCenter(new THREE.Vector3()));
    logoGroup = new THREE.Group();
    logoGroup.add(model);
    logoGroup.scale.setScalar(CFG.baseScale);
    scene.add(logoGroup);
  } catch (e) {
    console.error("Unified logo GLB parse failed:", e);
  }

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)),
    lerp = (a, b, t) => a + (b - a) * t;
  function setRot(a) {
    if (!logoGroup) return;
    logoGroup.rotation.x = CFG.restPitch + CFG.tip * a;
    logoGroup.rotation.y = Math.sin(a * Math.PI) * CFG.swivel;
  }
  setRot(0);

  let lw = 0,
    lh = 0;
  (function loop() {
    const w = logo.clientWidth,
      h = logo.clientHeight;
    if (w > 1 && h > 1) {
      if (w !== lw || h !== lh) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        lw = w;
        lh = h;
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(loop);
  })();

  /* ---------- logo home + state machine (home | overlay | stage) ---------- */
  const home = logo.parentElement;
  let overlay = null,
    state = "home",
    dx = 0,
    dy = 0;

  function capture() {
    const r = logo.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return null;
    dx = window.innerWidth / 2 - (r.left + r.width / 2);
    dy = window.innerHeight / 2 - (r.top + r.height / 2);
    return r;
  }
  function placeFixed(r, z) {
    Object.assign(logo.style, {
      position: "fixed",
      top: r.top + "px",
      left: r.left + "px",
      width: r.width + "px",
      height: r.height + "px",
      margin: "0",
      zIndex: String(z),
      pointerEvents: "none",
      display: "block",
    });
  }
  function raiseContent(on) {
    if (on) gsap.set(cols, { position: "relative", zIndex: 2 });
    else gsap.set(cols, { clearProps: "zIndex,position" });
  }

  function toOverlay() {
    // gap hold: logo alone on top
    if (state === "overlay") return;
    const r = capture();
    if (!r) return;
    if (!overlay) {
      overlay = document.createElement("div");
      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
      });
      document.body.appendChild(overlay);
    }
    overlay.style.zIndex = String(CFG.overlayZ);
    overlay.appendChild(logo);
    placeFixed(r, CFG.overlayZ + 1);
    if (state === "stage") raiseContent(false);
    state = "overlay";
  }
  function toStage() {
    // flatten: logo behind content, above bg
    if (state === "stage") return;
    const r = capture();
    if (!r) return;
    stage.appendChild(logo); // inside .brand_work stacking context
    placeFixed(r, 1); // z-index 1 (above bg)
    raiseContent(true); // content -> z-index 2 (above logo)
    state = "stage";
  }
  function toHome() {
    // back to the carousel
    if (state === "home") return;
    raiseContent(false);
    logo.removeAttribute("style");
    home.appendChild(logo);
    setRot(0);
    state = "home";
  }

  const hide = () =>
    gsap.set([reel, ...leftKids, ...rightRows].filter(Boolean), { opacity: 0 });
  hide();

  /* catch the logo just before the carousel releases */
  if (carousel) {
    const items = carousel.querySelectorAll(".carousel_item").length || 7;
    const carLen = () =>
      Math.max(
        window.innerHeight * 2.2,
        (items + 1) * window.innerHeight * 0.65,
      );
    ScrollTrigger.create({
      trigger: carousel,
      start: "top top",
      end: () =>
        "+=" + Math.max(1, carLen() - window.innerHeight * CFG.freezeLeadVh),
      onLeave: toOverlay,
      onEnterBack: toHome,
    });
  }

  /* .brand_work drives the flatten */
  ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: CFG.end,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    onEnter: toStage,
    onEnterBack: toStage,
    onLeave: toHome,
    onLeaveBack: () => {
      toOverlay();
      hide();
    },

    onUpdate: (self) => {
      const p = self.progress,
        a = clamp(p / CFG.logoSpan, 0, 1);
      setRot(a);
      if (state === "stage" || state === "overlay")
        gsap.set(logo, {
          x: dx * a,
          y: dy * a,
          scale: lerp(1, CFG.endScale, a),
          opacity: 1 - clamp((p - 0.45) / 0.15, 0, 1),
          transformOrigin: "center",
        });

      if (reel)
        gsap.set(reel, {
          opacity: clamp((p - 0.42) / 0.28, 0, 1),
          scale: lerp(0.7, 1, clamp((p - 0.42) / 0.3, 0, 1)),
          transformOrigin: "center",
        });

      const b = clamp((p - 0.58) / 0.42, 0, 1);
      rightRows.forEach((r, i) => {
        const d = i * 0.06,
          t = clamp((b - d) / (1 - d), 0, 1);
        gsap.set(r, { opacity: t, x: lerp(45, 0, t) });
      });
      leftKids.forEach((n, i) => {
        const d = i * 0.05,
          t = clamp((b - d) / (1 - d), 0, 1);
        gsap.set(n, { opacity: t, y: lerp(26, 0, t) });
      });
    },
  });

  ScrollTrigger.refresh();
});
