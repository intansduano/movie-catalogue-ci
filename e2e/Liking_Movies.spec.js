/* eslint-disable no-undef */
const assert = require('assert');
const { async } = require('regenerator-runtime');

Feature('Liking Movies');

Before((I) => {
    I.amOnPage('/#/like');
});

Scenario('showing empty liked movies', (I) => {
    I.seeElement('#query');
    // I.seeElement('.query'); // membuat test menjadi gagal
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one movie', (I) => {
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

    I.amOnPage('/');
    // … kita akan mengisi uji coba berikutnya …
});

Scenario('liking one movie', async(I) => {
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

    I.amOnPage('/');

    // I.waitForElement('.movie__title a', 10);

    I.seeElement('.movie__title a');

    const firstFilm = locate('.movie__title a').first();
    const firstFilmTitle = await I.grabTextFrom(firstFilm);
    I.click(firstFilm);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.movie-item');

    const likedFilmTitle = await I.grabTextFrom('.movie__title');

    assert.strictEqual(firstFilmTitle, likedFilmTitle);
});