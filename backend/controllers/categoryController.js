import slugify from 'slugify';
import CategoryModel from '../models/CategoryModel.js';

// create category controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validations
    if (!name) {
      return res.status(401).send({ message: 'Name is required' });
    }

    // check for existing category
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: 'Category Already Exisits',
      });
    }

    // create category
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: 'Category created succesfully',
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while creating category',
      error,
    });
  }
};

// update category controller
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Category updated succesfully',
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating category',
      error,
    });
  }
};

// get all categories
export const categoryControlller = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: 'All Categories List',
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting all categories',
    });
  }
};

// get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: 'Get single category successfully',
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting the category',
    });
  }
};

// delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: 'Category Deleted Successfully',
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting category',
      error,
    });
  }
};
