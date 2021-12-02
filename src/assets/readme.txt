assets放静态文件。他在src目录下，使用这里是模块化的地盘
icon除了可以放在静态文件夹public里在index里引入之外
也可以把icon文件放在这个文件夹里面：
到时引入时就以模块化的形式来引入
如 import '../assets/iconfont.css' 最终会以一个<style>的形式插入的。