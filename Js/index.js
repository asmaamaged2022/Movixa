let SwiperContent1 = document.querySelector(".mySwiper1 .swiper-wrapper"),
  SwiperContent2 = document.querySelector(".mySwiper2 .swiper-wrapper"),
  contentRowAll = document.querySelector("#Categories .content .allMovies .box"),
  contentRowComedy = document.querySelector("#Categories .content .comedy .box"),
  contentRowFamily = document.querySelector("#Categories .content .family .box"),
  contentRowKids = document.querySelector("#Categories .content .kids .box"),
  contentRowAdventure = document.querySelector("#Categories .content .adventure .box"),
  categoryPopup = document.querySelector(`.popup[data-type="category"]`),
  globalPopup = document.querySelectorAll(".popup"),
  globalPopupContent = document.querySelectorAll(".popup .box,.box1,.box2"),
  categoryPopupContent = document.querySelector(`.popup[data-type="category"] .box .content .row`),
  searchPopupContent = document.querySelector(`.popup[data-type="Search"] .box .content .row`),
  searchPopup = document.querySelector(`.popup[data-type="Search"]`),
  contactPopup = document.querySelector(`.popup[data-type="contact"]`),
  loginPopup = document.querySelector(`.popup[data-type="login"]`),
  loginPopupBox1 = document.querySelector(`.popup[data-type="login"] .box1`),
  loginPopupBox2 = document.querySelector(`.popup[data-type="login"] .box2`),
  searchInput = document.querySelector("#search"),
  allMovies = [],
  Family = [],
  Kids = [],
  Adventure = [],
  Comedy = [],
  loading = document.querySelector(".loading"),
  body = document.querySelector("body");

//* Latest swiper && Data
(function () {
  fetch("https://asmaamaged2022.github.io/MovixaAPI/latest.json")
    .then((response) => response.json())
    .then((data) => {
      let latest = data.Latest;
      SwiperContent1.innerHTML = "";
      latest.forEach((film) => {
        SwiperContent1.innerHTML += `
        ${printMovieCard(film)}
      `;
      });
      let swiper1 = new Swiper(".mySwiper1", {
        effect: "coverflow",
        grabCursor: true,
        slidesPerView: "auto",
        loop: true,
        centeredSlides: true,
        speed: 1500,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        coverflowEffect: {
          rotate: 10,
          stretch: -10,
          depth: -50,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
})();
//* allMoviesData && loading Page
Promise.all([
  fetch("https://asmaamaged2022.github.io/MovixaAPI/movies_All.json")
    .then((response) => response.json())
    .then((data) => {
      allMovies = data.AllMovies;
      contentRowAll.innerHTML = "";
      for (let i = 0; i < 40; i += 5) {
        contentRowAll.innerHTML += printMovieCardInCategories(data.AllMovies[i]);
      }

      printSearchPopupContent(allMovies);
    }),

  new Promise((resolve) => setTimeout(resolve, 3000)),
]).then(() => {
  loading.classList.remove("show");
  body.classList.remove("hiddenScroll");
  setTimeout(() => {
    loading.classList.add("d-none");
  }, 500);
});
//* Top10 swiper && Data
(function () {
  fetch("https://asmaamaged2022.github.io/MovixaAPI/top10.json")
    .then((response) => response.json())
    .then((data) => {
      let top10 = data.Top10;
      SwiperContent2.innerHTML = "";

      top10.forEach((film) => {
        SwiperContent2.innerHTML += printMovieCard(film);
      });

      new Swiper(".mySwiper2", {
        effect: "coverflow",
        grabCursor: true,
        slidesPerView: "auto",
        loop: true,
        centeredSlides: true,
        speed: 1500,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        coverflowEffect: {
          rotate: 10,
          stretch: -10,
          depth: -50,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    })
    .catch((error) => console.error(error));
})();

//* AdventureData
(function () {
  fetch("https://asmaamaged2022.github.io/MovixaAPI/adventure.json")
    .then((response) => response.json())
    .then((data) => {
      Adventure = data.Adventure;
      contentRowAdventure.innerHTML = ``;
      for (let i = 0; i < 8; i++) {
        contentRowAdventure.innerHTML += `
        ${printMovieCardInCategories(data.Adventure[i])}
        `;
      }
    });
})();

//* comedyData
(function () {
  fetch("https://asmaamaged2022.github.io/MovixaAPI/comedy.json")
    .then((response) => response.json())
    .then((data) => {
      Comedy = data.Comedy;
      contentRowComedy.innerHTML = ``;
      for (let i = 0; i < 8; i++) {
        contentRowComedy.innerHTML += `
        ${printMovieCardInCategories(data.Comedy[i])}
        `;
      }
    });
})();

//* kidsData
(function () {
  fetch("https://asmaamaged2022.github.io/MovixaAPI/kides.json")
    .then((response) => response.json())
    .then((data) => {
      Kids = data.Kids;
      contentRowKids.innerHTML = ``;
      for (let i = 0; i < 8; i++) {
        contentRowKids.innerHTML += `
        ${printMovieCardInCategories(data.Kids[i])}
        `;
      }
    });
})();

//* familyData
(function () {
  fetch("https://asmaamaged2022.github.io/MovixaAPI/family.json")
    .then((response) => response.json())
    .then((data) => {
      Family = data.Family;
      contentRowFamily.innerHTML = ``;
      for (let i = 0; i < 8; i++) {
        contentRowFamily.innerHTML += `
        ${printMovieCardInCategories(data.Family[i])}
        `;
      }
    });
})();
