import config from "@config/config";

export const createPredictionId = (match: any): string => {
  let resultString = "";

  config.predictFields.forEach((field) => {
    const value = match[field];
    if (value === undefined) {
      throw new Error(`Field ${field} is missing in match object`);
    }

    resultString += match[field];
  });

  return resultString;
};
