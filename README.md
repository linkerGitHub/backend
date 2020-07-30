## MeEdu后台前端

[官网](https://meedu.vip)

### 手动编译

> 请确保您的机器安装了最新版本的Nodejs

将代码下载到本地：

```
git clone https://github.com/Meedu/backend.git meedu-backend
```

执行：

```
npm install -g hey-cli
```

安装依赖：

```
cd meedu-backend && yarn install
```

打包：

```
hey build
```

打包完成之后将会在目录下面看到 `dist` 文件夹，接下来将该文件夹复制到 `meedu` 项目的 `public` 目录下面，重命名为`admin` 。然后就可以在浏览器输入：

```
http://yourdomain.com/admin
```

来访问 MeEdu 的后台了。

### Docker编译

> 如果您的机器安装有Docker，可以选择这个方式编译。

将代码下载到本地：

```
git clone https://github.com/Meedu/backend.git meedu-backend
```

执行：

```
cd meedu-backend && ./build.sh
```

执行完成之后，编译好的文件已保存到了 `dist` 目录。将该文件夹复制到 `meedu` 项目的 `public` 目录下面，重命名为 `admin`。