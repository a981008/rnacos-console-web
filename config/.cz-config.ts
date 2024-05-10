module.exports = {
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    customScope: '请输入您修改的范围(可选):',
    subject: '短说明:',
    body: '长说明，使用"|"换行(可选):',
    breaking: '非兼容性说明 (可选):',
    footer: '关联关闭的issue,例如：#261, #14(可选):',
    confirmCommit: '确定提交说明?(yes/no):',
  },
  scopes: [{ name: 'Javascript' }, { name: 'Typescript' }, { name: 'Vue' }, { name: 'HTML' }, { name: 'CSS' }, { name: 'img' }, { name: 'package.json' }, { name: 'common code' }, { name: 'Docs' }, { name: 'Config' }, { name: 'Plugins' }],
  types: [
    { value: '✨feature', name: '新增:' },
    { value: '💄ui', name: 'ui修改:' },
    { value: '🚑️ bug', name: '测试反馈bug列表中的bug号:' },
    { value: '🐛 fix', name: '修复Bug:' },
    { value: '❌ delete', name: '删除未引用代码或文件:' },
    { value: '📝 docs', name: '变更的只有文档:' },
    { value: '📄 format', name: '空格, 分号等格式修复:' },
    { value: '🦹‍♀️ refactor', name: '代码重构，注意和特性、修复区分开:' },
    { value: '🚀 perf', name: '提升性能:' },
    { value: '🧪 test', name: '添加一个测试:' },
    { value: '🔧 tools', name: '开发工具变动(构建、脚手架工具等、插件):' },
    { value: '🏷️ chore', name: '构建过程或辅助工具的变动(更改配置文件):' },
    { value: '🧑‍💻 release', name: '版本发布:' },
    { value: '🚧 merger', name: '代码合并:' },
    { value: '🎉 build', name: '构建打包项目:' },
    { value: '♻️ rollback', name: '回退:' },
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100,
}
