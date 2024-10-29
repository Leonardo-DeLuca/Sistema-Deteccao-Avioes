import React, { useState } from 'react';
import EntradaDados from './components/entradadados/index.jsx';
import FuncoesTransformacao from './components/funcoestransformacao/index.jsx';
import FuncoesRastreamento from './components/funcoesrastreamento/index.jsx';
import DataTable from './components/datagrid/index.jsx';
import Radar from './components/radar/index.jsx';
import './index.css';

const App = () => {
	const [avioes, setAvioes] = useState([]);
	const [avioesRadar, setAvioesRadar] = useState([]);

	const addAviao = (novoAviao) => {
		setAvioes([...avioes, novoAviao]);
		setAvioesRadar([...avioes, novoAviao]);
	};
	
	console.log(avioes)
	console.log(avioesRadar)
	
	return (
		<div className='app'>
			<div>
				<EntradaDados addAviao={addAviao} />
				<FuncoesTransformacao />
				<FuncoesRastreamento />
			</div>
			
			<Radar avioes={avioesRadar} />

			<div>
				<DataTable />
			</div>
		</div>
	);
};

export default App
