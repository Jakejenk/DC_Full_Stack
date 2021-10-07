function loadRideData() {
    // e.preventDefault();
    fetch("http://localhost:3300/rides")
    .then(res => res.json())
    .then(data => {
        let rideData = data;
    
        console.log(rideData);
        let length = rideData.length;
        for (let i = 0 ; i < length ; i++) {
            let displayDiv = document.getElementById("displayDiv");
            const rowDiv = document.createElement('div');

            // Checking to see if seperate containers are being created
            if (i % 2 === 0) {
                rowDiv.id = "white";
            }
            // Creating column effect within each row
            displayDiv.append(rowDiv);
            const row2Div = document.createElement('div');
            row2Div.className = "div";
            displayDiv.append(row2Div)
            const row3Div = document.createElement('div');
            row3Div.className = "div";
            displayDiv.append(row3Div);
            const row4Div = document.createElement('div');
            displayDiv.append(row4Div);
            const row5Div = document.createElement('div');
            displayDiv.append(row5Div);

        
            let nameDiv = document.createElement("div");
            nameDiv.innerHTML = rideData[i]['user_name'];
            //console.log(orgAPI[i]['user_name']);
            rowDiv.appendChild(nameDiv);

            let dateDiv = document.createElement("div");
            dateDiv.innerHTML = rideData[i]['date_of_ride'];
            row2Div.appendChild(dateDiv);

            let distanceDiv = document.createElement("div");
            distanceDiv.innerHTML = rideData[i]['distance'];
            row3Div.appendChild(distanceDiv);

            let locationDiv = document.createElement("div");
            locationDiv.innerHTML = rideData[i]['location_of_ride'];
            row4Div.appendChild(locationDiv);

            let difficultyDiv = document.createElement("div");
            difficultyDiv.innerHTML = rideData[i]['difficulty_level'];
            row5Div.appendChild(difficultyDiv);

        };
    });
}

function loadDistanceData(data) {
    let rideData = data['rides'];
    let length = rideData.length;
    console.log(rideData);
    
    for (let i = 0 ; i < length ; i++) {
        let displayDiv = document.getElementById("displayDiv");
        let oneDistance = rideData[i]['distance'];
        let totalDistance = oneDistance


    };
}