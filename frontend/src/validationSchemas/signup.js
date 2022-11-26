import * as Yup from 'yup';
import i18n from '../i18n';

const signUpSchema = () => Yup.object({
  username: Yup.string()
    .test(
      'length_range',
      i18n.t('error.length_range', { min: 6, max: 20 }),
      (value) => value.length >= 6 && value.length <= 20,
    )
    .required(i18n.t('error.required_field')),
  password: Yup.string()
    .min(6, i18n.t('error.min_length', { min: 6 }))
    .required(i18n.t('error.required_field')),
  passwordConfirmation: Yup.string()
    .when(
      'password',
      (password, field) => (
        password
          ? field.required(i18n.t('error.required_field'))
            .oneOf([Yup.ref('password')], i18n.t('error.passwords_should_match'))
          : field),
    ),
});

export default signUpSchema;
