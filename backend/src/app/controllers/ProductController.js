import * as Yup from 'yup';

import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
  async index(req, res) {
    const response = {};
    try {
      const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name'],
            where: { user_id: req.body.user_id },
          },
        ],
      });

      response.success = true;
      response.message = 'Products successfully listed.';
      response.products = products;
    } catch (err) {
      response.success = false;
      response.message = 'Error while listing products.';
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      description: Yup.string(),
      category_id: Yup.number().required(),
    });
    const response = {};
    const ERROR_CREATE = 'The product could not be created.';
    try {
      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ success: false, message: 'Validation fails' });
      }
      const { id } = await Product.create(req.body);

      if (id) {
        response.success = true;
        response.message = 'Product created successfully.';
        response.product_id = id;
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
    const ERROR_UPDATE = 'The product could not be updated.';
    try {
      const { id } = req.params;

      const updated = await Product.update(req.body, {
        where: {
          id,
        },
        include: [
          {
            model: Category,
            as: 'category',
            include: [
              {
                model: User,
                as: 'user',
                where: { id: req.body.user_id },
              },
            ],
          },
        ],
      });

      if (updated) {
        response.success = true;
        response.message = 'Product updated successfully.';
        response.product_id = id;
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
    const ERROR_DELETE = 'It was not possible to delete the product.';
    try {
      const { id } = req.params;
      if (id) {
        const deleted = await Product.destroy({
          where: {
            id,
          },
        });
        if (deleted) {
          response.success = true;
          response.message = 'Product successfully deleted';
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

export default new ProductController();
