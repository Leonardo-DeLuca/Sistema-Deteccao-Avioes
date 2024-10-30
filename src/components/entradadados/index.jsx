import React, { useState, useEffect } from 'react';
import {calcEquacaoVoo} from '../../funcoes/funcoes.js';
import './styles.css';

const EntradaDados = ({ addAviao }) => {
    const [idInserir, setIdInserir] = useState(1);

    const [formData, setFormData] = useState({
        id: idInserir,
        x: '',
        y: '',
        direcao: '',
        velocidade: '',
        coeficientesEquacao: [],
    });

    const alteraCampo = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value === '' ? '' : parseFloat(value),
        });
    };

    const insereAviao = (e) => {
        e.preventDefault();

        const coeficientesEquacao = calcEquacaoVoo(formData.x, formData.y, formData.direcao);

        const novoAviao = {
            ...formData,
            coeficientesEquacao: coeficientesEquacao,
        };

        addAviao(novoAviao);

        setIdInserir(idInserir + 1);
     
        setFormData({ id: idInserir + 1, x: '', y: '', direcao: '', velocidade: '', coeficientesEquacao: []});
    };

    return (
        <div className='containerEntradaDados'>
            <h1>Entrada de dados</h1>
            
            <div className="form-container">
                <form onSubmit={insereAviao}>
                    <div className="form-row">
                        <label>
                            X:
                            <input
                                type="number"
                                name="x"
                                value={formData.x}
                                onChange={alteraCampo}
                                required
                            />
                        </label>

                        <label>
                            Y:
                            <input
                                type="number"
                                name="y"
                                value={formData.y}
                                onChange={alteraCampo}
                                required
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label>
                            Direção:
                            <input
                                type="number"
                                name="direcao"
                                value={formData.direcao}
                                onChange={alteraCampo}
                                required
                            />
                        </label>

                        <label>
                            Velocidade:
                            <input
                                type="number"
                                name="velocidade"
                                value={formData.velocidade}
                                onChange={alteraCampo}
                                required
                            />
                        </label>
                    </div>

                    <button type="submit">Inserir</button>
                </form>
            </div>
        </div>
    );
};

export default EntradaDados;