//Falta tratar avioes com mesma linha em direções convergentes (se necessário), angulos de 90 graus, 
//aviões em direções opostas porém com linhas que se cruzam.

// class Aviao {
//     id;
//     x;
//     y;
//     direcao;
//     velocidade;
//     coeficientesEquacao;

//     constructor(id, x, y, direcao, velocidade) {
//         this.id = id;
//         this.x = x;
//         this.y = y;
//         this.direcao = direcao;
//         this.velocidade = velocidade;

//         this.coeficientesEquacao = this.calcEquacaoVoo(x, y, direcao);
//     }

//     
// }

function getTanFromDegrees(degrees) {
    return Math.tan(degrees * (Math.PI / 180));
}

function getSinFromDegrees(degrees) {
    return Math.sin(degrees * (Math.PI / 180));
}

function getCosFromDegrees(degrees) {
    return Math.cos(degrees * (Math.PI / 180));
}

const getNumDuasCasas = (numero) => Math.floor(numero * 100) / 100;

function pontoComum(equ1, equ2) {
    let coefX = equ1[0] + -(equ2[0]);

    if (coefX != 0) {
        let resto = -(equ1[1] + equ1[2]) + (equ2[1] + equ2[2]);
        let valorXFinal = resto / coefX;

        let valorYFinal = (equ1[0] * valorXFinal) + (equ1[0] * equ1[1]) + equ1[2]

        let coordenadaComum = [valorXFinal, valorYFinal]

        return coordenadaComum;
    }


    return false
}

function diferencaTempoPontoComum(tempoAviao1, tempoAviao2) {
    return Math.abs(tempoAviao2 - tempoAviao1);
}

function distanciaMinimaDoisPontos(x1, x2, y1, y2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

    return distancia;
}

function tempoEmSegundosAtePonto(xFinal, yFinal, aviao) {
            const distancia = Math.sqrt(Math.pow((xFinal - aviao.x), 2) + Math.pow((yFinal - aviao.y), 2));
    
            const tempoSegundos = distancia / aviao.velocidade * 3600;
    
            return tempoSegundos;
}

export const calcEquacaoVoo = (x, y, direcao) => {
    const tangDirecao = getTanFromDegrees(direcao);

    let a1 = Number.parseFloat(tangDirecao);
    let a2 = tangDirecao * -(x);
    let a3 = y;

    const coeficientes = [a1, a2, a3];

    return coeficientes;
}

export const transladarAviao = (x, y, listaAvioes) => {
    return listaAvioes.map(aviao => {
        aviao.x = getNumDuasCasas(aviao.x * x);
        aviao.y = getNumDuasCasas(aviao.y * y);
        aviao.coeficientesEquacao = calcEquacaoVoo(aviao.x, aviao.y, aviao.direcao);
        return aviao;
    });
};

export const escalonarAviao = (x, y, listaAvioes) => {
    return listaAvioes.map(aviao => {
        
        aviao.x = getNumDuasCasas(aviao.x * y);
        aviao.y = getNumDuasCasas(aviao.y * y);
        aviao.coeficientesEquacao = calcEquacaoVoo(aviao.x, aviao.y, aviao.direcao);
        return aviao;
    });
}

export const rotacionarAviao = (angulo, centroX, centroY, listaAvioes) => {
    return listaAvioes.map(aviao => {
        const xOrigem = aviao.x - centroX;
        const yOrigem = aviao.y - centroY;

        const xRotacao = xOrigem * getCosFromDegrees(angulo) - yOrigem * getSinFromDegrees(angulo);
        const yRotacao = xOrigem * getSinFromDegrees(angulo) + yOrigem * getCosFromDegrees(angulo);

        aviao.x = getNumDuasCasas(xRotacao + centroX);
        aviao.y = getNumDuasCasas(yRotacao + centroY);

        aviao.coeficientesEquacao = calcEquacaoVoo(aviao.x, aviao.y, aviao.direcao);
        
        return aviao
    })
}

export const distanciaMinimaAeroporto = (distanciaMinima, listaAvioes) => {
    return listaAvioes.map(aviao => {
        const distanciaAeroporto = distanciaMinimaDoisPontos(0, aviao.x, 0, aviao.y);

        if (distanciaAeroporto <= distanciaMinima) {
            let id = aviao.id;
            let distancia = getNumDuasCasas(distanciaAeroporto);

            return {id, distancia}
        }
        
        return null
    }).filter(item => item !== null);
    
}

export const distanciaMinimaEntreAvioes = (distanciaMinima, listaAvioes) => {
    return listaAvioes.flatMap((aviao1, index1) => {
        return listaAvioes.map((aviao2, index2) => {
            if (index1 < index2) {
                const distancia = distanciaMinimaDoisPontos(aviao1.x, aviao2.x, aviao1.y, aviao2.y);
                
                if (distancia <= distanciaMinima) {
                    return {
                        id1: aviao1.id,
                        id2: aviao2.id,
                        distancia: getNumDuasCasas(distancia)
                    };
                }
            }
            return null;
        });
    }).filter(item => item !== null);
}


export const tempoMinimoEntreAvioes = (tempoMinimo, listaAvioes) => {
    return listaAvioes.flatMap((aviao1, index1) => {
        return listaAvioes.map((aviao2, index2) => {
            if (index1 < index2) {
                const temPontodeEncontro = pontoComum(aviao1.coeficientesEquacao, aviao2.coeficientesEquacao);

            if (temPontodeEncontro) {
                let tempoAviao1 = tempoEmSegundosAtePonto(temPontodeEncontro[0], temPontodeEncontro[1], aviao1)
                let tempoAviao2 = tempoEmSegundosAtePonto(temPontodeEncontro[0], temPontodeEncontro[1], aviao2)

                let diffTempo = diferencaTempoPontoComum(tempoAviao1, tempoAviao2)

                if (diffTempo <= tempoMinimo) {
                    let id1 = aviao1.id;
                    let id2 = aviao2.id;

                    return{ id1, id2, diffTempo, temPontodeEncontro };
                }
            }
            }
            return null;
        });
    }).filter(item => item !== null);
}

// let id = 1;

// let aviao1 = new Aviao(id, 1, 2, 45, 200);

// id++;

// let aviao2 = new Aviao(id, 3, 1, 135, 1600);

// id++;

// let aviao3 = new Aviao(id, 8, -9, 45, 200);

// id++;

// let aviao4 = new Aviao(id, 20, 14, 135, 1600);

// console.log("coeficientes av1: ", aviao1.coeficientesEquacao)
// console.log("coeficientes av2: ", aviao2.coeficientesEquacao)


// let coordenadaEncontro = pontoComum(aviao1.coeficientesEquacao, aviao2.coeficientesEquacao)
// console.log("coordenada de encontro: ", coordenadaEncontro)

// console.log("Tempo av1: ", aviao1.tempoEmSegundosAtePonto(coordenadaEncontro[0], coordenadaEncontro[1]))
// console.log("Tempo av2: ", aviao2.tempoEmSegundosAtePonto(coordenadaEncontro[0], coordenadaEncontro[1]))

// let diffTempo = diferencaTempoPontoComum(aviao1.tempoEmSegundosAtePonto(coordenadaEncontro[0], coordenadaEncontro[1]), aviao2.tempoEmSegundosAtePonto(coordenadaEncontro[0], coordenadaEncontro[1]))
// console.log(`Diferença tempo: ${diffTempo.toFixed(2)}s`)

// let listaAvioes = []
// listaAvioes.push(aviao1, aviao2, aviao3, aviao4)

// let avioesComDistMinimaAeroporto = distanciaMinimaAeroporto(17.1, listaAvioes);
// console.log(avioesComDistMinimaAeroporto)

// let avioesComDistMinima = distanciaMinimaEntreAvioes(30, listaAvioes);
// console.log(avioesComDistMinima)

// let avioesComTempoMinimo = tempoMinimoEntreAvioes(100, listaAvioes);
// console.log(avioesComTempoMinimo)


// console.log(listaAvioes)

// rotacionarAviao(78, 3, 7, listaAvioes)

// console.log(listaAvioes)

// transladarAviao(10, 10, listaAvioes)

// console.log(listaAvioes)

// escalonarAviao(0.5, 2, listaAvioes)

// console.log(listaAvioes)

// rotacionarAviao(90, 10, 10, listaAvioes)

// console.log(listaAvioes)
