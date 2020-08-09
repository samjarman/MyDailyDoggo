import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import fetch from 'node-fetch';
import Twit from 'twit'

function getFlickrURL(apiKey: string, date: number) {
  return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&min_taken_date=${date}&format=json&nojsoncallback=1`
}

function getDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.getTime()/1000.0;
}

function buildPhotoURL(result) {
  console.log('results')

  const farm = result.photos.photo[0].farm;
  const server = result.photos.photo[0].server;
  const id = result.photos.photo[0].id;
  const secret = result.photos.photo[0].secret;

  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_c.jpg`
}

function buildTweetText() {
  // TODO: Build in credit for author
  // TODO: Use a sample of postings
  return `Would you just LOOK at this doggo!`;
}

async function sendTweet(text, image) {
  const T = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });

  console.log('Starting photo upload', image);

  let upload = await T.post('media/upload', { media_data: image });
  //@ts-ignore //Twit has lazy typings? :/
  const params = { status: text, media_ids: [upload.data.media_id_string] }

  return await T.post('statuses/update', params);
}

async function getPhoto(url: string) {
  let data = await fetch(url).then(response => response.buffer())
  return data.toString('base64');
}

export const dailydoggo = async (event, _context) => {
 console.log("I am running....")
 const flickrURL = getFlickrURL(process.env.FLICKR_API_KEY, getDate())
 
 const photoDetails = await fetch(flickrURL).then(res => res.json());
 const photoURL = buildPhotoURL(photoDetails);

 const photo = await getPhoto(photoURL);
 const status = buildTweetText();
 await sendTweet(status, photo)

 return {body: 'Success', statusCode: 200};
}
