import { Constant } from "../consts/Constant";
import { CsvPostItem } from "../interfaces/PostInterface";
import { CsvUserItem } from "../interfaces/UserInterface";

export const CheckPostUtilSvc = (postList: CsvPostItem[]) => {
  let errList: number[] = [];
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

export const CheckUserUtilSvc = (userList: CsvUserItem[]) => {
  let errList: number[] = [];
  for (let i = 0; i < userList.length; i++) {
    for (let j = i + 1; j < userList.length; j++) {
      if (userList[i].Name === userList[j].Name) {
        userList[i] = { ...userList[i], HasError: true };
        errList.push(i);
      }
      if (userList[i].Email === userList[j].Email || !Constant.emailRegExp.test(userList[i].Email!)) {
        userList[i] = { ...userList[i], HasError: true };
        errList.push(i);
      }
      if (!userList[i].Name || !userList[i].Email || !userList[i].Type) {
        userList[i] = { ...userList[i], HasError: true };
        errList.push(i);
      }
      if (userList[i].Type !== "1" && userList[i].Type !== "0") {
        userList[i] = { ...userList[i], HasError: true };
        errList.push(i);
      }
      if (!errList.length) {
        userList[i] = { ...userList[i], HasError: false };
      }
    }
  }
  return userList;
};