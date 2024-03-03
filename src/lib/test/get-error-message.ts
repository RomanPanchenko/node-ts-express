export const getErrorMessage = (response: any) => {
  let jsonObj = null;
  try {
    jsonObj = JSON.parse(response.error.text);
  } catch (e) {
    throw e;
  }

  return jsonObj;
};