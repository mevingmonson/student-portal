const getImageUrl = (blobUrl) => {
  let cdnUrl = "https://imgendpoint.azureedge.net/student-images";
  let subStr = blobUrl.split("student-images")[1];
  let imageUrl = cdnUrl + subStr;

  return imageUrl;
};

export { getImageUrl };
