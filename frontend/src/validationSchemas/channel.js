import * as Yup from 'yup';

const channelSchema = (channelNames) => Yup.object({
  channelName: Yup.string()
    .required('error.channelNameCannotBeBlank')
    .trim()
    .ensure()
    .notOneOf(channelNames, ('error.channelNameAlreadyBeenTaken')),
});

export default channelSchema;
