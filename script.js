async function fetchWaterData() {
    const response = await fetch('water_data.php');
    const data = await response.json();
    return data;
}

async function generateChart() {
    const years = parseInt(document.getElementById('years').value, 10);
    const chartType = document.getElementById('chartType').value;

    // Lekérjük az adatokat és ellenőrizzük a beviteli értéket
    let data = await fetchWaterData();

    // Csak a legutóbbi évek adatait használjuk
    data = data.slice(-years);

    // Ellenőrizzük, hogy az adatokat számként használjuk
    const labels = data.map(item => item.year); // Év lehet string, mivel csak tengelycím
    const producedWater = data.map(item => Number(item.produced_water_volume));
    const suppliedWater = data.map(item => Number(item.total_supplied_water));
    const residentialConsumption = data.map(item => Number(item.residential_consumption));

    const ctx = document.getElementById('waterChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Diagram létrehozása a megfelelő adattípusokkal és stílusokkal
    window.myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Termelt Víz Mennyisége (ezer m³)',
                    data: producedWater,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderWidth: 2, // Vonal vastagsága növelve
                    fill: chartType === 'line'
                },
                {
                    label: 'Szolgáltatott Víz (ezer m³)',
                    data: suppliedWater,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderWidth: 2, // Vonal vastagsága növelve
                    fill: chartType === 'line'
                },
                {
                    label: 'Lakossági Fogyasztás (ezer m³)',
                    data: residentialConsumption,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    borderWidth: 2, // Vonal vastagsága növelve
                    fill: chartType === 'line'
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Víztermelés és Fogyasztás'
            },
            scales: {
                x: { title: { display: true, text: 'Év' }},
                y: { title: { display: true, text: 'Víz mennyisége (ezer m³)' }}
            }
        }
    });
}

// Alapértelmezett diagram generálása
generateChart();