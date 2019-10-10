import moment from 'moment';
import articles from '../mock/article';
import Helpers from '../helpers/Helpers';
import { Article } from '../models';

const Model = new Article();

class ArticlesController {
  static async store(request, response) {
    const { user } = request;
    const data = {
      ...request.body,
      authorId: user.id,
      createdOn: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    const store = await Model.create(data);
    if (store.errors) Helpers.dbError(response, store);
    return Helpers.sendResponse(response, 201, 'Article successfully created', data);
  }

  static findAll(request, response) {
    return Helpers.sendResponse(response, 200, 'Success', articles);
  }

  static async update(request, response) {
    const { articleId } = request.params;
    const { user } = request;
    const data = {
      ...request.body,
    };
    const update = await Model.update(data, {
      authorId: user.id,
      id: articleId,
    });
    if (update.errors) return Helpers.dbError(response, update);
    if (update.count > 0) {
      return Helpers.sendResponse(response, 200, 'Article successfully edited', data);
    }
    return Helpers.sendResponse(response, 404, 'Article no found !');
  }

  static async destroy(request, response) {
    const { articleId } = request.params;
    const { user } = request;
    const destroy = await Model.delete({
      authorId: user.id,
      id: articleId,
    });
    if (destroy.errors) return Helpers.dbError(response, destroy);
    if (destroy.count > 0) {
      return Helpers.sendResponse(response, 204, 'Article successfully deleted');
    }
    return Helpers.sendResponse(response, 404, 'Article Not Found !!');
  }

  static findOne(request, response) {
    const { articleId } = request.params;

    const result = articles.find((article) => article.id === parseInt(articleId));

    if (result !== undefined) {
      return Helpers.sendResponse(response, 200, 'Article found !', result);
    }
    return Helpers.sendResponse(response, 404, 'Article not found !');
  }

  static findByTag(request, response) {
    const { tagId } = request.params;
    const getArticles = (_article) => {
      const gt = _article.tags.find((tag) => tag.id === parseInt(tagId));
      if (gt !== undefined) return _article;
    };
    const results = articles.filter(getArticles);
    if (results.length < 1) {
      return Helpers.sendResponse(response, 404, 'No articles found !');
    }
    return Helpers.sendResponse(response, 200, 'Success', results);
  }

  static addComment(request, response) {
    const data = {
      createdOn: moment()
        .format('YYYY-MM-DD HH:mm:ss'),
      articleTitle: 'Vitae tortor condimentum lacinia',
      article: 'Vitae tortor condimentum lacinia',
      comment: request.body.comment,
    };
    return Helpers.sendResponse(response, 201, 'Comment successfully added.', data);
  }

  static findByAuthor(request, response) {
    const { authorId } = request.params;
    const results = articles.filter((article) => article.authorId === parseInt(authorId));
    if (results.length <= 0) {
      return Helpers.sendResponse(response, 404, 'No articles found !', []);
    }
    return Helpers.sendResponse(response, 200, 'Success', results);
  }
}

export default ArticlesController;