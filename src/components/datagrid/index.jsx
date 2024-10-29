import React from 'react';
import './styles.css';

const DataGrid = ({ avioes, avioesSelecionados, setAvioesSelecionados }) => {
    const handleCheckboxChange = (aviao) => {
        setAvioesSelecionados(avioesJaSelecionados => {
            if (avioesJaSelecionados.some(aviaoSelecionado => aviaoSelecionado.id === aviao.id)) {
                return avioesJaSelecionados.filter(aviaoSelecionado => aviaoSelecionado.id !== aviao.id);
            }
            
			return [...avioesJaSelecionados, aviao];
        });
    };

    return (
        <div className="panel-container">
            <h1>DataGrid</h1>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>A</th>
                        <th>V</th>
                        <th>D</th>
                    </tr>
                </thead>
                <tbody>
                    {avioes.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={avioesSelecionados.some(aviao => aviao.id === item.id)}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                            </td>
                            <td>{item.id}</td>
                            <td>{item.x}</td>
                            <td>{item.y}</td>
                            <td>{item.raio}</td>
                            <td>{item.angulo}</td>
                            <td>{item.velocidade}km/h</td>
                            <td>{item.direcao}°</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataGrid;
