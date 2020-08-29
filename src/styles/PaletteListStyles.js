import sizes from "./Sizes";
import svg from "./svg.svg"

export default {
    "@global": {
        ".fade-exit": {
            opacity: 1,
        },
        ".fade-exit-active":{
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        backgroundColor: "blue",
        backgroundImage: `url(${svg})`,
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "scroll",
    },
    container: {
        width: "80%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("md")]: {
            width: "60%",
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
            textDecoration: "none",
            color: "white",
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "1.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
        }
    },
    heading: {
        fontSize: "2rem"
    }
}
