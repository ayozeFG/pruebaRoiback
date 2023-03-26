import { Provider } from 'react-redux';
import FidelizarCliente from './Components/FidelizarCliente/FidelizarCliente';
import { store} from './store/store';

export const App = () => {

    return (
        <Provider store={store}>
            <FidelizarCliente/>
        </Provider>
    )
}
