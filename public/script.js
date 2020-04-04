// var showingTable = document.getElementById("show");
var row = document.getElementById("row");

document.addEventListener("DOMContentLoaded", function () {
  // code...
  axios
    .get("http://localhost:5000/user")
    .then(function (response) {
      // handle success
      console.log(response);
      for (var i = 0; i < response.data["length"]; i++) {
        // showingTable.innerHTML +=
        //   `<img style="height:50px; width:"50px"  src="http://localhost:5000/file/?path=${response.data[i].img_link}" class="rounded">` +
        //   "<p> Title " +
        //   response.data[i].title +
        //   " || Artist: " +
        //   response.data[i].artist +
        //   " || Check it out " +
        //   `<a href=play?id=${response.data[i].id}>play / download</a>
        // ` +
        //   "</p>";

        row.innerHTML += `
        <tr><th scope="row"><img style="height:50px; width:"50px"  src="http://localhost:5000/file/?path=${response.data[i].img_link}" class="rounded"></th>
            <td>${response.data[i].artist}</td>
            <td>${response.data[i].title}</td>
            <td><a href=play?id=${response.data[i].id}><i class="fa fa-play" style="color:black;"></i></a></td></tr>
        `;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

var searchBtn = document.getElementById("search-btn");
var search = document.getElementById("search");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  alert("clicked");
  row.innerHTML += "<tr></tr>";

  // axios
  //   .get(`http://localhost:5000/user/search?query=${search.value}`)
  //   .then(function (response) {
  //     // handle success
  //     console.log(response);
  //     // showingTable.innerHTML = "";
  //     for (var i = 0; i < response.data["length"]; i++) {
  //       // showingTable.innerHTML +=
  //       //   `<img style="height:50px; width:"50px"  src="http://localhost:5000/file/?path=${response.data[i].img_link}" class="rounded">` +
  //       //   "<p> TITLE: " +
  //       //   response.data[i].title +
  //       //   " || SONG: " +
  //       //   response.data[i].artist +
  //       //   " || VISIT " +
  //       //   `<a href=play?id=${response.data[i].id}>play / download</a>
  //       // ` +
  //       //   "</p>";

  //       row.innerHTML += `
  //         <tr><th scope="row"><img style="height:50px; width:"50px"  src="http://localhost:5000/file/?path=${response.data[i].img_link}" class="rounded"></th>
  //             <td>${response.data[i].artist}</td>
  //             <td>${response.data[i].title}</td>
  //             <td><a href=play?id=${response.data[i].id}>play / download</a></td></tr>
  //         `;
  //     }
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });
});
