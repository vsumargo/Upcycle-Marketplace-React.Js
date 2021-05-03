import React, { useState, useContext } from "react";
import IsLoggedinContext from "../utils/IsLoggedinContext.js";
import PostItemForm from "../components/forms/PostItemForm.js";
import Grid from "@material-ui/core/Grid";

function PostItem() {
  const status = useContext(IsLoggedinContext);

  const [itemDetails, setItemDetails] = useState({
    title: "",
    category: "",
    images: [],
    price: "",
    condition: "",
    description: "",
    userId: "",
  });

  function handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setItemDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleImageUpload(event) {
    event.preventDefault();
    const imageFiles = event.target.files;
    console.log(imageFiles);
    setItemDetails((prevState) => {
      return { ...prevState, images: [...imageFiles] };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    for (const name in itemDetails) {
      if (name === "images") {
        for (const img of itemDetails[name]) {
          formData.append("images", img);
        }
      } else {
        formData.append(name, itemDetails[name]);
      }
    }

    fetch("/api/postitem", {
      method: "POST",
      body: formData,
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {status.isLoggedin ? (
        <PostItemForm
          itemDetails={itemDetails}
          handleChange={handleChange}
          handleImageUpload={handleImageUpload}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div> You need to Login to post item.</div>
      )}
    </>
  );
}

export default PostItem;
