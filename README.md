🏥 医学生晋升之路 (Med 2048)

一个基于 2048 玩法的网页游戏，专为医学生打造的“职场模拟器”。

🎮 游戏简介

这就不仅是一个游戏，更是医学生涯的真实写照（笑）。玩家需要通过滑动合并方块，从最底层的“蓝色生死恋（病历本）”开始，一路过关斩将，经历见习、实习、规培、总住院的磨练，最终晋升为传说中的“卫健委专家”。

📸 游戏截图

<!-- 请将你的截图重命名为 https://www.google.com/search?q=screenshot.png 并上传到项目根目录，或者修改下面的文件名 -->

✨ 核心特色

职业进阶体系：

2: 蓝色生死恋 (病历本) 📘

4: 见习生 (Observer) 👀

8: 实习生 (Intern) 🏃

16: 规培生 (Resident) 📝

32: 总住院 (Chief) 🚑 (高能预警)

... 直至 卫健委专家 🏆

沉浸式体验：

总住院震动彩蛋：当合成“总住院”时，屏幕会猛烈震动，模拟那令人窒息的 24 小时待命压力。

手术室配色：界面采用经典的洗手衣绿（Scrub Green），护眼又专业。

技术栈：

HTML5 / CSS3 (Grid Layout + Flexbox)

JavaScript (原生 ES6+)

Tailwind CSS (CDN 引入，快速样式)

Mobile First (完美支持手机触摸滑动)

🚀 快速开始

在线体验

点击这里进入游戏
(请在部署到 GitHub Pages 后，将上面的 # 替换为你的实际链接，例如：https://你的用户名.github.io/med-2048/)

本地运行

克隆本项目：

git clone [https://github.com/你的用户名/med-2048.git](https://github.com/你的用户名/med-2048.git)


直接在浏览器中打开 index.html 即可运行。

🛠️ 文件结构

med-2048/
├── index.html      # 游戏主入口 (HTML 结构)
├── style.css       # 样式文件 (CSS 动画与布局)
├── script.js       # 游戏逻辑 (核心算法与触控处理)
└── README.md       # 项目说明文档


🤝 贡献与修改

如果你想修改职位名称（比如改成你的科室版本）：

打开 script.js。

找到 roleMap 对象。

修改对应的文字即可。

const roleMap = {
    2: "改写成你的内容",
    // ...
};


📄 License

MIT License. 欢迎随意修改和分享给你的同学！
