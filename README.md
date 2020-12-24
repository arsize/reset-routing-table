# reset-routing-table

### 使用场景

- 解决多人开发微信小程序时，遇到 app.json 路由冲突问题
- 其他 git 流程中，单一文件频繁操作冲突问题

### 使用方式

1、copy utils/githooks/pre-commit to /.git/pre-commit</br>
2、进行 git 版本控制，触发 hook</br>
3、自动生成 app.json 路由表及 routebak.json 路由备份文件

### git hook

- pre-commit

```
git add .
git commit -m "message"

-->pre-commit //触发pre-commit hook,调用py
-->pre-commit.py //os.system 脚本集成,调用resetapp.js
-->reset.js //app.json路由生成
```

### 注意事项

1、需要安装 python&nbsp;（ 如果没有 python 可以改写 hook 调用 nodejs ）</br>
2、根据具体项目需要修改 reset 脚本
</br>
3、vscode 可以安装小程序助手提高开发体验，右键自动生成小程序页面，commit 时自动补全 app.json 路由表（也可以手动执行 npm run reset）
