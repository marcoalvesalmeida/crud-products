import * as Yup from 'yup';

import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const response = {};
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name'],
        where: { user_id: req.body.user_id },
      });

      response.success = true;
      response.message = 'Categories successfully listed.';
      response.categories = categories;
    } catch (err) {
      response.success = false;
      response.message = 'Error while listing categories.';
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      user_id: Yup.number().required(),
    });
    const response = {};
    const ERROR_CREATE = 'The category could not be created.';
    try {
      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ success: false, message: 'Validation fails' });
      }

      const { id } = await Category.create(req.body);

      if (id) {
        response.success = true;
        response.message = 'Category created successfully.';
        response.category_id = id;
      } else {
        response.success = false;
        response.message = ERROR_CREATE;
      }
    } catch (err) {
      response.success = false;
      response.message = ERROR_CREATE;
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }

  async update(req, res) {
    const response = {};
    const ERROR_UPDATE = 'The category could not be updated.';
    try {
      const { id } = req.params;

      const updated = await Category.update(req.body, {
        where: {
          id,
        },
      });

      if (updated) {
        response.success = true;
        response.message = 'Category updated successfully.';
        response.category_id = id;
      } else {
        response.success = false;
        response.message = ERROR_UPDATE;
      }
    } catch (err) {
      response.success = false;
      response.message = ERROR_UPDATE;
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }

  async delete(req, res) {
    const response = {};
    const ERROR_DELETE = 'It was not possible to delete the category.';
    try {
      const { id } = req.params;
      if (id) {
        const deleted = await Category.destroy({
          where: {
            id,
            user_id: req.body.user_id,
          },
        });
        if (deleted) {
          response.success = true;
          response.message = 'Category successfully deleted';
        }
      } else {
        response.success = false;
        response.message = ERROR_DELETE;
      }
    } catch (err) {
      response.success = false;
      response.message = ERROR_DELETE;
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }
}

export default new CategoryController();
