import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Organizer from './Organizer/Organizer'
import Delegate from './Delegate/Delegate'
import Judge from './Judge/Judge'
import Scramble from './Scramble/Scramble'
import Admin from './Admin'
import RoleSelect from './RoleSelect/RoleSelect'

interface Props {}

export default function AdminRouting({}: Props): React.ReactElement {
    return (
        <div>
            <Switch>
                <Route exact path='/admin/judge' component={Judge} />
                <Route exact path='/admin/scramble' component={Scramble} />
                <Route
                    exact
                    path='/admin/role/organizer'
                    component={Organizer}
                />
                <Route exact path='/admin/delegate' component={Delegate} />
                <Route exact path='/admin/role' component={RoleSelect} />
                <Route exact path='/admin/' component={Admin} />
            </Switch>
        </div>
    )
}
