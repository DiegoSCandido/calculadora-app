const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/calcular', (req, res) => {
    const { area, ca, s, mg, al, k, b, hAl, vDesejado, prnt } = req.body;

    // Cálculo de SB (Soma das Bases)
    const sb = ca + mg + k;

    // Cálculo de CTC (Capacidade de Troca Catiônica)
    const ctc = sb + hAl;

    // Cálculo do percentual de saturação por bases atual (V%)
    const vAtual = (sb / ctc) * 100;

    // Fórmula para calcular a necessidade de calcário (NC)
    const necessidadeCalcario = ((vDesejado - vAtual) * ctc) / prnt;

    // Multiplicando pela área do talhão para obter a dosagem total
    const dosagemTotal = necessidadeCalcario * area;

    // Formula relação Cálcio / Magnésio 
    const relacaoCaMg = ca / mg;

    //Tipo de Calcario indicado 
    let tipoCalcario;
    if (relacaoCaMg < 3) {
        tipoCalcario = "Calcítico";
    } else {
        tipoCalcario = "Dolomítico";
    }

    res.json({
        vAtual: vAtual.toFixed(2),
        necessidadeCalcario: necessidadeCalcario.toFixed(2),
        dosagemTotal: dosagemTotal.toFixed(2),
        relacaoCaMg: relacaoCaMg.toFixed(2),
        tipoCalcario
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});