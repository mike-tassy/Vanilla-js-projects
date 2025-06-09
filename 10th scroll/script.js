const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// fetch post from api
async function getPosts() {
  const res = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );

  const data = await res.json();

  return data;
}

//show post in dom
async function showPosts() {
  const posts = await getPosts();

  console.log(posts);
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class='post-title'>${post.author}</h2>
    <img src=${post.download_url} class='post-thumbnail'>
    </div>`;

    postContainer.appendChild(postEl);
  });
}

//show loader and fetch more posts
function showLoader() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

//filter post by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const thumbnail = post.querySelector(".post-thumbnail").src.toUpperCase();

    if (title.indexOf(term) > -1 || thumbnail.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// show initial posts
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});

filter.addEventListener("input", filterPosts);
