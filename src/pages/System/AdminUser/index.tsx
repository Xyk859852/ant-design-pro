import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';

import {
  createUser,
  deleteUser,
  getDeptSelect,
  getRoleSelect,
  updateUser,
  userPageList,
} from '@/services/user/user-api';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Modal, Popconfirm, message } from 'antd';
import React, { Key, useRef, useState } from 'react';

/**
 * @en-US Update node
 * @zh-CN 新增用户信息
 *
 * @param fields
 */
const handleCreate = async (user: UserPage.UserPageItem) => {
  const hide = message.loading('Configuring');
  try {
    await createUser(user);
    hide();

    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新用户信息
 *
 * @param fields
 */
const handleUpdate = async (user: UserPage.UserPageItem) => {
  const hide = message.loading('Configuring');
  try {
    console.log(user);
    await updateUser(user);

    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新用户信息
 *
 * @param fields
 */
const handleDelete = async (ids: (number | string)[]) => {
  const hide = message.loading('Configuring');
  try {
    console.log(ids);
    await deleteUser(ids);
    hide();
    message.success('删除成功');

    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};

const deptSelect = async () => {
  const deptList = await getDeptSelect();
  const arr = [];
  deptList.forEach((element) => {
    arr.push({ key: element.id, label: element.name, value: element.id });
  });
  return arr;
};

const roleSelect = async () => {
  const deptList = await getRoleSelect();
  const arr = [];
  deptList.forEach((element) => {
    arr.push({ key: element.id, label: element.name, value: element.id });
  });
  return arr;
};

const AdminUser: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };
  const columns: ProColumns<UserPage.UserPageItem>[] = [
    {
      title: <FormattedMessage id="模糊查询" defaultMessage="模糊查询" />,
      dataIndex: 'keyboard',
      hideInForm: true,
      hideInSetting: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="用户名称" defaultMessage="用户名称" />,
      dataIndex: 'userName',
      tip: '这是一个用户名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="手机号" defaultMessage="手机号" />,
      dataIndex: 'phone',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="部门名称" defaultMessage="部门名称" />,
      dataIndex: 'deptId',
      valueType: 'select',
      render: (dom, entity) => {
        return entity.department?.name;
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      request: deptSelect,
    },
    {
      title: <FormattedMessage id="角色名称" defaultMessage="角色名称" />,
      dataIndex: 'roleId',
      valueType: 'select',
      render: (dom, entity) => {
        return entity.role?.name;
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      request: roleSelect,
    },
    {
      title: <FormattedMessage id="性别" defaultMessage="性别" />,
      dataIndex: 'sex',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="邮箱" defaultMessage="邮箱" />,
      dataIndex: 'email',
    },
    {
      title: <FormattedMessage id="创建时间" defaultMessage="创建时间" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="操作" defaultMessage="操作" />,
      dataIndex: 'id',
      valueType: 'option',
      render: (_, record) => [
        <BetaSchemaForm<UserPage.UserPageItem>
          trigger={
            <a key="update" onClick={() => {}}>
              {' '}
              <FormattedMessage id="修改" defaultMessage="修改" />
            </a>
          }
          layoutType={'ModalForm'}
          steps={[
            {
              title: '修改用户',
            },
          ]}
          rowProps={{
            gutter: [16, 16],
          }}
          colProps={{
            span: 12,
          }}
          grid={true}
          onFinish={async (values) => {
            values.id = record.id;
            const success = await handleUpdate(values);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
            return success;
          }}
          columns={columns}
          initialValues={record}
        />,
        <Popconfirm
          title="确定删除此条数据?"
          onConfirm={() => {
            const success = handleDelete(Array.of(record.id));
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          okText="是"
          cancelText="否"
        >
          <a key="delete">
            <FormattedMessage id="删除" defaultMessage="删除" />
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserPage.UserPageItem, API.PageParams>
        toolBarRender={(_, { selectedRowKeys }) => {
          return [
            <BetaSchemaForm<UserPage.UserPageItem>
              formRef={formRef}
              trigger={
                <Button type="primary" key="primary">
                  新增
                </Button>
              }
              layoutType={'ModalForm'}
              steps={[
                {
                  title: '创建用户',
                },
              ]}
              rowProps={{
                gutter: [16, 16],
              }}
              colProps={{
                span: 12,
              }}
              grid={true}
              onFinish={async (values) => {
                const success = await handleCreate(values);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                    formRef.current?.resetFields();
                  }
                }
                return success;
              }}
              columns={columns}
            />,
            selectedRowKeys && selectedRowKeys.length && (
              <Button
                key="3"
                onClick={() => {
                  Modal.confirm({
                    width: 300,
                    centered: true,
                    title: '',
                    content: '确认删除' + selectedRowKeys.length + '条数据吗',
                    onOk: () => {
                      const success = handleDelete(selectedRowKeys);
                      if (success) {
                        if (actionRef.current) {
                          actionRef.current.reload();
                        }
                      }
                    },
                    onCancel: () => {
                      return false;
                    },
                  });
                }}
              >
                批量删除
              </Button>
            ),
          ];
        }}
        search={{}}
        rowKey="id"
        headerTitle="用户列表"
        request={userPageList}
        pagination={{}}
        columns={columns}
        actionRef={actionRef}
        rowSelection={rowSelection}
      />
    </PageContainer>
  );
};

export default AdminUser;
