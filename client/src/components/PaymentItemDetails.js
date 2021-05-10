import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

function PaymentItemDetails(props) {
  return (
    <Card style={{ width: "100%" }}>
      <CardHeader title={"Order Summary"} />
      <Divider />
      <Grid container spacing={2} style={{ padding: "16px 16px" }}>
        <Grid item xs={3} sm={12} md={3}>
          <img src={props.itemDetails.images[0].location} />
        </Grid>
        <Grid item xs={6}>
          <p style={{ fontSize: "16px", margin: 0, fontWeight: 600 }}>
            {props.itemDetails.title.toUpperCase()}
          </p>
          <Typography>{`Condition: ${props.itemDetails.condition}`}</Typography>
        </Grid>
        <Grid item xs={3} sm={6} md={3}>
          <Typography align="right">{`$${props.itemDetails.price}.00`}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} style={{ padding: "16px 16px" }}>
        <Grid item xs={9} sm={6} md={9}>
          <p style={{ fontSize: "20px", margin: 0 }}>Total (AUD)</p>
        </Grid>
        <Grid item xs={3} sm={6} md={3}>
          <Typography
            variant="h6"
            align="right"
          >{`$${props.itemDetails.price}.00`}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PaymentItemDetails;
