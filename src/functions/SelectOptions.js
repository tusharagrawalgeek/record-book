import * as color from './../colors';
const colourStyles = {
  control: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // console.log(styles);
    return {
      ...styles,
      backgroundColor: "none",
      color: color.white,

      borderColor: isSelected ? "red" : "black",
      borderRadius: "0",
      borderStyle: "none",
      borderWidth: 0,
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      border: 0,
      background: isFocused ? color.dark : color.dark,
      color: color.white,
      margin: 0,
      borderColor: "red",
      borderRadius: "0",
      borderStyle: "none",
      borderWidth: 0,
      // padding:"0.2rem",
      cursor: isDisabled ? "not-allowed" : "grab",
    };
  },
  input: (styles) => ({ ...styles, color: "white", fontWeight: "light" }),
  placeholder: (styles) => {
    // console.log(styles);
    return { ...styles, color: "white", background: color.dark };
  },
  singleValue: (styles) => ({
    ...styles,
    color: "white",
    background: color.dark,
  }),
};
export default colourStyles;
