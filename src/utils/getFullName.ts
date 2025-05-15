export const getFullName = (user: { firstName: string; lastName: string; [key: string]: any }) => {
  return user.firstName.concat(' ', user.lastName);
};
