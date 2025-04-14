
export const makeCustomException: (
  defaultMessage: string,
) => new (sharedData?: any) => Error = function (defaultMessage) {
  return class extends Error {
    sharedData 
    constructor(sharedData) {
      super(defaultMessage);
      this.sharedData = sharedData
    }
  };
};