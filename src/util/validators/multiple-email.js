import { all } from './combinators';
import { isEmailLike, isLongerThan } from './common';

const validEmails = () => (val) =>
  val.reduce((result, email) => result && isEmailLike()(email), true);

export const validEmailsList = (len = 0) =>
  all(isLongerThan(len), validEmails());
