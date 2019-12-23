import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Results from '../Results/Results'
import AdminRouting from '../Admin/AdminRouting'

const App: React.FC = () => {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route path='/admin' component={AdminRouting} />
                    <Route path='/' component={Results} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
