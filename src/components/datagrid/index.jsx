import React from 'react';
import './styles.css'; // Importando o arquivo CSS

const DataGrid = () => {
    const data = [
        { id: 1, x: 10, y: 20, velocidade: 30, direcao: '45' },
        { id: 2, x: 15, y: 25, velocidade: 40, direcao: '45' },
        { id: 3, x: 20, y: 30, velocidade: 50, direcao: '45' },
        { id: 4, x: 25, y: 35, velocidade: 60, direcao: '45' },
    ];

    return (
        <div className="panel-container">
            <h1>DataGrid</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>X</th>
                        <th>Y</th>
                        <th>V</th>
                        <th>D</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{item.x}</td>
                            <td>{item.y}</td>
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
