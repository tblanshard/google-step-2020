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

/*
Displays picture slide-deck
*/
var currentPic = 0;

function showNextPicture() {

  const pictures =
    ['08262273.JPG','08262311.JPG','08272383.JPG','08272420.JPG','08282542.JPG',
    '08282574.JPG','08302602.JPG','09012693.JPG','09022796.JPG'];

  const desc08262273 = "There are hundreds of lochs around Scotland, all of which are" +
    " used for a wide range of purposes such as boat tours, water-sports and an ecosystem" +
    " for a host of wildlife. This is Loch Lochie - a beautiful loch surrounded by hills" +
    " and heather." 
  const desc08262311 = "Glen Coe is a Scottish glen that was formed through volcanic" +
    " processes! You're lucky if you can see anything given it is usually shrouded in fog -" +
    "and beware the high speed winds! When you can see it, the scenery is breathtaking.";
  const desc08272383 = "Scotland is full of many varieties of heather - and it's usually" +
    " full of bees! You can find honey made from heather in most gift shops.";
  const desc08272420 = "Shell Beach (that's it's name!) is found on the western-coast of" +
    " Scotland and the small beach is entirely covered with millions of these shell shards!" +
    " There was originally a shelling factory around the corner, and when they processed the" +
    " seafood, they would toss the shells back into the ocean. The coastal drift brought them" +
    " around the bay and after years of erosion, this beautiful beach formed!";
  const desc08282542 = "Another loch! Most of the lochs are accessible by road - this one" +
    " is right next to the main road! They often have parking areas and some even have" +
    " picnic areas so you can stop and enjoy the views.";
  const desc08282574 = "You've probably heard of this loch thanks to its mysterious" +
    " inhabitant, Nessie! This is Loch Ness, Scotland's most famous loch. The nearby town" +
    " is like a peculiar shrine to Nessie - with Nessie decorations and themed shops everywhere!"
  const desc08302602 = "Much of Scotland is rolling hills - the views from the top" +
    " can be incredible!"
  const desc09012693 = "This is one of my favourite views - from the top of Arthur's" +
    " Seat, looking down across the city of Edinburgh! Arthur's Seat is actually an extinct" +
    " volcano and has some amazing ruins on it of old churches that you can go and explore.";
  const desc09022796 = "There are several beaches that surround Edinburgh, including this" +
    " gorgeous sandy beach with a host of wildlife living on it - including butterflies!";

  const descriptions = [desc08262273, desc08262311, desc08272383, desc08272420,
    desc08282542, desc08282574, desc08302602, desc09012693, desc09022796];

  //Select the next picture
  currentPic = (currentPic + 1) % pictures.length;
  const picture = pictures[currentPic];
  const description = descriptions[currentPic];

  // Add it to the page.
  const pictureContainer = document.getElementById('picture-container');
  const descContainer = document.getElementById('desc-container');
  pictureContainer.innerHTML = "<img class=\"scotlandPicture\" src=\"/images/"+picture+"\">";
  descContainer.innerText = description;
}
