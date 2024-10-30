import React, { useState } from 'react';
import EntradaDados from './components/entradadados/index.jsx';
import FuncoesTransformacao from './components/funcoestransformacao/index.jsx';
import FuncoesRastreamento from './components/funcoesrastreamento/index.jsx';
import DataGrid from './components/datagrid/index.jsx';
import Radar from './components/radar/index.jsx';
import './index.css';
import { distanciaMinimaAeroporto, distanciaMinimaEntreAvioes, escalonarAviao, rotacionarAviao, tempoMinimoEntreAvioes, transladarAviao } from './funcoes/funcoes.js';

const App = () => {
	const [avioes, setAvioes] = useState([]);
	const [avioesSelecionados, setAvioesSelecionados] = useState([]);
	const [avioesRadar, setAvioesRadar] = useState([]);

	const addAviao = (novoAviao) => {
		setAvioes([...avioes, novoAviao]);
		setAvioesRadar([...avioes, novoAviao]);
	};

	const onTransladar = (data) => {
		let avioesAtualizados = transladarAviao(data.x, data.y, avioesSelecionados)

		const lookup = avioes.reduce((acc, obj) => {
			acc[obj.id] = obj;
			return acc;
		}, {});

		avioesAtualizados = [
			...avioes.map(item => lookup[item.id] || item),
			...avioesAtualizados.filter(obj => !lookup[obj.id])
		];

		setAvioes(avioesAtualizados)
		setAvioesRadar(avioesAtualizados)

		console.log(avioes)

	};

	const onEscalonar = (data) => {
		let avioesAtualizados = escalonarAviao(data.x, data.y, avioesSelecionados)

		const lookup = avioes.reduce((acc, obj) => {
			acc[obj.id] = obj;
			return acc;
		}, {});

		avioesAtualizados = [
			...avioes.map(item => lookup[item.id] || item),
			...avioesAtualizados.filter(obj => !lookup[obj.id])
		];

		setAvioes(avioesAtualizados)
		setAvioesRadar(avioesAtualizados)

		console.log(avioes)

	};
	
	const onRotacionar = (data) => {
		let avioesAtualizados = rotacionarAviao(data.angulo ,data.x, data.y, avioesSelecionados)

		const lookup = avioes.reduce((acc, obj) => {
			acc[obj.id] = obj;
			return acc;
		}, {});

		avioesAtualizados = [
			...avioes.map(item => lookup[item.id] || item),
			...avioesAtualizados.filter(obj => !lookup[obj.id])
		];

		setAvioes(avioesAtualizados)
		setAvioesRadar(avioesAtualizados)

		console.log(avioes)
	};

	const onAeroProx = (data) => {
		
		const avioesComDistanciaMinima = distanciaMinimaAeroporto(data, avioes);

		console.log(avioesComDistanciaMinima)
	};

	const onAviProx = (data) => {
		const avioesComDistanciaMinimaEntreSi = distanciaMinimaEntreAvioes(data, avioes);

		console.log(avioesComDistanciaMinimaEntreSi)
	}

	const onRotaColisao = (data) => {
		const avioesEmRotaDeColisao= tempoMinimoEntreAvioes(data, avioes);

		console.log(avioesEmRotaDeColisao)
	}
	
	return (
		<div className='app'>
			<div>
				<EntradaDados addAviao={addAviao} />
				<FuncoesTransformacao onTransladar={onTransladar} onEscalonar={onEscalonar} onRotacionar={onRotacionar} />
				<FuncoesRastreamento onAeroProx={onAeroProx} onAviProx={onAviProx} onEmColisao={onRotaColisao} />
			</div>
			
			<Radar avioes={avioesRadar} />

			<div>
				<DataGrid avioes={avioes} avioesSelecionados={avioesSelecionados} setAvioesSelecionados={setAvioesSelecionados} />
			</div>
		</div>
	);
};

export default App
