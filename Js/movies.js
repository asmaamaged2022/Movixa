let moviePage = document.querySelector(".MoviePage"),
  id = localStorage.getItem("movieId"),
  loading = document.querySelector(".loading"),
  body = document.querySelector("body");
  
Promise.all([
  fetch("https://asmaamaged2022.github.io/MovixaAPI/movies_All.json").then((res) => res.json()),
  new Promise((resolve) => setTimeout(resolve, 3000)),
]).then(([data]) => {
  let movie = data.AllMovies.find((item) => item.id == id);

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
      </div>
    <button onclick="goHome()" class="mainbtn py-1 px-4 mb-5 mx-auto">
      <span class="me-2">Back Home</span>
      <img src="./Icon/left-arrow.gif" alt="" />
    </button>
  `;

  loading.classList.remove("show");
  body.classList.remove("hiddenScroll");
  setTimeout(() => {
    loading.classList.add("d-none");
  }, 500);
});
function goHome() {
  window.location.replace("index.html#Categories");
}
