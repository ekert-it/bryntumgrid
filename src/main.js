import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles.scss';
import { BryntumGrid } from '@bryntum/grid-vue-3';
import ItalicName from '@/components/ItalicName.vue';
import BoldName from '@/components/BoldName.vue';
import ArrayRenderer from '@/components/ArrayRenderer.vue';


const app = createApp(App);
app.component('BryntumGrid', BryntumGrid);
app.component('BoldName', BoldName);
app.component('ItalicName', ItalicName);
app.component('ArrayRenderer', ArrayRenderer);

app.mount('#app')