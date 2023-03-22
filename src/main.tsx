import React from 'react';
import ReactDOM from 'react-dom/client';
import CongratulationsPopUp from './Components/CongratulationsPopUp';
import DynamicForm from './Components/DynamicForm';
import FidelizarCliente from './Components/FidelizarCliente';
import FullScreenLoading from './Components/FullScreenLoading';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>

            {/* <FullScreenLoading/> */}
            {/* <CongratulationsPopUp/> */}
            <FidelizarCliente/>

    </React.StrictMode>
)
