function loadRideData() {

  // e.preventDefault();
  fetch("https://cycling4life.herokuapp.com")

    .then(res => res.json())
    .then(data => {
      let rideData = data;

      console.log(rideData);
      let length = rideData.length;
      for (let i = 0; i < length; i++) {
        // let displayDiv = document.getElementById("displayDiv");
        // const rowDiv = document.createElement('div');

        // // Checking to see if seperate containers are being created
        // if (i % 2 === 0) {
        //     rowDiv.id = "white";
        // }
        // // Creating column effect within each row
        // displayDiv.append(rowDiv);
        // const row2Div = document.createElement('div');
        // row2Div.className = "div";
        // displayDiv.append(row2Div)
        // const row3Div = document.createElement('div');
        // row3Div.className = "div";
        // displayDiv.append(row3Div);
        // const row4Div = document.createElement('div');
        // displayDiv.append(row4Div);
        // const row5Div = document.createElement('div');
        // displayDiv.append(row5Div);

        const rowDiv = document.getElementById("nameDiv");
        const row2Div = document.getElementById("dateDiv");
        const row3Div = document.getElementById("distanceDiv");
        const row4Div = document.getElementById("locationDiv");
        const row5Div = document.getElementById("difficultyDiv");

        let nameDiv = document.createElement("div");
        nameDiv.innerHTML = rideData[i]['user_name'];
        //console.log(orgAPI[i]['user_name']);
        rowDiv.append(nameDiv);

        let dateDiv = document.createElement("div");
        dateDiv.innerHTML = rideData[i]['date_of_ride'];
        row2Div.append(dateDiv);

        let distanceDiv = document.createElement("div");
        distanceDiv.innerHTML = rideData[i]['distance'];
        row3Div.append(distanceDiv);

        let locationDiv = document.createElement("div");
        locationDiv.innerHTML = rideData[i]['location_of_ride'];
        row4Div.append(locationDiv);

        let difficultyDiv = document.createElement("div");
        difficultyDiv.innerHTML = rideData[i]['difficulty_level'];
        row5Div.append(difficultyDiv);

      };
    });
}

function loadTotalDistance() {

  fetch("https://cycling4life.herokuapp.com")
    .then(res => res.json())
    .then(data => {
      let rideData = data;
      let length = rideData.length;
      console.log(rideData);

      for (let i = 0; i < length; i++) {

        let oneDistance = rideData[i]['distance'];


        const row3Div = document.getElementById("distanceDiv");

        let distanceDiv = document.createElement("div");
        distanceDiv.innerHTML = rideData[i]['distance'];
        row3Div.append(distanceDiv);
      }


    })
}

function dateFunction() { // Capture form parameters for date of ride
  let dateValue = document.getElementById("rideDate").value;
  let url = "/rides/" + dateValue;
  console.log(dateValue);
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))

  let soloRide = data;

  const rowDiv = document.getElementById("nameDiv");
  const row2Div = document.getElementById("dateDiv");
  const row3Div = document.getElementById("distanceDiv");
  const row4Div = document.getElementById("locationDiv");
  const row5Div = document.getElementById("difficultyDiv");

  let nameDiv = document.createElement("div");
  nameDiv.innerHTML = soloData[i]['user_name'];
  //console.log(orgAPI[i]['user_name']);
  rowDiv.append(nameDiv);

  let dateDiv = document.createElement("div");
  dateDiv.innerHTML = soloData[i]['date_of_ride'];
  row2Div.append(dateDiv);

  let distanceDiv = document.createElement("div");
  distanceDiv.innerHTML = soloData[i]['distance'];
  row3Div.append(distanceDiv);

  let locationDiv = document.createElement("div");
  locationDiv.innerHTML = soloData[i]['location_of_ride'];
  row4Div.append(locationDiv);

  let difficultyDiv = document.createElement("div");
  difficultyDiv.innerHTML = rideData[i]['difficulty_level'];
  row5Div.append(difficultyDiv);

}