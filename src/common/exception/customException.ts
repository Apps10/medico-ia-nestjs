
export const makeCustomException: (
  defaultMessage: string,
) => new (message?: string) => Error = function (defaultMessage) {
  return class extends Error {
    constructor(message: string = defaultMessage) {
      super(
        message
      );
    }
  };
};