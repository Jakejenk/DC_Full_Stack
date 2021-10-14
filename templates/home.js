function loadRideData() {

  document.getElementById("nameDiv").innerHTML = "";
  document.getElementById("dateDiv").innerHTML = "";
  document.getElementById("distanceDiv").innerHTML = "";
  document.getElementById("locationDiv").innerHTML = "";
  document.getElementById("difficultyDiv").innerHTML = "";

  const user_name = sessionStorage.getItem("UserName");
  let url = "/rides/" + user_name;
  // console.log(user_name);
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      let rideData = data;

      // console.log(rideData);
      let length = rideData.length;
      for (let i = 0; i < length; i++) {
        // let displayDiv = document.getElementById("displayDiv");
        //     const rowDiv = document.createElement('div');

        // //  Checking to see if seperate containers are being created
        //     if (i % 2 === 0) {
        //         rowDiv.id = "white";
        //     }
        // //  Creating column effect within each row
        //     displayDiv.append(rowDiv);
        //     const row2Div = document.createElement('div');
        //     row2Div.className = "div";
        //     displayDiv.append(row2Div)
        //     const row3Div = document.createElement('div');
        //     row3Div.className = "div";
        //     displayDiv.append(row3Div);
        //     const row4Div = document.createElement('div');
        //     displayDiv.append(row4Div);
        //     const row5Div = document.createElement('div');
        //     displayDiv.append(row5Div);

        const rowDiv = document.getElementById("nameDiv");
        const row2Div = document.getElementById("dateDiv");
        const row3Div = document.getElementById("distanceDiv");
        const row4Div = document.getElementById("locationDiv");
        const row5Div = document.getElementById("difficultyDiv");

        let nameDiv = document.createElement("div");
        nameDiv.innerHTML = rideData[i]["user_name"];
        //// console.log(orgAPI[i]['user_name']);
        rowDiv.append(nameDiv);

        let dateDiv = document.createElement("div");
        dateDiv.innerHTML = rideData[i]["date_of_ride"];
        row2Div.append(dateDiv);

        let distanceDiv = document.createElement("div");
        distanceDiv.innerHTML = rideData[i]["distance"] + " miles";
        row3Div.append(distanceDiv);

        let locationDiv = document.createElement("div");
        locationDiv.innerHTML = rideData[i]["location_of_ride"];
        row4Div.append(locationDiv);

        let difficultyDiv = document.createElement("div");
        difficultyDiv.innerHTML = rideData[i]["difficulty_level"];
        row5Div.append(difficultyDiv);
      }
    });
}

function loadTotalDistance() {
  fetch("http://localhost:3000/rides")
    .then((res) => res.json())
    .then((data) => {
      let rideData = data;
      let length = rideData.length;
      // console.log(rideData);
      let numArray = []

      for (let i = 0; i < length; i++) {


        let oneDistance = rideData[i]['distance'];
        let totalDistance = oneDistance
        // console.log(oneDistance);



        const row3Div = document.getElementById("distanceDiv");

        let distanceDiv = document.createElement("div");
        distanceDiv.innerHTML = totalDistance;
        row3Div.append(distanceDiv);
      }
    });
}

function dateFunction() { // Capture form parameters for date of ride
  document.getElementById("nameDiv").innerHTML = "";
  document.getElementById("dateDiv").innerHTML = "";
  document.getElementById("distanceDiv").innerHTML = "";
  document.getElementById("locationDiv").innerHTML = "";
  document.getElementById("difficultyDiv").innerHTML = "";

  let rideDate = document.getElementById("dateRide").value;
  const user_name = sessionStorage.getItem("UserName");
  let url = "/rides/" + user_name + "/" + rideDate;
  // console.log(rideDate);
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {

      let soloRide = data;

      const rowDiv = document.getElementById("nameDiv");
      const row2Div = document.getElementById("dateDiv");
      const row3Div = document.getElementById("distanceDiv");
      const row4Div = document.getElementById("locationDiv");
      const row5Div = document.getElementById("difficultyDiv");

      let nameDiv = document.createElement("div");
      nameDiv.innerHTML = soloRide['user_name'];
      //// console.log(orgAPI[i]['user_name']);
      rowDiv.append(nameDiv);

      let dateDiv = document.createElement("div");
      dateDiv.innerHTML = soloRide['date_of_ride'];
      row2Div.append(dateDiv);

      let distanceDiv = document.createElement("div");
      distanceDiv.innerHTML = soloRide['distance'] + " miles";
      row3Div.append(distanceDiv);

      let locationDiv = document.createElement("div");
      locationDiv.innerHTML = soloRide['location_of_ride'];
      row4Div.append(locationDiv);

      let difficultyDiv = document.createElement("div");
      difficultyDiv.innerHTML = soloRide['difficulty_level'];
      row5Div.append(difficultyDiv);
    });

}

function fillProfile() {
  const user_name = sessionStorage.getItem("UserName");
  let url = "/users/" + user_name;
  if ((user_name != "No One") && (user_name != null)) {
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        let rideData = data;

        const nameDiv = document.getElementById("nameProfile");
        const skillDiv = document.getElementById("skillProfile");

        nameDiv.innerHTML = rideData[0].first_name;

        skillDiv.innerHTML = rideData[0].skill_level;
      });
  }
}

function postNewRide() {
  const sessionUserName = sessionStorage.getItem("UserName")
  fetch("http://localhost:3000/rides", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: sessionUserName,
        date_of_ride: document.getElementById("date_of_ride").value,
        location_of_ride: document.getElementById("location_of_ride").value,
        distance: document.getElementById("distance").value,
        difficulty_level: document.querySelector('input[name="difficulty_level"]:checked').value,
      }),
    })
    .then(res => (res.json()))
    .then(res => {
      console.log("Ride added section");
      if (res.status === "Ride added!") {
        alert("Ride added!");
      }
    })
}