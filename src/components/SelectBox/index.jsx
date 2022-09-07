// import React from "react";
// import { Select } from "antd";
// import PropTypes from "prop-types";

// function SelectBox({ listViewOption, onChange, value }) {
//   const { Option } = Select;

//   const onChangeHandle = (newValue) => {
//     onChange(newValue);
//   };

//   return (
//     <div id="select-box-wrapper">
//       <Select
//         id="select-box-id"
//         name="selectBox"
//         onChange={onChangeHandle}
//         value={value}
//         style={{ width: 150 }}
//         getPopupContainer={() => document.getElementById("select-box-wrapper")}
//       >
//         {listViewOption.map((el) => (
//           <Option value={el.value}>{el.label}</Option>
//         ))}
//       </Select>
//     </div>
//   );
// }

// export default SelectBox;

// SelectBox.defaultProps = {
//   onChange: () => {},
//   value: "",
// };

// SelectBox.propTypes = {
//   listViewOption: PropTypes.instanceOf(Array).isRequired,
//   onChange: PropTypes.func,
//   value: PropTypes.string,
// };
