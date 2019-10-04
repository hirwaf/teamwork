import moment from 'moment';
import articles from '../models/article';

const ArticlesController = {
  store(request, response) {
    const {
      title, image, article,
    } = request.body;

    const createdOn = moment()
      .format('YYYY-MM-DD HH:mm:ss');
    return response.status(201)
      .send({
        status: response.statusCode,
        message: 'Article successfully created',
        data: {
          createdOn,
          title,
          image,
          article,
        },
      });
  },
  findAll(request, response) {
    return response.status(200)
      .send({
        status: response.statusCode,
        message: 'Success',
        data: articles,
      });
  },
  update(request, response) {
    const { articleId } = request.params;
    const { user } = request;
    const _article = articles.find((article) => article.id === parseInt(articleId) && article.authorId === user.id);
    if (!_article) {
      return response.status(404).send({
        status: response.statusCode,
        message: 'Article no found !',
      });
    }
    const {
      title, image, article,
    } = request.body;

    const createdOn = moment()
      .format('YYYY-MM-DD HH:mm:ss');
    return response.status(200)
      .send({
        status: response.statusCode,
        message: 'Article successfully edited',
        data: {
          title,
          image,
          article,
          createdOn,
        },
      });
  },
  destroy(request, response) {
    const { articleId } = request.params;
    const { user } = request;
    const art = articles.find((article) => article.id === parseInt(articleId) && article.authorId === user.id);
    if (art) {
      return response.status(204)
        .send({
          status: response.statusCode,
          message: 'Article successfully deleted',
        });
    }
    return response.status(404)
      .send({
        status: response.statusCode,
        message: 'Article Not Found !!',
      });
  },
  findOne(request, response) {
    const { articleId } = request.params;

    const result = articles.find((article) => article.id === parseInt(articleId));

    if (result !== undefined) {
      return response.status(200)
        .send({
          status: response.statusCode,
          message: 'Article found !',
          data: result,
        });
    }
    return response.status(404)
      .send({
        status: response.statusCode,
        message: 'Article not found !',
      });
  },
  findByTag(request, response) {
    const { tagId } = request.params;
    const getArticles = (_article) => {
      const gt = _article.tags.find((tag) => tag.id === parseInt(tagId));
      if (gt) return _article;
    };
    const results = articles.filter(getArticles);
    if (results === undefined || results.length <= 0) {
      return response.status(404)
        .send({
          status: response.statusCode,
          message: 'No articles found !',
          data: [],
        });
    }
    return response.status(200)
      .send({
        status: response.statusCode,
        message: 'Success',
        data: results,
      });
  },
  addComment(request, response) {
    return response.status(201)
      .send({
        status: response.statusCode,
        message: 'Comment successfully added.',
        data: {
          createdOn: moment().format('YYYY-MM-DD HH:mm:ss'),
          articleTitle: 'Vitae tortor condimentum lacinia',
          article: 'Vitae tortor condimentum lacinia',
          comment: request.body.comment,
        },
      });
  },
  findByAuthor(request, response) {
    const { authorId } = request.params;
    const results = articles.filter((article) => article.authorId === parseInt(authorId));
    if (results.length <= 0) {
      return response.status(404)
        .send({
          status: response.statusCode,
          message: 'No articles found !',
          data: results,
        });
    }
    return response.status(200)
      .send({
        status: response.statusCode,
        message: 'Success',
        data: results,
      });
  },
};

export default ArticlesController;