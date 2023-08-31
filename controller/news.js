const news = require('../db/schema/newsSchema');

const getNews = async(req, res) => {
    const result = await news.find();
    res.status(200).json({result});
}

const createNews = async(req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    const id = (await news.find()).length + 1;

    data.id = id;

    await news.create(data);
    res.status(201).end();
}

module.exports = { getNews, createNews }