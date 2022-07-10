import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import {readFileSync} from 'fs'
import { join } from 'path';
// import manifest from '../public/manifest.json'

const RENDER_TEMPLATE = process.env.NODE_ENV === 'production' ? 'root-prod' : 'root'
const isProd = process.env.NODE_ENV === 'production';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('root')
  index() {
    // const appHTML = renderToString(() => <Root />, { renderId: 'island-0' }) // REFACTOR
    // const hydrationScriptHTML = generateHydrationScript()
    // const appHTML = ReactDOMServer.renderToString(<App />)
    
    let appHTML = `
    <div id='root'></div>
    <script src='/src/pages/index.tsx' type='module'></script>
    `

    let scriptHTML=`
    <script type="module">
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>
    `

    if (isProd) {
      const manifest = JSON.parse(readFileSync(join(__dirname, '..', 'public')+'/vite-manifest.json', 'utf8'));
      appHTML = `<div id='root'></div>`
      scriptHTML = `
      <script type="module" crossorigin src="/${manifest['src/pages/index.tsx']['file']}"></script>
      `
    }

    return { appHTML, scriptHTML }
  }
  
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
