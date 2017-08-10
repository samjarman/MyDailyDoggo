# Daily Doggo


Daily Doggo is used to power the @MyDailyDoggo twitter account. It takes images from Flickr, with the tag "dog", daily and tweets them. 

## Requirements 

This project uses [Serverless](https://serverless.com/).

## To do list
* [ ] Credit authors with link to profile or name
* [ ] Dynamic tweet generation

... PRs welcome!

## Contributing

1. Git clone the repo
2. `cp example-serverless.yml serverless.yml`
3. Enter flickr keys and twitter keys in the `serverless.yml`

## Running
1. `serverless invoke local --function dailydoggo`

If it works fine locally, you're probably good to submit a PR. 