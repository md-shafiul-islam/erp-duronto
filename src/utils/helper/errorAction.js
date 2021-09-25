export const helperIsEmpty = (obj) => {
  if (obj === null || obj === undefined || typeof obj === "undefined") {
    return true;
  }

  if (obj.length > 0) {
    return false;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }

  if (obj) {
    return false;
  } else {
    return true;
  }
};

export const esIsFieldError = (errors, touched, fieldName) => {
  let msg = undefined;
  if (
    !helperIsEmpty(errors) &&
    !helperIsEmpty(touched) &&
    !helperIsEmpty(fieldName)
  ) {
    if (
      !helperIsEmpty(errors[fieldName]) &&
      !helperIsEmpty(touched[fieldName])
    ) {
      msg = errors[fieldName];
    }
  }
  if (touched !== undefined && touched !== null) {
    if (touched[fieldName]) {
      if (msg) {
        return { cls: "is-invalid", msg: msg, status: true };
      } else {
        return { cls: "is-valid", msg: "", status: false };
      }
    }
  }

  return { cls: "", msg: msg, status: false };
};
export const esIsPhoneFieldError = (errors, touched, codeName, phoneName) => {
  let errorObj = { cls: "", status: false, msg: "" };
  if (!helperIsEmpty(touched)) {
    if (touched[codeName] || touched[phoneName]) {
      errorObj = { cls: "is-valid", status: false, msg: "" };

      if (errors[phoneName] !== undefined) {
        if (errors[phoneName] !== "") {
          errorObj = {
            cls: "is-invalid",
            status: true,
            msg: errors[codeName],
          };
        }
      }

      if (errorObj.msg === "") {
        if (errors[codeName] !== undefined) {
          if (errors[codeName] !== "") {
            errorObj = {
              cls: "is-invalid",
              status: true,
              msg: errors[codeName],
            };
          }
        }
      }
    }
  }

  return errorObj;
};

export const esIsFunction = (checkFunc) => {
  if (checkFunc) {
    return checkFunc && {}.toString.call(checkFunc) === "[object Function]";
  }

  return false;
};

export const isEmptyString = (v) => {
  if (v !== undefined && v !== null) {
    if (v.length > 0) {
      return false;
    }
  }

  return true;
};

export const esIsFile = (file, bytSize) => {
  if (file) {
    if (file.isFile) console.log("Selected File Check ", file);
    return true;
  }

  return false;
};
