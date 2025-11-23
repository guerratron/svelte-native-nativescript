import { svelteNativeNoFrame } from 'svelte-native';
import Sidedrawer from 'svelte-native-nativescript-ui/sidedrawer';
import ListView from 'svelte-native-nativescript-ui/listview';
import App from './App.svelte';
//import App from './pages/Login.svelte';

Sidedrawer.register();
ListView.register();

svelteNativeNoFrame(App, {});
