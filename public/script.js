document.getElementById('calcario-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const area = parseFloat(document.getElementById('area').value);
    const ca = parseFloat(document.getElementById('ca').value);
    const s = parseFloat(document.getElementById('s').value);
    const mg = parseFloat(document.getElementById('mg').value);
    const al = parseFloat(document.getElementById('al').value);
    const k = parseFloat(document.getElementById('k').value);
    const b = parseFloat(document.getElementById('b').value);
    const hAl = parseFloat(document.getElementById('hAl').value);
    const vDesejado = parseFloat(document.getElementById('vDesejado').value);
    const prnt = parseFloat(document.getElementById('prnt').value);

    const response = await fetch('/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ area, ca, mg, al, k, hAl, vDesejado, prnt })
    });

    const result = await response.json();

    document.getElementById('resultados').innerHTML = `
        <p>Percentual de Saturação por Bases Atual (V%): ${result.vAtual}%</p>
        <p>Dosagem de calcário por hectare: ${result.necessidadeCalcario} t/ha</p>
        <p>Dosagem total para a área de ${area} ha: ${result.dosagemTotal} t</p>
        <p>Relação Cálcio : Magnésio = ${result.relacaoCaMg}</p>
        <p>Tipo de Calcário indicado: ${result.tipoCalcario}</p>
    `;
});
