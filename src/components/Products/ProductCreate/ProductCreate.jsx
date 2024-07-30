import "./ProductCreate.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { saveProduct } from "../../../services/products";
import FormInput2 from "../../Form/FormInput2/FormInput2";
import FormSelect2 from "../../Form/FormSelect2/FormSelect2";
import { fetchAllCategories } from "../../../services/categories";
import FormTextArea2 from "../../Form/FormTextArea2/FormTextArea2";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [componentData, setComponentData] = useState({
    categories: [],
    loading: true,
    err: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchAllCategoriesData = async () => {
    await fetchAllCategories()
      .then((res) => {
        setComponentData((prev) => {
          return { ...prev, categories: res.data.data, loading: false };
        });
      })
      .catch((err) => {
        setComponentData((prev) => {
          return { ...prev, err, loading: false };
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
    saveProduct(formData)
      .then(() => {
        // To refresh parent component
        alert("Product created!");
        navigate("/products");
        return;
      })
      .catch((err) => {
        setComponentData((prev) => {
          return { ...prev, err };
        });
      });
  };

  useEffect(() => {
    fetchAllCategoriesData();
  }, []);

  return (
    <div className="product-create-component">
      <div className="header-icon">
        <MdOutlineProductionQuantityLimits />
      </div>
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

export default ProductCreate;
