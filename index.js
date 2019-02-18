/*jshint globalstrict: true*/

'use strict';

function getLyrics(artist, title) {
    console.log('getLyrics ran');

    const url = encodeURI(`https://api.lyrics.ovh/v1/${artist}/${title}`);

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            if (response.statusText === 'Not Found') {
                throw (`<b>Couldn't find any lyrics for ${title} by ${artist}.</b>`);
            }
            else {
                throw (response.statusText);
            }
        })
        .then((data) => {
            return displayResults(data.lyrics);
        })
        .catch((err) => {
            console.error(err);
            $('#results').empty();
            $('#results').removeClass('hidden');
            $('#results').html(`There was a problem processing this request: <b>${err}</b>`)
            //return displayResults(`There was a problem processing this request: ${err}`);
        });
}

function displayResults(responseJson) {
    console.log('displayResults ran');
    $('#results').empty();
    $('#results').removeClass('hidden');
    const lyrics = responseJson.split('\n');
    lyrics.forEach((element) => {
        $('#results').append(`${element}</br>`);
    });
}

function watchForm() {
    console.log('watchForm ran');
    $('.js-search-form').submit(() => {
        event.preventDefault();
        const artist = $('.js-query-artist').val();
        const title = $('.js-query-title').val();
        getLyrics(artist, title);
    });
}

$(watchForm);