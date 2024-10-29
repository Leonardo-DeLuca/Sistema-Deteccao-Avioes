import React, { useState, useEffect } from 'react';
import './styles.css';

const EntradaDados = ({ addAviao }) => {
    const [formData, setFormData] = useState({
        x: '',
        y: '',
        direcao: '',
        velocidade: '',
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

        addAviao(formData);

        setFormData({ x: '', y: '', direcao: '', velocidade: '' });
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