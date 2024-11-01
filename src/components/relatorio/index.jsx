import React from 'react';
import './styles.css';

const Relatorio = ({ avioesRelatorio }) => {
    return (
        <div className='containerRelatorio'>
            <h1>Relatório</h1>
            <div className="horizontal-panel-rel">
                <div className="scrollable-table">
                    <table className="styled-table-rel">
                        <thead>
                            <tr>
                                <th className='index'>Nº</th>
                                <th>Informação</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="table-body">
                        <table className="styled-table-rel">
                            <tbody>
                                {avioesRelatorio.map((item, index) => (
                                    <tr key={index}>
                                        <td className='index'>{index}</td>
                                        <td>{item}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Relatorio;
