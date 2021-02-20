import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Product from '../../components/Product';
import Category from '../../components/Category';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';

import {
	list,
	create as createProduct,
	update as updateProduct,
	remove as deleteProduct,
} from '../../services/Product';
import {
	list as listCategories,
	create as createCategory,
	update as updateCategory,
	remove as deleteCategory,
} from '../../services/Category';

import {
	ProductContainer,
	CategoryContainer,
	ActionsBox,
	FormContainer,
} from './styles';

function Dashboard() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [editProduct, setEditProduct] = useState({});
	const [modalCategoryIsOpen, setCategoryIsOpen] = useState(false);
	const [editCategory, setEditCategory] = useState({});
	const [loadingProducts, setLoadingProducts] = useState(true);
	const [categories, setCategories] = useState([]);
	const [loadingCategories, setLoadingCategories] = useState(true);

	async function getProducts() {
		const response = await list();

		if (response.success) {
			setProducts(response.products);
		}
		setLoadingProducts(false);
	}

	async function getCategories() {
		const response = await listCategories();

		if (response.success) {
			setCategories(response.categories);
		}
		setLoadingCategories(false);
	}

	useEffect(() => {
		if (products.length === 0 && loadingProducts) getProducts();
		if (categories.length === 0 && loadingCategories) getCategories();
	}, [products, loadingProducts, categories, loadingCategories]);

	function openModal() {
		setIsOpen(true);
	}

	function openModalCategory() {
		setCategoryIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
		setEditProduct({});
	}

	function closeModalCategory() {
		setCategoryIsOpen(false);
		setEditCategory({});
	}

	function handleEditProduct(product) {
		setEditProduct(product);
		setIsOpen(true);
	}

	function handleEditCategory(category) {
		setEditCategory(category);
		setCategoryIsOpen(true);
	}

	async function removeProduct() {
		const response = await deleteProduct(editProduct.id);
		if (response.success) {
			toast(response.message);
			closeModal();
			await getProducts();
		} else {
			toast.error(response.message);
		}
	}

	async function removeCategory() {
		const response = await deleteCategory(editCategory.id);
		if (response.success) {
			toast(response.message);
			closeModalCategory();
			await getCategories();
			await getProducts();
		} else {
			toast.error(response.message);
		}
	}

	const formRef = useRef(null);

	async function handleSubmit(data) {
		try {
			formRef.current.setErrors({});
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatório'),
				price: Yup.string().required('O valor é obrigatório'),
				category_id: Yup.string().required('A categoria é obrigatória'),
			});
			await schema.validate(data, {
				abortEarly: false,
			});

			data = {
				...data,
				category_id: parseInt(data.category_id, 10),
				price: parseFloat(data.price),
			};

			if (editProduct && editProduct.id) {
				const response = await updateProduct(data, editProduct.id);
				if (response.success) {
					toast(response.message);
					closeModal();
					await getProducts();
				} else {
					toast.error(response.message);
				}
			} else {
				const response = await createProduct(data);
				if (response.success) {
					toast(response.message);
					closeModal();
					await getProducts();
				} else {
					toast.error(response.message);
				}
			}
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			}
		}
		setEditProduct({});
	}

	async function handleSubmitCategory(data) {
		try {
			formRef.current.setErrors({});
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatório'),
			});
			await schema.validate(data, {
				abortEarly: false,
			});

			if (editCategory && editCategory.id) {
				const response = await updateCategory(data, editCategory.id);
				if (response.success) {
					toast(response.message);
					closeModalCategory();
					await getCategories();
				} else {
					toast.error(response.message);
				}
			} else {
				const response = await createCategory(data);
				if (response.success) {
					toast(response.message);
					closeModalCategory();
					await getCategories();
				} else {
					toast.error(response.message);
				}
			}
		} catch (err) {
			const validationErrors = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					validationErrors[error.path] = error.message;
				});
				formRef.current.setErrors(validationErrors);
			}
		}
		setEditCategory({});
	}

	function renderProducts(product) {
		return (
			<Product
				product={product}
				editProduct={handleEditProduct}
				key={product.id}
			/>
		);
	}

	function renderCategories(category) {
		return (
			<Category
				category={category}
				editCategory={handleEditCategory}
				key={category.id}
			/>
		);
	}

	return (
		<>
			<Header />
			<ActionsBox>
				<h2>Produtos:</h2>
				<Button onClick={() => openModal()}>Novo Produto</Button>
			</ActionsBox>
			<ProductContainer>
				{products.length > 0 &&
					products.map((product) => renderProducts(product))}
			</ProductContainer>
			<ActionsBox>
				<h2>Categorias:</h2>
				<Button onClick={() => openModalCategory()}>Nova Categoria</Button>
			</ActionsBox>
			<CategoryContainer>
				{categories.length > 0 &&
					categories.map((category) => renderCategories(category))}
			</CategoryContainer>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Novo Produto"
			>
				<FormContainer>
					<h2>Novo Produto</h2>
					<Form ref={formRef} onSubmit={handleSubmit}>
						<Input
							name="name"
							type="text"
							placeholder="Nome do produto"
							defaultValue={
								editProduct && editProduct.name ? editProduct.name : ''
							}
						/>
						<Input
							name="description"
							type="text"
							placeholder="Descrição do produto"
							className="right"
							defaultValue={
								editProduct && editProduct.description
									? editProduct.description
									: ''
							}
						/>
						<Input
							name="price"
							type="text"
							placeholder="Valor do produto"
							defaultValue={
								editProduct && editProduct.price ? editProduct.price : ''
							}
						/>
						<Select
							name="category_id"
							className="right"
							options={categories}
							defaultValue={
								editProduct && editProduct.category
									? editProduct.category.id
									: ''
							}
						/>

						<Button onClick={closeModal} type="button">
							Fechar
						</Button>
						<Button type="submit" className="right">
							Salvar
						</Button>
						{editProduct && editProduct.id && (
							<Button onClick={removeProduct} type="button" className="remove">
								Excluir
							</Button>
						)}
					</Form>
				</FormContainer>
			</Modal>
			<Modal
				isOpen={modalCategoryIsOpen}
				onRequestClose={closeModalCategory}
				contentLabel="Nova Categoria"
			>
				<FormContainer>
					<h2>Nova Categoria</h2>
					<Form
						ref={formRef}
						onSubmit={handleSubmitCategory}
						className="unique"
					>
						<Input
							name="name"
							type="text"
							placeholder="Nome da Categoria"
							defaultValue={
								editCategory && editCategory.name ? editCategory.name : ''
							}
						/>

						<Button onClick={closeModalCategory} type="button">
							Fechar
						</Button>
						<Button type="submit">Salvar</Button>
						{editCategory && editCategory.id && (
							<Button onClick={removeCategory} type="button" className="remove">
								Excluir
							</Button>
						)}
					</Form>
				</FormContainer>
			</Modal>
		</>
	);
}

export default Dashboard;
