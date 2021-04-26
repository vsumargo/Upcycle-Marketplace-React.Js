function PostItemForm(props) {
  function displayUploadedImages(images) {
    if (images.length === 0) {
      return;
    }

    const displayedImages = images.map((image) => {
      const imgURL = URL.createObjectURL(image);
      return (
        <img
          src={imgURL}
          height="200"
          width="200"
          onLoad={() => {
            console.log(`${imgURL} is being revoked`);
            URL.revokeObjectURL(imgURL);
          }}
        />
      );
    });

    return displayedImages;
  }
  const form = (
    <>
      <form>
        <label htmlFor="title"> title:</label>
        <input
          onChange={props.handleChange}
          type="text"
          id="title"
          name="title"
          placeholder="Enter First Name"
          value={props.itemDetails.title}
        />
        <label htmlFor="category">
          Select Category:
          <select
            id="category"
            name="category"
            value={props.itemDetails.category}
            onChange={props.handleChange}
          >
            <option value="automotive">Automotive</option>
            <option value="babyEssentials">Baby Essentials</option>
            <option value="booksMusicMovies">Books, Music & Movies</option>
            <option value="clothingShoesAccessories">
              Clothing, Shoes & Accessories
            </option>
            <option value="electronics">Electronics</option>
            <option value="homeFurniture">Home & Furniture</option>
            <option value="jewelryWatches">Jewelry & Watches</option>
            <option value="sportingGoods">Sporting Goods</option>
            <option value="toysHobbies">Toys, Hobbies</option>
          </select>
        </label>

        <label htmlFor="condition">
          Select condition:
          <select
            id="condition"
            name="condition"
            value={props.itemDetails.condition}
            onChange={props.handleChange}
          >
            <option value="">Select Condition</option>
            <option value="unused">Unused</option>
            <option value="likeNew">Used - Like New</option>
            <option value="veryGood">Used - Very Good</option>
            <option value="good">Used - Good</option>
            <option value="acceptable">Used - Acceptable</option>
          </select>
        </label>

        <label htmlFor="price">Item Price:</label>
        <input
          onChange={props.handleChange}
          type="number"
          id="price"
          name="price"
          placeholder="0.00"
          value={props.itemDetails.price}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          onChange={props.handleChange}
          type="number"
          id="description"
          name="description"
          placeholder="enter item description here"
          maxLength='250'
          value={props.itemDetails.description}
        />

        <label htmlFor="images">Upload picture of the item:</label>
        <input
          onChange={props.handleImageUpload}
          type="file"
          id="images"
          name="images"
          accept="image/png, image/jpeg"
          multiple
        />

        <button onClick={props.handleSubmit}>Submit</button>
      </form>
      {displayUploadedImages(props.itemDetails.images)}
    </>
  );

  return form;
}

export default PostItemForm;
