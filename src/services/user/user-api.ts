// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户列表 GET /api/rule */
export async function userPageList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<UserPage.UserPageItem>('/api/system/user/getUserPageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改用户信息 POST /api/rule */
export async function createUser(body: UserPage.UserPageItem, options?: { [key: string]: any }) {
  return request<UserPage.UserPageItem>('/api/system/user/createAdminUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户信息 POST /api/rule */
export async function updateUser(body: UserPage.UserPageItem, options?: { [key: string]: any }) {
  return request<UserPage.UserPageItem>('/api/system/user/updateAdminUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户信息 POST /api/rule */
export async function deleteUser(body: (number | string)[], options?: { [key: string]: any }) {
  return request<boolean>('/api/system/user/deleteAdminUser', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 部门下拉数据 GET /api/rule */
export async function getDeptSelect() {
  return request<UserPage.IdName>('/api/system/department/getDepartmentsCascade');
}

/** 部门下拉数据 GET /api/rule */
export async function getRoleSelect() {
  return request<UserPage.IdName>('/api/system/role/getRolesCascade');
}
