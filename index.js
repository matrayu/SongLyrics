'use strict';

const api = 'https://api.lyrics.ovh/v1';


function getLyrics(artist, title) {
    console.log('getLyrics ran');
    fetch(`${api}/${artist}/${title}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
        if (data.lyrics === undefined || data.lyrics === '') {
            throw('No lyrics!');
        }
        else {
            return displayResults(data.lyrics);
        }
    })
    .catch((err) => {
        console.error(err);
        $('#results').toggle(true);
        return displayResults(`There was a problem processing this request: ${err}`);
    })
}

function displayResults(responseJson) {
    console.log('displayResults ran');
    const lyrics = responseJson.split('\n')
    //console.log(lyrics[0])
    lyrics.forEach((element) => {
        $('#results').toggle(true);
        $('#results').append(`${element}</br>`);
    });
}

function watchForm() {
    console.log('watchForm ran');
    $('.js-search-form').submit(() => {
        $('#results').toggle(false);
        $('#results').text('')
        const artist = $('.js-query-artist').val();
        const title = $('.js-query-title').val();
        getLyrics(artist, title);
        event.preventDefault();
    });
}

$(watchForm);
