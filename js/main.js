// Declare a couple vars to use later
let song;
let playSong;


// Spotify client creds
const clientId = 'PUT YOUR ID HERE';
const clientSecret = 'PUT YOUR SECRET HERE';


// function to complete step 2 in the OAuth Docs
const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    // Access the data given back to us (token)
    const data = await result.json()
    console.log(data.access_token)
    return data.access_token
};


// Function to get Song Info when an image(figure) is clicked
/**
 * @param img_index
 * @param item_index
 * 
 * Function gets a song from spotify using the image index of our gallery
 * then finds the correct item_index inside of the JSON response data from spotify API call.
 * This will then produce a preview_url that will be used to play a snippet of said song.
 */
const clickedEvent = async (img_index, item_index) => {
    // Get Trackname
    let track = document.getElementsByTagName('img')[img_index].alt;

    // go get Token
    let token = await getToken();

    //create call based on spotify docs
    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{
        method: 'GET',
        headers: headers
    });

    let response = await request.json()
    console.log(response)
    let song = response.tracks.items[item_index].preview_url
    console.log(song)

    //Before we play a song, first check to see if we have an audio file loaded up aka playing
    if (playSong){
        stopSnippet()
    }
    songSnippet(song)


}
/**
 * @param id
 * @param event
 * 
 * id = image id for gallery image
 * event = Mouse event given by the action from our user
 * 
 * Function produces songs from the clickedEvent based on the index
 * of our image on the page
 */

const getSong = (id, event) =>{
    switch(id){
        case 'fig1': {
            event.stopPropagation();
            clickedEvent(0,3);
            break
        }
        case 'fig2': {
            event.stopPropagation();
            clickedEvent(1,3);
            break
        }
        case 'fig3': {
            event.stopPropagation();
            clickedEvent(2,3);
            break
        }
        case 'fig4': {
            event.stopPropagation();
            clickedEvent(3,0);
            break
        }
        case 'fig5': {
            event.stopPropagation();
            clickedEvent(4,0);
            break
        }
        case 'fig6': {
            event.stopPropagation();
            clickedEvent(5,5);
            break
        }
    }
}

/**
 * @param
 * 
 * url = song_preview from response data
 * 
 * Function will return an audio object to play a clip from preview URL
 * 
 */

const songSnippet = (url) => {
    playSong = new Audio(url);
    return playSong.play()
}

/**
 * NO PARAMS
 * 
 * Function returns event to stop song snippet
 * 
 */
const stopSnippet = () => {
    return playSong.pause();
}