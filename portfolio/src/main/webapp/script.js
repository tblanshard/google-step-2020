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

window.onload = showNextPicture;

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