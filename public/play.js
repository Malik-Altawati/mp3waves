document.addEventListener("DOMContentLoaded", function() {
  var showingTable = document.getElementById("show");
  const queryString = JSON.parse(window.location.search.split("id=")[1]);
  console.log(queryString);
  axios
    .get(`http://localhost:5000/user/play?id=${queryString}`)
    .then(function(response) {
      // handle success
      console.log(response);
      showingTable.innerHTML +=
        `<img style="height:50px; width:"50px"  src="${response.data.img_link}" class="rounded">` +
        "<p> TITLE: " +
        response.data.title +
        " || SONG: " +
        response.data.artist +
        "</p>" +
        `<audio controls>
        <source src="${response.data.song_link}" type="audio/mp3">
        <source src="${response.data.song_link}" type="audio/wmv">
      Your browser does not support the audio element.
      </audio>` +
        `<a href=${response.data.song_link} download=${response.data.title}>DOWNLOAD</a>`;
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});
