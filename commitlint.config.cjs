module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['task', 'update', 'add', 'hotfix', 'refactor', 'revert', 'ci', 'docs', 'test', 'init'],
    ],
  },
}
