let moviePage = document.querySelector(".MoviePage"),
  id = localStorage.getItem("movieId"),
  allMovies = JSON.parse(localStorage.getItem("AllMovies")),
  loading = document.querySelector(".loading"),
  body = document.querySelector("body");

setTimeout(() => {
  let movie = allMovies.find((item) => item.id == id);

  moviePage.innerHTML = `
    <div class="image w-100">
      <img src="./images/${movie.background}" alt="" class="img-fluid" />
    </div>
      <div class="container">
        <div class="info mt-4 mb-4">
          <div class="poster mb-3 ">
            <div class="item"><img src="./images/${movie.poster}" alt="" /></div>
          </div>
          <div class="mx-3 box">
            <div class="logo"><img src="./images/${movie.logo}" alt="" class="img-fluid" /></div>
            <div class="name mb-3">${movie.title}</div>
            <div class="additionalInfo">
              <div class="rate d-flex mb-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
             <div class="info">
              <div class="category">${movie.type}</div>
              <span class="mx-3"> | </span>
              <div class="year">${movie.year}</div></div>
            </div>
          </div>
        </div>
        <div class="description mt-3 px-2">
        ${movie.description}
        </div>

        <div class="buttons d-flex my-4">
          <button class="mainbtn px-4 me-4">
            <span class="me-1">Watch</span>
            <img src="./Icon/recommendation.gif" alt="" />
          </button>
          <button class="mainbtn px-4">
            <span class="me-1">Download</span>
            <img src="./Icon/download.gif" alt="" />
          </button>
        </div>
          <button onclick="goHome()" class="mainbtn py-1 px-4 mb-3 mx-auto">
      <span class="me-2">Back Home</span>
      <img src="./Icon/left-arrow.gif" alt="" />
    </button>
     <h2 class="relatedMovies mb-5">Related Movies : </h2>
      </div>
  
    <div class="owl-carousel owl-theme mb-5">
    
     ${printOwlItems(allMovies, movie.type)}
     </div>
  `;
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: false,
    smartSpeed: 1000,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1100: {
        items: 4,
      },
      1420: {
        items: 5,
      },
    },
  });
  loading.classList.remove("show");
  body.classList.remove("hiddenScroll");
  setTimeout(() => {
    loading.classList.add("d-none");
  }, 500);
}, 3000);
function goHome() {
  window.location.replace("index.html#Categories");
}

function printOwlItems(movies, type) {
  let content = ``;
  let category = movies.filter((item) => {
    return item.type == type;
  });
  category.forEach((element) => {
    content += `${printOwlItem(element)}`;
  });
  return content;
}

function printOwlItem(movie) {
  return ` <div class="item">
        <div class="movieCard mx-auto" data-id="${movie.id}">
          <img src="./images/${movie.poster}" alt="${movie.title}" />
          <div class="layout">
            <div class="info px-3 py-2">
              <div class="text mb-3 ms-2">
                <div class="mb-3 name">${movie.title}</div>
                <div class="year mb-1">${movie.year}</div>
                <div class="category">${movie.type}</div>
              </div>
              <button onclick= goToMovie(${movie.id}) class="mainbtn w-auto px-4">
                <span class="me-1">Watch</span>
                <img src="./Icon/recommendation.gif" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>`;
}
function goToMovie(id) {
  localStorage.setItem("movieId", id);
 if (!localStorage.getItem("AllMovies")) {
  localStorage.setItem("AllMovies", JSON.stringify(allMovies));
}
  window.location.href = "movie.html";
}
