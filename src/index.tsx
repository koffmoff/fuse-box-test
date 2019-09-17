import * as React from 'react'
import { render } from 'react-dom'
import { AppStore } from './scenes/App/store'
import { App } from './scenes/App/view'
import 'semantic-ui-css/semantic.min.css'

main()

export async function main() {
    console.log('Initializing')
    const root = document.getElementById('root')
    const appStore = await AppStore.create()
    render(<App store={appStore}/>, root)
}
