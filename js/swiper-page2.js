//Swiper

let mainSwiper = document.querySelector(".main.swiper");
let secandSwiper = document.querySelectorAll(".swiper-sec .swiper");

let imgWidth = mainSwiper.querySelector("img").offsetWidth;
let boxWidth = secandSwiper[0].querySelector(".box").offsetWidth;
let mainSrows = document.querySelectorAll(".prodect-images .row");
let secondRows = document.querySelectorAll(".swiper-sec .row");

mainSrows.forEach((ele) => {
  ele.onclick = () => {
    mainSwiper.scrollLeft += ele.classList.contains("left")
      ? -imgWidth
      : imgWidth;
  };
});
let swiperIndex = 0;
secondRows.forEach((ele, index) => {
  ele.onclick = () => {
    if (index > 0) swiperIndex = index - 1;
    if (index > 2) swiperIndex = index - 2;
    if (index > 4) swiperIndex = index - 3;

    secandSwiper[swiperIndex].scrollLeft += ele.classList.contains("left")
      ? -secandSwiper[swiperIndex].offsetWidth
      : secandSwiper[swiperIndex].offsetWidth;
  };
});

let isDragging = false,
  startX,
  scrollLeft,
  timeOut;

function dragStart(e) {
  isDragging = true;
  e.classList.add("dragging");
  startX = e.pageX;
  scrollLeft = e.scrollLeft;
}
function dragging(e) {
  if (!isDragging) return;
  e.scrollLeft = scrollLeft - (e.pageX - startX);
}

function dragStop(swiper) {
  isDragging = false;
  swiper.classList.remove("dragging");
}

function addSlide(swiper, eleWidth) {
  let sliceWidth = Math.round(swiper.offsetWidth / eleWidth);
  let childSwiper = [...swiper.children];
  childSwiper
    .slice(-sliceWidth)
    .reverse()
    .forEach((ele) => {
      swiper.insertAdjacentHTML("afterbegin", ele.outerHTML);
    });

  childSwiper.slice(0, sliceWidth).forEach((ele) => {
    swiper.insertAdjacentHTML("beforeend", ele.outerHTML);
  });
}

function infinteLoop(swiper) {
  if (swiper.scrollLeft == 0) {
    swiper.classList.add("no-trans");
    swiper.scrollLeft = swiper.scrollWidth - 2 * swiper.offsetWidth;
    swiper.classList.remove("no-trans");
  } else if (
    Math.ceil(swiper.scrollLeft) ==
    swiper.scrollWidth - swiper.offsetWidth
  ) {
    swiper.classList.add("no-trans");
    swiper.scrollLeft = swiper.offsetWidth;
    swiper.classList.remove("no-trans");
  }
  clearInterval(timeOut);
  if (!swiper.matches(":hover")) autoPlay(swiper);
}

function autoPlay(swiper) {
  timeOut = setInterval(() => {
    swiper.scrollLeft += swiper.offsetWidth;
  }, 2000);
}

function activeSwiper(swiper) {
  swiper.addEventListener("mouseup", () => dragStop(swiper));
  swiper.addEventListener("mousedown", () => dragStart(swiper));
  swiper.addEventListener("mousemove", () => dragging(swiper));
}

activeSwiper(mainSwiper);

secandSwiper.forEach((ele) => {
  addSlide(ele, boxWidth);
  activeSwiper(ele);
  ele.addEventListener("scroll", () => infinteLoop(ele));
  ele.addEventListener("mouseenter", () => clearInterval(timeOut));
  ele.addEventListener("mouseleave", () => autoPlay(ele));
});
