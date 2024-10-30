import React, { useState } from 'react';
import './styles.css';

function FuncoesTransformacao({ onTransladar, onEscalonar, onRotacionar }) {
    const [transladar, setTransladar] = useState({ x: '', y: '' });
    const [escalonar, setEscalonar] = useState({ x: '', y: '' });
    const [rotacionar, setRotacionar] = useState({ x: 0, y: 0, angulo: '' });

    const handleChange = (setFunc) => (e) => {
        const { name, value } = e.target;
        
        setFunc((prev) => ({
            ...prev,
            [name]: value === '' ? '' : parseFloat(value)
        }));
    };

    const handleSubmit = (action, data, resetFunc) => (e) => {
        e.preventDefault();
        action(data);
        resetFunc({ x: 0, y: 0, angulo: '' });
    };

    return (
        <div className='containerFuncoesTransformacao'>
            <h1>Funções de transformação</h1>
            
            <div className="form-container">
                <div className="form-row">
                    <form className="panel" onSubmit={handleSubmit(onTransladar, transladar, setTransladar)}>
                        <div className="xy-fields">
                            <label>
                                X:
                                <input
                                    type="number"
                                    name="x"
                                    value={transladar.x}
                                    onChange={handleChange(setTransladar)}
                                    required
                                />
                            </label>
                            <label>
                                Y:
                                <input
                                    type="number"
                                    name="y"
                                    value={transladar.y}
                                    onChange={handleChange(setTransladar)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">Transladar</button>
                    </form>

                    <form className="panel" onSubmit={handleSubmit(onEscalonar, escalonar, setEscalonar)}>
                        <div className="xy-fields">
                            <label>
                                X:
                                <input
                                    type="number"
                                    name="x"
                                    value={escalonar.x}
                                    onChange={handleChange(setEscalonar)}
                                    required
                                />
                            </label>
                            <label>
                                Y:
                                <input
                                    type="number"
                                    name="y"
                                    value={escalonar.y}
                                    onChange={handleChange(setEscalonar)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">Escalonar</button>
                    </form>
                </div>

                <form className="panel rotation-panel" onSubmit={handleSubmit(onRotacionar, rotacionar, setRotacionar)}>
                    <label>
                        Ângulo:
                        <input
                            type="number"
                            name="angulo"
                            value={rotacionar.angulo}
                            onChange={handleChange(setRotacionar)}
                            required
                        />
                    </label>
                    <div className="xy-fields">
                        <label>
                            X (Centro):
                            <input
                                type="number"
                                name="x"
                                value={rotacionar.x}
                                onChange={handleChange(setRotacionar)}
                                required
                            />
                        </label>
                        <label>
                            Y (Centro):
                            <input
                                type="number"
                                name="y"
                                value={rotacionar.y}
                                onChange={handleChange(setRotacionar)}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Rotacionar</button>
                </form>
            </div>
        </div>
    );
}

export default FuncoesTransformacao;