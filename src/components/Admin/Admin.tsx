import React from 'react'
import { Route } from 'react-router-dom'

import Organizer from './Organizer/Organizer'
import Delegate from './Delegate/Delegate'
import Judge from './Judge/Judge'
import Scramble from './Scramble/Scramble'
import RoleSelect from './RoleSelect/RoleSelect'

interface Props {}

export default function Admin({}: Props): React.ReactElement {
    return (
        <div>
            <Route exact path='/admin/judge' component={Judge} />
            <Route exact path='/admin/scramble' component={Scramble} />
            <Route exact path='/admin/organizer' component={Organizer} />
            <Route exact path='/admin/delegate' component={Delegate} />
            <Route exact path='/admin/' component={RoleSelect} />
        </div>
    )
}
