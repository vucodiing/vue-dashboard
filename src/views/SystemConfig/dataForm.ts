const model = {
  dataForm: {
    id: undefined, // optional - Mã tự sinh
    scope: undefined, // required, enum(private, role, public) - Quy định khả năng truy cập giá trị cấu hình
    roles: [], // optional - Các role cho phép truy xuất giá trị cấu hình
    code: undefined, // required, minLength: 1 - Mã cấu hình
    value: undefined, // optional - Giá trị cấu hình
    note: undefined, // optional - Ghi chú
  },
  tableRules: {
    lengthMenu: [10, 20, 50, 100],
    showFormSearch: false,
    total: 0,
    page: 1,
    limit: 10,
    offset: 0,
    sort: 'code',
    defaultSort: ['code', 'descending'],
    filters: '',
    fields: 'id,scope,code,roles,value,note',
    recordSelected: [],
    dataSearch: {
      value: {
        scope: '',
        code: '',
        value: '',
        note: '',
      },
      operator: {
        scope: ':regex_i:',
        code: ':regex_i:',
        value: ':regex_i:',
        note: ':regex_i:',
      },
    },
  },
};

export default model;
