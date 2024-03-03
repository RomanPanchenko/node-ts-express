export const getHello = async (query: any): Promise<string> => {
  return query['user-name'];
};