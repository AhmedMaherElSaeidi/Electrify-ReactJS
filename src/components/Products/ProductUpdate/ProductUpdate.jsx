import "./ProductUpdate.scss";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FormInput2 from "../../Form/FormInput2/FormInput2";
import FormSelect2 from "../../Form/FormSelect2/FormSelect2";
import { fetchAllCategories } from "../../../services/categories";
import FormTextArea2 from "../../Form/FormTextArea2/FormTextArea2";
import { fetchProduct, updateProduct } from "../../../services/products";

const ProductUpdate = ({ handleEvent }) => {
  const { id } = useParams();
  const [componentData, setComponentData] = useState({
    categories: [],
    product: [],
    err: null,
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchProductData = () => {
    fetchProduct(id)
      .then((res) => {
        setComponentData((prev) => {
          return { ...prev, product: res.data.data };
        });

        // Creating an object to intialize form
        const product = { ...res.data.data };
        delete product.id;
        delete product.product_category;

        for (const key in product) {
          setValue(key, product[key]);
        }
      })
      .catch((err) => {
        setComponentData((prev) => {
          return { ...prev, err };
        });
      });
  };
  const fetchAllCategoriesData = () => {
    fetchAllCategories()
      .then((res) => {
        setComponentData((prev) => {
          return { ...prev, categories: res.data.data };
        });
      })
      .catch((err) => {
        setComponentData((prev) => {
          return { ...prev, err };
        });
      });
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    data.image = typeof data.image !== "string" ? data.image[0] : data.image;

    // Populating form object with data
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Updating product
    updateProduct(id, formData)
      .then(() => {
        // To refresh parent component
        handleEvent();
      })
      .catch((err) => {
        setComponentData((prev) => {
          return { ...prev, err };
        });
      });
  };

  useEffect(() => {
    fetchProductData();
    fetchAllCategoriesData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="product-update">
      <h4>Update product '{componentData.product.name}'</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput2
          id="name"
          type="text"
          label="Product Name"
          register={register}
          errors={errors}
        />
        <FormInput2
          id="stock"
          type="number"
          label="Stock"
          register={register}
          errors={errors}
        />
        <FormInput2
          id="price"
          step="0.001"
          type="number"
          label="Price"
          register={register}
          errors={errors}
        />
        <FormSelect2
          id="category_id"
          label="Category"
          values={componentData.categories.map((v) => v.id)}
          labels={componentData.categories.map((v) => v.name)}
          register={register}
        />
        <FormTextArea2
          id="description"
          label="Description"
          errors={errors}
          register={register}
          validation={{ minLength: 5 }}
        />
        <input type="file" className="d-block mb-4" {...register("image")} />
        <button type="submit" className="btn btn-secondary">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
