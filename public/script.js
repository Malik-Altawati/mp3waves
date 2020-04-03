var showingTable = document.getElementById("show");

document.addEventListener("DOMContentLoaded", function() {
  // code...
  axios
    .get("http://localhost:5000/user")
    .then(function(response) {
      // handle success
      console.log(response);
      for (var i = 0; i < response.data["length"]; i++) {
        showingTable.innerHTML +=
          `<img style="height:50px; width:"50px"  src="${response.data[i].img_link}" class="rounded">` +
          "<p> TITLE: " +
          response.data[i].title +
          " || SONG: " +
          response.data[i].artist +
          " || VISIT " +
          `<a href=play?id=${response.data[i].id}>play / download</a>
        ` +
          "</p>";
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});

var searchBtn = document.getElementById("search-btn");
var search = document.getElementById("search").toLowerCase();
searchBtn.addEventListener("click", function(e) {
  e.preventDefault();

  axios
    .get(`http://localhost:5000/user/search?query=${search.value}`)
    .then(function(response) {
      // handle success
      console.log(response);
      showingTable.innerHTML = "";
      for (var i = 0; i < response.data["length"]; i++) {
        showingTable.innerHTML +=
          `<img style="height:50px; width:"50px"  src="${response.data[i].img_link}" class="rounded">` +
          "<p> TITLE: " +
          response.data[i].title +
          " || SONG: " +
          response.data[i].artist +
          " || VISIT " +
          `<a href=play?id=${response.data[i].id}>play / download</a>
        ` +
          "</p>";
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});
