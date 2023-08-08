window.addEventListener("load", () =>
  document.querySelector(".loading").classList.add("close")
);

//top btn
let topBtn = document.querySelector(".top");
window.onscroll = () => {
  if (window.scrollY > 400) {
    topBtn.style.display = "flex";
  } else {
    topBtn.style.display = "none";
  }
};
topBtn.onclick = () => window.scrollTo({ top: 0 });

//mobile nav
let closeBtn = document.querySelectorAll(".close");
let openBtn = document.querySelector(".mob-menu-btn");
let mobileNav = document.querySelector(".mobile-nav");
let overLay = document.querySelector(".overlay");
openBtn.onclick = () => {
  mobileNav.classList.toggle("open");
  overLay.classList.toggle("open");
};
closeBtn.forEach((ele) => {
  ele.onclick = () => {
    if (!ele.classList.contains("return")) {
      ele.parentElement.classList.toggle("open");
      overLay.classList.toggle("open");
    } else {
      ele.parentElement.parentElement.classList.toggle("open");
      overLay.classList.toggle("open");
    }
  };
});

//open sub menu

let subMenu = document.querySelectorAll(".links-menu >li");
let menus = document.querySelectorAll(".links-menu li a");

menus.forEach((menu) => {
  if (menu.parentNode.children.length >= 2) {
    let moreBtn = document.createElement("span");
    moreBtn.className = "more";
    menu.appendChild(moreBtn);
  }
});

document.querySelectorAll(".more").forEach((btn) => {
  btn.onclick = () => {
    btn.parentElement.parentElement.classList.toggle("open");

    [...btn.parentNode.parentNode.parentNode.children].forEach((ele) => {
      if (btn.parentElement.parentElement != ele) {
        ele.classList.remove("open");
      }
    });
  };
});

//quick view
let closeView = document.querySelector(".quick-view .close");
let openView = document.querySelectorAll(".quick");
let quickView = document.querySelector(".quick-view");
let mobQuickView = document.querySelector(".mob-quick-view");
openView.forEach((ele) =>
  ele.addEventListener("click", function (event) {
    event.preventDefault();
    if (window.innerWidth < 1080) {
      mobQuickView.classList.add("open");
      overLay.classList.toggle("open");
    } else {
      quickView.classList.add("open");
    }
  })
);
window.onresize = () => {
  if (window.innerWidth < 1080) {
    if (quickView.classList.contains("open")) {
      quickView.classList.remove("open");
      mobQuickView.classList.add("open");
      overLay.classList.toggle("open");
    }
  } else {
    if (mobQuickView.classList.contains("open")) {
      mobQuickView.classList.remove("open");
      quickView.classList.add("open");
      overLay.classList.toggle("open");
    }
  }
};
closeView.onclick = () => {
  closeView.parentElement.parentElement.classList.remove("open");
};

//login
let loginBtn = document.querySelectorAll(".login");
let closeLogin = document.querySelectorAll(".sign-form .close");

let loginHolder = document.querySelectorAll(".sign-form");
loginBtn.forEach((ele, index) => {
  ele.addEventListener("click", function (event) {
    event.preventDefault();
    loginHolder[index].classList.add("open");
  });

  closeLogin[index].onclick = () => {
    loginHolder[index].classList.remove("open");
  };
});

//open recently viewed
let openRes = document.querySelector(".res");
let recentlyViewed = document.querySelector(".recently-view");
openRes.onclick = () => {
  recentlyViewed.classList.add("open");
  overLay.classList.toggle("open");
};
// CART
let openCart = document.querySelector(".cart-btn");
let cart = document.querySelector(".cart");
openCart.onclick = () => {
  cart.classList.add("open");
  overLay.classList.toggle("open");
};
// wishlist
let openWishlist = document.querySelector(".wish-btn");
let wishlist = document.querySelector(".wishlist");
openWishlist.onclick = () => {
  wishlist.classList.add("open");
  overLay.classList.toggle("open");
};

//quinty
let more = document.querySelectorAll(".qun .up");
let less = document.querySelectorAll(".qun .down");
let input = document.querySelectorAll(".qun input");

more.forEach((ele, index) => {
  ele.onclick = () => {
    input[index].value = +input[index].value + 1;
  };
});
less.forEach((ele, index) => {
  ele.onclick = () => {
    input[index].value > 1
      ? (input[index].value -= 1)
      : (input[index].value = input[index].value);
  };
});
