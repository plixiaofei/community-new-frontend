import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// markdown
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

// preview
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
});

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(VueMarkdownEditor)
    .use(VMdPreview)
    .mount('#app')
