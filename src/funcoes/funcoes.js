function pertoSuficiente(num) {
    const inteiroMaisProximo = Math.round(num);

    if (Math.abs(num) < 1e-8) {
        return 0;
    }

    if (Math.abs(num - inteiroMaisProximo) < 1e-8) {
        return inteiroMaisProximo;
    }

    return num;
}

export const getTanFromDegrees = (degrees) => {
    let tanValor = Math.tan(degrees * (Math.PI / 180));

    tanValor = pertoSuficiente(tanValor);

    return tanValor;
}

export const getSinFromDegrees = (degrees) => {
    return Math.sin(degrees * (Math.PI / 180));
}

export const getCosFromDegrees = (degrees) => {
    return Math.cos(degrees * (Math.PI / 180));
}

export const getNumDuasCasas = (numero) => Number(numero.toFixed(2));

function pontoComum(aviao1, aviao2) {

    let equ1 = aviao1.coeficientesEquacao;
    let equ2 = aviao2.coeficientesEquacao;

    const coef1 = getNumDuasCasas(equ1[0]);
    const coef2 = getNumDuasCasas(equ2[0]);
    const intercepto1 = (equ1[1] + equ1[2]);
    const intercepto2 = (equ2[1] + equ2[2]);

    if (coef1 === Infinity || coef1 === -Infinity) {
        const valorXFinal = getNumDuasCasas(aviao1.x);
        const valorYFinal = getNumDuasCasas(coef2 * valorXFinal + intercepto2);

        const retorno = [valorXFinal, valorYFinal]

        if (!retorno.includes(NaN) && !retorno.includes(Infinity)) {
            return retorno
        }

        return false;
    } else if (coef2 === Infinity || coef2 === -Infinity) {
        const valorXFinal = getNumDuasCasas(aviao2.x);
        const valorYFinal = getNumDuasCasas(coef1 * valorXFinal + intercepto1);

        const retorno = [valorXFinal, valorYFinal]

        if (!retorno.includes(NaN) && !retorno.includes(Infinity)) {
            return retorno
        }

        return false;
    }

    let coefX = coef1 - coef2;

    if (coefX !== 0) {
        let resto = intercepto2 - intercepto1;
        let valorXFinal = getNumDuasCasas(resto / coefX);

        let valorYFinal = getNumDuasCasas(coef1 * valorXFinal + intercepto1);

        return [valorXFinal, valorYFinal];
    }

    return false;
}

function diferencaTempoPontoComum(tempoAviao1, tempoAviao2) {
    return getNumDuasCasas(Math.abs(tempoAviao2 - tempoAviao1));
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

function verificaOpostosMesmaLinha(direcaoAviao1, direcaoAviao2) {
    let diferenca = Math.abs(direcaoAviao1 - direcaoAviao2);

    while (diferenca > 180) {
        diferenca -= 360
    }

    if (diferenca == 180) {
        return true
    }

    return false
}

function verificaInclinacaoLinha(coefAng1, coefAng2) {
    const coeficienteAngular1 = getNumDuasCasas(coefAng1);
    const coeficienteAngular2 = getNumDuasCasas(coefAng2);

    return coeficienteAngular1 === coeficienteAngular2;
}

function verificaMesmaReta(aviao1, aviao2) {
    let linear1 = aviao1.coeficientesEquacao[0];
    let linear2 = aviao2.coeficientesEquacao[0];
    let intercepto1 = aviao1.coeficientesEquacao[1] + aviao1.coeficientesEquacao[2];
    let intercepto2 = aviao2.coeficientesEquacao[1] + aviao2.coeficientesEquacao[2];

    linear1 = getNumDuasCasas(linear1);
    linear2 = getNumDuasCasas(linear2);

    if (linear1 === Infinity && linear2 === Infinity) {
        return aviao1.x === aviao2.x
    }

    intercepto1 = pertoSuficiente(intercepto1);
    intercepto2 = pertoSuficiente(intercepto2);

    return linear1 === linear2 && intercepto1 == intercepto2
}

function verificaSeTempoMinimo(aviao1, aviao2, pontoDeEncontro, tempoMinimo) {
    let tempoAviao1 = tempoEmSegundosAtePonto(pontoDeEncontro[0], pontoDeEncontro[1], aviao1)
    let tempoAviao2 = tempoEmSegundosAtePonto(pontoDeEncontro[0], pontoDeEncontro[1], aviao2)

    let diffTempo = diferencaTempoPontoComum(tempoAviao1, tempoAviao2);

    if(diffTempo < 1){
        diffTempo = Math.floor(diffTempo);
    }

    if (diffTempo <= tempoMinimo) {
        let id1 = aviao1.id;
        let id2 = aviao2.id;

        console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} são ponto de colisão dentro do tempo`)
        return [id1, id2, diffTempo, pontoDeEncontro];
    }

    return null
}

function pontoDeEncontroMesmaReta(aviao1, aviao2) {

    debugger

    const { x: xA, y: yA, velocidade: vA, direcao: anguloA } = aviao1;
    const { x: xB, y: yB, velocidade: vB, direcao: anguloB } = aviao2;

    const vAX = vA * getCosFromDegrees(anguloA);
    const vAY = vA * getSinFromDegrees(anguloA);
    const vBX = vB * getCosFromDegrees(anguloB);
    const vBY = vB * getSinFromDegrees(anguloB);

    const coefX = vA * vAX - vB * vBX;
    const constanteX = xB - xA;

    const coefY = vA * vAY - vB * vBY;
    const constanteY = yB - yA;

    let tX = constanteX / coefX;
    let tY = constanteY / coefY;

    if (xA === xB) {
        if (tY < 0) {
            return null;
        }
        const pontoX = xA;
        const pontoY = getNumDuasCasas(pertoSuficiente(yA + vA * tY * vAY));
        return [pontoX, pontoY];
    }

    if (yA === yB) {
        if (tX < 0) {
            return null;
        }
        const pontoX = getNumDuasCasas(pertoSuficiente(xA + vA * tX * vA));
        const pontoY = yA;
        return [pontoX, pontoY];
    }

    if (Math.abs(tX - tY) < 1e-6) {
        const t = tX;
        const pontoX = xA + vA * t * vAX;
        const pontoY = yA + vA * t * vAY;

        return [pontoX, pontoY];
    } else {
        return null;
    }

}

function verificaDirecao(aviao, pontoEncontro) {
    let distanciaAtual, distanciaAposMovimento;
    let anguloReduzido = aviao.direcao;

    distanciaAtual = distanciaMinimaDoisPontos(aviao.x, pontoEncontro[0], aviao.y, pontoEncontro[1]);

    while (anguloReduzido > 360) {
        anguloReduzido -= 360;
    }

    if (anguloReduzido === 0 || anguloReduzido === 360) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x + 1, pontoEncontro[0], aviao.y, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else if (anguloReduzido === 90) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x, pontoEncontro[0], aviao.y + 1, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else if (anguloReduzido === 180) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x - 1, pontoEncontro[0], aviao.y, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else if (anguloReduzido === 270) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x, pontoEncontro[0], aviao.y - 1, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else if (anguloReduzido > 0 && anguloReduzido < 90) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x + 1, pontoEncontro[0], aviao.y + 1, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else if (anguloReduzido > 90 && anguloReduzido < 180) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x - 1, pontoEncontro[0], aviao.y + 1, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else if (anguloReduzido > 180 && anguloReduzido < 270) {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x - 1, pontoEncontro[0], aviao.y - 1, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    } else {
        distanciaAposMovimento = distanciaMinimaDoisPontos(aviao.x + 1, pontoEncontro[0], aviao.y - 1, pontoEncontro[1]);

        return distanciaAposMovimento < distanciaAtual
    }

}

export const calcEquacaoVoo = (x, y, direcao) => {

    if (direcao === 90 || direcao === 270) {
        const a1 = Infinity;
        const a2 = 0;
        const a3 = y;
        return [a1, a2, a3];
    }

    const tangDirecao = getTanFromDegrees(direcao);
    let a1 = Number.parseFloat(tangDirecao);
    let a2 = tangDirecao * -x;
    let a3 = y;

    const coeficientes = [a1, a2, a3];
    return coeficientes;
}

export const transladarAviao = (x, y, listaAvioes) => {
    return listaAvioes.map(aviao => {
        if (Math.abs(aviao.x + x) > 100 || Math.abs(aviao.y + y) > 100) {
            return null
        }

        aviao.x = getNumDuasCasas(aviao.x + x);
        aviao.y = getNumDuasCasas(aviao.y + y);
        aviao.coeficientesEquacao = calcEquacaoVoo(aviao.x, aviao.y, aviao.direcao);
        const raio = Math.sqrt(aviao.x ** 2 + aviao.y ** 2);
        const angulo = Math.atan2(aviao.y, aviao.x) * (180 / Math.PI);

        aviao.raio = getNumDuasCasas(raio);
        aviao.angulo = getNumDuasCasas(angulo);

        return aviao;
    });
};

export const escalonarAviao = (x, y, listaAvioes) => {
    return listaAvioes.map(aviao => {
        if (Math.abs(aviao.x * x) > 100 || Math.abs(aviao.y * y) > 100) {
            return null
        }

        aviao.x = getNumDuasCasas(aviao.x * x);
        aviao.y = getNumDuasCasas(aviao.y * y);
        aviao.coeficientesEquacao = calcEquacaoVoo(aviao.x, aviao.y, aviao.direcao);
        const raio = Math.sqrt(aviao.x ** 2 + aviao.y ** 2);
        const angulo = Math.atan2(aviao.y, aviao.x) * (180 / Math.PI);

        aviao.raio = getNumDuasCasas(raio);
        aviao.angulo = getNumDuasCasas(angulo);

        return aviao;
    });
}

export const rotacionarAviao = (angulo, centroX, centroY, listaAvioes) => {
    return listaAvioes.map(aviao => {
        const xOrigem = aviao.x - centroX;
        const yOrigem = aviao.y - centroY;

        const xRotacao = xOrigem * getCosFromDegrees(angulo) - yOrigem * getSinFromDegrees(angulo);
        const yRotacao = xOrigem * getSinFromDegrees(angulo) + yOrigem * getCosFromDegrees(angulo);

        if (Math.abs(getNumDuasCasas(xRotacao + centroX)) > 100 || Math.abs(getNumDuasCasas(yRotacao + centroY)) > 100) {
            return null
        }

        aviao.x = getNumDuasCasas(xRotacao + centroX);
        aviao.y = getNumDuasCasas(yRotacao + centroY);


        aviao.coeficientesEquacao = calcEquacaoVoo(aviao.x, aviao.y, aviao.direcao);

        const raio = Math.sqrt(aviao.x ** 2 + aviao.y ** 2);
        const anguloAviao = Math.atan2(aviao.y, aviao.x) * (180 / Math.PI);

        aviao.raio = getNumDuasCasas(raio);
        aviao.angulo = getNumDuasCasas(anguloAviao);

        return aviao
    })
}

export const distanciaMinimaAeroporto = (distanciaMinima, listaAvioes) => {
    return listaAvioes.map(aviao => {
        const distanciaAeroporto = distanciaMinimaDoisPontos(0, aviao.x, 0, aviao.y);

        if (distanciaAeroporto <= distanciaMinima) {
            let id = aviao.id;
            let distancia = getNumDuasCasas(distanciaAeroporto);

            return [id, distancia]
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
                    return [
                        aviao1.id,
                        aviao2.id,
                        getNumDuasCasas(distancia)
                    ];
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
                let temPontodeEncontro = pontoComum(aviao1, aviao2);

                if (verificaMesmaReta(aviao1, aviao2)) {
                    console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} são mesma reta`)

                    if (verificaOpostosMesmaLinha(aviao1.direcao, aviao2.direcao)) {
                        
                        console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} indo em direção`)
                        temPontodeEncontro = pontoDeEncontroMesmaReta(aviao1, aviao2);

                        if(temPontodeEncontro){
                            if (verificaDirecao(aviao1, temPontodeEncontro) && verificaDirecao(aviao2, temPontodeEncontro)){
                                return [aviao1.id, aviao2.id, 0];
                            }
                        }
                    }
                    return null;
                }

                if ((verificaInclinacaoLinha(aviao1.coeficientesEquacao[0], aviao2.coeficientesEquacao[0]))) {
                    if (temPontodeEncontro) {
                        if (verificaDirecao(aviao1, temPontodeEncontro) && verificaDirecao(aviao2, temPontodeEncontro)) {
                            console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} indo em direção`)

                            return verificaSeTempoMinimo(aviao1, aviao2, temPontodeEncontro, tempoMinimo);
                        }
                        console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} desencontro`)

                        return null
                    } else {
                        console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} são paralelos`);

                        return null;
                    }
                }

                if (temPontodeEncontro) {
                    if (verificaDirecao(aviao1, temPontodeEncontro) && verificaDirecao(aviao2, temPontodeEncontro)) {
                        console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} indo em direção`)

                        return verificaSeTempoMinimo(aviao1, aviao2, temPontodeEncontro, tempoMinimo);
                    }
                    console.log(`ID: ${aviao1.id} ID2: ${aviao2.id} desencontro`);

                    return null
                }
            }
            return null
        });
    }).filter(item => item !== null);
}