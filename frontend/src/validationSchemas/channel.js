import * as Yup from 'yup';
import i18n from '../i18n';

const channelSchema = (channelNames) => Yup.object({
  channelName: Yup.string()
    .required(i18n.t('error.channelNameCannotBeBlank'))
    .trim()
    .ensure()
    .notOneOf(channelNames, i18n.t('error.channelNameAlreadyBeenTaken')),
});

export default channelSchema;
