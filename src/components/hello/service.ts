export const getHello = async (query: any): Promise<string> => {
  const name = query['user-name'];

  return `Hello ${name}!`;
};