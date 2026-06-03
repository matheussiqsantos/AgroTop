const btnLoad = document.getElementById('btn-load');
const btnUnload = document.getElementById('btn-unload');
const currentWeightText = document.getElementById('current-weight');
const siloGrain = document.getElementById('silo-grain');
const statusLed = document.getElementById('status-led');
const maxAlert = document.getElementById('max-alert');
const siloPanel = document.getElementById('silo-panel');

let currentWeight = 0;
const MAX_WEIGHT = 5000;
const LOAD_INCREMENT = 500;

function updateSiloUI() {
    currentWeightText.textContent = currentWeight.toLocaleString('pt-BR');

    const percentage = (currentWeight / MAX_WEIGHT) * 100;
    siloGrain.style.height = `${percentage}%`;

    if (currentWeight >= MAX_WEIGHT) {
        statusLed.classList.remove('led-ok');
        statusLed.classList.add('led-danger');
        maxAlert.classList.remove('hidden');
        siloPanel.classList.add('panel-critical');
        btnLoad.disabled = true;
    } else {
        statusLed.classList.remove('led-danger');
        statusLed.classList.add('led-ok');
        maxAlert.classList.add('hidden');
        siloPanel.classList.remove('panel-critical');
        btnLoad.disabled = false;
    }
}

btnLoad.addEventListener('click', () => {
    if (currentWeight + LOAD_INCREMENT <= MAX_WEIGHT) {
        currentWeight += LOAD_INCREMENT;
    } else {
        currentWeight = MAX_WEIGHT;
    }
    updateSiloUI();
});

btnUnload.addEventListener('click', () => {
    currentWeight = 0;
    updateSiloUI();
});

updateSiloUI();