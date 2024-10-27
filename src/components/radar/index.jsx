import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import './styles.css';
import iconeAviao from '../../assets/aviao.png';

ChartJS.register(...registerables);

const Radar = () => {
    const [avioes, setAvioes] = useState([]);
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [angulo, setAngulo] = useState('');
    const [iconeImagem, setIconeImagem] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = iconeAviao;
        img.onload = () => setIconeImagem(img);
    }, []);

    const adicionarPonto = () => {
        const newX = parseFloat(x);
        const newY = parseFloat(y);
        const newAngulo = parseFloat(angulo);

        if (!isNaN(newX) && !isNaN(newY) && !isNaN(newAngulo)) {
            setAvioes([...avioes, { x: newX, y: newY, angle: newAngulo }]);
            setX('');
            setY('');
            setAngulo('');
        }
    };

    const chartData = {
        datasets: [{
            label: 'Avião',
            data: avioes,
            backgroundColor: '#000',
            borderWidth: false,
            showLine: false,
            pointRadius: 5,
            hoverRadius: 7,
            rotation: ({ raw }) => raw ? 90 - raw.angle : 0,
            pointStyle: () => iconeImagem
        }],
    };

    const options = {
        aspectRatio: 1,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                min: -100,
                max: 100,
            },
            y: {
                min: -100,
                max: 100,
            },
        }
    };

    return (
        <div>
            <div className='container'>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="number"
                        placeholder="Valor de X"
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Valor de Y"
                        value={y}
                        onChange={(e) => setY(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Direção (graus)"
                        value={angulo}
                        onChange={(e) => setAngulo(e.target.value)}
                    />
                    <button onClick={adicionarPonto}>Adicionar Ponto</button>
                </div>
            </div>
            <div className='containerGrafico'>
                <Scatter data={chartData} options={options} />
            </div>
        </div>
    );
};

export default Radar;