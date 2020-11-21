const validations = {
  email: (v) =>
    v.toString().length > 2 &&
    /^([.A-Za-z0-9_-])+@([A-Za-z0-9_])+\.([A-Za-z]{2,4})+(.[A-Za-z]{2,4})?$/.test(
      v.toString()
    ),
  full_name: (v) => (v && v.toString().length > 2 ? true : false),
  password: (v) => (v && v.toString().length >= 6 ? true : false),
};
export default validations;
