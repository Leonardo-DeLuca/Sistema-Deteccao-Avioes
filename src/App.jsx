import React, { useState } from 'react';
import EntradaDados from './components/entradadados/index.jsx';
import FuncoesTransformacao from './components/funcoestransformacao/index.jsx';
import FuncoesRastreamento from './components/funcoesrastreamento/index.jsx';
import DataGrid from './components/datagrid/index.jsx';
import Relatorio from './components/relatorio/index.jsx'
import Radar from './components/radar/index.jsx';
import './index.css';
import { distanciaMinimaAeroporto, distanciaMinimaEntreAvioes, escalonarAviao, rotacionarAviao, tempoMinimoEntreAvioes, transladarAviao } from './funcoes/funcoes.js';

const App = () => {
	const [avioes, setAvioes] = useState([]);
	const [avioesSelecionados, setAvioesSelecionados] = useState([]);
	const [avioesRadar, setAvioesRadar] = useState([]);
	const [avioesRelatorio, setAvioesRelatorio] = useState([]);

	const addAviao = (novoAviao) => {
		setAvioes([...avioes, novoAviao]);
		setAvioesRadar([...avioes, novoAviao]);
	};

	const onTransladar = (data) => {
		let avioesAtualizados = transladarAviao(data.x, data.y, avioesSelecionados)


		if(!avioesAtualizados.includes(null)){
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
	
		}else{
			alert("Ação inválida! Algum avião sairá do radar após a translação.")
		}
		
	};

	const onEscalonar = (data) => {
		let avioesAtualizados = escalonarAviao(data.x, data.y, avioesSelecionados)

		if(!avioesAtualizados.includes(null)){
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
	
		}else{
			alert("Ação inválida! Algum avião sairá do radar após o escalonamento.")
		}

	};
	
	const onRotacionar = (data) => {
		let avioesAtualizados = rotacionarAviao(data.angulo ,data.x, data.y, avioesSelecionados)

		if(!avioesAtualizados.includes(null)){
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
	
		}else{
			alert("Ação inválida! Algum avião sairá do radar após a rotação.")
		}

	};

	const onAeroProx = (data) => {
		
		const avioesDistanciaMinimaAeroporto = distanciaMinimaAeroporto(data, avioes);

		let mensagensRelatorio = []
		
		avioesDistanciaMinimaAeroporto.forEach(element => {
		
			mensagensRelatorio.push(	
				`O avião ${element[0]} está a uma distância de ${element[1]}km do aeroporto.`
			)
		})

		setAvioesRelatorio(mensagensRelatorio);
	};

	const onAviProx = (data) => {
		const avioesComDistanciaMinima = distanciaMinimaEntreAvioes(data, avioes);
		
		let mensagensRelatorio = []
		
		avioesComDistanciaMinima.forEach(element => {
		
			mensagensRelatorio.push(	
				`O avião ${element[0]} e o avião ${element[1]} estão a uma distância de: ${element[2]}km`
			)
		})

		setAvioesRelatorio(mensagensRelatorio);
	}

	const onRotaColisao = (data) => {
		const avioesEmRotaDeColisao = tempoMinimoEntreAvioes(data, avioes);
		let mensagensRelatorio = []

		avioesEmRotaDeColisao.sort((a,b) => a[2] - b[2]);
		
		avioesEmRotaDeColisao.forEach(element => {
		
			mensagensRelatorio.push(element[2] == 0 ? `O AVIÃO ${element[0]} E O AVIÃO ${element[1]} IRÃO COLIDIR!!!` :
				`O avião ${element[0]} e o avião ${element[1]} passarão pelo ponto ${element[3]} com uma diferença de ${element[2]}s.`
			)
		})

		setAvioesRelatorio(mensagensRelatorio);
	}
	
	return (
		<div className='app'>
			<div>
				<EntradaDados addAviao={addAviao} />
				<FuncoesTransformacao onTransladar={onTransladar} onEscalonar={onEscalonar} onRotacionar={onRotacionar} />
				<FuncoesRastreamento onAeroProx={onAeroProx} onAviProx={onAviProx} onEmColisao={onRotaColisao} />
			</div>
			
			<div>
				<Radar avioes={avioesRadar} />
				<Relatorio avioesRelatorio={avioesRelatorio}/>
			</div>

			<div>
				<DataGrid avioes={avioes} avioesSelecionados={avioesSelecionados} setAvioesSelecionados={setAvioesSelecionados} />
			</div>
		</div>
	);
};

export default App
