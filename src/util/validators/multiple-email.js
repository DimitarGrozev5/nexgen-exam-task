import { all } from './combinators';
import { isEmailLike, isLongerThan } from './common';

/**
 * Validator function for validating multiple emails
 */

const validEmails = () => (ctx, val) =>
  val.reduce((result, email) => result && isEmailLike()(ctx, email), true);

export const validEmailsList = (len = 0) =>
  all(isLongerThan(len), validEmails());
