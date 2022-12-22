import * as Yup from 'yup';
import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../config/constants';

const signUpSchema = Yup.object({
  username: Yup.string()
    .required('error.required_field')
    .test(
      'length_range',
      'error.length_range',
      (value) => value?.length >= USERNAME_MIN_LENGTH && value?.length <= USERNAME_MAX_LENGTH,
    ),
  password: Yup.string()
    .min(PASSWORD_MIN_LENGTH, 'error.min_length')
    .required('error.required_field'),
  passwordConfirmation: Yup.string()
    .when(
      'password',
      (password, field) => (
        password
          ? field.required('error.required_field')
            .oneOf([Yup.ref('password')], 'error.passwords_should_match')
          : field),
    ),
});

export default signUpSchema;
