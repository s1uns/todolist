import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#085982"
    },
    error: {
      main: "#d40808"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          margin: 3,
          "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
            transform: "translate(14px, 8px) scale(1)"
          },
          "& .MuiInputLabel-root": {
            color: "black"
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "gray"
          },
          "& .MuiInputBase-input": {
            width: "100%",
            padding: 8
          }
        }
      }
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {
            color: "goldenrod",
            fontSize: "5rem",
            marginBottom: "1rem"
          }
        },
        {
          props: { variant: "h2" },
          style: {
            color: "grey",
            fontSize: "2.5rem"
          }
        }
      ]
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: "calc(100% - 2rem)",
          padding: "1rem",
          border: "none",
          borderRadius: " 0.5rem",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "2rem",
          cursor: "pointer",
          marginTop: "1rem",
          zIndex: 1000,

          "&:hover": {
            backgroundColor: "#009bf3"
          },
          "&:disabled": {
            backgroundColor: "grey",

            "&:hover": {
              cursor: "pointer"
            }
          }
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 15
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

export default theme;
