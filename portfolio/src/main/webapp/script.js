// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

window.onload = loadPage;

/**
 * Function to allow multiple function calls on page load.
 */
function loadPage() {
  linkMapAPI();
  showNextPicture();
  checkUserLoginStatus();
  getMessages();
  drawChart();
  createMap();
}

async function linkMapAPI() {
  var mapAPIScript = document.createElement("script");
  mapAPIScript.type = "text/javascript";
  mapAPIScript.src = "https://maps.googleapis.com/maps/api/js?key="+config.map_API+"&callback=createMap";
  var configFile = document.getElementById("configFile");
  var head = document.getElementsByTagName("head")[0];
  head.insertBefore(mapAPIScript, configFile.nextSibling);
}

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {

  const greetings =
      ['I have a younger sister.', 'Martin Clunes once narrated a short story I wrote.',
      'I live near the sea!', 'I have a pet fish, called Houdini.'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/**
 * Displays picture slide-deck
 */
var currentPic = 0;

function showNextPicture() {

  const pictures =
    ['08262273.JPG','08262311.JPG','08272383.JPG','08272420.JPG','08282542.JPG',
    '08282574.JPG','08302602.JPG','09012693.JPG','09022796.JPG'];

  const desc08262273 = 'There are hundreds of lochs around Scotland, all of which are' +
    ' used for a wide range of purposes such as boat tours, water-sports and an ecosystem' +
    ' for a host of wildlife. This is Loch Loaman - a beautiful loch surrounded by hills' +
    ' and heather.' 
  const desc08262311 = 'Glen Coe is a Scottish glen that was formed through volcanic' +
    ' processes! You\'re lucky if you can see anything given it is usually shrouded in fog -' +
    ' and beware the high speed winds! When you can see it, the scenery is breathtaking.';
  const desc08272383 = 'Scotland is full of many varieties of heather - and it\'s usually' +
    ' full of bees! You can find honey made from heather in most gift shops.';
  const desc08272420 = 'Shell Beach (that\'s it\'s name!) is found on the western-coast of' +
    ' Scotland and the small beach is entirely covered with millions of these shell shards!' +
    ' There was originally a shelling factory around the corner, and when they processed the' +
    ' seafood, they would toss the shells back into the ocean. The coastal drift brought them' +
    ' around the bay and after years of erosion, this beautiful beach formed!';
  const desc08282542 = 'Another loch! Most of the lochs are accessible by road - this one' +
    ' is right next to the main road! They often have parking areas and some even have' +
    ' picnic areas so you can stop and enjoy the views.';
  const desc08282574 = 'You\'ve probably heard of this loch thanks to its mysterious' +
    ' inhabitant, Nessie! This is Loch Ness, Scotland\'s most famous loch. The nearby town' +
    ' is like a peculiar shrine to Nessie - with Nessie decorations and themed shops everywhere!'
  const desc08302602 = 'Much of Scotland is rolling hills - the views from the top' +
    ' can be incredible!'
  const desc09012693 = 'This is one of my favourite views - from the top of Arthur\'s' +
    ' Seat, looking down across the city of Edinburgh! Arthur\'s Seat is actually an extinct' +
    ' volcano and has some amazing ruins on it of old churches that you can go and explore.';
  const desc09022796 = 'There are several beaches that surround Edinburgh, including this' +
    ' gorgeous sandy beach with a host of wildlife living on it - including butterflies!';

  const descriptions = [desc08262273, desc08262311, desc08272383, desc08272420,
    desc08282542, desc08282574, desc08302602, desc09012693, desc09022796];

  // Select the next picture
  currentPic = (currentPic + 1) % pictures.length;
  const picture = pictures[currentPic];
  const description = descriptions[currentPic];

  // Add it to the page.
  const pictureContainer = document.getElementById('picture-container');
  const descContainer = document.getElementById('desc-container');
  pictureContainer.innerHTML = "<img class=\"scotlandPicture\" src=\"/images/"+picture+"\">";
  descContainer.innerText = description;
}

/**
 * Displays the title of my favourite thing depending on the 
 * passed in cateogry.
 * @param {String} category The category selected by the user.
 */

function showTitle(category) {
  titleContainer = document.getElementById('faveTitle-container');
  if (category == 'TV') {
    titleContainer.innerText = 'Umbrella Academy';
  }
  else if (category == 'Book') {
    titleContainer.innerText = 'The Hitchhikers Guide to the Galaxy';
  }
  else if (category == 'Film') {
    titleContainer.innerText = 'The Saint';
  }
  else {
    titleContainer.innerText = 'Edinburgh';
  }
}

/**
 * Displays a description of my favourite thing depending on the 
 * passed in cateogry.
 * @param {String} category The category selected by the user.
 */

function showDesc(category) {
  showTitle(category);
  descContainer = document.getElementById('faveDesc-container');
  if (category == 'TV') {
    descContainer.innerText = 'Based on the comic book series with the same name, Umbrella Academy' +
      ' is a science-fiction, superhero-fiction, dark comedy that focuses on the lives of 6 extraordinary' +
      ' people, all born on the same day with a wide range of powers, and their sister who\'s perfectly normal.';
  }
  else if (category == 'Book') {
    descContainer.innerText = 'Written by Douglas Adams, The Hitchhikers Guide to the Galaxy is a sci-fi comedy' +
      ' following the adventures of Arthur Dent and his friend Ford Prefect (who turns out to be a travel writer' +
      ' for the intergalactic guide book - \'The Hitchhikers Guide to the Galaxy\'. Dent meets a wide range of curious' +
      ' characters along the way as they travel space, having escaped Earth before it was demolished to make way for an' +
      ' intergalactic highway.';
  }
  else if (category == 'Film') {
    descContainer.innerText = 'Starring Val Kilmer, The Saint is an espionage thriller about a high-tech thief,' +
      ' master-of-disguise and anti-hero as he attempts to steal the formula for cold fusion from an unwitting' +
      ' American electrochemist.';
  }
  else {
    descContainer.innerText = 'Despite the fact that it rains most of the time and it can go from bright sunshine' +
      ' to torrential thunderstorms within a matter of seconds, Edinburgh is my favourite city to live in (and visit!)' +
      ' Winter brings the Christmas market, transforming the city into a winter wonderland whilst Summer brings the' +
      ' internationally-renound Edinburgh Fringe Festival - bringing hundreds of thousands of people from all over the' +
      ' world to see a wide range of events and performances. The city itself hosts a intriguing mix of modern and' +
      ' historic architecture, as well as numerous green open spaces. Lying on the edge of the city is an innactive' +
      ' volcano, Arthur\'s Seat, which provides incredible views from the top.';
  }
}

/**
 * Calculates the number of days left until Christmas.
 */
function daysUntilXmas() {
  const dateNow = new Date();
  const christmas = new Date();
  christmas.setMonth(11);
  christmas.setDate(25);

  // Determines whether the current date is before or after Christmas,
  // taking the following year's Christmas if it is to avoid negative days.
  if (dateNow.getMonth()+1 == 12 && dateNow.getDate() >= 25){
    christmas.setFullYear(dateNow.getFullYear() + 1);
  } else {
    christmas.setFullYear(dateNow.getFullYear());
  }

  const daysXmasContainer = document.getElementById('daysXmas-container');
  const daysLeft = Math.floor((christmas - dateNow)/(1000*60*60*24));
  daysXmasContainer.innerText = daysLeft;

  // Make button invisible once clicked as not needed anymore.
  const xmasButtonContainer = document.getElementById('xmasButton');
  xmasButtonContainer.style.display = 'none';
}

function getMessages() {
  var quantity = document.getElementById('commentCount');
  const request = new Request('/data?quantity='+quantity.value, {method:'GET'});
  fetch(request)
  .then(response => response.json())
  .then((messages) => {
    const messageContainer = document.getElementById("message-container");
    var messageHTML = "";
    if (messages.length == 0){
      messageHTML += "<p id=\"noComments\">Looks like no-one has left any comments :( Why not leave one and be the first!<p>";
    } else {
      for (var i = 0; i < messages.length; i++){
        messageHTML += "<div id=\"userComment\">";
        messageHTML += "<h4 id=\"messageHeader\">"+messages[i]["name"]+
          " ("+messages[i]["email"]+")"+"</h4>";
        messageHTML += "<h4 id=\"messageDateTime\">"+messages[i]["dateTime"]+"</h4>";
        messageHTML += "<p>"+messages[i]["message"]+"</p>";
        messageHTML += "<p id=\"sentimentScoreLabel\">This comment received a sentiment score of: </p>";
        if (parseFloat(messages[i]["sentimentScore"]) > 0) {
          messageHTML += "<p id=\"sentimentScoreGood\">"+messages[i]["sentimentScore"]+"</p>";
        } else if (parseFloat(messages[i]["sentimentScore"]) < 0) {
          messageHTML += "<p id=\"sentimentScoreBad\">"+messages[i]["sentimentScore"]+"</p>";
        } else {
          messageHTML += "<p id=\"sentimentScoreNeutral\">"+messages[i]["sentimentScore"]+"</p>";
        }
        messageHTML += "</div>";
      }
    }
    messageContainer.innerHTML = messageHTML;
  });
}
  
function deleteMessages() {
  const request = new Request('/delete-data', {method: 'POST'}); 
  fetch(request)
  .then(getMessages());
}

function checkUserLoginStatus() {
  const loginStatusContainer = document.getElementById("commentForm");
  const loginMessage = document.getElementById("loginMessage-container");
  const deleteMessageButton = document.getElementById("removeComments");
  const request = new Request('/user-login-check', {method: 'GET'});
  fetch(request)
  .then(response => response.json())
  .then((status) => {
    if (status.length == 2) {
      loginStatusContainer.style.display = "none";
      loginMessage.innerHTML = "<p>Oops! Looks like you're not logged in. Please " +
       "<a href=\""+status[1]+"\">log in</a> to leave a comment.";
      deleteMessageButton.style.display = "none";
    }
  });
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Fetches december bike data and uses it to create a chart. */
function drawChart() {
  fetch('/dec-bike-data')
  .then(response => response.json())
  .then((decBikeData) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'stationID');
    data.addColumn('number', 'averageDuration');
    Object.keys(decBikeData).forEach((stationID) => {
      data.addRow([stationID, decBikeData[stationID]]);
    });

    const options = {
      'title': 'Average Bike Ride Durations for Different Stations',
      'width':600,
      'height':500,
      'legend':'none'
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById('chart'));
      chart.draw(data, options);
  });
}

let map; 

function createMap() {
  map = new google.maps.Map(
    document.getElementById('map'),
    {center: {lat: 55.944572, lng: -3.187067}, zoom: 16}
  );

  fetchMarkers();

  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });

  //create marker and info for Appleton Tower
  const appletonTower = new google.maps.Marker({
    position: {lat: 55.944302, lng: -3.186942},
    map: map,
    title: 'Appleton Tower'
  });
  const appletonTowerInfo =
    new google.maps.InfoWindow({content: 
    'This is where I have some of my lectures! Only final year students are allowed to use the top floor.'});
  appletonTower.addListener('click', function() {
    appletonTowerInfo.open(map, appletonTower);
  });

  //create marker and info for George Square Gardens
  const georgeSquareGardens = new google.maps.Marker({
    position: {lat: 55.943966, lng: -3.189259},
    map: map,
    title: 'George Square Gardens'
  });
  const georgeSquareGardensInfo =
    new google.maps.InfoWindow({content:
    'This park is full of squirrels in the Autumn! It\'s full of beautiful trees that look incredible in Autumn.'});
  georgeSquareGardens.addListener('click', function() {
    georgeSquareGardensInfo.open(map, georgeSquareGardens);
  });

  //create marker and info for David Hume Lecture Theatres
  const dhtLectureTheatres = new google.maps.Marker({
    position: {lat: 55.943503, lng: -3.186191},
    map: map,
    title: 'David Humes Lecture Theatres'
  })
  const dhtLectureTheatresInfo =
    new google.maps.InfoWindow({content:
    'This is where I have most of my lectures! There\'s a whole complex below the building with food places!'});
  dhtLectureTheatres.addListener('click', function() {
    dhtLectureTheatresInfo.open(map, dhtLectureTheatres);
  });

  //markersForChart
  const georgeSquare = new google.maps.Marker({
    position: {lat: 55.94308406, lng: -3.188311073},
    map: map,
    title: '171'
  })
  const waverlyBridge = new google.maps.Marker({
    position: {lat: 55.9513444, lng: -3.191420999},
    map: map,
    title: '183'
  })
  const cityChambers = new google.maps.Marker({
    position: {lat: 55.95010933, lng: -3.19025777},
    map: map,
    title: '189'
  })
  const waverlyCourt = new google.maps.Marker({
    position: {lat: 55.9517345, lng: -3.184178535},
    map: map,
    title: '225'
  })
  const royalCommonwealthPool = new google.maps.Marker({
    position: {lat: 55.93900025, lng: -3.173923554},
    map: map,
    title: '246'
  })
  const charlotteSquare = new google.maps.Marker({
    position: {lat: 55.95233546, lng: -3.207101172},
    map: map,
    title: '247'
  })
  const bristoSquare = new google.maps.Marker({
    position: {lat: 55.94583372, lng: -3.189053072},
    map: map,
    title: '248'
  })
  const fountainbridge = new google.maps.Marker({
    position: {lat: 55.94335693, lng: -3.209247502},
    map: map,
    title: '249'
  })
  const victoriaQuay = new google.maps.Marker({
    position: {lat: 55.97761715, lng: -3.174126319},
    map: map,
    title: '250'
  })
  const waverlyStation = new google.maps.Marker({
    position: {lat: 55.95264104, lng: -3.187526919},
    map: map,
    title: '251'
  })
  const kingsBuildings1 = new google.maps.Marker({
    position: {lat: 55.92418541, lng: -3.17383083},
    map: map,
    title: '252'
  })
  const kingsBuildings2 = new google.maps.Marker({
    position: {lat: 55.92320216, lng: -3.171646245},
    map: map,
    title: '253'
  })
  const kingsBuildings3 = new google.maps.Marker({
    position: {lat: 55.92347881, lng: -3.175384585},
    map: map,
    title: '254'
  })
  const stAndrewsHouse = new google.maps.Marker({
    position: {lat: 55.95316433, lng: -3.181682341},
    map: map,
    title: '256'
  })
  const stockbridge = new google.maps.Marker({
    position: {lat: 55.95856559, lng: -3.208070182},
    map: map,
    title: '258'
  })
  const stAndrewsSquare = new google.maps.Marker({
    position: {lat: 55.95490573, lng: -3.192443757},
    map: map,
    title: '259'
  })
  const lauristonPlace = new google.maps.Marker({
    position: {lat: 55.94477165, lng: -3.197265856},
    map: map,
    title: '260'
  })
  const brunswickPlace = new google.maps.Marker({
    position: {lat: 55.96092975, lng: -3.181005315},
    map: map,
    title: '261'
  })
  const canonmills = new google.maps.Marker({
    position: {lat: 55.96280409, lng: -3.196283585},
    map: map,
    title: '262'
  })
  const pollockHalls = new google.maps.Marker({
    position: {lat: 55.94008064, lng: -3.171746867},
    map: map,
    title: '264'
  })
}

let editMarker; 

function createMarkerForEdit(lat, lng) {
  editMarker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});

  // When the user closes the editable info window, remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });

  infoWindow.open(map, editMarker);
}

/**
 * Builds and returns HTML elements that show an editable textbox and a submit
 * button.
 */
function buildInfoWindowInput(lat, lng) {
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));

  button.onclick = () => {
    postMarker(lat, lng, textBox.value);
    createMarkerForDisplay(lat, lng, textBox.value);
    editMarker.setMap(null);
  };

  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);

  return containerDiv;
}

/** Creates a marker that shows a read-only info window when clicked. */
function createMarkerForDisplay(lat, lng, content) {
  const marker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow = new google.maps.InfoWindow({content: content});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

/** Sends a marker to the backend for saving. */
function postMarker(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);

  fetch('/visitor-markers', {method: 'POST', body: params});
}

/** Fetches markers from the backend and adds them to the map. */
function fetchMarkers() {
  fetch('/visitor-markers')
  .then(response => response.json())
  .then((markers) => {
    markers.forEach((marker) => {
            createMarkerForDisplay(marker.lat, marker.lng, marker.content)});
  });
}