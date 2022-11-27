import * as Yup from 'yup';

const channelSchema = (channelNames) => Yup.object({
  channelName: Yup.string().required().ensure().notOneOf(channelNames),
});

export default channelSchema;
