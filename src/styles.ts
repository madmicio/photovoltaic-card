import { css } from "lit";
export default css`
  // **************  css svg  ***************

  .foreign-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    text-align: center;
    color: #000;
    background-color: yellow;
  }
  .st0 {
    fill: #465e5e;
  }

  .st1 {
    fill: #fffeff;
  }

  .st2 {
    fill: #fff;
    /* font-family: MyriadPro-Regular, 'Myriad Pro'; */
    font-size: 43px;
  }

  .st3 {
    fill: #5e7574;
  }

  .st4 {
    fill: #4d636c;
  }

  .st5 {
    fill: #7b908e;
  }

  .st6 {
    fill: #b1bfbe;
  }

  .st7 {
    fill: #91a3a2;
  }

  .battColor {
    fill: url(#Sfumatura_icon);
  }

  .white {
    fill: #fff;
  }

  .font43 {
    font-size: 36px;
  }

  .font36 {
    font-size: 36px;
  }

  .opacity76 {
    opacity: 0.76;
  }

  .gridIconColor {
    fill: #b3b3b3;
  }

  .batterypercent {
    fill: url(#Sfumatura_senza_nome_48);
    stroke: #254344;
  }

  .inverter_st0 {
    fill: #69ea00;
    stroke-miterlimit: 10;
    stroke: #b3b3b3;
    stroke-width: 2px;
  }

  .inverter_st1 {
    fill: rgba(110, 0, 0, 0.6);
    stroke: #b3b3b3;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .inverter_st2 {
    fill: none;
    stroke: #b3b3b3;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .inverter_st3 {
    fill: rgba(0, 0, 0, 0.3);
    stroke: #b3b3b3;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .inverter_st4 {
    fill: #fff;
    font-size: 26px;
  }

  .inverter_st5 {
    fill: none;
    stroke: #039;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .home_st0 {
    fill: url(#home_gradient_2);
  }

  .home_st2 {
    fill: url(#home_gradient_1);
  }

  // ***************fine svg *******************

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  @keyframes dash-move {
    0% {
      stroke-dashoffset: 20; /* Cambia il valore per regolare la velocità */
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes draw-line {
    0% {
      stroke-dasharray: 0, 1000; /* Inizia da zero */
    }
    100% {
      stroke-dasharray: 1000, 0; /* Completa la linea */
    }
  }

  @keyframes slide-in-out {
    0% {
      height: 0;
    }
    100% {
      height: 50%;
    }
  }

  @keyframes circular-border {
    0% {
      border: 2px solid transparent;
    }
    50% {
      border: 2px solid rgba(255, 0, 0, 0.7);
    }
    100% {
      border: 2px solid transparent;
    }
  }

  ha-card {
    padding: 16px;
    // display: flex;
    // flex-direction: column;
    // height: 92vh;
    background: linear-gradient(180deg, #61716e, #253835);
    display: grid;
    grid-template-rows: 100px minmax(0, auto) 100px;
  }

  .line-style {
    // stroke: red; /* Cambia questo valore con la tua variabile o colore */
    stroke-width: 3;
    stroke-dasharray: 5.5, 5;
    opacity: 0.5;
    fill: none;
    stroke: #333333;
    // stroke-width:4;
    // stroke-miterlimit:10;
    // stroke-dasharray: 6, 8;
    // animation: dash-move 1s linear infinite; /* Durata e loop infinito */
    animation: draw-line 2s ease-in-out forwards; /* Durata e curva animazione */
  }

  .meteo-icon-svg {
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 5px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
    background-color: #565656;
    color: transparent;
    text-shadow: 1.5px 1.5px 1.5px rgba(255, 255, 255, 0.3);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;

    margin: 5% 10% 15%;
  }
  #chart {
    width: 100%;
    height: 300px;
  }
  input[type="range"] {
    width: 100%;
  }
  button {
    margin-bottom: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }

  input[type="range"]:focus {
    outline: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    background-color: #255ff4;
    border: 0;
    border-radius: 50%;
    box-shadow:
      -1px -1px 6px #0937aa inset,
      0 -2px 2px 0 #0004,
      2px 2px 6px #0007;
    cursor: pointer;
    position: relative;
    width: 24px;
    height: 24px;
    transition: all var(--transDur) linear;
    z-index: 1;
    -webkit-appearance: none;
    appearance: none;
  }
  input[type="range"]:focus::-webkit-slider-thumb {
    background-color: #5583f6;
    box-shadow:
      -1px -1px 6px #0937aa inset,
      0 -2px 2px 0 #0004,
      2px 2px 6px #0007;
  }
  input[type="range"]::-moz-range-thumb {
    background-color: #255ff4;
    border: 0;
    border-radius: 50%;
    box-shadow:
      -1px -1px 6px #0937aa inset,
      0 -2px 2px 0 #0004,
      2px 2px 6px #0007;
    cursor: pointer;
    position: relative;
    width: 24px;
    height: 24px;
    transform: translateZ(1px);
    transition: all var(--transDur) linear;
    z-index: 1;
    -moz-appearance: none;
    appearance: none;
  }
  input[type="range"]:focus::-moz-range-thumb {
    background-color: #5583f6;
    box-shadow:
      -1px -1px 6px #0937aa inset,
      0 -2px 2px 0 #0004,
      2px 2px 6px #0007;
  }

  input[type="range"]::-moz-focus-outer {
    border: 0;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --bg: #2e3138;
      --fg: #e3e4e8;
      --bs1: #3c4049;
      --bs2: #202227;
      --tick: rgb(55, 61, 63);
    }
  }

  .production_range {
    position: relative;
    height: 70px;
  }

  .range__ticks {
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    position: absolute;
    top: 28px;
    left: 12px;
    width: calc(100% - 28px);
    height: 100%;
  }
  .range__tick,
  .range__tick-text {
    display: inline-block;
  }
  .range__tick {
    color: var(--tick);
    font-size: 12px;
    text-align: center;
    width: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .range__tick-text {
    transform: translateX(-50%);
  }

  .range-thumb-label {
    position: absolute;
    width: 16px;
    height: 22px;
    top: 24px; /* Posiziona il label sopra il thumb */
    transform: translateX(-50%);
    // background-color: rgba(255, 0, 0, 0.6);
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    white-space: nowrap;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-legend-btn {
    background-color: transparent;
    color: white;
    border: 2px solid transparent;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  .custom-legend-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .apexcharts-legend-series .apexcharts-legend-marker {
    display: none;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px red;
    border-radius: 25px;
    // animation: blinker 1.5s linear infinite;
  }

  .bottom_bar {
    height: 60px;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: 12px;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
  }

  .home_info {
    height: 150px;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: 12px;
    // margin-top: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 0 30%; */
    // margin-left: 5%;
    // margin-right: 5%;
    -webkit-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .info_icon {
    color: #7a8683;
    --mdc-icon-size: 40px;
  }

  .info_column {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  .menu_icon {
    cursor: pointer;
    color: var(--state-icon-color);
    --mdc-icon-size: 40px;
  }

  .menu_icon_on {
    color: var(--state-icon-active-color);
  }

  .tile-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
    margin: 16px 0;
  }

  .lines-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  }

  .tile {
    width: 70px;
    height: 70px;
    // background-color: red;
    border-radius: 15px;
    -webkit-box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  }

  .weather_attributes {
    display: flex;
    gap: 5px;
    // margin-top: 10px;
  }

  .weather_attributes_vertical {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .glow-line {
    // stroke: rgba(0, 191, 255, 0.8);
    stroke-width: 4;
    fill: none;
    stroke-dasharray: 10, 40;
    filter: url(#glow-blur); /* Usa il filtro SVG */
    animation: glow-animation 1s infinite linear;
  }

  @keyframes glow-animation {
    from {
      stroke-dashoffset: 50;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .apexcharts-legend {
    display: flex !important;
    gap: 0px !important; /* Rimuove lo spazio tra i pulsanti */
    justify-content: center; /* Allinea i pulsanti */
    flex-wrap: nowrap;
  }

  .apexcharts-legend-series {
    margin: 0 !important; /* Rimuove il margine tra i pulsanti */
    padding: 0 !important;
  }

  .chart-navigator {
    display: flex;
    justify-content: space-between;
  }
  .chart-navigator-button {
    width: 150px;
    background-color: rgba(125, 125, 125, 0.1);
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    margin: 0 18px;
  }

  hui-tile-card {
    /* Esempio: sovrascrivi la custom property usata da ha-card per lo sfondo */
    --ha-card-background: rgba(125, 125, 125, 0.1);
    --ha-card-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }
  
  hui-entities-card {
    /* Esempio: sovrascrivi la custom property usata da ha-card per lo sfondo */
    --ha-card-background: rgba(125, 125, 125, 0.1);
    --ha-card-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .chart-cutton-container {
    display: flex;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: var(--ha-card-border-radius, 12px);
    -webkit-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    margin-left: 5%;
    margin-right: 5%;
    height: 100px;
    margin-top: auto;
    // flex-grow: 1;
  }

  .chart-button-select {
    background-color: transparent;
    width: 50%;
    height: 100%;
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .chart-button-select:hover {
    background-color: rgba(125, 125, 125, 0.5);
  }

  .more_elements_container {
  display: flex; 
  flex-direction: 
  column; gap: 10px; 
  background-color: rgba(125, 125, 125, 0.3);
  border-radius: 12px;
  overflow: auto;
  height: auto;
  // height: -webkit-fill-available;
  }

  .more_elements {
  display: flex; 
  flex-direction: 
  column; gap: 10px; 
  border-radius: 12px;
  overflow: auto;
  height: -webkit-fill-available;
  padding: 0 20px;
  flex-grow:4;
    height: 1px;
  }

  #style-2::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    background-color: transparent; /* Rendi trasparente lo sfondo della traccia */
}

#style-2::-webkit-scrollbar {
    width: 24px;
    background-color: transparent; /* Rendi trasparente anche lo sfondo della scrollbar */
}

#style-2::-webkit-scrollbar-thumb {
    border-radius: 12px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: transparent;
}

 .more_elemnts_divider  {
    
    height: 100%;
    // width: 100%;
    /* background-color: red; */
    border-bottom: 1px solid var(--divider-color);
    border-right: 1px solid var(--divider-color);
    /* border-radius: 12px; */
    border-radius: 0 0 20px 0;
    flex-grow: 2;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1.5px 1.5px 1.5px rgba(255, 255, 255, 0.3);
    font-size: 2rem;
    font-weight: bold;
    background-color: #565656;
    color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    
}

.back_button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width:70px;
    height:70px;
    
        


    }


`;
