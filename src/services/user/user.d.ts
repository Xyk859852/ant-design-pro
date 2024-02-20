// @ts-ignore
/* eslint-disable */

declare namespace UserPage {
  type UserPageItem = {
    id?: string;
    userName?: string;
    phone?: string;
    email?: string;
    sex?: string;
    deptId?: string;
    postId?: string;
    roleId?: string;
    department?: IdName;
    role?: IdName;
    createTime?: string;
  };

  type IdName = {
    id?: string;
    name?: string;
  };
}
