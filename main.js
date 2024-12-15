const generateMemeBtn = document.querySelector(
  ".meme-generator .generate-meme-btn"
);
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const memeCategoryInput = document.querySelector(".meme-category");
const errorMessage = document.querySelector(".error-message");

const updateDetails = (url, title, author) => {
  memeImage.setAttribute("src", url);
  memeTitle.innerHTML = title;
  memeAuthor.innerHTML = `Meme by: ${author}`;
  errorMessage.textContent = ''; // Clear any previous error
};

const showError = (message) => {
  memeImage.setAttribute("src", ""); // Clear image
  memeTitle.innerHTML = "No Meme Found";
  memeAuthor.innerHTML = "";
  errorMessage.textContent = message;
};

const generateMeme = () => {
  const category = memeCategoryInput.value.trim().toLowerCase();
  let url = category
    ? `https://meme-api.com/gimme/${category}`
    : "https://meme-api.com/gimme/memes";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Category not found');
      }
      return response.json();
    })
    .then((data) => {
      updateDetails(data.url, data.title, data.author);
    })
    .catch((error) => {
      showError(`Oops! The category "${category}" doesn't exist. Try another one.`);
    });
};

generateMemeBtn.addEventListener("click", generateMeme);

// Initial meme load
generateMeme();