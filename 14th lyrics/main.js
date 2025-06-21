const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// search by song or artist
async function searchSongs(term) {
  // fetch(`${apiURL}/suggest/${term}`);
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

//show song and artist in DOM
function showData(data) {
  // let output = "";

  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //     <span>
  //       <strong>${song.artist.name}</strong> - ${song.title}
  //     </span>
  //     <button class='btn' data-artist='${song.artist.name}' data-songTitle='${song.title}'>Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  // <ul class='songs'>
  //   ${output}
  // </ul>
  // `;

  // pefered method using template literals , same result as above , but cleaner.
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) => `<li>
      <span>
        <strong>${song.artist.name}</strong> - ${song.title}
      </span>
      <button class='btn' data-artist='${song.artist.name}' data-songTitle='${song.title}'>Get Lyrics</button>
    </li>`
    )
    .join("")}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class='btn' onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ``
    }
    ${
      data.next
        ? `<button class='btn' onclick="getMoreSongs('${data.next}')">Next</button>`
        : ``
    }
    `;
  } else {
    more.innerHTML = "";
  }

  console.log(data);
}

//function to get prev and next results
async function getMoreSongs(url) {
  const res = await fetch(` https://corsproxy.io/?${url}`);
  const data = await res.json();

  showData(data);
}

//get lyrics for a song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  clg;

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>
  `;

  more.innerHTML = "";
}

//Event Listners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please enter a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songTitle");

    getLyrics(artist, songTitle);
  }
});
