## 解析markdown文档并且代码高亮

**前言：**

安装如下包：

```sh
npm i marked
npm i highlight.js
```

[marked 官方文档]([Using Advanced - Marked Documentation](https://marked.js.org/using_advanced))

[highlight 官方文档]([How to use highlight.js (highlightjs.org)](https://highlightjs.org/usage/))

### 1、使用说明

```json
// Create reference instance
import { marked } from 'marked';

// Set options
// `highlight` example uses https://highlightjs.org
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

// Compile
console.log(marked.parse(markdownString));
```

[注] 实例来自官网

### 2、完整代码

当前代码应用于next.js

```js
import { marked } from 'marked'
import hljs from "highlight.js";

export async function getBlogDataByPath(fullPath) {
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
            console.log(hljs.getLanguage(lang))
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const contentHtml = marked.parse(fileContents)
    return {
        "id": fullPath,
        contentHtml,
        "content": fileContents.toString(),
        ...matterResult.data
    }
}
```

