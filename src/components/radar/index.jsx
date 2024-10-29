import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import './styles.css';
import iconeAviao from '../../assets/aviao.png';

ChartJS.register(...registerables);

const Radar = ({ avioes }) => {
    const [iconeImagem, setIconeImagem] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = iconeAviao;
        img.onload = () => setIconeImagem(img);
    }, []);

    const chartData = {
        datasets: [{
            label: 'Avião',
            data: avioes,
            backgroundColor: '#000',
            borderWidth: false,
            showLine: false,
            rotation: ({ raw }) => raw ? 90 - raw.direcao : 0,
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
        <div className='containerGrafico'>
            <h1>Radar</h1>
            
            <div className='grafico'>
                <Scatter data={chartData} options={options} />
            </div>
        </div>
    );
};

export default Radar;