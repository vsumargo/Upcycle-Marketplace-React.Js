function UserDetailsForm (props) {
    const form = (
        <div>
          <form>
            <label htmlFor="firstname"> firstname:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter First Name"
              value={props.userdetails.firstname}
            />
            <label htmlFor="lastname">lastname:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter Last Name"
              value={props.userdetails.lastname}
            />
            <label htmlFor="username">username:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username to display"
              value={props.userdetails.username}
            />
            <label htmlFor="address">address:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={props.userdetails.address}
            />
            <label htmlFor="suburb">suburb:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="suburb"
              name="suburb"
              placeholder="Enter suburb"
              value={props.userdetails.suburb}
            />
            <label htmlFor="postcode">postcode:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="postcode"
              name="postcode"
              placeholder="Enter postcode"
              value={props.userdetails.postcode}
            />
    
            <label htmlFor="state">
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
            </label>
            <label htmlFor="mobile">mobile:</label>
            <input
              onChange={props.handleChange}
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter mobile"
              value={props.userdetails.mobile}
            />
    
            <button onClick={props.handleSubmit}>Submit</button>
          </form>
        </div>
    );

    return form;
}

export default UserDetailsForm;
