import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Results from '../Results/Results'
import Admin from '../Admin/Admin'
import { CssBaseline, Link } from '@material-ui/core'

const App: React.FC = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Switch>
					<Route path='/admin' component={Admin} />
					<Route path='/' component={Results} />
				</Switch>
			</Router>
		</>
	)
}

export default App
