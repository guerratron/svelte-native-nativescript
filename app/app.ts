/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

/*import { svelteNativeNoFrame } from 'svelte-native'
import Sidedrawer from 'svelte-native-nativescript-ui/sidedrawer';
import ListView from 'svelte-native-nativescript-ui/listview';
import App from './App.svelte'
import Main from './pages/Main.svelte'

Sidedrawer.register();
ListView.register();

svelteNativeNoFrame(Main, {})*/

import { svelteNative } from 'svelte-native';
import Menu from './pages/Menu.svelte';
import { installPlugin } from './pages/install';

installPlugin();

//@ts-ignore
svelteNative(Menu, {});
