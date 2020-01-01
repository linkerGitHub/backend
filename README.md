## meedu后台的前端项目

### 安装

下载到本地：

```
git clone https://github.com/Meedu/backend.git
```

安装依赖：

```
npm install
```

打包：

```
npm run build 
```

打包完成之后将会在目录下面看到 `dist` 文件夹，接下来将该文件夹复制到 `meedu` 项目的 `public` 目录下面，重命名为：`admin`。然后就可以在浏览器输入：

```
http://yourdomain.com/admin
```

来访问 MeEdu 的后台了。