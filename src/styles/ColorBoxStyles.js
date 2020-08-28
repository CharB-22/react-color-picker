import chroma from "chroma-js";
import sizes from "./Sizes"

export default {
    colorBox: {
        width: "20%",
        height: props => props.showFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button":{
            opacity: 1,
            transition: "0.5s",
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => props.showFullPalette ? "20%" : "50%",
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => props.showFullPalette ? "10%" : "50%",
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => props.showFullPalette ? "5%" : "50%",
        }
    },
    copyText:{
        color: props => chroma(props.background).luminance() >= 0.7? "rgba(0,0,0, 0.6)" : "white",
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08? "white" : "rgba(0,0,0, 0.6)",
    },
    seeMore: {
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
        color: props => chroma(props.background).luminance() >= 0.7? "rgba(0,0,0, 0.6)" : "white",
    },
    copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginTop: "-15px",
        marginLeft: "-50px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        textDecoration: "none",
        border: "none",
        opacity: 0,
        color: props => chroma(props.background).luminance() >= 0.7? "rgba(0,0,0, 0.6)" : "white",
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        color: "black",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        width: "100%",
        height: "100%",
        zIndex: "0",
        transition: "transform 0.5s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        opacity: "0",
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(0.1)",
        color: "white",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255,255,255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
        },
        "& p":{
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMessage:{
        opacity: "1",
        transform: "scale(1)",
        zIndex: "11",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
    }
}