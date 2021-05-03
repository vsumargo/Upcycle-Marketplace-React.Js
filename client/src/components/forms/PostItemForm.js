import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import "./PostItemForm.css";

function PostItemForm(props) {
  function displayUploadedImages(images) {
    if (images.length === 0) {
      return;
    }

    const displayedImages = images.map((img, index) => {
      const imgURL = URL.createObjectURL(img);
      const image = new Image();
      image.src = imgURL;
      return (
        <Grid item xs={12} sm={3} key={index}>
          <div className="image-to-be-uploaded">
            <img
              src={imgURL}
              onLoad={() => {
                console.log(`${imgURL} is being revoked`);
                console.log(image.width + "x" + image.height);
                URL.revokeObjectURL(imgURL);
              }}
            />
          </div>
        </Grid>
      );
    });

    return displayedImages;
  }
  const form = (
    <form>
      <Grid container spacing={2} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="title"
            name="title"
            label="Title"
            type="text"
            variant="outlined"
            onChange={props.handleChange}
            value={props.itemDetails.title}
            style={{ width: "100%", margin: "8px 0" }}
          />
        </Grid>

        <Grid item xs={6} sm={4} md={4}>
          <FormControl
            variant="outlined"
            style={{ width: "100%", margin: "8px 0" }}
          >
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              name="category"
              value={props.itemDetails.category}
              onChange={props.handleChange}
              label="category"
            >
              <MenuItem value="automotive">Automotive</MenuItem>
              <MenuItem value="babyEssentials">Baby Essentials</MenuItem>
              <MenuItem value="booksMusicMovies">
                Books, Music & Movies
              </MenuItem>
              <MenuItem value="clothingShoesAccessories">
                Clothing, Shoes & Accessories
              </MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="homeFurniture">Home & Furniture</MenuItem>
              <MenuItem value="jewelryWatches">Jewelry & Watches</MenuItem>
              <MenuItem value="sportingGoods">Sporting Goods</MenuItem>
              <MenuItem value="toysHobbies">Toys, Hobbies</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4} md={4}>
          <FormControl
            variant="outlined"
            style={{ width: "100%", margin: "8px 0" }}
          >
            <InputLabel id="condition">Item Condition</InputLabel>
            <Select
              labelId="condition"
              id="condition"
              name="condition"
              value={props.itemDetails.condition}
              onChange={props.handleChange}
              label="condition"
            >
              <MenuItem value="">Select Condition</MenuItem>
              <MenuItem value="unused">Unused</MenuItem>
              <MenuItem value="likeNew">Used - Like New</MenuItem>
              <MenuItem value="veryGood">Used - Very Good</MenuItem>
              <MenuItem value="good">Used - Good</MenuItem>
              <MenuItem value="acceptable">Used - Acceptable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <TextField
            id="price"
            name="price"
            label="Item Price"
            type="number"
            variant="outlined"
            onChange={props.handleChange}
            value={props.itemDetails.price}
            style={{ width: "100%", margin: "8px 0" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <label htmlFor="description">Description:</label>
          <textarea
            onChange={props.handleChange}
            type="number"
            id="description"
            name="description"
            placeholder="enter item description here"
            maxLength="250"
            value={props.itemDetails.description}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <label htmlFor="images">Upload picture of the item:</label>
          <input
            onChange={props.handleImageUpload}
            type="file"
            id="images"
            name="images"
            accept="image/png, image/jpeg"
            multiple
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2} alignItems="center">
            {displayUploadedImages(props.itemDetails.images)}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", margin: "8px 0" }}
            onClick={props.handleSubmit}
          >
            Submit Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  return form;
}

export default PostItemForm;
