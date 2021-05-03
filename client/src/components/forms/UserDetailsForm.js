import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

function UserDetailsForm(props) {
  const form = (
    <>
      <form>
        <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
          <Grid item xs={12} sm={6} md={4} style={{ padding: "0 8px" }}>
            <TextField
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.firstname}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{ padding: "0 8px" }}>
            <TextField
              id="lastname"
              name="lastname"
              label="Last Name"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.lastname}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} style={{ padding: "0 8px" }}>
            <TextField
              id="username"
              name="username"
              label="Username"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.username}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={6} style={{ padding: "0 8px" }}>
            <TextField
              id="address"
              name="address"
              label="Street Number & Street Name"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.address}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} style={{ padding: "0 8px" }}>
            <TextField
              id="suburb"
              name="suburb"
              label="Suburb"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.suburb}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2} style={{ padding: "0 8px" }}>
            <TextField
              id="postcode"
              name="postcode"
              label="Postcode"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.postcode}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2} style={{ padding: "0 8px" }}>
            <FormControl variant="outlined" style={{ width: "100%", margin: "8px 0" }}>
              <InputLabel id="state">State</InputLabel>
              <Select
                labelId="state"
                id="state"
                name='state'
                value={props.userdetails.state}
                onChange={props.handleChange}
                label="state"
              >
                <MenuItem value="act">ACT</MenuItem>
                <MenuItem value="nsw">NSW</MenuItem>
                <MenuItem value="qld">QLD</MenuItem>
                <MenuItem value="sa">SA</MenuItem>
                <MenuItem value="vic">VIC</MenuItem>
                <MenuItem value="wa">WA</MenuItem>
              </Select>
            </FormControl>

            {/* <label htmlFor="state">
              Select State:
              <select
                id="state"
                name="state"
                value={props.userdetails.state}
                onChange={props.handleChange}
              >
                <option value="act">ACT</option>
                <option value="nsw">NSW</option>
                <option value="qld">QLD</option>
                <option value="sa">SA</option>
                <option value="vic">VIC</option>
                <option value="wa">WA</option>
              </select>
            </label> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{ padding: "0 8px" }}>
            <TextField
              id="mobile"
              name="mobile"
              label="Mobile phone"
              type="text"
              variant="outlined"
              onChange={props.handleChange}
              value={props.userdetails.mobile}
              style={{ width: "100%", margin: "8px 0" }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "0 8px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%", margin: "8px 0" }}
              onClick={props.handleSubmit}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );

  return form;
}

export default UserDetailsForm;
