import { reactive } from 'vue'


export default function():{menus: {path: string, title: string, icon: string}[]} {
    const menus = reactive([
         {
            path: '/layout/Vue2',
            title:'Vue2笔记',
            icon:'📚'
        },
        {
            path: '/layout/Vue3',
            title:'Vue3笔记',
            icon:'⚡'
        },
        {
            path: '/layout/ts',
            title:'TS笔记',
            icon:'🔤'
        },
        {
            path: '/layout/dashboard',
            title:'仪表盘',
            icon:'📊'
        },
        {
            path: '/layout/text8',
            title:'7+1股文',
            icon:'📝'
        },
        {
            path: '/layout/products',
            title:'产品管理',
            icon:'🛍️'
        }
    ])
    return {menus}
}