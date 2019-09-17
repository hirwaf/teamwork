import joi from '@hapi/joi';
import moment from 'moment';
import Helpers from '../Helpers';

const ArticlesController = {

  store(request, response) {
    const {
      title, image, article,
    } = request.body;
    const schema = joi.object().keys({
      title: joi.string().trim().required(),
      image: joi.required(),
      article: joi.string().required(),
    });
    const validation = joi.validate(request.body, schema, { abortEarly: false });
    if (validation.error != null) {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"')
          .join(''));
      }
      return response.status(422)
        .send({
          status: response.statusCode,
          message: errors,
        });
    }

    const createdOn = moment().format('YYYY-MM-DD HH:mm:ss');
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
  },
  update(request, response) {
  },
  destroy(request, response) {
  },
  findOne(request, response) {
  },
};

export default ArticlesController;