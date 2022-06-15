import ERROR_MESSAGE from "../constants/errorMessage";

export const getUserEmail = () => {
  return new Promise((resolve, reject) =>
    chrome.identity.getProfileUserInfo((result) => {
      if (chrome.runtime.lastError) {
        reject(ERROR_MESSAGE.UNAUTHORIZED_USER);
      }
      resolve(result.email);
    })
  );
};

export const getToken = () => {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(ERROR_MESSAGE.UNAUTHORIZED_TOKEN);
      }
      resolve(token);
    });
  });
};
