const news = require('../db/schema/newsSchema');

const getNews = async (req, res) => {
    const result = news.find();

    if(req.query){
        result.find(req.query);
    }

    const fullResult = await result;
    
    res.status(200).json({ result: fullResult });
}

const createNews = async (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));
    const id = (await news.find()).length + 1;

    data.id = id;

    await news.create(data);
    res.status(201).json({err: false, msg: 'Created Successfully'});
}

const updateNews = async (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body));

    const update = await news.updateOne(req.query, data);

    if(update){
        return res.status(200).json({err: false, msg: 'Updated successfully'});
    }
    
    return res.status(404).json({err: true, msg: 'Item not found'});
    
}

const deleteNews = async (req, res) => {

    const deleteItem = await news.deleteOne(req.query);

    if(deleteItem){
        return res.status(200).json({err: false, msg: 'Item deleted successfully'})
    }

    return res.status(404).json({err: true, msg: 'Item not found'})
}

module.exports = { getNews, createNews, updateNews, deleteNews }