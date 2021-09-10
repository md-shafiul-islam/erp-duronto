export const helperIsEmpty = (obj) => {
  if (obj === null || obj === undefined || typeof obj === "undefined") {
    return true;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }

  if (obj) {
  } else {
    return true;
  }
  if (obj === undefined) return true;

  if (obj.length > 0) {
    return false;
  }

  if(obj.length === 0) return true;

  return false;
};

/**
 *
 * @param {Number} count
 * @param {Number} base
 * @param {Number} status if 0 default 1,2,3, ...n, if 1 then year curent yesr --, if 2 current year ++,
 */
export const getNmsOptions = (count, base, status) => {
  const options = [];
  if (status === 1) {
    const date = new Date();

    let curentYear = date.getFullYear();
    for (let i = base; i < count; i++) {
      options.push({ label: curentYear, value: curentYear });
      curentYear--;
    }

    return options;
  }

  if (status === 2) {
    const date = new Date();

    let curentYear = date.getFullYear();
    for (let i = base; i < count; i++) {
      options.push({ label: curentYear, value: curentYear });
      curentYear++;
    }

    return options;
  }

  if (status === 0) {
    count = count + base;

    for (let i = base; i < count; i++) {
      if (base === 0) {
        options.push({ label: i + 1, value: i });
      } else {
        options.push({ label: i, value: i });
      }
    }
    return options;
  }
};

/**
 * Formik form validtion check
 * @param {*} errors
 * @param {*} touched
 * @param {*} fieldName
 * @returns { cls: "", msg: msg, status: false }
 */
export const isFieldError = (errors, touched, fieldName) => {
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

  if (touched[fieldName]) {
    if (msg) {
      return { cls: "is-invalid", msg: msg, status: true };
    } else {
      return { cls: "is-valid", msg: "", status: false };
    }
  }
  return { cls: "", msg: msg, status: false };
};
