import * as Yup from 'yup'

const emailValidationSchema = Yup.object().shape({
  emailId: Yup.string().email('Invalid email format').required('Email is required'),
  otp: Yup.string()
    .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
    .required('OTP is required'),
})

const passwordSettingSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(4, 'New Password must be at least 4 characters')
    .required('New Password is required'),
})

const mobileValidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  otp: Yup.string()
    .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
    .required('OTP is required'),
})

export { emailValidationSchema, passwordSettingSchema, mobileValidationSchema }

// import * as Yup from 'yup'

// export const formSections = [
//   {
//     name: 'otpValidation',
//     title: 'OTP Validation',
//     description: 'Validate OTP sent on email',
//     validationSchema: Yup.object().shape({
//       emailId: Yup.string().email('Invalid email format').required('Email is required'),
//       otp: Yup.string()
//         .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
//         .required('OTP is required'),
//     }),
//   },
//   {
//     name: 'passwordSetting',
//     title: 'Password Setting',
//     description: 'Set a new password',
//     validationSchema: Yup.object().shape({
//       password: Yup.string()
//         .min(4, 'Password must be at least 4 characters')
//         .required('Password is required'),
//       newPassword: Yup.string()
//         .min(4, 'New Password must be at least 4 characters')
//         .required('New Password is required'),
//     }),
//   },
//   {
//     name: 'mobileValidation',
//     title: 'Mobile Validation',
//     description: 'Validate mobile with OTP',
//     validationSchema: Yup.object().shape({
//       mobile: Yup.string()
//         .matches(/^[0-9]{10}$/, 'Invalid mobile number')
//         .required('Mobile number is required'),
//       otp: Yup.string()
//         .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
//         .required('OTP is required'),
//     }),
//   },
// ]
//  const AccountActivateSchema = Yup.object().shape({
//   match1: Yup.object().shape({
//     emailId: Yup.string().email('Invalid email format').required('Email is required'),
//     otp: Yup.string()
//       .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
//       .required('OTP is required'),
//   }),
//   match2: Yup.object().shape({
//     password: Yup.string()
//       .trim()
//       .min(4, 'Password must be at least 4 characters long')
//       .max(15, 'Password must be at most 15 characters long')
//       .matches(/^\S*$/, 'Password must not contain white spaces')
//       .required('Password is required'),
//     newPassword: Yup.string()
//       .trim()
//       .min(4, 'New password must be at least 4 characters long')
//       .max(15, 'New password must be at most 15 characters long')
//       .matches(/^\S*$/, 'New password must not contain white spaces')
//       .required('New password is required'),
//   }),
//   match3: Yup.object().shape({
//     mobile: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Invalid mobile number')
//       .required('Mobile number is required'),
//     otp: Yup.string()
//       .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
//       .required('OTP is required'),
//   }),
// })

// export default AccountActivateSchema
