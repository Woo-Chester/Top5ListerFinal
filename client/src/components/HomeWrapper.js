import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import WorkspaceScreen from './WorkspaceScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import Navigation from './Navigation';
import AllListScreen from './AllListScreen'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return <HomeScreen />
                // (<div id="top5-list-selector">
                    
                //     <Switch>
                //         <Route path="/" exact component={HomeScreen}/>
                //     </Switch>
                // </div>);
    else
        return <SplashScreen />
}