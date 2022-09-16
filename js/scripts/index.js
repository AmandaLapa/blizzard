const btnDrop = document.querySelectorAll(".js-btn-menu");
const menuDrop = document.querySelectorAll(".js-menu");

btnDrop.forEach((btn, index) => {
	btn.addEventListener("click", (event) => {
		event.preventDefault();

		menuDrop.forEach((item) => {
			item.classList.remove("active");

			item.addEventListener("mouseleave", () => {
				item.classList.remove("active");
				btnDrop.forEach((itemBtn) => {
					itemBtn.classList.remove("active");
				});
			});
		});

		btnDrop.forEach((itemBtn) => {
			itemBtn.classList.remove("active");
		});

		btn.classList.add("active");
		menuDrop[index].classList.add("active");
	});
});

const progressSlide = document.querySelector(".js-progress");
let swiper_thumb = new Swiper(".slide-thumb", {
	spaceBetween: 20,
	slidesPerView: 5,
	watchSlideProgress: true,
	speed: 800,
	breakpoints: {
		320: {
			direction: "horizontal",
		},

		992: {
			direction: "vertical",
		},
	},
});
let swiper = new Swiper(".slide", {
	effect: "fade",
	speed: 800,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	thumbs: {
		swiper: swiper_thumb,
	},
	on: {
		init: function () {
			progressSlide.classList.remove("animate");
			progressSlide.classList.remove("active");
			progressSlide.classList.add("animate");
			progressSlide.classList.add("active");
		},
		slideChangeTransitionStart: function () {
			progressSlide.classList.remove("active");
			progressSlide.classList.remove("animate");
			progressSlide.classList.add("active");
		},
		slideChangeTransitionEnd: function () {
			progressSlide.classList.add("animate");
		},
	},
});

const navTabs = document.querySelectorAll(".js-nav-games li");
const tabPane = document.querySelectorAll(".js-tab-content");

navTabs[0].classList.add("active");
tabPane[0].classList.add("active");

navTabs.forEach((nav, index) => {
	nav.addEventListener("click", (event) => {
		event.preventDefault();

		navTabs.forEach((itemNav) => {
			itemNav.classList.remove("active");
		});

		tabPane.forEach((tab) => {
			tab.classList.remove("active");
		});

		nav.classList.add("active");
		tabPane[index].classList.add("active");
	});
});

//modal
const btnModal = document.querySelector(".js-open-modal");
const fecharModal = document.querySelector(".js-fechar-modal");
btnModal.addEventListener("click", (event) => {
	event.preventDefault();

	let html = document.documentElement;
	html.classList.add("show-modal");
});

fecharModal.addEventListener("click", () => {
	let html = document.documentElement;
	html.classList.remove("show-modal");
});

//menu mobile
const btnMenu = document.querySelectorAll(".js-btn-menu-mobile");
btnMenu.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.documentElement.classList.toggle("menu-opened");
	});
});

//submenu mobile
const btnMenuMobile = document.querySelectorAll(".js-drop-mobile");
const menuMobile = document.querySelectorAll(".js-sub-menu");
const btnFecharMobile = document.querySelectorAll(".js-back-sub-menu");
btnMenuMobile.forEach((btn, index) => {
	btn.addEventListener("click", (event) => {
		event.preventDefault();

		menuMobile.forEach((menu) => {
			menu.classList.remove("active");
		});

		menuMobile[index].classList.add("active");
	});
});

btnFecharMobile.forEach((fechar) => {
	fechar.addEventListener("click", () => {
		menuMobile.forEach((menu) => {
			menu.classList.remove("active");
		});
	});
});
