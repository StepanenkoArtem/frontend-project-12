import * as profanity from 'leo-profanity';

const useProfanity = () => {
  const dictionary = profanity.getDictionary('ru');
  profanity.add(dictionary);

  return profanity;
};

export default useProfanity;
