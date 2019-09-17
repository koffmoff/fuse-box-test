import { observer } from 'mobx-react'
import * as React from 'react'
import { Component } from 'react'
import { AppStore } from './store'
import { Flag, Icon } from 'semantic-ui-react'

@observer
export class App extends Component<{ store: AppStore }> {
    render() {
        return (
            <div>Home <Flag name='se' /><Icon name='arrow alternate circle right' /></div>
        )
    }
}
