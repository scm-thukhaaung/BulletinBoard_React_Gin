import { CsvPostItem } from "../interfaces/PostInterface";

export const CheckTableUtilSvc = (postList: CsvPostItem[]) => {
  let errList: number[] = [];
  errList = [];
  for (let i = 0; i < postList.length; i++) {
    for (let j = i + 1; j < postList.length; j++) {
      if (postList[i].Title === postList[j].Title) {
        postList[i] = { ...postList[i], HasError: true };
        errList.push(i);
      }
      if (!postList[i].Title || !postList[i].Description || !postList[i].Status) {
        postList[i] = { ...postList[i], HasError: true };
        errList.push(i);
      }
      if (postList[i].Status !== "1" && postList[i].Status !== "0") {
        postList[i] = { ...postList[i], HasError: true };
        errList.push(i);
      }
      if (!errList.length) {
        postList[i] = { ...postList[i], HasError: false };
      }
    }
  }
  return postList;
};