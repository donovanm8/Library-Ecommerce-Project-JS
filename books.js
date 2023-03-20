let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += " books__loading";

  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove("books__loading");

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
      <figure class="book__img--container">
      <img
      class="book__img"
      src="${book.url}"
      alt=""
      />
      </figure>
      <div class="book__title">${book.title}</div>
      <div class="book__ratings">
      ${ratingsHTML(book.rating)}
      </div>
      <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
      </div>
      </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `<span>$${originalPrice.toFixed(2)}</span>`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(
    2
  )}</span> $${salePrice.toFixed(2)}`;
}

function ratingsHTML(bookRating) {
  let ratingsHtml = "";
  for (let i = 0; i < Math.floor(bookRating); i++) {
    ratingsHtml += `<i class="fas fa-star"></i>`;
  }
  if (!Number.isInteger(bookRating)) {
    ratingsHtml += `<i class="fas fa-star-half-alt"></i>`;
  }
  return ratingsHtml;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

renderBooks();

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.jpg",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book1.jpg",
          originalPrice: 44,
          salePrice: 19,
          rating: 3,
        },
        {
          id: 5,
          title: "Rich Dad Poor Dad",
          url: "assets/book2.jpg",
          originalPrice: 32,
          salePrice: 17,
          rating: 3.5,
        },
        {
          id: 6,
          title: "How to Win Friends & Influence People",
          url: "assets/book3.jpg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "The 4-hour Workweek",
          url: "assets/book4.jpg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4.5,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book5.jpg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 3,
        },
        {
          id: 9,
          title: "Principles",
          url: "assets/book6.jpg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Mastery",
          url: "assets/book7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Think and Grow Rich",
          url: "assets/book8.jpg",
          originalPrice: 30,
          salePrice: null,
          rating: 3,
        },
        {
          id: 12,
          title: "Japanese From Zero!",
          url: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71yv7q0Zj-L.jpg",
          originalPrice: 27,
          salePrice: null,
          rating: 3.5,
        },
      ]);
    }, Math.floor(Math.random() * 2000));
  });
}
