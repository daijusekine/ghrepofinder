const fetch = require("node-fetch");
const express = require('express');
const router = express.Router();
const db = require("../models/index");
const { sequelize } = require("../models/index");

/* GET home page. */
router.get('/', async function(req, res, next) {

  let bookmarks = await db.RepoBookmarkClass.findAll({ });
  console.log('bookmarks=', bookmarks);

  res.render('index', { title: 'GHRepoFinder', bookmarks: bookmarks });
});

router.get('/search', async function(req, res, next) {
  console.log('req', req.query);
  let searchRes = await fetch('https://api.github.com/search/repositories?q=' + req.query.repo);
  let resBody = await searchRes.json();
  let totalCount = resBody.total_count;
  let urlItems = resBody.items.map(element => {
    return {
      url: element.html_url,
      full_name: element.full_name,
      description: element.description,
      language: element.language,
      owner: element.owner.login,
      stargazers_count: element.stargazers_count
    };
  });
  urlItems.sort((a, b) => b.stargazers_count - a.stargazers_count);

  res.render('search-result', {
    title: 'GHRepoFinder',
    search_results: urlItems,
    total_count: totalCount });
});

router.post('/bookmark', async function(req, res, next) {
  let queryJson = JSON.parse(req.query.data);
  await db.RepoBookmarkClass.create({
    repository: queryJson.full_name,
    url: queryJson.url,
    full_name: queryJson.full_name,
    description: queryJson.description,
    language: queryJson.language,
    owner: queryJson.owner,
    star: queryJson.stargazers_count
  });
  res.send("Bookmarked.");
});

router.post('/delete_bookmark', async function(req, res, next) {
  await db.RepoBookmarkClass.destroy({where: {}});
  res.redirect('/');
});

module.exports = router;
