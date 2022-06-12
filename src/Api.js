const dataURL = process.env.REACT_APP_URL;

const apiGetCall = async () => {
  const response = await fetch(dataURL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
};

/*
const apiGetImagesCall = async (imageURL) => {
  const response = await fetch(imageURL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
}
*/

const dataCall = async () => {
  const messages = await apiGetCall();
  // const images = await apiGetImagesCall(imageURL);
  return messages;
};

const apiPostCall = async (e, formData) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.log(formData);
  const response = await fetch(dataURL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: formData,
  });
  return response;
};

const imageCall = async (e) => {
  const res = await (fetch(`${dataURL}/images/${e.target.options.imageName}`), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    body: e.target.options.imageName,
  });
  return res;
};

export { dataCall, apiPostCall, imageCall };
