import React, { useState } from 'react';
import EntradaDados from './components/entradadados/index.jsx';
import FuncoesTransformacao from './components/funcoestransformacao/index.jsx';
import FuncoesRastreamento from './components/funcoesrastreamento/index.jsx';
import DataGrid from './components/datagrid/index.jsx';
import Radar from './components/radar/index.jsx';
import './index.css';

const App = () => {
	const [avioes, setAvioes] = useState([]);
	const [avioesSelecionados, setAvioesSelecionados] = useState([]);
	const [avioesRadar, setAvioesRadar] = useState([]);

	const addAviao = (novoAviao) => {
		setAvioes([...avioes, novoAviao]);
		setAvioesRadar([...avioes, novoAviao]);
	};

	const onTransladar = () => {
		console.log(avioesSelecionados)
	};

	const onEscalonar = () => {
		console.log(avioesSelecionados)
	};
	
	const onRotacionar = () => {
		console.log(avioesSelecionados)
	};

	const onAeroProx = () => {
		// logica
	};
	
	return (
		<div className='app'>
			<div>
				<EntradaDados addAviao={addAviao} />
				<FuncoesTransformacao onTransladar={onTransladar} onEscalonar={onEscalonar} onRotacionar={onRotacionar} />
				<FuncoesRastreamento onAeroProx={onAeroProx} onAviProx={onAeroProx} onEmColisao={onAeroProx} />
			</div>
			
			<Radar avioes={avioesRadar} />

			<div>
				<DataGrid avioes={avioes} avioesSelecionados={avioesSelecionados} setAvioesSelecionados={setAvioesSelecionados} />
			</div>
		</div>
	);
};

export default App
