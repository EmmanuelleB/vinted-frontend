import { Redirect, useHistory } from "react-router-dom";
import { Formik } from "formik";
// import * as Yup from "yup";
import axios from "axios";
import "./Publish.scss";

const Publish = (props) => {
  const { token } = props;

  let history = useHistory();

  const initialValues = {
    pictures: [],
    // picture: {},
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: 0,
  };

  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required("obligatoire"),
  //   description: Yup.string(),
  //   brand: Yup.string(),
  //   size: Yup.number(),
  //   color: Yup.string(),
  //   condition: Yup.string(),
  //   city: Yup.string(),
  //   price: Yup.number().required("obligatoire"),
  // });
  const validate = (values) => {
    const errors = {};

    if (values.pictures.length === 0) {
      errors.pictures = "Champ obligatoire";
    }
    if (!values.title) {
      errors.title = "Champ obligatoire";
    }

    if (!values.price) {
      errors.price = "Champ obligatoire";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      const pictures = [...values.pictures];

      if (pictures.length < 5) {
        pictures.forEach((picture, index) => {
          return formData.append(`picture${index + 1}`, picture);
        });
      }
      // formData.append("picture1", values.picture);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("color", values.color);
      formData.append("size", values.size);
      formData.append("condition", values.condition);
      formData.append("city", values.city);
      formData.append("brand", values.brand);
      formData.append("price", values.price);

      console.log(formData);

      const response = await axios.post("https://my-vinted-app.herokuapp.com/offer/publish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmitting(false);

      if (response.data._id) {
        history.push({
          pathname: `/offer/${response.data._id}`,
        });
      } else {
        alert("Une erreur est survenue");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="offerForm">
      <div className="page-container">
        <h2>Vends ton article</h2>
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-item">
                <div>
                  <label htmlFor="pictures">
                    Photos <br />
                    <br />
                    (5 maximum)
                  </label>
                  <div className={errors.pictures && touched.pictures ? "input-file-error" : "input-file"}>
                    <input
                      type="file"
                      name="pictures"
                      id="pictures"
                      accept=".jpg, .jpeg, .png, .svg, .gif"
                      multiple
                      onChange={(event) => {
                        setFieldValue("pictures", event.currentTarget.files);
                        // setFieldValue("picture", event.currentTarget.files[0]);
                      }}
                    />
                    <span>{errors.pictures && touched.pictures && errors.pictures}</span>
                  </div>
                </div>
              </div>

              <div className="form-item">
                <div>
                  <label htmlFor="title">Titre</label>

                  <input
                    className={errors.title && touched.title ? "input-error" : null}
                    onChange={handleChange}
                    name="title"
                    placeholder={errors.title && touched.title ? errors.title : "ex: Chemise sézane verte"}
                  />
                </div>
                <div>
                  <label htmlFor="description">Décris ton article</label>
                  <input
                    name="description"
                    onChange={handleChange}
                    placeholder="ex: Portée quelques fois, taille correctement"
                  />
                </div>
              </div>

              <div className="form-item">
                <div>
                  <label htmlFor="brand">Marque</label>
                  <input onChange={handleChange} name="brand" placeholder="ex: Zara" />
                </div>
                <div>
                  <label htmlFor="size">Taille</label>
                  <input onChange={handleChange} name="size" id="size" placeholder="ex: L" />
                </div>
                <div>
                  <label htmlFor="color">Couleur</label>
                  <input onChange={handleChange} name="color" placeholder="ex: Blanc" />
                </div>
                <div>
                  <label htmlFor="condition">Etat</label>
                  <input onChange={handleChange} name="condition" placeholder="ex: Neuf avec étiquette" />
                </div>
                <div>
                  <label htmlFor="city">Lieu</label>
                  <input onChange={handleChange} name="city" placeholder="ex: Paris" />
                </div>
              </div>
              <div className="form-item">
                <div>
                  <label htmlFor="price">Prix</label>
                  <input
                    className={errors.price && touched.price ? "input-error" : null}
                    placeholder={errors.price && touched.price ? errors.price : "0,00 €"}
                    onChange={handleChange}
                    name="price"
                  />
                </div>
              </div>

              <div className="btn-position">
                <button type="submit" className="button-blue-big" disabled={isSubmitting}>
                  {isSubmitting ? "..." : "Valider"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Publish;
