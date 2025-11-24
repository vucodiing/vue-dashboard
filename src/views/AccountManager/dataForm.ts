const model = {
  dataForm: {
    id: undefined,
    account: undefined,
    password: undefined,
    disabled: undefined,
    roles: [],
  },
  tableRules: {
    lengthMenu: [10, 20, 50, 100],
    showFormSearch: false,
    total: 0,
    page: 1,
    limit: 10,
    offset: 0,
    sort: 'id',
    defaultSort: ['id', 'descending'],
    filters: '',
    recordSelected: [],
    dataSearch: {
      value: {
        account: '',
        disabled: '',
      },
      operator: {
        account: ':regex_i:',
        disabled: '',
      },
    },
  },
};

export default model;
