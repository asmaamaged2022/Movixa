function printMovieCard(movie) {
  return `
        <div class="swiper-slide movieCard mx-auto" data-id="${movie.id}">
          <img src="./images/${movie.poster}" alt="${movie.title}" />
          <div class="layout">
            <div class="info px-3 py-2">
              <div class="text mb-3 ms-2">
                <div class="mb-3 name">${movie.title}</div>
                <div class="year mb-1">${movie.year}</div>
                <div class="category">${movie.type}</div>
              </div>
              <button onclick= goToMovie(${movie.id}) class="mainbtn  px-4">
                <span class="me-1">Watch</span>
                <img src="./Icon/recommendation.gif" alt="" />
              </button>
            </div>
          </div>
        </div>`;
}
function printMovieCardInCategories(movie) {
  return `
    <div class="col-xl-3 col-lg-4 col-md-6  mb-4">
        ${printMovieCard(movie)}
    </div>
    `;
}
function printMovieCardInCategoriesPopup(movie) {
  return `
    <div class=" col-lg-4 col-md-6  mb-4">
        ${printMovieCard(movie)}
    </div>
    `;
}
function printCategoryPopupContent(category, name) {
  let title = categoryPopup.querySelector(".header span");
  categoryPopupContent.innerHTML = ``;
  title.innerHTML = name;
  category.forEach((element) => {
    categoryPopupContent.innerHTML += `
        ${printMovieCardInCategoriesPopup(element)}
        `;
  });
}
function goToMovie(id) {
  localStorage.setItem("movieId", id);
  window.location.href = "movie.html";
}
function openPopup(type) {
  if (type == "category") {
    categoryPopup.classList.remove("d-none");
    let currentCategoryType = document.querySelector("#Categories ul button.active");
    switch (currentCategoryType.dataset.type) {
      case "All":
        printCategoryPopupContent(allMovies, "All Movies");
        break;
      case "Comedy":
        printCategoryPopupContent(Comedy, "Comedy");
        break;
      case "Family":
        printCategoryPopupContent(Family, "Family");
        break;
      case "Kids":
        printCategoryPopupContent(Kids, "Kids");
        break;
      case "Adventure":
        printCategoryPopupContent(Adventure, " Adventure");
        break;
      default:
        break;
    }
    setTimeout(() => {
      categoryPopup.classList.add("show");
    }, 100);
  }
  if (type == "Search") {
    searchPopup.classList.remove("d-none");
    setTimeout(() => {
      searchPopup.classList.add("show");
    }, 100);
  }
  if (type == "contact") {
    contactPopup.classList.remove("d-none");
    setTimeout(() => {
      contactPopup.classList.add("show");
    }, 100);
  }
}
globalPopupContent.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

function closePopup() {
  globalPopup.forEach((item) => {
    item.classList.remove("show");
  });
  setTimeout(() => {
    globalPopup.forEach((item) => {
      item.classList.add("d-none");
    });
    searchInput.value = "";
    printSearchPopupContent(allMovies);
  }, 1000);
}

let timer;
searchInput.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let searchValue = searchInput.value.trim().toLowerCase(),
      result = allMovies.filter((movie) => movie.title.toLowerCase().includes(searchValue));
    printSearchPopupContent(result);
  }, 500);
});
function printSearchPopupContent(list) {
  searchPopupContent.innerHTML = ``;
  if (list.length > 0) {
    list.forEach((element) => {
      searchPopupContent.innerHTML += `
        ${printMovieCardInCategoriesPopup(element)}
        `;
    });
  } else {
    searchPopupContent.innerHTML = `
     <div class="alert mt-3 text-center alert-warning" role="alert">
      Not Found!
     </div>
     `;
  }
}
