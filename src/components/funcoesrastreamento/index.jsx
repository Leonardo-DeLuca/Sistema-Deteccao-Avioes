import React, { useState } from 'react';
import './styles.css';

function FuncoesRastreamento({ onAeroProx, onAviProx, onEmColisao }) {
    const [distAero, setDistAero] = useState('');
    const [distAvi, setDistAvi] = useState('');
    const [tempoColisao, setTempoColisao] = useState('');

    const handleChange = (setFunc) => (e) => {
        const { value } = e.target;
        setFunc(value === '' ? '' : parseFloat(value));
    };

    const handleSubmit = (action, data, resetFunc) => (e) => {
        e.preventDefault();
        action(data);
        resetFunc('');
    };

    return (
        <div className='containerFuncoesRastreamento'>
            <h1>Funções de rastreamento</h1>
            
            <div className="horizontal-panel">
                <form className="subpanel" onSubmit={handleSubmit(onAeroProx, distAero, setDistAero)}>
                    <label className='label-rastreamento'>
                        Distância mínima:
                        <input
                            type="number"
                            className='input-rastreamento'
                            value={distAero}
                            onChange={handleChange(setDistAero)}
                            required
                        />
                    </label>
                    <button type="submit">Aviões próx. ao aeroporto</button>
                </form>

                <form className="subpanel" onSubmit={handleSubmit(onAviProx, distAvi, setDistAvi)}>
                    <label className='label-rastreamento'>
                        Distância mínima:
                        <input
                            type="number"
                            className='input-rastreamento'
                            value={distAvi}
                            onChange={handleChange(setDistAvi)}
                            required
                        />
                    </label>
                    <button type="submit">Aviões próximos</button>
                </form>

                <form className="subpanel" onSubmit={handleSubmit(onEmColisao, tempoColisao, setTempoColisao)}>
                    <label className='label-rastreamento'>
                        Tempo mínimo:
                        <input
                            type="number"
                            className='input-rastreamento'
                            value={tempoColisao}
                            onChange={handleChange(setTempoColisao)}
                            required
                        />
                    </label>
                    <button type="submit">Em rota de colisão</button>
                </form>
            </div>
        </div>
    );
}

export default FuncoesRastreamento;
