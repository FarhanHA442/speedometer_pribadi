let elements = {};
let speedMode = 1;
let indicators = 0;
let isEngineOn = false;

// Pastikan kamu menyiapkan file 'klakson.mp3' di folder yang sama dengan index.html
const audioKlakson = new Audio('klakson.mp3');

function setIconState(element, state) {
    if(state) element.classList.add('active');
    else element.classList.remove('active');
}

function setEngine(state) {
    isEngineOn = state;
    if (state) {
        elements.hud.classList.remove('engine-off');
    } else {
        elements.hud.classList.add('engine-off');
    }
}

function getSpeedColor(speedVal) {
    if (speedVal >= 130) return '#ff0055'; 
    if (speedVal >= 120) return '#ff2244'; 
    if (speedVal >= 110) return '#ff4433'; 
    if (speedVal >= 100) return '#ff6622'; 
    if (speedVal >= 90)  return '#ff8811'; 
    if (speedVal >= 80)  return '#ffaa00'; 
    if (speedVal >= 70)  return '#ccff00'; 
    if (speedVal >= 60)  return '#88ff00'; 
    if (speedVal >= 50)  return '#00ff88'; 
    if (speedVal >= 40)  return '#00e5ff'; 
    if (speedVal >= 30)  return '#00bfff'; 
    if (speedVal >= 20)  return '#0088ff'; 
    if (speedVal >= 10)  return '#0055ff'; 
    return '#00d2ff';                      
}

function setSpeed(speed) {
    let speedVal, unitText;
    switch(speedMode) {
        case 1: speedVal = Math.round(speed * 2.236936); unitText = 'MPH'; break;
        case 2: speedVal = Math.round(speed * 1.943844); unitText = 'KTS'; break;
        default: speedVal = Math.round(speed * 3.6); unitText = 'KMH';
    }
    elements.digSpeed.innerText = speedVal;
    elements.speedUnit.innerText = unitText;
    
    elements.digSpeed.style.color = getSpeedColor(speedVal);
}

function setRPM(rpm) {
    elements.rpmBar.style.width = `${(rpm * 100)}%`;
}

function getColorByPercentage(percentage) {
    if (percentage >= 90) return '#00ff88'; 
    if (percentage >= 80) return '#32cd32'; 
    if (percentage >= 70) return '#adff2f'; 
    if (percentage >= 60) return '#ffff00'; 
    if (percentage >= 50) return '#ffcc00'; 
    if (percentage >= 40) return '#ff9900'; 
    if (percentage >= 30) return '#ff6600'; 
    if (percentage >= 20) return '#ff4444'; 
    if (percentage >= 10) return '#ff0000'; 
    return '#8b0000';                       
}

function setFuel(fuel) {
    let fuelPercent = Math.round(fuel * 100);
    elements.fuelBar.style.width = `${fuelPercent}%`;
    elements.fuelVal.innerText = `${fuelPercent}%`;
    elements.fuelBar.style.background = getColorByPercentage(fuelPercent);
}

function setHealth(health) {
    let healthPercent = Math.round(health * 100);
    elements.healthBar.style.width = `${healthPercent}%`;
    elements.healthVal.innerText = `${healthPercent}%`;
    elements.healthBar.style.background = getColorByPercentage(healthPercent);
}

function getGearColor(gearText) {
    switch(gearText) {
        case 'R': return '#ff4444'; 
        case 'N': return '#b55fe6'; 
        case '1': return '#00ff88'; 
        case '2': return '#adff2f'; 
        case '3': return '#ffff00'; 
        case '4': return '#ffaa00'; 
        case '5': return '#ff5500'; 
        case '6': return '#ff0055'; 
        default: return '#00d2ff';
    }
}

function setGear(gear) {
    let gearText = 'N';
    if (gear === 0) gearText = 'R';
    else if (gear > 0) gearText = gear.toString(); 
    
    if (elements.gear.innerText !== gearText) {
        elements.gear.innerText = gearText;
        
        elements.gear.style.setProperty('color', getGearColor(gearText), 'important');
        
        elements.gear.classList.remove('gear-animate');
        void elements.gear.offsetWidth; 
        elements.gear.classList.add('gear-animate');
    }
}

function setHeadlights(state) {
    elements.headlights.classList.remove('active');
    if (state > 0) {
        elements.headlights.classList.add('active');
        elements.headlights.style.color = '#00d2ff'; 
    } else {
        elements.headlights.style.color = ''; 
    }
}

function setLeftIndicator(state) {
    indicators = (indicators & 0b10) | (state ? 0b01 : 0b00);
    setIconState(elements.indL, state);
    if (state) elements.indL.style.color = '#ffaa00';
    else elements.indL.style.color = '';
}

function setRightIndicator(state) {
    indicators = (indicators & 0b01) | (state ? 0b10 : 0b00);
    setIconState(elements.indR, state);
    if (state) elements.indR.style.color = '#ffaa00';
    else elements.indR.style.color = '';
}

function setSeatbelts(state) {
    setIconState(elements.seatbelt, state);
    if (state) elements.seatbelt.style.color = '#00ff88';
    else elements.seatbelt.style.color = '';
}

function setSpeedMode(mode) {
    speedMode = mode;
}

function setOdometer(distance) {
    elements.odometer.innerText = distance.toFixed(1) + ' mi';
}

function playStartupAnimation() {
    setEngine(true);

    elements.rpmBar.style.transition = 'none';
    elements.fuelBar.style.transition = 'none';
    elements.healthBar.style.transition = 'none';
    
    let duration = 3000; 
    let intervalTime = 60; 
    let elapsed = 0;
    let gears = ['R', 'N', '1', '2', '3', '4', '5', '6'];
    let allIcons = document.querySelectorAll('.icon');
    
    let startupInterval = setInterval(() => {
        elapsed += intervalTime;
        
        let randomSpeed = Math.floor(Math.random() * 150);
        elements.digSpeed.innerText = randomSpeed;
        elements.digSpeed.style.color = getSpeedColor(randomSpeed);
        
        let randomGear = gears[Math.floor(Math.random() * gears.length)];
        elements.gear.innerText = randomGear;
        elements.gear.style.setProperty('color', getGearColor(randomGear), 'important');
        
        let randomRPM = Math.random();
        elements.rpmBar.style.width = `${randomRPM * 100}%`;
        
        let randomFuelPct = Math.floor(Math.random() * 100);
        elements.fuelBar.style.width = `${randomFuelPct}%`;
        elements.fuelVal.innerText = `${randomFuelPct}%`;
        elements.fuelBar.style.background = getColorByPercentage(randomFuelPct);
        
        let randomHealthPct = Math.floor(Math.random() * 100);
        elements.healthBar.style.width = `${randomHealthPct}%`;
        elements.healthVal.innerText = `${randomHealthPct}%`; 
        elements.healthBar.style.background = getColorByPercentage(randomHealthPct);
        
        allIcons.forEach(icon => {
            if (Math.random() > 0.5) {
                icon.classList.add('active');
                if (icon.id === 'icon-lights') icon.style.color = '#00d2ff';
                if (icon.id === 'icon-seatbelt') icon.style.color = '#00ff88';
                if (icon.id === 'icon-ind-l' || icon.id === 'icon-ind-r') icon.style.color = '#ffaa00';
            } else {
                icon.classList.remove('active');
                icon.style.color = '';
            }
        });
        
        if (elapsed >= duration) {
            clearInterval(startupInterval);
            
            // Suara klakson berbunyi tepat di detik ke-3 saat sistem siap digunakan
            audioKlakson.play().catch(e => console.log("Audio diblokir browser, klik layar sekali dulu agar aktif."));

            elements.rpmBar.style.transition = 'width 0.15s ease-out';
            elements.fuelBar.style.transition = 'width 0.3s ease, background 0.3s ease';
            elements.healthBar.style.transition = 'width 0.3s ease, background 0.3s ease';
            
            setSpeed(0);
            elements.gear.innerText = 'N';
            elements.gear.style.setProperty('color', getGearColor('N'), 'important');
            setRPM(0);
            setFuel(0);
            setHealth(0);
            
            allIcons.forEach(icon => {
                icon.classList.remove('active');
                icon.style.color = '';
            });
            
            setEngine(isEngineOn);
        }
    }, intervalTime);
}

document.addEventListener('DOMContentLoaded', () => {
    elements = {
        hud: document.getElementById('hud'),
        digSpeed: document.getElementById('digital-speed'),
        speedUnit: document.getElementById('speed-unit'),
        gear: document.getElementById('gear'),
        
        fuelBar: document.getElementById('fuel-bar'),
        fuelVal: document.getElementById('fuel-val'),     
        healthBar: document.getElementById('health-bar'), 
        healthVal: document.getElementById('health-val'), 
        rpmBar: document.getElementById('rpm-bar'),       
        
        headlights: document.getElementById('icon-lights'),
        indL: document.getElementById('icon-ind-l'),
        indR: document.getElementById('icon-ind-r'),
        seatbelt: document.getElementById('icon-seatbelt'),
        
        odometer: document.getElementById('odometer'),
    };

    setTimeout(playStartupAnimation, 200);
});