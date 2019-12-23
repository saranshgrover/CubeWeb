import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Results from '../Results/Results'
import AdminRouting from '../Admin/AdminRouting'
import { CssBaseline, Link } from '@material-ui/core'

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path='/admin' component={AdminRouting} />
                    <Route path='/' component={Results} />
                </Switch>
            </Router>
        </>
    )
}

export default App
