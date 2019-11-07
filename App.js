import React from 'react';

// redux
import { Provider } from 'react-redux';
import store        from './store/store';

// AppNavigator
import AppNavigator from './config/AppNavigation';

const App = () => {

	return(
    	<Provider store={ store }>
    		<AppNavigator />
    	</Provider>
  	);

}

export default App;
