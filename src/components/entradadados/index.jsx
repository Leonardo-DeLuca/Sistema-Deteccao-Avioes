import React, { useState, useEffect } from 'react';
import {calcEquacaoVoo, getCosFromDegrees, getNumDuasCasas, getSinFromDegrees} from '../../funcoes/funcoes.js';
import './styles.css';

const EntradaDados = ({ addAviao }) => {
    const [idInserir, setIdInserir] = useState(1);
    const [isPolar, setIsPolar] = useState(false);

    const [formData, setFormData] = useState({
        id: idInserir,
        x: '',
        y: '',
        raio: '',
        angulo: '',
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

    const togglePolar = () => {
        setIsPolar(!isPolar);
    };

    const insereAviao = (e) => {
        e.preventDefault();

        if(isPolar) {
            const x = formData.raio * getCosFromDegrees(formData.angulo);
            const y = formData.raio * getSinFromDegrees(formData.angulo);
            
            formData.x = getNumDuasCasas(x);
            formData.y = getNumDuasCasas(y);
        }else{
            const raio = Math.sqrt(formData.x ** 2 + formData.y ** 2);
            const angulo = Math.atan2(formData.y, formData.x) * (180/Math.PI);
                
            formData.raio = getNumDuasCasas(raio);
            formData.angulo = getNumDuasCasas(angulo);
        }

        const coeficientesEquacao = calcEquacaoVoo(formData.x, formData.y, formData.direcao);

        const novoAviao = {
            ...formData,
            coeficientesEquacao: coeficientesEquacao,
        };

        addAviao(novoAviao);

        setIdInserir(idInserir + 1);
     
        setFormData({ id: idInserir + 1, x: '', y: '', raio: '', angulo: '', direcao: '', velocidade: '', coeficientesEquacao: []});
    };

    return (
        <div className='containerEntradaDados'>
            <h1>Entrada de dados</h1>
            
            <div className="form-container">
                <form onSubmit={insereAviao}>
                    <div className="form-row">
                        <label className='polar'>
                            <p> Cordenadas polares:</p>
                            <input 
                                type="checkbox"  
                                checked={isPolar} 
                                onChange={togglePolar} 
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        {isPolar ? (
                            <>
                                <label>
                                    Raio (raio):
                                    <input
                                        type="number"
                                        name="raio"
                                        value={formData.raio}
                                        onChange={alteraCampo}
                                        required
                                    />
                                </label>
                                <label>
                                    Ângulo (°):
                                    <input
                                        type="number"
                                        name="angulo"
                                        value={formData.angulo}
                                        onChange={alteraCampo}
                                        required
                                    />
                                </label>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
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