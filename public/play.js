var row = document.getElementById("row");

document.addEventListener("DOMContentLoaded", function () {
  var showingTable = document.getElementById("show");
  const queryString = JSON.parse(window.location.search.split("id=")[1]);
  console.log(queryString);
  axios
    .get(`http://localhost:5000/user/play?id=${queryString}`)
    .then(function (response) {
      // handle success
      console.log(response);
      // showingTable.innerHTML +=
      //   `<img style="height:50px; width:"50px"  src="http://localhost:5000/file/?path=${response.data.img_link}" class="rounded">` +
      //   "<p> TITLE: " +
      //   response.data.title +
      //   " || SONG: " +
      //   response.data.artist +
      //   "</p>" +
      //   `<audio controls>
      //   <source src="http://localhost:5000/file/?path=${response.data.song_link}" type="audio/mp3">
      //   <source src="http://localhost:5000/file/?path=${response.data.song_link}" type="audio/wmv">
      // Your browser does not support the audio element.
      // </audio>` +
      //   `<a href=http://localhost:5000/file/?path=${response.data.song_link} download=${response.data.title}>DOWNLOAD</a>`;

      row.innerHTML += `
        <tr><th scope="row"><img style="height:50px; width:"50px"  src="http://localhost:5000/file/?path=${response.data.img_link}" class="rounded"></th>
           <td>${response.data.title}</td> <td><a href=http://localhost:5000/file/?path=${response.data.song_link} download=${response.data.title}><i class="fa fa-download" style="color:black"></i></a></td>
            <td><audio controls>
            <source src="http://localhost:5000/file/?path=${response.data.song_link}" type="audio/mp3">
            <source src="http://localhost:5000/file/?path=${response.data.song_link}" type="audio/wmv">
          Your browser does not support the audio element.
          </audio></td>
            </tr>
        `;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
