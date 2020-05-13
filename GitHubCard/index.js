
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
let myGitHub;
const cardList = document.querySelector(".cards");
axios.get("http://api.github.com/users/allyjay317")
  .then(response =>{
    myGitHub = response.data;
    console.log(response.data);
  

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
  
  cardList.append(cardMaker(myGitHub));

  
})


/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ["tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"];

  followersArray.forEach(user =>{
    axios.get(`http://api.github.com/users/${user}`)
      .then(response =>{
        cardList.append(cardMaker(response.data));

        /*think this gets too many responses because github stops allowing the gets and gives errors on the GET requests
        probably to stop ddos attacks, it also basically stopped me from testing the cards...
        axios.get(`http://api.github.com/users/${user}/followers`)
          .then(response =>{
              response.data.forEach(follower =>{
                axios.get(follower.url)
                  .then(followerResponse =>{
                    cardList.append(cardMaker(followerResponse.data));
                  })
              })  
          }) */

      })
  })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

const cardMaker = function(user){
  let card = document.createElement("div")
   card.classList.add("card")
  let cardImg = document.createElement("img")
   cardImg.src=user.avatar_url
  let cardInfo = document.createElement("div")
   cardInfo.classList="card-info"
  let cardRName = document.createElement("h3")
   cardRName.classList.add("name")
   cardRName.textContent = user.name
  let cardUName = document.createElement("p")
   cardUName.classList="username"
   cardUName.textContent = user.login
  let cardLocation = document.createElement("p")
  cardLocation.textContent = `Location: ${user.location}`
  let cardLink = document.createElement("p")
  cardLink.textContent = "Profile:"
  let cardLinkA = document.createElement("a")
   cardLinkA.href=user.html_url
   cardLinkA.textContent = user.html_url
        
  let cardFollowers = document.createElement("p")
  cardFollowers.textContent = `Followers: ${user.followers}`
  let cardFollowees = document.createElement("p")
  cardFollowees.textContent = `Following: ${user.following}`
  let cardBio = document.createElement("p")
  cardBio.textContent = `Bio: ${user.bio}`

  card.append(cardImg);
  card.append(cardInfo);
  cardInfo.append(cardRName);
  cardInfo.append(cardUName);
  cardInfo.append(cardLocation);
  cardInfo.append(cardLink);
  cardLink.append(cardLinkA);
  cardInfo.append(cardFollowers);
  cardInfo.append(cardFollowees);
  cardInfo.append(cardBio);

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
