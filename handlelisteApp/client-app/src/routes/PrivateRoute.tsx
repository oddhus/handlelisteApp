import React from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import {useStore} from "../stores/store";
interface IProps extends RouteProps{
    component: React.ComponentType<RouteComponentProps<any>>
}
const PrivateRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const {userStore} = useStore()
    
    return (
        <Route
            {...rest}
            render={(props => userStore.isLoggedIn? <Component {...props}/> : <Redirect to={'/signin'}/>)}
        />
    );
}

export default observer(PrivateRoute);