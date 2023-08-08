//Swiper

let mainSwiper = document.querySelector(".main-swiper");
let secandSwiper = document.querySelectorAll(".swiper-sec .swiper");

let imgWidth = mainSwiper.querySelector("img").offsetWidth;
let boxWidth = secandSwiper[0].querySelector(".box").offsetWidth;
let mainSrows = document.querySelectorAll(".sale-div .row");
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
      ? -boxWidth
      : boxWidth;
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

function infinteLoop(swiper, eleWidth) {
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
}

function autoPlay(swiper, eleWidth) {
  timeOut = setInterval(() => {
    swiper.scrollLeft += eleWidth;
  }, 2000);
}

function activeSwiper(swiper, eleWidth) {
  swiper.addEventListener("mouseup", () => dragStop(swiper));
  swiper.addEventListener("scroll", () => infinteLoop(swiper, eleWidth));
  swiper.addEventListener("mousedown", () => dragStart(swiper));
  swiper.addEventListener("mousemove", () => dragging(swiper));
  swiper.addEventListener("mouseenter", () => clearInterval(timeOut));
  swiper.addEventListener("mouseleave", () => autoPlay(swiper, eleWidth));
}
addSlide(mainSwiper, imgWidth);
autoPlay(mainSwiper, imgWidth);
activeSwiper(mainSwiper, imgWidth);

secandSwiper.forEach((ele) => {
  addSlide(ele, boxWidth);

  ele.addEventListener("mouseup", () => dragStop(ele));
  ele.addEventListener("scroll", () => infinteLoop(ele, boxWidth));
  ele.addEventListener("mousedown", () => dragStart(ele));
  ele.addEventListener("mousemove", () => dragging(ele));
});
