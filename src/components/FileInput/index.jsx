import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import FormData from "form-data";
import PropTypes from "prop-types";

import appServices from "../../api/appServices";
import showAlert from "../../utils/showAlert";
import "./style.scss";

function LoaderSection(loader, imagePath) {
  return loader ? (
    <Skeleton circle width={98} height={98} />
  ) : (
    <>
      <img src={imagePath} alt="profile-pic" />
      <p>Upload Photo </p>
    </>
  );
}

function FileInput({ imageUrl, onChange }) {
  const [imagePath, setImagePath] = useState("/assets/camera.svg");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setImagePath(imageUrl);
    }
  }, [imageUrl]);

  const uploadImage = (e) => {
    setLoader(true);
    const sizeLimit = 5; // 5 mb
    const allowedSize = sizeLimit * 1048576;
    let imageFile = "";
    if (e.dataTransfer) {
      imageFile = e.dataTransfer.files;
    } else if (e.target) {
      imageFile = e.target.files;
    }

    if (imageFile[0].size <= allowedSize) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile[0]);

      // upload itemFileName
      // debugger;
      const data = new FormData();

      data.append("photo", imageFile[0]);
      onChange(imageFile[0]);
    } else {
      // show error
      showAlert(`File size must not exceed ${sizeLimit} mb!`, "error");
    }
  };

  return (
    <div className="file-input">
      <div className="file-input-wrapper">
        <label htmlFor="itemFilename">
          <div className="file-input-upload">
            <input
              type="file"
              name="itemFilename"
              id="itemFilename"
              accept="image/*"
              onChange={(e) => {
                uploadImage(e);
              }}
              style={{ display: "none" }}
            />
            <img
              className="img-uploaded"
              src={
                imagePath === "/assets/camera.svg"
                  ? imagePath
                  : URL.createObjectURL(imagePath)
              }
              alt="profile-pic"
            />
          </div>
        </label>
      </div>
    </div>
  );
}

export default FileInput;

FileInput.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
