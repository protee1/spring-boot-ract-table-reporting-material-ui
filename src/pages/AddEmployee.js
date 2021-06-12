import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  Add,
  AddTwoTone,
  Email,
  LocationCity,
  Phone,
} from "@material-ui/icons";
import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import EmployeeService from "../services/EmployeeService";
import { Link } from "react-router-dom";
import Controls from "../Components/controls/Controls";
import UseForm from "../Components/UseForm";
import Notification from "../Components/Notification";
const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 900,
    display: "column",
  },
}));
const AddEmployee = () => {
  const initialState = {
    id: null,
    name: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
  };
  const classes = useStyles();
  const [employee, setEmployee] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Validations

  const resetForm = () => {
    setEmployee({ ...initialState });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const saveEmployee = () => {
    var data = {
      name: employee.name,
      surname: employee.surname,
      email: employee.email,
      address: employee.address,
      phone: employee.phone,
    };
    EmployeeService.create(data)
      .then((response) => {
        setEmployee({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
          phone: response.data.phone,
        });
        setSubmitted(true);
        setNotify({
          isOpen: true,
          message: "Submitted Successfully!!!",
          type: "success",
        });
      })
      .catch((e) => {
        window.alert(e.response.data.message);
      });
  };
  const newEmployee = () => {
    setEmployee({ initialState });
    setSubmitted(false);
  };
  return (
    <div>
      {submitted ? (
        <Paper style={{ display: "flex", maxWidth: "72px" }}>
          <Notification notify={notify} setNotify={setNotify} />

          <Controls.Button
            size="large"
            text="Add"
            variant="outlined"
            startIcon={<Add />}
            onClick={newEmployee}
          />
          {/** <Button variant="contained" component={Link} to={"/employees"}>Cancel</Button>*/}
        </Paper>
      ) : (
        <div>
          <PageHeader
            title="Add new employee"
            subTitle=""
            icon={<AddTwoTone fontSize="large" />}
          />

          <Paper className={classes.paper}>
            <FormControl nonValidate autoComplete="on">
              <Toolbar>
                <Grid container alignItems="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      type="text"
                      label="Name"
                      value={employee.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item sm={true} />

                  <Grid item>
                    <Email />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="email"
                      name="email"
                      id="email"
                      label="Email"
                      value={employee.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Toolbar>
              <Toolbar>
                <Grid container alignItems="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="surname"
                      name="surname"
                      type="text"
                      label="Surname"
                      value={employee.surname}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item sm={true} />
                  <Grid item>
                    <Phone />
                  </Grid>
                  <Grid>
                    <TextField
                      type="text"
                      label="Phone"
                      name="phone"
                      id="phone"
                      value={employee.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Toolbar>
              <Toolbar>
                <Grid container alignItems="center">
                  <Grid item>
                    <LocationCity />
                  </Grid>
                  <Grid>
                    <TextField
                      fullWidth
                      type="text"
                      label="Address"
                      name="address"
                      id="address"
                      value={employee.address}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Toolbar>
            </FormControl>
            <Toolbar>
              <Button
                style={{ margin: "auto" }}
                variant="contained"
                color="primary"
                onClick={saveEmployee}
              >
                Save
              </Button>
              {/**  <Button component={Link} to={"/employees"}style={{ margin:'auto'}} variant="contained" color="primary">Cancel</Button>*/}
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </Toolbar>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
