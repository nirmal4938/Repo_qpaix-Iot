// locations: Yup.array()
// .of(
//   Yup.object().shape({
//     name:
//       activeIndex === 2
//         ? Yup.string().required('Please fill out this field.')
//         : Yup.string(),
//     latitude:
//       activeIndex === 2
//         ? Yup.string()
//             .matches(
//               /^([-+]?\d{1,2}(?:\.\d+)?|90(?:\.0+)?)(?:, ?[-+]?\d{1,3}(?:\.\d+)?|, ?180(?:\.0+)?)?$/,
//               'Invalid latitude',
//             )
//             .required('Please fill out this field.')
//         : Yup.string(),
//     longitude:
//       activeIndex === 2
//         ? Yup.string()
//             .matches(
//               /^([-+]?\d{1,2}(?:\.\d+)?|90(?:\.0+)?)(?:, ?[-+]?\d{1,3}(?:\.\d+)?|, ?180(?:\.0+)?)?$/,
//               'Invalid longitude',
//             )
//             .required('Please fill out this field.')
//         : Yup.string(),
//   }),
// )
// .required('At least one location is required'),
