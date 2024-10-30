//Falta tratar avioes com mesma linha em direções convergentes (se necessário), angulos de 90 graus, 
//aviões em direções opostas porém com linhas que se cruzam.

function pertoSuficienteDeZero(num){
    if (Math.abs(num) < 1e-8) {
        return 0;
    }

    return num
}

function getTanFromDegrees(degrees) {
    let tanValor = Math.tan(degrees * (Math.PI / 180));
    
    tanValor = pertoSuficienteDeZero(tanValor);
    
    return tanValor;
}

function getSinFromDegrees(degrees) {
    return Math.sin(degrees * (Math.PI / 180));
}

function getCosFromDegrees(degrees) {
    return Math.cos(degrees * (Math.PI / 180));
}

const getNumDuasCasas = (numero) => Math.floor(numero * 100) / 100;

function pontoComum(equ1, equ2) {
    let coefX = getNumDuasCasas(equ1[0]) + -(getNumDuasCasas(equ2[0]));

        let resto = -(equ1[1] + equ1[2]) + (equ2[1] + equ2[2]);
        let valorXFinal = resto / coefX;

        let valorYFinal = (equ1[0] * valorXFinal) + (equ1[0] * equ1[1]) + equ1[2]

        let coordenadaComum = [valorXFinal, valorYFinal]

        return coordenadaComum;

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

function verificaOpostosMesmaLinha(direcaoAviao1, direcaoAviao2){
    const diferenca = Math.abs(direcaoAviao1 - direcaoAviao2);

    while(diferenca > 180){
        diferenca -= 360
    }

    if(diferenca == 180){
        return true
    }

    return false
}

function verificaInclinacaoLinha(coefAng1, coefAng2){
    const coeficienteAngular1 = getNumDuasCasas(coefAng1);
    const coeficienteAngular2 = getNumDuasCasas(coefAng2);

    return coeficienteAngular1 === coeficienteAngular2;
}

function verificaMesmaReta(aviao1, aviao2){
    let linear1 = aviao1.coeficientesEquacao[0];
    let linear2 = aviao2.coeficientesEquacao[0];
    let intercepto1 = aviao1.coeficientesEquacao[1] + aviao1.coeficientesEquacao[2];
    let intercepto2 = aviao2.coeficientesEquacao[1] + aviao2.coeficientesEquacao[2];

    linear1 = getNumDuasCasas(linear1);
    linear2 = getNumDuasCasas(linear2);
    intercepto1 = pertoSuficienteDeZero(intercepto1);
    intercepto2 = pertoSuficienteDeZero(intercepto2);

    return linear1 === linear2 && intercepto1 == intercepto2
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
        aviao.x = getNumDuasCasas(aviao.x + x);
        aviao.y = getNumDuasCasas(aviao.y + y);
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

                if(verificaMesmaReta(aviao1, aviao2)){
                    console.log('mesma reta')
                    if(verificaOpostosMesmaLinha(aviao1.direcao, aviao2.direcao)){
                        console.log('opostos na mesma reta')
                        return null;
                    }
                }

                if((verificaInclinacaoLinha(aviao1.coeficientesEquacao[0]) == verificaInclinacaoLinha(aviao2.coeficientesEquacao[0]))){
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
                    console.log('paralelos')
                    return null
                }
                
            }
        });
    }).filter(item => item !== null);
}
