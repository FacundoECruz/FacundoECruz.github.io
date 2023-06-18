import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { InputLabel, OutlinedInput } from "@mui/material";
import UploadWidget from "../../components/UploadWidget";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Altisima
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {

  const handleSubmit = async (e) => {
    e.preventDefault()
  };
  
  const handleImage = async(e) => {
    e.preventDefault();
    // const files = e.target.files;
    // console.log(files[0])
    // const data = new FormData();
    // data.append("file", files[0])
    // data.append("upload_preset", "altisimaUsers")
    // setLoading(true)
    // const res = await fetch(
    //   "https://api.cloudinary.com/v1_1/dfknsvqer/image/upload",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // )
    // const file = await res.json()
    // setImage(file.secure_url)
    // console.log(image)
    // setLoading(false)
  }

  const styles = {
    paperContainer: {
      background:
        " url('https://res.cloudinary.com/dfknsvqer/image/upload/v1687094811/istockphoto-1212342896-612x612-1_dlvflo.jpg')",
    },
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        style={styles.paperContainer}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <InputLabel htmlFor="image-upload">Seleccionar imagen</InputLabel>
            <OutlinedInput
              id="image-upload"
              type="file"
              name="image"
              inputProps={{
                accept: "image/*",
              }}
              sx={{ ml: 2 }}
              onChange={handleImage}
            /> */}
            <UploadWidget />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar usuario"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
