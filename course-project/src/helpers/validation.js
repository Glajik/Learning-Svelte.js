export function isEmpty(val) {
  if (!val) return true;
  return val.trim().length === 0;
}

export function isUrl(val) {
  if (!val) return false;
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    .test(val);
}

export function isEmail(val) {
  if (!val) return false;
  return /.+@.+\..+/i.test(val);
}