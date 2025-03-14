import { type CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
// import SunCalc from "suncalc"; // Importa la libreria SunCalc
import * as SunCalc from "suncalc";
// import { CARD_VERSION,  DEFAULT_ID, } from "./const";
import {
  loader,
  clearnight,
  cloudy,
  day,
  fog,
  partlycloudy,
  hail,
  lightningrainy,
  lightning,
  partlycloudynight,
  pouring,
  snowyrainy,
  windyvariant,
  windy,
  rainy,
  cloudeCoverage,
  uvIndex,
  temperature,
} from "./icons";
import { pvIcon, battery, gridPower, home, inverter } from "./tiles";
import styles from "./styles";
declare global {
  interface Window {
    ApexCharts: any;
  }
}

@customElement("photovoltaic-card")
class PhotovoltaicCard extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @property() public config!: any;
  @property({ type: Number }) private _interval: number = 25; // Intervallo iniziale in minuti
  private showChart: boolean; // Stato per mostrare/nascondere la sezione
  private swicthChart: boolean; // Stato per mostrare/nascondere la sezione
  private panelMode: boolean; // Stato per mostrare/nascondere la sezione
  private seriesData?: { name: string; data: { x: number; y: number }[] }[];
  private chart: any;
  private weekChart: any;
  private _debounceFetchHistory: number | null = null;
  private chartHeight: any = 400; // Imposta la variabile con il valore iniziale
  // private seriesDataLast7Days: {
  //   name: string;
  //   data: { x: number; y: number }[];
  // }[] = [];
  // private weeklyChart: any | null = null; // Dichiarazione della proprietà
  private activeMenu: "home" | "chart" | "tile" | "heatmap" = "home";
  private _tileCards: HTMLElement[] | null = null;
  private moreElements_Cards: HTMLElement[] | null = null;
  // private moreElements_tileCard: HTMLElement[] | null = null;
  private _moreElementsContainer: any = null;
  private previousWidth: number = 0;
  private weekGridConsumption: number = 0;
  private chartMap: any = null; // Variabile per mantenere l'istanza del grafico
  private dawnTime: any;
  private duskTime: any;
  private entities: any;
  private chartdata: any;
  private cardCardWidth: number;
  private batteryWeekTotal: any;
  private batteryWeek: any;
  private gridWeekTotal: any | null = null;
  private gridWeek: any | null = null;
  private totalWekkPvProduction: number = 0;
  private daysToEvaluate: number = 7;
  private startTime: Date;
  private endTime: Date;
  private heatmapObj: any;
  private disableLeftButtonHeatmap: boolean = false;
  private gridEnergyState: string = "neutral";
  private batterMode: string = "neutral";
  private sensorData: any = [];
  private aggregatedData: any = [];
  private showMoreElements: boolean = false;
  private dinamicContent: any = [];
  private moreElemetsName: string = "";
  private moreElemetsFunction: string = "";
  private totalMaxPower: number = 0;
  private sliderHeight: number = 0;

  static get properties() {
    return {
      hass: {},
      config: {},
      activeMenu: {},
      showChart: {},
      swicthChart: {},
      panelMode: {},
      showMoreElements: {},
    };
  }

  static get iconMapping() {
    return {
      loader: loader(),
      cloudeCoverage: cloudeCoverage(),
      uvIndex: uvIndex(),
      rainy: rainy(),
      temperature: temperature(),
      "clear-night": clearnight(),
      cloudy: cloudy(),
      day: day(),
      sunny: day(),
      partlycloudy: partlycloudy(),
      hail: hail(),
      "lightning-rainy": lightningrainy(),
      lightning: lightning(),
      night: clearnight(),
      "partlycloudy-night": partlycloudynight(),
      pouring: pouring(),
      "snowy-rainy": snowyrainy,
      "windy-variant": windyvariant(),
      windy: windy(),
      fog: fog(),
    };
  }

  constructor() {
    super();
    this.showChart = false;
    this.swicthChart = true;
  }

  static get styles(): CSSResultGroup {
    return styles;
  }

  public setConfig(config: any): void {
    if (!config.entities || !Array.isArray(config.entities)) {
      throw new Error(
        "Invalid configuration: entities must be a list of entity IDs"
      );
    }

    const updatedConfig = { ...config };

    // Genera una chiave univoca basata sulla configurazione
    const uniqueKey =
      JSON.stringify(config.entities) + (config.card?.type || "default");
    const hash = this._generateHash(uniqueKey);

    const storageKey = `local_conditional_card_id_${hash}`;
    let savedId = localStorage.getItem(storageKey);

    // Se non esiste, genera un ID univoco
    if (!savedId) {
      savedId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      localStorage.setItem(storageKey, savedId);
    }

    // Assegna l'ID generato o recuperato
    updatedConfig.id = savedId;

    // Imposta la configurazione aggiornata
    this.config = updatedConfig;

    // Recupera il valore dello slider dal localStorage o usa il valore predefinito
    const sliderKey = `slider_value_${this.config.id}`;
    const savedSliderValue = localStorage.getItem(sliderKey);

    this._interval = savedSliderValue
      ? parseInt(savedSliderValue, 10)
      : (config.options?.data_time_period ?? 25);

    // legge le entità in enetities
    this.entities = this.config.entities;
    this.totalMaxPower =
      this.entities.reduce((sum, entity) => sum + (entity.max_power || 0), 0) /
      1000;
  }

  private _generateHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  connectedCallback() {
    super.connectedCallback();

    // Aggiungi il listener per il resize della finestra
    window.addEventListener("resize", this.handleResize.bind(this));

    // Calcola inizialmente la larghezza
    this.handleResize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Rimuovi il listener per evitare memory leak
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  private handleResize() {
    // Ottieni la larghezza corrente della card
    const currentWidth = this.getBoundingClientRect().width;

    // Confronta la larghezza corrente con quella precedente
    if (currentWidth !== this.previousWidth) {
      this.previousWidth = currentWidth;
      this.initializeLines(); // Richiama la funzione solo se la larghezza è cambiata
    }
  }

  private createTileCards() {
    if (!this.config.tile_cards || !Array.isArray(this.config.tile_cards)) {
      return [];
    }

    if (!this._tileCards) {
      this._tileCards = this.config.tile_cards.map((entity) => {
        const tileConfig = {
          type: "tile",
          entity: entity,
        };

        const tile = document.createElement("hui-tile-card") as any;
        tile.setConfig(tileConfig);
        return tile;
      });
    }

    this._tileCards.forEach((tile) => {
      (tile as any).hass = this.hass;
    });

    return this._tileCards;
  }

  // private entitiesCard() {
  //   if (!this.config.more_elements || !Array.isArray(this.config.more_elements)) {
  //       return [];
  //   }

  //   if (!this.moreElements_tileCard) {
  //       const sensorEntities = this.config.more_elements
  //           .filter(entity => entity.startsWith("sensor.")); // Filtra solo i sensori

  //       if (sensorEntities.length === 0) {
  //           return []; // Nessun sensore, nessuna card
  //       }

  //       const tileConfig = {
  //           type: "entities",
  //           entities: sensorEntities, // Passa tutte le entità insieme
  //       };

  //       const tile = document.createElement("hui-entities-card") as any;
  //       tile.setConfig(tileConfig);

  //       this.moreElements_tileCard = tile;
  //   }

  //   (this.moreElements_tileCard as any).hass = this.hass;

  //   return [this.moreElements_tileCard]; // Deve restituire un array con una sola card
  // }

  // private more_elements() {
  //   if (!this.config.more_elements || !Array.isArray(this.config.more_elements)) {
  //       return [];
  //   }

  //   if (!this.moreElements_EntitiesCards) {
  //       this.moreElements_EntitiesCards = this.config.more_elements
  //           .filter(entity => !entity.startsWith("sensor.")) // Filtro i sensori
  //           .map((entity) => {
  //               const tileConfig = {
  //                   type: "tile",
  //                   entity: entity,
  //               };

  //               const tile = document.createElement("hui-tile-card") as any;
  //               tile.setConfig(tileConfig);
  //               return tile;
  //           });
  //   }

  //   this.moreElements_EntitiesCards.forEach((tile) => {
  //       (tile as any).hass = this.hass;
  //   });

  //   return this.moreElements_EntitiesCards;
  // }

  private generateMoreElements(more_elements) {
    if (!more_elements || !Array.isArray(more_elements)) {
      return [];
    }

    if (!this.moreElements_Cards) {
      this.moreElements_Cards = [];

      const sensorEntities = more_elements.filter((entity) =>
        entity.startsWith("sensor.")
      );
      const otherEntities = more_elements.filter(
        (entity) => !entity.startsWith("sensor.")
      );

      // Se ci sono sensori, crea una Entities Card
      if (sensorEntities.length > 0) {
        const tileConfig = {
          type: "entities",
          entities: sensorEntities,
        };

        const tile = document.createElement("hui-entities-card") as any;
        tile.setConfig(tileConfig);

        this.moreElements_Cards.push(tile);
      }

      // Crea Tile Cards per le altre entità
      this.moreElements_Cards.push(
        ...otherEntities.map((entity) => {
          const tileConfig = {
            type: "tile",
            entity: entity,
          };

          const tile = document.createElement("hui-tile-card") as any;
          tile.setConfig(tileConfig);
          return tile;
        })
      );
    }

    // Aggiorna `hass` per tutte le card
    this.moreElements_Cards.forEach((tile) => {
      (tile as any).hass = this.hass;
    });

    return this.moreElements_Cards;
  }

  // *********************** calolo pv settimanale ********************

  private getTotalSum(chartdata) {
    let sum = 0;

    // Se c'è una sola entità, somma solo gli ultimi 7 valori della sua serie
    if (this.entities.length === 1) {
      const seriesData = chartdata.series[0].data;
      const last7Values = seriesData.slice(-7); // Prende solo gli ultimi 7 valori
      sum = last7Values.reduce((total, point) => total + point.y, 0);
    } else {
      // Trova la serie con nome "totale"
      const totaleSeries = chartdata.series.find(
        (series) => series.name === "totale"
      );

      // Se la serie esiste, somma solo gli ultimi 7 valori
      if (totaleSeries) {
        const seriesData = totaleSeries.data;
        const last7Values = seriesData.slice(-7); // Prende solo gli ultimi 7 valori
        sum = last7Values.reduce((total, point) => total + point.y, 0);
      }
    }

    // Restituisce la somma arrotondata a due decimali
    return Number(sum.toFixed(2));
  }
  //*********************** fine calolo pv settimanale ********************

  // ********************** interrogazione singola entità ******************

  askForEntity(
    consumer: string,
    days: number,
    unit: string
  ): Promise<{
    days: Array<{ start: number; end: number; sum: number }>;
    totale: number;
  }> {
    return new Promise((resolve, reject) => {
      const now = new Date();
      const startTime = new Date();

      // Sottraggo giorni per ottenere il range corretto
      startTime.setDate(now.getDate() - (days - 1));
      startTime.setHours(0, 0, 0, 0); // Imposta a mezzanotte esatta

      // Recupero i dettagli dell'entità per verificare l'unità di misura
      const entity = this.hass.states[consumer];
      const entityUnit =
        entity?.attributes?.unit_of_measurement?.toLowerCase() || "";
      const isWatt = entityUnit === "w" || unit.toLowerCase() === "watt"; // Controlla se è in watt

      this.hass
        .callWS({
          type: "recorder/statistics_during_period",
          statistic_ids: [consumer], // Deve sempre essere un array
          period: "day",
          start_time: startTime.toISOString(),
          types: ["sum", "mean"],
        })
        .then(
          (
            recorderResponse: Record<
              string,
              Array<{ start: number; end: number; sum: number }>
            >
          ) => {
            // Prendi i dati e calcola il valore corretto
            const entityData = recorderResponse[consumer] || [];
            if (entityData.length < 2) {
              console.warn(
                "Dati insufficienti per il calcolo del valore giornaliero."
              );
              return resolve({ days: [], totale: 0 }); // Restituisco dati vuoti invece di undefined
            }

            // Array per i valori giornalieri corretti
            let correctedDays: Array<{
              start: number;
              end: number;
              sum: number;
            }> = [];
            let totalSum: number = 0;

            for (let i = 1; i < entityData.length; i++) {
              // Calcola la differenza tra giorni consecutivi
              let correctedSum = entityData[i].sum - entityData[i - 1].sum;

              // Se l'unità è in watt, divido per 1000 per ottenere i kWh
              if (isWatt) {
                correctedSum /= 1000;
              }

              // Arrotondo il valore a 2 decimali
              correctedSum = parseFloat(correctedSum.toFixed(2));

              // Aggiungo il valore alla lista dei giorni
              correctedDays.push({
                start: entityData[i].start, // Timestamp del giorno
                end: entityData[i].end, // Fine del periodo
                sum: correctedSum,
              });

              // Aggiorno il totale
              totalSum += correctedSum;
            }

            // Arrotondo il totale a massimo 2 decimali
            totalSum = parseFloat(totalSum.toFixed(2));

            // Oggetto finale con days e totale
            const correctedData = {
              days: correctedDays,
              totale: totalSum,
            };

            resolve(correctedData); // Restituisce i dati corretti
          }
        )
        .catch((error) => {
          console.error("Errore nella richiesta al recorder:", error);
          reject(error); // Propaga l'errore
        });
    });
  }

  // isPanelMode() {
  //   const huiRoot = document.querySelector("home-assistant")?.shadowRoot
  //     ?.querySelector("home-assistant-main")?.shadowRoot
  //     ?.querySelector("ha-panel-lovelace")?.shadowRoot
  //     ?.querySelector("hui-root") as any; // 👈 CAST a "any"

  // return huiRoot?.lovelace?.config?.views[huiRoot?.lovelace?.current_view]?.panel || false;

  // }

  isPanelMode(): boolean {
    const huiRoot = document
      .querySelector("home-assistant")
      ?.shadowRoot?.querySelector("home-assistant-main")
      ?.shadowRoot?.querySelector("ha-panel-lovelace")
      ?.shadowRoot?.querySelector("hui-root");

    return !!huiRoot?.shadowRoot?.querySelector("hui-panel-view");
  }

  isVericarlCard(): boolean {
    const haCard = this.shadowRoot?.querySelector("ha-card") as any;
    return haCard ? haCard.offsetHeight > haCard.offsetWidth : false;
  }

  private dynamicFunction: () => unknown = () => "";

  // ********************** fine interrogazione singola entità ******************

  render() {
    const verticalCard = this.isVericarlCard();
    const panelMode = this.isPanelMode();
    const cardHeight = Math.round(this.getBoundingClientRect().height);
    if (!verticalCard) {
      this.chartHeight = cardHeight / 2.2;
    }

    const pv_nemuber = this.config.entities.length;

    this.cardCardWidth = Math.round(this.getBoundingClientRect().width);


    this.initializeLines();
    // Gestione opzionale di weather_entity
    let weatherObj = null;
    let iconUrl = "";
    let weatherSvg = "";
    let renderIcon = "";

    if (
      this.config?.weather_entity &&
      this.hass?.states[this.config.weather_entity]
    ) {
      weatherObj = this.hass.states[this.config.weather_entity];
      weatherSvg = weatherObj.state;
      iconUrl = `https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${weatherSvg}.svg`;
      renderIcon = PhotovoltaicCard.iconMapping[weatherSvg] || (() => "");
    } else {
      console.warn("weather_entity is not configured or not found.");
    }

    // Inizializza i totali
    let pvTotalEnergy = 0;
    let pvTotal = 0;
    let batteryTotal = 0;
    let gridTotal = 0;

    // Calcola i valori delle entità configurate
    this.config.entities.forEach((entity) => {
      const pvState = this.hass.states[entity.pv]?.state
        ? parseInt(this.hass.states[entity.pv].state) || 0
        : 0;

      const convertedPvState =
        entity.convert_to_watt ||
        this.hass.states[
          entity.pv
        ]?.attributes.unit_of_measurement?.toLowerCase() === "kwh"
          ? pvState * 1000
          : pvState;

      // Aggiungi al totale PV
      pvTotal += convertedPvState;
    });

    // Aggiorna il totale generale
    pvTotalEnergy += pvTotal;

    let gridState;
    if (this.config.grid?.grid_entity) {
      const inverted = this.config.grid?.inverted;
    if (this.config.grid?.sell_energy) {
        const buy_energy: number = parseFloat(this.hass.states[this.config.grid.grid_entity]?.state) || 0;
        const sellEnergy: number = parseFloat(this.hass.states[this.config.grid?.sell_energy]?.state) || 0;

        gridState = buy_energy + sellEnergy;
        // console.table({buy_energy, sellEnergy, gridState});

        gridTotal = sellEnergy > 0 ? sellEnergy : gridState;
        this.gridEnergyState = sellEnergy  > 0 ? "sell" : ((parseFloat(this.hass.states[this.config.grid.sell_energy]?.state) || 0) > 0 ? "sell" : "neutral");
        if (sellEnergy > 0) {
          this.gridEnergyState = "sell";
          } else if (buy_energy > 0) {
              this.gridEnergyState = "buy";
          } else {
              this.gridEnergyState = "neutral";
          }
      } else {
        gridState = inverted ? -(parseFloat(this.hass.states[this.config.grid.grid_entity]?.state) || 0) : (parseFloat(this.hass.states[this.config.grid.grid_entity]?.state) || 0);
        gridTotal = Math.abs(gridState); 
        this.gridEnergyState = gridState > 0 ? "buy" : (gridState < 0 ? "sell" : "neutral");
      }
    }
    // console.log(gridTotal, this.gridEnergyState);
  
  
    // Calcola i valori per la batteria
     if (this.config.battery?.power) {
      const batteryPower =  Math.round(parseFloat(this.hass.states[this.config.battery.power].state));  
      
      // let batteryPower;
      

      if (this.config?.battery?.battery_to_inverter) {
        const batteryToInverter =  Math.round(this.hass.states[this.config.battery.battery_to_inverter].state);
        if (batteryToInverter > 0) {
          this.batterMode = "discharge";
          batteryTotal = batteryToInverter;
          } else if (batteryPower > 0) {
            this.batterMode = "charge";
            batteryTotal = batteryPower;
          } else {
              this.gridEnergyState = "neutral";
          }
          console.log(this.batterMode, batteryToInverter, batteryTotal);
      } else {
        this.batterMode = batteryPower > 0 ? 'charge' : 'discharge';
        batteryTotal = batteryPower > 0 ? batteryPower : -batteryPower;
      }
      
    }
    


    // potenza verso inverter
    const totalDcInput = Math.round(this.batterMode == "discharge" ? pvTotalEnergy : batteryTotal + pvTotalEnergy);
    
    let inverterEfficiency = this.config.inverter.inverter_efficency ?? 0.96;
    let DcToAcTotal = this.config?.grid?.inverter_output ?? totalDcInput * inverterEfficiency;
    if (this.config?.inverter.inverter_output) {
      inverterEfficiency = totalDcInput > 0 ? DcToAcTotal / totalDcInput : 1;
    }

    // Calcola il totale di potenza
    const totalPower: number = Math.round(DcToAcTotal + (this.gridEnergyState == "buy" ? gridTotal : 0));


    // calcolo percentuali
    const pvPercentage: number = Number(((pvTotal * inverterEfficiency / totalPower) * 100).toFixed(2));
    const batteryPercentage: number = Number(((batteryTotal * inverterEfficiency / totalPower) * 100).toFixed(2));
    const gridPercentage: number = this.gridEnergyState == "buy" ? Number(((gridTotal / totalPower) * 100).toFixed(2)) : 0;
    // console.log('gridTotal', gridTotal ,'totalPower', totalPower);
    // console.table({gridTotal, totalPower});

    // console.log('pvPercentage', pvPercentage, 'batteryPercentage', batteryPercentage, 'gridPercentage', gridPercentage);

    const batteryPercentageNow = this.config.battery?.battery_state ?? "0";
    const batteryPercentageState = this.hass.states[batteryPercentageNow]?.state
      ? parseInt(this.hass.states[batteryPercentageNow].state, 10) || 0
      : 0;

    // Calcola la riduzione di CO2
    const c02 = parseFloat((this.totalWekkPvProduction * 0.25).toFixed(2));


    // Calcola il consumo totale settimanale
    const totalConsumption =
      Number(this.totalWekkPvProduction) + Number(this.gridWeekTotal);

    const totalWeekKwhPercentage =
      totalConsumption > 0
        ? (this.totalWekkPvProduction / totalConsumption) * 100
        : 0;

    return html`
      ${verticalCard
        ? html`
            <ha-card
              class="ha-card_vertical"
              style="height: ${panelMode ? "100%" : "900px"} !important;"
            >
              <div class="title">
                <div>E</div>
                <div>n</div>
                <div>e</div>
                <div>r</div>
                <div>g</div>
                <div>y</div>
                <div>C</div>
                <div>o</div>
                <div>n</div>
                <div>t</div>
                <div>r</div>
                <div>o</div>
                <div>l</div>
              </div>

              ${this.activeMenu === "home"
                ? html`
                    ${!this.showMoreElements
                      ? html`
                          <div
                            id="homeContent"
                            style="display: flex; flex-direction: column;"
                          >
                            <div
                              style="display: flex; justify-content: center; flex-direction: column; gap: 50px; margin: auto 10%"
                            >
                              ${pv_nemuber >= 1
                                ? html`
                                    <div
                                      style="display: flex; justify-content: ${pv_nemuber ==
                                      1
                                        ? "space-around"
                                        : "space-between"}"
                                    >
                                      ${weatherObj && pv_nemuber <= 2
                                        ? html`
                                            <div
                                              style="width: 70px;cursor:pointer;"
                                              @click=${() =>
                                                this._moreinfo(
                                                  this.config.weather_entity
                                                )}
                                            >
                                              ${renderIcon}
                                            </div>
                                          `
                                        : ""}
                                      ${this.entities.map((entity) => {
                                        const entityId = entity.pv; // Estrai l'ID dell'entità dalla chiave 'pv'
                                        const maxPower = entity.max_power;
                                        const stateObj =
                                          this.hass.states[entityId];
                                        const unit =
                                          stateObj &&
                                          stateObj.attributes
                                            .unit_of_measurement
                                            ? stateObj.attributes
                                                .unit_of_measurement
                                            : "";
                                        const state = stateObj
                                          ? unit?.toLowerCase() === "kwh" ||
                                            entity.convert_to_watt
                                            ? Math.round(
                                                parseFloat(stateObj.state) *
                                                  1000
                                              )
                                            : Math.round(
                                                parseFloat(stateObj.state)
                                              )
                                          : "N/A";
                                        const percentage =
                                          state !== "N/A" && maxPower > 0
                                            ? Math.round(
                                                (state / maxPower) * 100
                                              )
                                            : "N/A";
                                        return html`
                                          <div
                                            @click="${() => {
                                              if (entity.more_elements) {
                                                this.moreElemetsName =
                                                  this.hass.states[
                                                    entityId
                                                  ].attributes.friendly_name;
                                                this.dynamicFunction = () =>
                                                  pvIcon(state);
                                                this.dinamicContent =
                                                  entity.more_elements;
                                                this.showMoreElements = true;
                                              } else {
                                                // Se more_elements non esiste, esegui this._moreinfo(entityId)
                                                this._moreinfo(entityId);
                                              }
                                            }}"
                                            id="pv-element"
                                            class="element-svg top tile tile_vertical"
                                            value="${state}"
                                            style=" cursor:pointer; background: linear-gradient(90deg, #4eb274 0%, #4eb274 ${percentage}%, #284932 ${percentage}%, #284932 100%);"
                                          >
                                            ${pvIcon(state)}
                                          </div>
                                        `;
                                      })}
                                    </div>
                                  `
                                : ""}
                              <!-- SVG Casa -->
                              <div
                                style="display:flex; justify-content:space-evenly; align-items: center;"
                              >
                                ${weatherObj && pv_nemuber > 2
                                  ? html`
                                      <div
                                        style="display: flex; flex-direction: column;"
                                      >
                                        <div
                                          style="aspect-ratio: 1 / 1; width: 70px; cursor:pointer;"
                                          @click=${() =>
                                            this._moreinfo(
                                              this.config.weather_entity
                                            )}
                                        >
                                          ${renderIcon}
                                        </div>
                                        <div class="weather_attributes">
                                          <div style="display: flex;">
                                            <div style="width: 25px;">
                                              ${cloudeCoverage()}
                                            </div>
                                            <div style="font-size: 12px">
                                              &nbsp;${weatherObj.attributes
                                                .cloud_coverage}%
                                            </div>
                                          </div>
                                          <div style="font-size: 12px">
                                            Uv:${weatherObj.attributes.uv_index}
                                          </div>
                                          <div style="display: flex;">
                                            <div style="width: 13px;">
                                              ${temperature()}
                                            </div>
                                            <div style="font-size: 12px">
                                              &nbsp;${weatherObj.attributes
                                                .temperature}${weatherObj
                                                .attributes.temperature_unit}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    `
                                  : ""}
                                ${weatherObj && pv_nemuber <= 2
                                  ? html`
                                      <div
                                        style="display: grid; grid-template-columns: auto auto; grid-template-rows: 1fr 1fr 1fr; align-items: center;grid-column-gap:5px;"
                                      >
                                        <div style="width: 25px;">
                                          ${cloudeCoverage()}
                                        </div>
                                        <div style="font-size: 12px">
                                          &nbsp;${weatherObj.attributes
                                            .cloud_coverage}%
                                        </div>
                                        <div
                                          style="font-size: 12px; opacity: .76;"
                                        >
                                          Uv:
                                        </div>
                                        <div style="font-size: 12px">
                                          &nbsp;${weatherObj.attributes
                                            .uv_index}
                                        </div>
                                        <div style="width: 13px;">
                                          ${temperature()}
                                        </div>
                                        <div style="font-size: 12px">
                                          &nbsp;${weatherObj.attributes
                                            .temperature}${weatherObj.attributes
                                            .temperature_unit}
                                        </div>
                                      </div>
                                    `
                                  : ""}

                                <div
                                  id="casa"
                                  class="element-svg tile tile_vertical"
                                  style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;${pv_nemuber >=
                                  3
                                    ? "margin:auto;"
                                    : " "} "
                                  @click="${() => {
                                    this.moreElemetsName = "Inverter";
                                    this.dynamicFunction = () => inverter();
                                    if (!this.config?.inverter?.more_elements)
                                      return; // Se non esiste, non fare nulla
                                    this.dinamicContent =
                                      this.config.inverter.more_elements;
                                    this.showMoreElements = true;
                                  }}"
                                >
                                  ${inverter()}
                                </div>
                              </div>
                              <div
                                style=" display: flex; justify-content:space-between; "
                              >
                                ${this.config.battery
                                  ? (() => {
                                      return html`
                                    <div
                                      id="battery"
                                      class="element-svg bottom tile tile_horizontal"
                                      value="${batteryTotal}"
                                      style="cursor: pointer; background-color: #b95618; border: 2px solid transparent; ${this.batterMode == "discharge"
                                        ? "animation: circular-border 2s infinite;"
                                        : ""}  "
                                      @click="${() => {
                                        if (
                                          this.config?.battery?.more_elements
                                        ) {
                                          this.moreElemetsName = "Battery";
                                          this.dynamicFunction = () =>
                                            battery(
                                              batteryTotal,
                                              batteryPercentageState,
                                              this.batterMode
                                            );
                                          this.dinamicContent =
                                            this.config.battery.more_elements;
                                          this.showMoreElements = true;
                                        } else {
                                          // Se more_elements non esiste, esegui this._moreinfo(entityId)
                                          this._moreinfo(
                                            this.config?.battery?.power
                                          );
                                        }
                                      }}"
                                    >
                                          ${battery(
                                            batteryTotal,
                                            batteryPercentageState,
                                            this.batterMode
                                          )}
                                        </div>
                                      `;
                                    })()
                                  : ""}
                                <div
                                  id="home_tile"
                                  class="element-svg bottom tile tile_vertical"
                                  value="${totalPower}"
                                  style="background: linear-gradient(118deg, #959c98 0%, #254344 100%); "
                                  @click="${() => {
                                    this.moreElemetsName = "Home";
                                    this.dynamicFunction = () => inverter();
                                    if (!this.config?.inverter?.more_elements)
                                      return; // Se non esiste, non fare nulla
                                    this.dinamicContent =
                                      this.config.inverter.more_elements;
                                    this.showMoreElements = true;
                                  }}"
                                >
                                  ${home(
                                    totalPower,
                                    pvPercentage,
                                    batteryPercentage
                                  )}
                                </div>
                                ${this.config.grid
                                  ? (() => {
                                      const maxPower =
                                        this.config?.grid?.max_power;
                                      const percentage = Math.round(
                                        (gridTotal / maxPower) * 100
                                      );
                                      return html`
                                        <div
                                          id="grid-power-direct"
                                          class="element-svg bottom tile tile_vertical"
                                          value="${gridTotal}"
                                          style=${`cursor: pointer; ${this.gridEnergyState == "buy" 
                                            ?  `background: linear-gradient(90deg, #235adf 0%, #235adf ${percentage}%, #2a3948 ${percentage}%, #2a3948 100%);`
                                            : 'background-color: #2a3948;'
                                          }`}
                                          @click="${() => { 
                                            if (
                                              this.config.grid.more_elements
                                            ) {
                                              this.moreElemetsName = "Grid";
                                              this.dynamicFunction = () =>
                                                gridPower(gridTotal, this.gridEnergyState);
                                              this.dinamicContent =
                                                this.config.grid.more_elements;
                                              this.showMoreElements = true;
                                            } else {
                                              // Se more_elements non esiste, esegui this._moreinfo(entityId)
                                              this._moreinfo(
                                                this.config?.grid?.grid_entity
                                              );
                                            }
                                          }}"
                                        >
                                          ${gridPower(gridTotal, this.gridEnergyState)}
                                        </div>
                                      `;
                                    })()
                                  : ""}
                              </div>
                              <!-- Linee dinamiche -->
                              <svg
                                class="lines-svg"
                                style="width: 100%; height: 100%; z-index: 1; pointer-events: none;"
                              ></svg>
                            </div>
                            <!-- ****************** info **************************** -->
                            <div
                              style="margin-left: 5%; margin-right: 5%; margin-top: auto;"
                            >
                              <div>produzione ultimi 7 giorni</div>
                              <div class="home_info">
                                <div class="info_column">
                                  <ha-icon
                                    icon="mdi:molecule-co2"
                                    class="info_icon"
                                  ></ha-icon>
                                  ${c02 > 0
                                    ? html` <div>${c02} kg</div> `
                                    : html` <div style="width:25px;">
                                        ${loader()}
                                      </div>`}
                                  <div>co2 risparmiata</div>
                                </div>
                                <div
                                  style="width: 2px; height: 80%; background-color: var(--divider-color);"
                                ></div>
                                <div class="info_column">
                                  <ha-icon
                                    icon="mdi:piggy-bank"
                                    class="info_icon"
                                  ></ha-icon>
                                  ${this.totalWekkPvProduction > 0
                                    ? html`
                                        <div>
                                          ${this.totalWekkPvProduction} Kwh
                                        </div>
                                      `
                                    : html` <div style="width:25px;">
                                        ${loader()}
                                      </div>`}

                                  <div>risparmio</div>
                                </div>
                                <div
                                  style="width: 2px; height: 80%; background-color: var(--divider-color);"
                                ></div>
                                <div class="info_column">
                                  <ha-icon
                                    icon="mdi:home"
                                    class="info_icon"
                                  ></ha-icon>
                                  ${totalWeekKwhPercentage > 0
                                    ? html`
                                        <div>
                                          ${totalWeekKwhPercentage.toFixed(1)}%
                                        </div>
                                      `
                                    : html` <div style="width:25px;">
                                        ${loader()}
                                      </div>`}

                                  <div>autosufficienza</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        `
                      : html`
                          <div class="more_elements_container">
                            <div
                              style="padding: 20px 20px 15px 20px; display:flex;justify-content: center; align-items: center;"
                            >
                              <div
                                class="element-svg tile tile_vertical"
                                style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;  width:70px; height:70px;"
                              >
                                ${this.dynamicFunction()}
                              </div>
                              <div class="more_elemnts_divider ">
                                ${this.moreElemetsName}
                              </div>
                              <div
                                class="element-svg tile tile_vertical back_button"
                                style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);"
                                @click="${() => {
                                  this.showMoreElements = false;
                                  this.moreElements_Cards = null;
                                }}"
                              >
                                back
                              </div>
                            </div>
                            <div id="style-2" class="more_elements">
                              ${this.generateMoreElements(this.dinamicContent)}
                            </div>
                          </div>
                        `}
                  `
                : ""}
              ${this.activeMenu === "chart"
                ? html`
            <div class"arci" style="display: flex; flex-direction: column;">
            <div style="flex-grow: 4;"> 
              ${
                this.swicthChart
                  ? html`
                      <h3>Previsioni Produzione Fotovoltaica</h3>
                      <div class="production_range">
                        <label for="interval-slider"
                          >Intervallo: ${this._interval} minuti</label
                        >
                        <div class="range-container">
                          <input
                            id="interval-slider"
                            type="range"
                            min="1"
                            max="30"
                            .value="${this._interval}"
                            @input="${this._onSliderInput}"
                            @change="${this._atSliderChange}"
                          />
                          <div class="offset_label">
                            <span class="range-thumb-label"
                              >${this._interval}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div id="chart"></div>
                    `
                  : html`
                      <h3 style="margin-bottom: 70px;">
                        Andamento Settimanale (Ultimi 7 Giorni)
                      </h3>
                      <div id="week-chart"></div>
                      <!-- Nuovo contenitore per il secondo grafico -->
                    `
              }
                </div>
                <div class="chart-cutton-container">
                  <button class="chart-button-select"
                @click="${() => {
                  this.swicthChart = true;
                  // this.showWeeklyChart = false;
                  this._initializeChart(this.seriesData);
                }}"
              >
                Toggle Chart and Update
              </button>
              <div style="width: 2px; height: 80%; background-color: var(--divider-color); align-self: center;"></div>
              <button class="chart-button-select"
                  @click="${() => {
                    this.swicthChart = false;
                    this.initializeApexChart(this.chartdata, "week-chart");
                  }}"
                >
                  inizilte week chart
                </button>
                </div>
            </div>    
            `
                : ""}
              ${this.activeMenu === "tile"
                ? html`
                    <div
                      style="display: flex; flex-direction: column; gap: 10px;"
                    >
                      ${this.createTileCards().map((tile) => tile)}
                    </div>
                  `
                : ""}
              ${this.activeMenu === "heatmap"
                ? html` <div id="heatmap-chart"></div> `
                : ""}

              <!-- ******************* bottom menu ****************** -->
              <div class="bottom_bar_vertical">
                <ha-icon
                  icon="mdi:home"
                  class="menu_icon ${this.activeMenu === "home"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "home";
                  }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:chart-areaspline"
                  class="menu_icon ${this.activeMenu === "chart"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "chart";
                    this._initializeChart(this.seriesData);
                  }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:view-grid-compact"
                  class="menu_icon ${this.activeMenu === "heatmap"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "heatmap";
                    this.get_recorder_for_heatmap();
                    // this.initializeHeatmapChart();
                  }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:format-list-numbered"
                  class="menu_icon ${this.activeMenu === "tile"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "tile";
                  }}"
                ></ha-icon>
              </div>
            </ha-card>
          `
        : html`
            <!-- ********************************************************************************************************************** -->
            <!-- ********************************************************************************************************************** -->
            <!-- ********************************************************************************************************************** -->
            <ha-card
              class="ha-card_horizontal scaled-container"
              style="height: ${panelMode ? "100%" : "900px"} !important;"
            >
              <!-- ************************** title *************************************** -->
              <div class="title_horizontal" style="width: 100">
                <div>E</div>
                <div>n</div>
                <div>e</div>
                <div>r</div>
                <div>g</div>
                <div>y</div>
                <div>C</div>
                <div>o</div>
                <div>n</div>
                <div>t</div>
                <div>r</div>
                <div>o</div>
                <div>l</div>
              </div>

              <!-- ************************** main flow **************************************** -->

              ${!this.showMoreElements
                ? html`
                    
                      <div
                        style="margin: 3vh 13% 10vh; display: flex; justify-content: space-between; flex-direction: column; grid-area: pv;"
                      >
                        ${
                          pv_nemuber >= 1
                            ? html`
                                <div
                                  style="height:10vh; display: flex; justify-content: ${pv_nemuber ==
                                  1
                                    ? "space-around"
                                    : "space-between"}"
                                >
                                  ${weatherObj && pv_nemuber <= 2
                                    ? html`
                                        <div
                                          style="width: 12vh;cursor:pointer;"
                                          @click=${() =>
                                            this._moreinfo(
                                              this.config.weather_entity
                                            )}
                                        >
                                          ${renderIcon}
                                        </div>
                                      `
                                    : ""}
                                  ${this.entities.map((entity) => {
                                    const entityId = entity.pv; // Estrai l'ID dell'entità dalla chiave 'pv'
                                    const maxPower = entity.max_power;
                                    const stateObj = this.hass.states[entityId];
                                    const unit =
                                      stateObj &&
                                      stateObj.attributes.unit_of_measurement
                                        ? stateObj.attributes
                                            .unit_of_measurement
                                        : "";
                                    const state = stateObj
                                      ? unit?.toLowerCase() === "kwh" ||
                                        entity.convert_to_watt
                                        ? Math.round(
                                            parseFloat(stateObj.state) * 1000
                                          )
                                        : Math.round(parseFloat(stateObj.state))
                                      : "N/A";
                                    const percentage =
                                      state !== "N/A" && maxPower > 0
                                        ? Math.round((state / maxPower) * 100)
                                        : "N/A";
                                    return html`
                                      <div
                                        @click="${() => {
                                          if (entity.more_elements) {
                                            this.moreElemetsName =
                                              this.hass.states[
                                                entityId
                                              ].attributes.friendly_name;
                                            this.dynamicFunction = () =>
                                              pvIcon(state);
                                            this.dinamicContent =
                                              entity.more_elements;
                                            this.showMoreElements = true;
                                          } else {
                                            // Se more_elements non esiste, esegui this._moreinfo(entityId)
                                            this._moreinfo(entityId);
                                          }
                                        }}"
                                        id="pv-element"
                                        class="element-svg top tile tile_horizontal"
                                        value="${state}"
                                        style=" cursor:pointer; background: linear-gradient(90deg, #4eb274 0%, #4eb274 ${percentage}%, #284932 ${percentage}%, #284932 100%);"
                                      >
                                        ${pvIcon(state)}
                                      </div>
                                    `;
                                  })}
                                </div>
                              `
                            : ""
                        }
                        <!-- SVG Casa -->
                        <div
                          style="display:flex; justify-content:space-evenly; align-items: center; height:10vh;"
                        >
                          ${
                            weatherObj && pv_nemuber > 2
                              ? html`
                                  <div
                                    style="display: flex; flex-direction: column;"
                                  >
                                    <div
                                      style="aspect-ratio: 1 / 1; width: 12vh; cursor:pointer;"
                                      @click=${() =>
                                        this._moreinfo(
                                          this.config.weather_entity
                                        )}
                                    >
                                      ${renderIcon}
                                    </div>
                                    <div class="weather_attributes">
                                      <div style="display: flex;">
                                        <div style="width: 3vh">
                                          ${cloudeCoverage()}
                                        </div>
                                        <div
                                          style="font-size: 1.6vh;opacity: .76;align-self: center;"
                                        >
                                          &nbsp;${weatherObj.attributes
                                            .cloud_coverage}%
                                        </div>
                                      </div>
                                      <div
                                        style="font-size: 1.6vh;opacity: .76;align-self: center;"
                                      >
                                        Uv:${weatherObj.attributes.uv_index}
                                      </div>
                                      <div style="display: flex;">
                                        <div style="width: 1.6vh;">
                                          ${temperature()}
                                        </div>
                                        <div
                                          style="font-size: 1.6vh;opacity: .76;align-self: center;"
                                        >
                                          &nbsp;${weatherObj.attributes
                                            .temperature}${weatherObj.attributes
                                            .temperature_unit}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                `
                              : ""
                          }
                          ${
                            weatherObj && pv_nemuber <= 2
                              ? html`
                                  <div
                                    style="display: grid;height:100%; grid-template-columns: auto auto; grid-template-rows: 1fr 1fr 1fr; align-items: center;grid-column-gap:5px;"
                                  >
                                    <div
                                      style="height:100%; aspect-ratio: 1 / 1;"
                                    >
                                      ${cloudeCoverage()}
                                    </div>
                                    <div style="font-size: 2vh;opacity: .76;">
                                      &nbsp;${weatherObj.attributes
                                        .cloud_coverage}%
                                    </div>
                                    <div style="font-size: 2vh; opacity: .76;">
                                      Uv:
                                    </div>
                                    <div style="font-size: 2vh;opacity: .76;">
                                      &nbsp;${weatherObj.attributes.uv_index}
                                    </div>
                                    <div style="height:100%; width: 2vh;">
                                      ${temperature()}
                                    </div>
                                    <div style="font-size: 2vh; opacity: .76;">
                                      &nbsp;${weatherObj.attributes
                                        .temperature}${weatherObj.attributes
                                        .temperature_unit}
                                    </div>
                                  </div>
                                `
                              : ""
                          }

                          <div
                            id="casa"
                            class="element-svg tile tile_horizontal"
                            style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;${
                              pv_nemuber >= 3 ? "margin:auto;" : " "
                            } "
                            @click="${() => {
                              this.moreElemetsName = "Inverter";
                              this.dynamicFunction = () => inverter();
                              if (!this.config?.inverter?.more_elements) return; // Se non esiste, non fare nulla
                              this.dinamicContent =
                                this.config.inverter.more_elements;
                              this.showMoreElements = true;
                            }}"
                          >
                            ${inverter()}
                          </div>
                        </div>
                        <div
                          style=" display: flex; justify-content:space-between; height:10vh;"
                        
                        >
                          ${
                            this.config.battery
                              ? (() => {
                                  return html`
                                    <div
                                      id="battery"
                                      class="element-svg bottom tile tile_horizontal"
                                      value="${batteryTotal}"
                                      style="cursor: pointer; background-color: #b95618; border: 2px solid transparent; ${this.batterMode == "discharge"
                                        ? "animation: circular-border 2s infinite;"
                                        : ""}  "
                                      @click="${() => {
                                        if (
                                          this.config?.battery?.more_elements
                                        ) {
                                          this.moreElemetsName = "Battery";
                                          this.dynamicFunction = () =>
                                            battery(
                                              batteryTotal,
                                              batteryPercentageState,
                                              this.batterMode
                                            );
                                          this.dinamicContent =
                                            this.config.battery.more_elements;
                                          this.showMoreElements = true;
                                        } else {
                                          // Se more_elements non esiste, esegui this._moreinfo(entityId)
                                          this._moreinfo(
                                            this.config?.battery?.power
                                          );
                                        }
                                      }}"
                                    >
                                      ${battery(
                                        batteryTotal,
                                        batteryPercentageState,
                                        this.batterMode 
                                      )}
                                    </div>
                                  `;
                                })()
                              : ""
                          }
                          <div
                            id="home_tile"
                            class="element-svg bottom tile tile_horizontal"
                            value="${totalPower}"
                            style="background: linear-gradient(118deg, #959c98 0%, #254344 100%); "
                             @click="${() => {
                               this.moreElemetsName = "Home";
                               this.dynamicFunction = () => inverter();
                               if (!this.config?.inverter?.more_elements)
                                 return; // Se non esiste, non fare nulla
                               this.dinamicContent =
                                 this.config.inverter.more_elements;
                               this.showMoreElements = true;
                             }}"
                          >
                            ${home(totalPower, pvPercentage, batteryPercentage)}
                          </div>
                          ${
                            this.config.grid
                              ? (() => {
                                  const maxPower = this.config?.grid?.max_power;
                                  const percentage = Math.round(
                                    (gridTotal / maxPower) * 100
                                  );
                                  return html`
                                    <div
                                      id="grid-power-direct"
                                      class="element-svg bottom tile tile_horizontal"
                                      value="${gridTotal}"
                                      style=${`cursor: pointer; ${this.gridEnergyState == "buy" 
                                          ?  `background: linear-gradient(90deg, #235adf 0%, #235adf ${percentage}%, #2a3948 ${percentage}%, #2a3948 100%);`
                                          : 'background-color: #2a3948;'
                                        }`}

                                      @click="${() => {
                                        if (this.config.grid.more_elements) {
                                          this.moreElemetsName = "Grid";
                                          this.dynamicFunction = () =>
                                            gridPower(gridTotal, this.gridEnergyState);
                                          this.dinamicContent =
                                            this.config.grid.more_elements;
                                          this.showMoreElements = true;
                                        } else {
                                          // Se more_elements non esiste, esegui this._moreinfo(entityId)
                                          this._moreinfo(
                                            this.config?.grid?.grid_entity
                                          );
                                        }
                                      }}"
                                    >
                                      ${gridPower(gridTotal, this.gridEnergyState)}
                                    </div>
                                  `;
                                })()
                              : ""
                          }
                        </div>
                        <!-- Linee dinamiche -->
                        <svg
                          class="lines-svg"
                          style="width: 100%; height: 100%; z-index: 1; pointer-events: none;"
                        ></svg>
                      </div>
                      </div>
                                          
                  `
                : html`
                    <div class="more_elements_container_horizontal">
                      <div
                        style="padding: 20px 20px 15px 20px; display:flex;justify-content: center; align-items: center;"
                      >
                        <div
                          class="element-svg tile tile_horizontal"
                          style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;  width:10vh; height:10vh;"
                        >
                          ${this.dynamicFunction()}
                        </div>
                        <div class="more_elemnts_divider ">
                          ${this.moreElemetsName}
                        </div>
                        <div
                          class="element-svg tile  back_button"
                          style="background: linear-gradient(118deg, #959c98 0%, #254344 100%); height:10vh; width: 10vh;"
                          @click="${() => {
                            this.showMoreElements = false;
                            this.moreElements_Cards = null;
                          }}"
                        >
                          back
                        </div>
                      </div>
                      <div id="style-2" class="more_elements">
                        ${this.generateMoreElements(this.dinamicContent)}
                      </div>
                    </div>
                  `}

              <!-- ************************** chart container *************************************** -->
              <div class="mainChartHorizonatContainer">
                <div style="width: 20%; display: flex;flex-direction: column;">
                  <div style="opacity: 0.4;">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1190.9 1040.9"
                      style="enable-background:new 0 0 1190.9 1040.9;"
                      xml:space="preserve"
                    >
                      <style type="text/css">
                        .st0_logo {
                          fill: #ffffff;
                        }
                        .st1_logo {
                          fill: #534741;
                        }
                        .st2_logo {
                          opacity: 0.29;
                        }
                      </style>
                      <path class="st0_logo" d="M2118.9-650.2" />
                      <g>
                        <g>
                          <path
                            class="st1_logo"
                            d="M905.6,489.9l-10.5,65.2c-2.1,12.9,9.5,20.6,26.1,17.1l89.8-19c18.2-3.8,34.5-18.1,36.1-31.8l8.4-68.9
                              c1.6-13.1-11.7-19.8-29.4-15.3L938.4,460C922.2,464.2,907.6,477.5,905.6,489.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M760.3,606.3l77.6-16.4c15.6-3.3,30.2-16.4,32.3-29.2l10.8-64.6c2-12.3-8.9-18.9-24.2-15l-76.1,19.6
                              c-14.1,3.6-27.3,16-29.6,27.7l-12.2,61.4C736.4,601.9,746,609.3,760.3,606.3z"
                          />
                          <path
                            class="st1_logo"
                            d="M459.5,780.4l68.2-10.4c12.1-1.8,24.4-13.2,27.2-25.2l14.5-61.2c2.7-11.6-4.9-19-16.8-16.6l-67.4,13.7
                              c-11,2.2-22.2,12.9-25.1,24l-15.2,58.1C441.9,774.1,448.4,782.1,459.5,780.4z"
                          />
                          <path
                            class="st1_logo"
                            d="M524.7,873l15.4-65.1c2.9-12.3-4.7-20.9-16.9-19.2l-68.3,9.8c-11.2,1.6-22.6,12.3-25.7,24L413.1,884
                              c-3.2,12.1,3.3,21.2,14.6,20.2l69.1-6C509.1,897.1,521.7,885.8,524.7,873z"
                          />
                          <path
                            class="st1_logo"
                            d="M620.3,635.9l67.7-14.3c13.6-2.9,26.8-15,29.2-27.1l12.4-60.8c2.4-11.6-6.7-18.1-20.1-14.6l-66.7,17.2
                              c-12.4,3.2-24.4,14.7-27,25.7l-13.4,58C599.8,631.4,607.7,638.6,620.3,635.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M691.1,722.6l13.3-65.1c2.5-12.3-6.6-20-20.3-17.2l-67.9,13.8c-12.6,2.6-24.9,14.1-27.6,25.8l-14.3,61.8
                              c-2.8,12.2,5.1,20.5,17.9,18.6l68.9-10.5C674.9,747.6,688.4,735.4,691.1,722.6z"
                          />
                          <path
                            class="st1_logo"
                            d="M884.3,622.9L873,693c-2.2,13.8,9.6,23.1,26.6,20.5l92.3-14c18.7-2.8,35.6-17.2,37.4-31.9l9.1-74.4
                              c1.7-14.1-11.9-22.3-30.1-18.6l-90.2,18.3C901.5,596.2,886.4,609.6,884.3,622.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M699.6,786.9l-14,70.2c-2.8,13.8,7,24.1,22,22.8l81.1-7.1c16.4-1.4,31.9-14.6,34.3-29.3l12.4-74.5
                              c2.3-14.1-9-23.6-25-21.3l-79.6,11.4C716.2,761.2,702.3,773.6,699.6,786.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M726.2,653.3L713.1,719c-2.6,12.9,7.1,21.7,21.8,19.5l79.3-12.1c16-2.4,31-15.6,33.3-29.3l11.6-69.4
                              c2.2-13.1-8.9-21.1-24.6-17.9l-77.8,15.8C742.2,628.5,728.7,640.9,726.2,653.3z"
                          />
                          <path
                            class="st1_logo"
                            d="M796.9,1000.8l13.4-80.1c2.5-15.1-9-26.3-25.4-25l-81.4,6.2c-15,1.2-29.4,13.5-32.2,27.8l-14.9,75.1
                              c-2.9,14.8,6.9,26.7,22.2,26.5l83-1.3C778.3,1029.8,794.3,1016.6,796.9,1000.8z"
                          />
                          <path
                            class="st1_logo"
                            d="M988.9,722.3l-92.7,13.2c-17.1,2.4-32.6,15.9-34.9,30.1l-12.1,75.3c-2.4,14.9,9.6,25.8,27.1,24.3l94.9-8.3
                              c19.3-1.7,36.7-16,38.7-31.9l9.8-80.3C1021.7,729.6,1007.7,719.6,988.9,722.3z"
                          />
                          <path
                            class="st1_logo"
                            d="M562.2,892.5l70.1-6.1c14.1-1.2,28-13.4,30.8-27.1l14.2-69.5c2.7-13.2-6.6-22.1-20.5-20.2l-69.1,9.9
                              c-12.8,1.8-25.4,13.3-28.3,25.8L544.3,871C541.3,884,549.2,893.6,562.2,892.5z"
                          />
                          <path
                            class="st1_logo"
                            d="M583.5,624.1l13.6-57.5c2.6-11-5-17.3-16.8-14.3l-66.5,17.1c-10.9,2.8-21.8,13.5-24.6,23.9l-14.3,54.7
                              c-2.8,10.8,3.7,17.7,14.7,15.4l67.3-14.2C568.8,646.8,580.8,635.5,583.5,624.1z"
                          />
                          <path
                            class="st1_logo"
                            d="M492.4,1009.4l16.4-69.3c3.1-13.1-4.5-23-16.8-22l-69.3,5.3c-11.3,0.9-23,11.6-26.2,24l-17.1,65.3
                              c-3.4,12.9,3,23.2,14.5,23l70-1.1C476.3,1034.4,489.2,1023.1,492.4,1009.4z"
                          />
                          <path
                            class="st1_logo"
                            d="M836.8,919l-13,81.1c-2.6,16,9.7,28.9,27.6,28.6l97.7-1.5c19.9-0.3,37.9-14.6,40.1-31.8l10.6-86.9
                              c2-16.4-12.3-28.4-31.7-26.9l-95.3,7.3C855.2,890.2,839.2,903.7,836.8,919z"
                          />
                          <path
                            class="st1_logo"
                            d="M627.9,907.7l-70.3,5.4c-13,1-26,12.5-29,25.8l-16.2,70c-3.2,13.8,4.8,24.9,18,24.7l71.4-1.1
                              c14.4-0.2,28.7-12.4,31.7-27l15.2-74.3C651.4,917,642.1,906.6,627.9,907.7z"
                          />
                        </g>
                        <g>
                          <path
                            class="st1_logo"
                            d="M349.4,1015.9l28.9-114.4c-111.6-72-181-201.4-169.3-342.9C225.9,354.1,405.4,202,609.9,218.9
                              c140.9,11.7,256.7,100.6,309.7,221.6l131.1-32.4c-76.1-34.3-111.3-137-49.8-212.2v0C897.6,269.1,758.8,175,788.5,52
                              c-61.4,110.7-227.2,86.2-253.8-37.6c-7.2,126.4-167.3,176.2-245,76.3c48.3,117-74.3,231.4-187.6,175
                              c94.3,84.5,33.5,240.7-93.1,239.1c121.6,35.2,134.6,202.3,19.8,255.8c124.8-21.1,209,123.9,128.9,221.9
                              C225.6,934.4,308.8,958.6,349.4,1015.9z"
                          />
                          <g class="st2_logo">
                            <path
                              class="st1_logo"
                              d="M354.7,994.7l18.9-75l0-0.2c-122.9-76.6-194.1-217.6-182.1-362.3C208.2,357,378.3,200.2,578.8,200.2
                                c10.8,0,21.7,0.5,32.5,1.3c140.7,11.6,262.7,97.5,321.4,225.3l89-15c-26.1-17.4-46.9-42.9-58.9-73.6
                                c-13.4-34.3-14-70.7-2.8-104.1c-12.4,3.3-25.1,4.9-37.9,4.9c-47.2,0-93-22.5-122.7-60.2c-17.5-22.2-28.1-47.8-31.4-74.8
                                c-27.1,23-61.5,35.9-98.7,35.9c-54.2,0-102.3-27-130.1-69.9c-26,59.5-86.6,91-142.6,91c-28.7,0-55.5-7.6-78.9-22
                                c1,31.1-7.7,61.9-25.7,88.9c-29.3,43.7-77.3,69.8-128.6,69.8c-5,0-10-0.3-15-0.8c19.9,38,22.8,82.9,6.4,125.7
                                c-16.6,43.5-49.4,75.4-90.4,90.1c34.7,25.8,56.7,65.3,60.3,111.5c3.6,46.2-12.1,88.7-42.5,119.5c47.1,9.2,87.4,40.4,109,86
                                c17.7,37.4,19.9,77.5,7.4,114.3c12.3-3.2,24.9-4.9,37.6-4.9C282.7,939.4,325.8,960.9,354.7,994.7z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div class="current_percentage">
                    <div class="inner_meter">
                      <div
                        class="grid"
                        style="height:${gridPercentage}%"
                      >
                        <ha-icon icon="mdi:factory" class="bar_icon"></ha-icon>
                      </div>
                      <div class="battery" style="height:${batteryPercentage}%">
                        <ha-icon
                          icon="mdi:battery-high"
                          class="bar_icon"
                          style="transform: rotate(90deg);"
                        ></ha-icon>
                      </div>
                      <div class="photovoltaic" style="height:${pvPercentage}%">
                        <ha-icon
                          icon="mdi:solar-power-variant-outline"
                          class="bar_icon"
                        ></ha-icon>
                      </div>
                    </div>
                    <div class="homePer">
                      <ha-icon icon="mdi:home" class="bar_icon"></ha-icon>
                    </div>
                  </div>
                </div>
                <div
                  style="width:70%; display: flex; flex-direction: column; align-self: flex-end;"
                >
                  ${this.activeMenu === "home"
                    ? html`
                        <h3 style="font-size: 2vh; margin: 0 0 1vh;">
                          Previsioni Produzione Fotovoltaica
                        </h3>
                        <div class="production_range">
                          <label for="interval-slider" style="font-size: 1.4vh"
                            >Intervallo: ${this._interval} minuti</label
                          >
                          <div class="range-container">
                            <input
                              class="slider_in_horizontal_view"
                              id="interval-slider"
                              type="range"
                              min="1"
                              max="30"
                              .value="${this._interval}"
                              @input="${this._onSliderInput}"
                              @change="${this._atSliderChange}"
                            />
                            <div class="offset_label">
                              <span class="range-thumb-label"
                                >${this._interval}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div id="chart"></div>
                      `
                    : ""}
                  ${this.activeMenu === "chart"
                    ? html`

                              <h3 style="margin-bottom: 70px;">
                                Andamento Settimanale (Ultimi 7 Giorni)
                              </h3>
                              <div id="week-chart"></div>
                              <!-- Nuovo contenitore per il secondo grafico -->
                        </div>
                      `
                    : ""}
                  ${this.activeMenu === "tile"
                    ? html`
                        <div
                          style="display: flex; flex-direction: column; gap: 10px;"
                        >
                          ${this.createTileCards().map((tile) => tile)}
                        </div>
                      `
                    : ""}
                  ${this.activeMenu === "heatmap"
                    ? html` <div id="heatmap-chart"></div> `
                    : ""}
                </div>
              </div>

              <!-- ************************** 7 day text *************************************** -->

              <div
                style="font-size: 2vh; margin-bottom:2vh;grid-area: daystext;"
              >
                produzione ultimi 7 giorni
              </div>

              <!-- ************************** info *************************************** -->
              <div style="grid-area: info;">
                <div class="home_info" style="height: 14vh;">
                  <div class="info_column">
                    <ha-icon
                      style="--mdc-icon-size: 5.5vh;"
                      icon="mdi:molecule-co2"
                      class="info_icon"
                    ></ha-icon>
                    ${c02 > 0
                      ? html` <div style="font-size:2vh;">${c02} kg</div> `
                      : html` <div style="width:25px;">${loader()}</div>`}
                    <div style="font-size:1.6vh;">co2 risparmiata</div>
                  </div>
                  <div
                    style="width: 2px; height: 80%; background-color: var(--divider-color);"
                  ></div>
                  <div class="info_column">
                    <ha-icon
                      style="--mdc-icon-size: 5.5vh;"
                      icon="mdi:piggy-bank"
                      class="info_icon"
                    ></ha-icon>
                    ${this.totalWekkPvProduction > 0
                      ? html`
                          <div style="font-size:2vh;">
                            ${this.totalWekkPvProduction} Kwh
                          </div>
                        `
                      : html` <div style="width:25px;">${loader()}</div>`}

                    <div style="font-size:1.6vh;">risparmio</div>
                  </div>
                  <div
                    style="width: 2px; height: 80%; background-color: var(--divider-color);"
                  ></div>
                  <div class="info_column">
                    <ha-icon
                      style="--mdc-icon-size: 5.5vh;"
                      icon="mdi:home"
                      class="info_icon"
                    ></ha-icon>
                    ${totalWeekKwhPercentage > 0
                      ? html`
                          <div style="font-size:2vh;">
                            ${totalWeekKwhPercentage.toFixed(1)}%
                          </div>
                        `
                      : html` <div style="width:25px;">${loader()}</div>`}

                    <div style="font-size:1.6vh;">autosufficienza</div>
                  </div>
                </div>
              </div>

              <!-- ******************* bottom menu ****************** -->
              <div class="bottom_bar_horizontal">
                <ha-icon
                  icon="mdi:chart-areaspline"
                  class="menu_icon_horizontal ${this.activeMenu === "home"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "home";
                    this._initializeChart(this.seriesData);
                  }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:chart-box-outline"
                  class="menu_icon_horizontal ${this.activeMenu === "chart"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "chart";
                    this.initializeApexChart(this.chartdata, "week-chart");
                  }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:view-grid-compact"
                  class="menu_icon_horizontal ${this.activeMenu === "heatmap"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "heatmap";
                    this.get_recorder_for_heatmap();
                    // this.initializeHeatmapChart();
                  }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:format-list-numbered"
                  class="menu_icon_horizontal ${this.activeMenu === "tile"
                    ? "menu_icon_on"
                    : ""}"
                  @click="${() => {
                    this.activeMenu = "tile";
                  }}"
                ></ha-icon>
              </div>
            </ha-card>
          `}
    `;
  }

  //   // ******************************* fine heatmap **********************

  private getNowTime() {
    this.startTime = new Date();
    this.endTime = new Date();
    this.startTime.setDate(this.endTime.getDate() - 7);
    this.startTime.setHours(23, 0, 0);
    this.endTime.setHours(23, 59, 59, 999);
  }

  protected async firstUpdated() {
    this.daysToEvaluate = this.config.days ? this.config.days : 7;
    this.getNowTime();

    // Ottieni latitudine e longitudine da Home Assistant
    const latitude = this.hass.config.latitude;
    const longitude = this.hass.config.longitude;
    if (latitude === undefined || longitude === undefined) {
      const now = new Date().getTime();
      return { min: now - 6 * 60 * 60 * 1000, max: now + 6 * 60 * 60 * 1000 }; // Valori di default
    }
    // Calcola alba e tramonto usando SunCalc
    const times = SunCalc.getTimes(new Date(), latitude, longitude);

    this.dawnTime = times.sunrise.getTime(); // Alba
    this.duskTime = times.sunset.getTime(); // Tramonto

    this.formatDataForWeekApexChart();

    this.panelMode = this.config.panel_mode ? this.config.panel_mode : false;
    this._applyDynamicStyles();
    const slider = this.shadowRoot?.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    if (slider) {
      requestAnimationFrame(() => this._updateLabelPosition(slider));
      this._updateLabelPosition(slider);
      const resizeObserver = new ResizeObserver(() => {
        this._updateLabelPosition(slider);
        this.requestUpdate();
      });
      resizeObserver.observe(slider.parentElement!);
    }

    this._fetchTodayData();

    if (this.config?.grid?.grid_meter && this.gridWeekTotal === null) {
      this.askForEntity(
        this.config.grid.grid_meter,
        8,
        this.config.grid?.unit_of_measurament
      ).then((gridAsk) => {
        this.gridWeek = gridAsk;
        this.gridWeekTotal = gridAsk.totale;
      });
    }

    if (this.config?.battery?.battery_meter) {
      this.askForEntity(
        this.config.battery.battery_meter,
        8,
        this.config.battery?.unit_of_measurament
      ).then((batteryAsk) => {
        this.batteryWeek = batteryAsk;
        this.batteryWeekTotal = batteryAsk.totale;
      });
    }
  }

  //   protected updated(changedProps: Map<string, any>) {
  //     super.updated(changedProps);

  //     if (!this.hass) return;

  //     // Lista delle entità da monitorare
  //     let entitiesToWatch: string[] = [];

  //     // Aggiungi `this.config.battery.power` se esiste
  //     if (this.config?.battery?.power) {
  //         entitiesToWatch.push(this.config.battery.power);
  //     }

  //     // Aggiungi `this.config.grid.grid_entity` se esiste
  //     if (this.config?.grid?.grid_entity) {
  //         entitiesToWatch.push(this.config.grid.grid_entity);
  //     }

  //     // Aggiungi tutte le entità contenute in `this.config.entities`
  //     if (this.config?.entities) {
  //         this.config.entities.forEach((entityConfig: any) => {
  //             if (entityConfig.pv) {
  //                 entitiesToWatch.push(entityConfig.pv);
  //             }
  //             if (entityConfig.sensor_meter) {
  //                 entitiesToWatch.push(entityConfig.sensor_meter);
  //             }
  //             if (entityConfig.more_elements && Array.isArray(entityConfig.more_elements)) {
  //                 entitiesToWatch.push(...entityConfig.more_elements);
  //             }
  //         });
  //     }

  //     // **1️⃣ Primo avvio: Se hass era undefined, esegui immediatamente handleEntityChange()**
  //     if (changedProps.has("hass") && !changedProps.get("hass")) {
  //         console.log("hass è ora disponibile, eseguo subito handleEntityChange()");
  //         this.initializeLines();
  //         return; // Evita di eseguire il controllo due volte
  //     }

  //     // **2️⃣ Controlla se una delle entità ha cambiato stato**
  //     let hasChanged = false;

  //     entitiesToWatch.forEach(entity => {
  //         if (changedProps.has("hass") && this.hass.states[entity] !== changedProps.get("hass")?.states[entity]) {
  //             hasChanged = true;
  //             console.log(`L'entità ${entity} è cambiata! Nuovo stato:`, this.hass.states[entity]?.state);
  //         }
  //     });

  //     // **3️⃣ Se una delle entità è cambiata, esegui una funzione**
  //     if (hasChanged) {
  //         this.initializeLines();
  //     }
  // }

  // initializeLines() {
  //   const linesSvg = this.shadowRoot.querySelector(
  //     ".lines-svg"
  //   ) as SVGSVGElement;
  //   if (!linesSvg) {
  //     return;
  //   }

  //   // Rimuovi tutte le linee esistenti
  //   while (linesSvg.firstChild) {
  //     linesSvg.removeChild(linesSvg.firstChild);
  //   }

  //   const photovoltaicTopElements = Array.from(
  //     this.shadowRoot.querySelectorAll(".element-svg.top")
  //   ) as SVGSVGElement[];
  //   const photovoltaicBottomElements = Array.from(
  //     this.shadowRoot.querySelectorAll(".element-svg.bottom")
  //   ) as SVGSVGElement[];

  //   const casaSvg = this.shadowRoot.querySelector(
  //     ".element-svg#casa"
  //   ) as SVGSVGElement;
  //   if (!casaSvg) {
  //     return;
  //   }

  //   const linesSvgRect = linesSvg.getBoundingClientRect();
  //   const casaRect = casaSvg.getBoundingClientRect();
  //   const casaX = casaRect.x - linesSvgRect.x;
  //   const casaY = casaRect.y - linesSvgRect.y;
  //   const casaWidth = casaRect.width;
  //   const casaHeight = casaRect.height;

  //   const casaCenterX = casaX + casaWidth / 2;

  //   const drawLines = (
  //     photovoltaicElements: SVGSVGElement[],
  //     isBottom: boolean
  //   ) => {
  //     if (photovoltaicElements.length === 0) return;

  //     const spacing = 10;
  //     const offsets = 10;

  //     const elementsWithCenter = photovoltaicElements.map((element) => {
  //       const rect = element.getBoundingClientRect();
  //       return {
  //         element,
  //         centerX: rect.x - linesSvgRect.x + rect.width / 2,
  //         rect,
  //       };
  //     });

  //     const perfectlyCenteredElement = elementsWithCenter.find(
  //       (item) => Math.abs(item.centerX - casaCenterX) < 1
  //     );

  //     const elementsLeft = elementsWithCenter
  //       .filter((item) => item.centerX < casaCenterX)
  //       .sort((a, b) => b.centerX - a.centerX);
  //     const elementsRight = elementsWithCenter
  //       .filter((item) => item.centerX > casaCenterX)
  //       .sort((a, b) => a.centerX - b.centerX);

  //     const casaLine3StartX =
  //       casaCenterX - ((photovoltaicElements.length - 1) * spacing) / 2;
  //     const casaPointsX = Array.from(
  //       { length: photovoltaicElements.length },
  //       (_, i) => casaLine3StartX + i * spacing
  //     );

  //     elementsWithCenter.forEach((item, index) => {
  //       const { element, rect, centerX } = item;
  //       const elementX = rect.x - linesSvgRect.x;
  //       const elementY = rect.y - linesSvgRect.y;
  //       const elementWidth = rect.width;
  //       const elementHeight = rect.height;

  //       const elementVerticalX = centerX;

  //       const isLeft = elementsLeft.some((left) => left.element === element);
  //       const isRight = elementsRight.some(
  //         (right) => right.element === element
  //       );

  //       const relativeIndex = isLeft
  //         ? elementsLeft.findIndex((left) => left.element === element)
  //         : elementsRight.findIndex((right) => right.element === element);

  //       let line1Length = 10;
  //       if (relativeIndex > 0) {
  //         line1Length += relativeIndex * offsets;
  //       }

  //       const line1StartY = isBottom ? elementY : elementY + elementHeight;
  //       const line1EndY = isBottom
  //         ? elementY - line1Length
  //         : elementY + elementHeight + line1Length;

  //       let lineColor = "red";
  //       if (
  //         (isLeft && item === elementsLeft[0]) ||
  //         (isRight && item === elementsRight[0])
  //       ) {
  //         lineColor = "green";
  //       }
  //       if (
  //         perfectlyCenteredElement &&
  //         perfectlyCenteredElement.element === element
  //       ) {
  //         lineColor = "blue";
  //       }

  //       const casaPointX = casaPointsX[index];
  //       const casaPointY = isBottom ? casaY + casaHeight : casaY;

  //       // Creazione di un unico path che unisce line1, line2 e line3
  //       let path;
  //       let d;

  //       // Definizione del filtro per l'effetto blur (spostata fuori dal ciclo)
  //       const createGlowFilter = () => {
  //         const existingDefs = linesSvg.querySelector("defs");
  //         if (existingDefs) return; // Evita di ridefinire il filtro se già esiste

  //         const defs = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "defs"
  //         );
  //         const filter = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "filter"
  //         );
  //         filter.setAttribute("id", "glow-blur");
  //         filter.setAttribute("x", "-50%");
  //         filter.setAttribute("y", "-50%");
  //         filter.setAttribute("width", "200%");
  //         filter.setAttribute("height", "200%");

  //         const feGaussianBlur = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "feGaussianBlur"
  //         );
  //         feGaussianBlur.setAttribute("in", "SourceGraphic");
  //         feGaussianBlur.setAttribute("stdDeviation", "1.5"); // Intensità del blur
  //         filter.appendChild(feGaussianBlur);

  //         defs.appendChild(filter);
  //         linesSvg.appendChild(defs);
  //       };

  //       createGlowFilter();

  // if (element.id === "grid-power-direct") {
  //   const homeTile = this.shadowRoot.querySelector(".element-svg#home_tile") as SVGSVGElement;
  //   if (!homeTile) {
  //       console.error("Home Tile SVG element not found.");
  //       return;
  //   }

  //   const homeTileRect = homeTile.getBoundingClientRect();
  //   const homeTileX = homeTileRect.x - linesSvgRect.x;
  //   const homeTileY = homeTileRect.y - linesSvgRect.y;
  //   const homeTileHeight = homeTileRect.height;

  //   const gridPowerX = elementX;
  //   const gridPowerCenterY = elementY + elementHeight / 2;

  //   const homeTileXEnd = homeTileX + homeTileRect.width;
  //   const homeTileCenterY = homeTileY + homeTileHeight / 2;

  //   // Linea statica verso home
  //   const staticLineHome = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //   staticLineHome.setAttribute("x1", gridPowerX.toString());
  //   staticLineHome.setAttribute("y1", gridPowerCenterY.toString());
  //   staticLineHome.setAttribute("x2", homeTileXEnd.toString());
  //   staticLineHome.setAttribute("y2", homeTileCenterY.toString());
  //   staticLineHome.setAttribute("stroke", "#999");
  //   staticLineHome.setAttribute("stroke-width", "2");
  //   staticLineHome.setAttribute("stroke-dasharray", "7,5");
  //   staticLineHome.setAttribute("stroke-linecap", "round");
  //   linesSvg.appendChild(staticLineHome);

  //         // Glow line se il valore è maggiore di 0
  //         const stateValue = parseFloat(element.getAttribute("value") || "0");
  //         if (stateValue > 0) {
  //             const glowLineHome = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //             glowLineHome.setAttribute("x1", gridPowerX.toString());
  //             glowLineHome.setAttribute("y1", gridPowerCenterY.toString());
  //             glowLineHome.setAttribute("x2", homeTileXEnd.toString());
  //             glowLineHome.setAttribute("y2", homeTileCenterY.toString());
  //             glowLineHome.setAttribute("stroke", "rgba(0, 191, 255, 0.8)");
  //             glowLineHome.setAttribute("stroke-width", "4");
  //             glowLineHome.setAttribute("stroke-dasharray", "10,15");
  //             glowLineHome.setAttribute("stroke-linecap", "round");
  //             const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  //             animate.setAttribute("attributeName", "stroke-dashoffset");
  //             animate.setAttribute("from", "50");
  //             animate.setAttribute("to", "0");
  //             animate.setAttribute("dur", "2s");
  //             animate.setAttribute("repeatCount", "indefinite");
  //             glowLineHome.appendChild(animate);
  //             linesSvg.appendChild(glowLineHome);
  //         }

  //         // Se è configurata la vendita di energia, collegare anche a casa
  //         if (this.config.grid.energy_sell) {
  //             const casaTile = this.shadowRoot.querySelector(".element-svg#casa") as SVGSVGElement;
  //             if (casaTile) {
  //                 const casaRect = casaTile.getBoundingClientRect();
  //                 const casaX = casaRect.x - linesSvgRect.x;
  //                 const casaY = casaRect.y - linesSvgRect.y;
  //                 const casaHeight = casaRect.height;
  //                 const casaCenterY = casaY + casaHeight / 2;

  //                 const staticLineCasa = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //                 staticLineCasa.setAttribute("x1", gridPowerX.toString());
  //                 staticLineCasa.setAttribute("y1", gridPowerCenterY.toString());
  //                 staticLineCasa.setAttribute("x2", casaX.toString());
  //                 staticLineCasa.setAttribute("y2", casaCenterY.toString());
  //                 staticLineCasa.setAttribute("stroke", "#999");
  //                 staticLineCasa.setAttribute("stroke-width", "2");
  //                 staticLineCasa.setAttribute("stroke-dasharray", "7,5");
  //                 staticLineCasa.setAttribute("stroke-linecap", "round");
  //                 linesSvg.appendChild(staticLineCasa);

  //                 const energySellState = parseFloat(this.hass.states[this.config.grid.energy_sell]?.state || "0");
  //                 if (energySellState > 0) {
  //                     const glowLineCasa = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //                     glowLineCasa.setAttribute("x1", gridPowerX.toString());
  //                     glowLineCasa.setAttribute("y1", gridPowerCenterY.toString());
  //                     glowLineCasa.setAttribute("x2", casaX.toString());
  //                     glowLineCasa.setAttribute("y2", casaCenterY.toString());
  //                     glowLineCasa.setAttribute("stroke", "rgba(0, 191, 255, 0.8)");
  //                     glowLineCasa.setAttribute("stroke-width", "4");
  //                     glowLineCasa.setAttribute("stroke-dasharray", "10,15");
  //                     glowLineCasa.setAttribute("stroke-linecap", "round");
  //                     const animateCasa = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  //                     animateCasa.setAttribute("attributeName", "stroke-dashoffset");
  //                     animateCasa.setAttribute("from", "50");
  //                     animateCasa.setAttribute("to", "0");
  //                     animateCasa.setAttribute("dur", "2s");
  //                     animateCasa.setAttribute("repeatCount", "indefinite");
  //                     glowLineCasa.appendChild(animateCasa);
  //                     linesSvg.appendChild(glowLineCasa);
  //                 }
  //             }
  //         }
  //     } else {
  //         // Logica originale per disegnare line1, line2 e line3
  //         const casaPointX = casaPointsX[index];
  //         const casaPointY = isBottom ? casaY + casaHeight : casaY;

  //         d =
  //           `M ${elementVerticalX} ${line1StartY} ` + // Inizio di line1
  //           `L ${elementVerticalX} ${line1EndY} ` + // Fine di line1
  //           `L ${casaPointX} ${line1EndY} ` + // Line2 orizzontale
  //           `L ${casaPointX} ${casaPointY}`; // Line3 verticale

  //         // Linea statica tratteggiata
  //         const staticLine = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "path"
  //         );
  //         staticLine.setAttribute("d", d);
  //         staticLine.setAttribute("stroke", "#999"); // Colore della linea statica
  //         staticLine.setAttribute("stroke-width", "2");
  //         staticLine.setAttribute("fill", "none");
  //         staticLine.setAttribute("stroke-dasharray", "7,5"); // Tratteggio
  //         staticLine.setAttribute("stroke-linecap", "round"); // Bordi arrotondati
  //         linesSvg.appendChild(staticLine);
  //       }

  //       // Linea dinamica per l'effetto bagliore
  //       const glowLine = document.createElementNS(
  //         "http://www.w3.org/2000/svg",
  //         "path"
  //       );
  //       glowLine.setAttribute("d", d);

  //       // Applica il filtro blur al glowLine
  //       // glowLine.setAttribute('filter', 'url(#glow-blur)');

  //       // Controlla l'id per configurare il colore
  //       if (element.id === "grid-power") {
  //         glowLine.setAttribute("stroke", "rgba(0, 191, 255, 0.6)"); // Colore azzurro
  //       } else {
  //         glowLine.setAttribute("stroke", "rgba(0, 255, 0, 0.6)"); // Colore verde per default
  //       }

  //       glowLine.setAttribute("stroke-width", "4");
  //       glowLine.setAttribute("fill", "none");
  //       glowLine.setAttribute("stroke-dasharray", "10,40"); // Configura tratteggio per il bagliore
  //       glowLine.setAttribute("stroke-linecap", "round"); // Bordi arrotondati

  //       // Recupera il valore dell'attributo "value"
  //       const stateValue = parseFloat(element.getAttribute("value") || "0");

  //       // Logica per gli elementi
  //       if (element.id === "battery") {
  //         // const stateValue = parseFloat(this.config?.battery?.power || "0");
  //         if (stateValue > 0) {
  //           // Direzione inversa per battery con value > 0
  //           const animate = document.createElementNS(
  //             "http://www.w3.org/2000/svg",
  //             "animate"
  //           );
  //           animate.setAttribute("attributeName", "stroke-dashoffset");
  //           animate.setAttribute("from", "50"); // Direzione inversa
  //           animate.setAttribute("to", "0");
  //           animate.setAttribute("dur", "1s");
  //           animate.setAttribute("repeatCount", "indefinite");
  //           glowLine.appendChild(animate);
  //           linesSvg.appendChild(glowLine);
  //         } else if (stateValue < 0) {
  //           // Direzione normale per battery con value < 0
  //           const animate = document.createElementNS(
  //             "http://www.w3.org/2000/svg",
  //             "animate"
  //           );
  //           animate.setAttribute("attributeName", "stroke-dashoffset");
  //           animate.setAttribute("from", "0"); // Direzione normale
  //           animate.setAttribute("to", "50");
  //           animate.setAttribute("dur", "1s");
  //           animate.setAttribute("repeatCount", "indefinite");
  //           glowLine.appendChild(animate);
  //           linesSvg.appendChild(glowLine);
  //         } else {
  //           // Non aggiungere il glowLine se stateValue == 0
  //           console.log(
  //             `GlowLine nascosto per elemento con id "battery" e stateValue = 0`
  //           );
  //         }
  //       } else if (element.id === "pv-element" || element.id === "grid-power") {
  //         // Direzione inversa per pv-element e grid-power
  //         const animate = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "animate"
  //         );
  //         animate.setAttribute("attributeName", "stroke-dashoffset");
  //         animate.setAttribute("from", "50"); // Direzione inversa
  //         animate.setAttribute("to", "0");
  //         animate.setAttribute("dur", "1s");
  //         animate.setAttribute("repeatCount", "indefinite");
  //         glowLine.appendChild(animate);
  //         linesSvg.appendChild(glowLine);
  //       } else if (stateValue > 0) {
  //         // Altri elementi con stateValue > 0
  //         const animate = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "animate"
  //         );
  //         animate.setAttribute("attributeName", "stroke-dashoffset");
  //         animate.setAttribute("from", "0"); // Direzione normale
  //         animate.setAttribute("to", "50");
  //         animate.setAttribute("dur", "1s");
  //         animate.setAttribute("repeatCount", "indefinite");
  //         glowLine.appendChild(animate);
  //         linesSvg.appendChild(glowLine);
  //       }
  //     });
  //   };

  //   drawLines(photovoltaicTopElements, false);
  //   drawLines(photovoltaicBottomElements, true);
  // }

  initializeLines() {
    const linesSvg = this.shadowRoot.querySelector(".lines-svg");
    if (!linesSvg) return;

    // Svuota linesSvg velocemente
    linesSvg.innerHTML = "";

    const photovoltaicTopElements = Array.from(
      this.shadowRoot.querySelectorAll(".element-svg.top")
    );
    const photovoltaicBottomElements = Array.from(
      this.shadowRoot.querySelectorAll(".element-svg.bottom")
    );
    const casaSvg = this.shadowRoot.querySelector(".element-svg#casa");
    if (!casaSvg) return;

    const linesSvgRect = linesSvg.getBoundingClientRect();
    const casaRect = casaSvg.getBoundingClientRect();
    const casaX = casaRect.x - linesSvgRect.x;
    const casaY = casaRect.y - linesSvgRect.y;
    const casaWidth = casaRect.width;
    const casaHeight = casaRect.height;
    const casaCenterX = casaX + casaWidth / 2;

    this.createGlowFilter(linesSvg);

    const drawLines = (photovoltaicElements, isBottom) => {
      if (photovoltaicElements.length === 0) return;

      const spacing = 10;
      const offsets = 10;

      const elementsWithCenter = photovoltaicElements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          centerX: rect.x - linesSvgRect.x + rect.width / 2,
          rect,
        };
      });

      const elementsLeft = elementsWithCenter
        .filter((item) => item.centerX < casaCenterX)
        .sort((a, b) => b.centerX - a.centerX);
      const elementsRight = elementsWithCenter
        .filter((item) => item.centerX > casaCenterX)
        .sort((a, b) => a.centerX - b.centerX);

      const casaLineStartX =
        casaCenterX - ((photovoltaicElements.length - 1) * spacing) / 2;
      const casaPointsX = Array.from(
        { length: photovoltaicElements.length },
        (_, i) => casaLineStartX + i * spacing
      );

      const fragment = document.createDocumentFragment();

      elementsWithCenter.forEach((item, index) => {
        const { element, rect, centerX } = item;
        const elementVerticalX = centerX;
        const isLeft = elementsLeft.includes(item);
        const isRight = elementsRight.includes(item);
        const elementX = rect.x - linesSvgRect.x;
        const elementY = rect.y - linesSvgRect.y;
        const elementHeight = rect.height;
        const relativeIndex = isLeft
          ? elementsLeft.findIndex((left) => left === item)
          : elementsRight.findIndex((right) => right === item);

        let line1Length = 10;
        if (relativeIndex > 0) {
          line1Length += relativeIndex * offsets;
        }

        const line1StartY = isBottom
          ? rect.y - linesSvgRect.y
          : rect.y + rect.height - linesSvgRect.y;
        const line1EndY = isBottom
          ? line1StartY - line1Length
          : line1StartY + line1Length;
        const casaPointX = casaPointsX[index];
        const casaPointY = isBottom ? casaY + casaHeight : casaY;
        const stateValue = parseFloat(element.getAttribute("value") || "0");

        const d = `M ${elementVerticalX} ${line1StartY} L ${elementVerticalX} ${line1EndY} L ${casaPointX} ${line1EndY} L ${casaPointX} ${casaPointY}`;

        if (
          !this.config?.grid?.hide_energy_line
        ) {
          const staticLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          staticLine.setAttribute("d", d);
          staticLine.setAttribute("stroke", "#999");
          staticLine.setAttribute("stroke-width", "2");
          staticLine.setAttribute("fill", "none");
          staticLine.setAttribute("stroke-dasharray", "7,5");
          staticLine.setAttribute("stroke-linecap", "round");
          fragment.appendChild(staticLine);
        }

        
        if (element.id === "grid-power-direct") {
       
          if (this.gridEnergyState == "sell") {
            const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
            glowLine.setAttribute("d", d);
            glowLine.setAttribute("stroke", "rgba(0, 255, 0, 0.6)");
            glowLine.setAttribute("stroke-width", "4");
            glowLine.setAttribute("fill", "none");
            glowLine.setAttribute("stroke-dasharray", "10,40");
            glowLine.setAttribute("stroke-linecap", "round");
        
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "0");
            animate.setAttribute("to", "50");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            fragment.appendChild(glowLine);
          }
        
          const homeTile = this.shadowRoot.querySelector(".element-svg#home_tile") as SVGSVGElement;
          if (!homeTile) {
            console.error("Home Tile SVG element not found.");
            return;
          }
        
          const homeTileRect = homeTile.getBoundingClientRect();
          const homeTileX = homeTileRect.x - linesSvgRect.x;
          const homeTileY = homeTileRect.y - linesSvgRect.y;
          const homeTileHeight = homeTileRect.height;
        
          const gridPowerX = elementX;
          const gridPowerCenterY = elementY + elementHeight / 2;
        
          const homeTileXEnd = homeTileX + homeTileRect.width;
          const homeTileCenterY = homeTileY + homeTileHeight / 2;
        
          // Linea statica verso home
          const staticLineHome = document.createElementNS("http://www.w3.org/2000/svg", "line");
          staticLineHome.setAttribute("x1", gridPowerX.toString());
          staticLineHome.setAttribute("y1", gridPowerCenterY.toString());
          staticLineHome.setAttribute("x2", homeTileXEnd.toString());
          staticLineHome.setAttribute("y2", homeTileCenterY.toString());
          staticLineHome.setAttribute("stroke", "#999");
          staticLineHome.setAttribute("stroke-width", "2");
          staticLineHome.setAttribute("stroke-dasharray", "7,5");
          staticLineHome.setAttribute("stroke-linecap", "round");
          linesSvg.appendChild(staticLineHome);
        
          if (this.gridEnergyState == "buy") {
            const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            glowLine.setAttribute("x1", gridPowerX.toString());
            glowLine.setAttribute("y1", gridPowerCenterY.toString());
            glowLine.setAttribute("x2", homeTileXEnd.toString());
            glowLine.setAttribute("y2", homeTileCenterY.toString());
            glowLine.setAttribute("stroke", "rgba(0, 191, 255, 0.8)");
            glowLine.setAttribute("stroke-width", "4");
            glowLine.setAttribute("stroke-dasharray", "10,15");
            glowLine.setAttribute("stroke-linecap", "round");
        
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "50");
            animate.setAttribute("to", "0");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
        
            linesSvg.appendChild(glowLine);
          }
        }
        

        if (element.id === "pv-element" && stateValue > 0) {
          const glowLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          glowLine.setAttribute("d", d);
          glowLine.setAttribute("stroke", "rgba(255, 255, 0, 0.6)");
          glowLine.setAttribute("stroke-width", "4");
          glowLine.setAttribute("fill", "none");
          glowLine.setAttribute("stroke-dasharray", "10,40");
          glowLine.setAttribute("stroke-linecap", "round");

          const animate = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animate"
          );
          animate.setAttribute("attributeName", "stroke-dashoffset");
          animate.setAttribute("from", "50");
          animate.setAttribute("to", "0");
          animate.setAttribute("dur", "2s");
          animate.setAttribute("repeatCount", "indefinite");
          glowLine.appendChild(animate);
          fragment.appendChild(glowLine);
        }
        if (element.id === "home_tile" && stateValue > 0) {
          const glowLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          glowLine.setAttribute("d", d);
          glowLine.setAttribute("stroke", "rgba(255, 255, 0, 0.6)");
          glowLine.setAttribute("stroke-width", "4");
          glowLine.setAttribute("fill", "none");
          glowLine.setAttribute("stroke-dasharray", "10,40");
          glowLine.setAttribute("stroke-linecap", "round");

          const animate = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animate"
          );
          animate.setAttribute("attributeName", "stroke-dashoffset");
          animate.setAttribute("from", "0");
          animate.setAttribute("to", "50");
          animate.setAttribute("dur", "2s");
          animate.setAttribute("repeatCount", "indefinite");
          glowLine.appendChild(animate);
          fragment.appendChild(glowLine);
        }
        if (element.id === "battery" && stateValue != 0) {
          const glowLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          glowLine.setAttribute("d", d);
          glowLine.setAttribute("stroke", "rgba(255, 255, 0, 0.6)");
          glowLine.setAttribute("stroke-width", "4");
          glowLine.setAttribute("fill", "none");
          glowLine.setAttribute("stroke-dasharray", "10,40");
          glowLine.setAttribute("stroke-linecap", "round");

          if (this.batterMode == "discharge") {
            const animate = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "animate"
            );
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "0");
            animate.setAttribute("to", "50");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            fragment.appendChild(glowLine);
          } else if (this.batterMode == "charge") {
            const animate = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "animate"
            );
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "50");
            animate.setAttribute("to", "0");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            fragment.appendChild(glowLine);
          }
        }
      });

      linesSvg.appendChild(fragment);
    };

    drawLines(photovoltaicTopElements, false);
    drawLines(photovoltaicBottomElements, true);
  }

  createGlowFilter(linesSvg) {
    if (linesSvg.querySelector("#glow-blur")) return;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", "glow-blur");
    const feGaussianBlur = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feGaussianBlur"
    );
    feGaussianBlur.setAttribute("in", "SourceGraphic");
    feGaussianBlur.setAttribute("stdDeviation", "1.5");
    filter.appendChild(feGaussianBlur);
    defs.appendChild(filter);
    linesSvg.appendChild(defs);
  }

  getLineColor(element) {
    return element.id === "grid-power"
      ? "rgba(0, 191, 255, 0.6)"
      : "rgba(0, 255, 0, 0.6)";
  }

  createGlowAnimation(glowLine, from, to) {
    const animate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", from);
    animate.setAttribute("to", to);
    animate.setAttribute("dur", "1s");
    animate.setAttribute("repeatCount", "indefinite");
    glowLine.appendChild(animate);
  }

  private _applyDynamicStyles() {
    const verticalCard = this.isVericarlCard();
    const panelMode = this.isPanelMode();
    const cardHeight = Math.round(this.getBoundingClientRect().height);
    this.sliderHeight = !verticalCard && panelMode ? cardHeight / 31.8 : 30;
    const currentTheme = this.hass.themes?.darkMode; // Verifica se il tema è scuro
    const shadowDark_dark = "rgba(0, 0, 0, 0.3)";
    const shadowLight_dark = "rgba(255, 255, 255, 0.1)";
    const shadowDark_light = "rgba(0, 0, 0, 0.15)";
    const shadowLight_light = "rgba(125, 125, 125, 0.1)";

    // const heightValue = !verticalCard && panelMode ? '36px' : '30px';
    // console.log("heightValue", this.sliderHeight);

    const darkThemeStyles = `
  input[type='range'] {
    background-color: transparent;
    box-shadow: 
      6px 6px 6px ${shadowDark_dark} inset, 
      -4px -4px 6px ${shadowLight_dark} inset;
    display: block;
    // padding: 0 1.6px;
    width: 100%;
    height: ${this.sliderHeight}px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 500px;
  }
`;

    const lightThemeStyles = `
  input[type='range'] {
    background-color: transparent;
    box-shadow: 
      6px 6px 6px ${shadowLight_light} inset, 
      -4px -4px 6px ${shadowDark_light} inset;
    display: block;
    // padding: 0 1.6px;
    width: 100%;
    height: ${this.sliderHeight}px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 500px;
  }

    `;

    const sliderHeightVertical = `
      input[type="range"]::-webkit-slider-thumb {
      width: 24px;
      height: 24px;
      } 
    `;
    const sliderHeightHorizontal = `
      input[type="range"]::-webkit-slider-thumb {
      width: ${this.sliderHeight}px;
      height: ${this.sliderHeight}px;
      } 
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = currentTheme ? darkThemeStyles : lightThemeStyles;
    styleSheet.innerHTML +=
      !verticalCard && panelMode
        ? sliderHeightHorizontal
        : sliderHeightVertical;
    this.shadowRoot?.appendChild(styleSheet);
  }

  private _updateLabelPosition(slider: HTMLInputElement) {
    let offsetValue;
    if (this.panelMode) {
      offsetValue = 0.2;
    } else {
      offsetValue = 1;
    }
    const label = this.shadowRoot?.querySelector(
      ".range-thumb-label"
    ) as HTMLElement;
    if (!label || !slider) return;
    const altezza = label.clientHeight;
    const sliderWidth = slider.offsetWidth;

    const thumbWidth = this.sliderHeight; // Larghezza del thumb in px (aggiorna se diversa)
    const min = parseInt(slider.min, 10);
    const max = parseInt(slider.max, 10);
    const percentage = ((+slider.value - min) / (max - min)) * 100;

    // Calcola la posizione del label in px
    const labelPosition =
      (percentage / 100) * (sliderWidth - thumbWidth) + thumbWidth / 2;

    // Aggiorna lo stile del label per posizionarlo correttamente sopra il thumb
    label.style.left = `${labelPosition}px`;
    // console.log("position", labelPosition);
  }

  private _addTicks() {
    // Seleziona lo slider
    const slider = this.shadowRoot?.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    if (!slider) {
      // console.error('Slider element not found');
      return;
    }

    // Rimuove eventuali tick esistenti
    let tickContainer = this.shadowRoot?.querySelector(
      ".range__ticks"
    ) as HTMLElement;
    if (tickContainer) {
      tickContainer.remove();
    }

    // Crea un nuovo contenitore per i tick
    tickContainer = document.createElement("div");

    tickContainer.className = "range__ticks";
    slider.parentElement?.appendChild(tickContainer);

    // Configura intervalli e tick
    const min = parseInt(slider.min, 10) || 1; // Inizia da 1
    const max = parseInt(slider.max, 10) || 30; // Termina a 30
    const step = 5; // Intervallo dei tick (multipli di 5)

    // Aggiunge il tick iniziale (1)
    const tickStart = document.createElement("span");
    tickStart.className = "range__tick";
    tickStart.textContent = min.toString();
    // tickStart.style.position = "absolute";
    tickStart.style.left = "0%"; // Il primo tick è sempre all'inizio (0%)
    tickContainer.appendChild(tickStart);

    // Aggiunge i tick successivi (multipli di 5 fino a 30)
    for (let i = step; i <= max; i += step) {
      const tick = document.createElement("span");
      tick.className = "range__tick";
      tick.textContent = i.toString();
      tick.style.position = "absolute";
      tick.style.left = `${((i - min) / (max - min)) * 100}%`; // Calcola la posizione relativa in %
      tickContainer.appendChild(tick);
    }
  }

  private _onSliderInput(event: Event) {
    const slider = event.target as HTMLInputElement;
    this._interval = parseInt(slider.value, 10);
    // Aggiorna la posizione della label
    this._updateLabelPosition(slider);

    if (this._debounceFetchHistory) {
      clearTimeout(this._debounceFetchHistory);
    }
  }

  private _atSliderChange(event: Event) {
    const slider = event.target as HTMLInputElement;
    this._interval = parseInt(slider.value, 10);
    // Salva il valore dello slider nel localStorage
    if (this.config?.id) {
      const sliderKey = `slider_value_${this.config.id}`;
      localStorage.setItem(sliderKey, slider.value);
    } else {
      console.warn("Unable to save slider value: no config.id found.");
    }

    // Debounce per ridurre chiamate e aggiornare i dati
    this._debounceFetchHistory = window.setTimeout(() => {
      this._fetchTodayData();
    }, 300);
  }

  private async _fetchTodayData() {
    const entities = this.config.entities.map(
      (item: { pv: string; max_power: number; unit_of_mesurament: string }) =>
        item
    );

    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Inizio del giorno corrente
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999); // Fine del giorno corrente

    const seriesData: { name: string; data: { x: number; y: number }[] }[] = [];

    try {
      for (const entity of entities) {
          const { pv: entityId } = entity;

          // Recupera l'unità di misura da Home Assistant se disponibile
          const entityState = this.hass.states[entityId];
          const unit_of_maesurament =
              entityState?.attributes?.unit_of_measurement ||
              entity.unit_of_maesurament ||
              "w";

          const response = await this.hass.callApi(
              "GET",
              `history/period/${startTime.toISOString()}?filter_entity_id=${entityId}&end_time=${endTime.toISOString()}`
          );

        const historyData = response[0] || [];
        const chartData = historyData
          .map((entry: any) => {
            const rawValue = parseFloat(entry.state);
            const value =
              ["watt", "w"].includes(unit_of_maesurament.toLowerCase())
                  ? rawValue / 1000
                  : rawValue;
            return {
              x: new Date(entry.last_updated).getTime(),
              y: value,
            };
          })
          .filter(
            (point: { x: number; y: number }) =>
              point.y !== null && !isNaN(point.y)
          );

        const friendlyName =
          this.hass.states[entityId]?.attributes?.friendly_name;
        seriesData.push({
          name: friendlyName || entityId,
          data: chartData,
        });
      }

      this.seriesData = seriesData;
      this._initializeChart(this.seriesData); // Inizializza il primo grafico con i dati di oggi
    } catch (error) {
      console.error("Errore durante il recupero dei dati di oggi:", error);
    }
  }

  private calculateGraphSpan(): { min: number; max: number } {
    // Sottrai un'ora all'alba e aggiungi un'ora al tramonto
    const min = new Date(this.dawnTime - 60 * 60 * 1000).setMinutes(0, 0, 0); // Ora intera prima dell'alba
    const max = new Date(this.duskTime + 60 * 60 * 1000).setMinutes(0, 0, 0); // Ora intera dopo il tramonto

    return { min, max };
  }

  private async _initializeChart(
    series: { name: string; data: { x: number; y: number }[] }[]
  ) {
    const ApexCharts = await this._getApexCharts();
    const graphSpan = this.calculateGraphSpan();
    const intervalMs = this._interval * 60 * 1000;
    const allTimestamps = series.flatMap((serie) =>
      serie.data.map((point) => point.x)
    );
    const minTimestamp = Math.min(...allTimestamps);
    const maxTimestamp = Math.max(...allTimestamps);

    const groupedSeries = series.map((serie) => ({
      name: serie.name,
      data: this._groupByNearest(
        serie.data,
        intervalMs,
        minTimestamp,
        maxTimestamp
      ).filter(
        (point) => point.y !== null && point.y !== undefined && !isNaN(point.y)
      ),
    }));

    const slider = this.shadowRoot?.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    if (slider) {
      this._updateLabelPosition(slider); // Aggiorna la posizione dell'etichetta
    }

    if (this.config.grafic_forcast?.forcast) {
      const forecastEntity =
        this.hass.states[this.config.grafic_forcast.forcast];

      if (forecastEntity && forecastEntity.attributes.detailedForecast) {
        const detailedForecast = forecastEntity.attributes.detailedForecast;

        groupedSeries.push(
          {
            name: "Stima media",
            data: detailedForecast
              .filter((item: any) => {
                const estimate = item.pv_estimate;
                return (
                  typeof estimate === "number" &&
                  !isNaN(estimate) &&
                  estimate !== 0
                );
              })
              .map((item: any) => ({
                x: new Date(item.period_start).getTime(),
                y: item.pv_estimate,
              })),
            type: "line",
            color: "rgba(0, 0, 255, 1)",
          } as any,
          {
            name: "min - max",
            data: detailedForecast
              .filter((item: any) => {
                const min = item.pv_estimate10;
                const max = item.pv_estimate90;
                return (
                  typeof min === "number" &&
                  typeof max === "number" &&
                  !isNaN(min) &&
                  !isNaN(max) &&
                  (min !== 0 || max !== 0)
                );
              })
              .map((item: any) => ({
                x: new Date(item.period_start).getTime(),
                y: [item.pv_estimate10, item.pv_estimate90],
              })),
            type: "rangeArea",
            color: "rgba(0, 255, 0, 0.6)",
          } as any
        );
      }
    }

    const summedData = groupedSeries
      .filter(
        (serie) =>
          !["Stima media", "Intervallo (min - max)"].includes(serie.name)
      ) // Esclude le serie previsionali
      .reduce(
        (acc, serie) => {
          serie.data.forEach((point, index) => {
            if (!acc[index]) {
              acc[index] = { x: point.x, y: 0 };
            }
            acc[index].y += point.y ?? 0;
          });
          return acc;
        },
        [] as { x: number; y: number }[]
      );

    groupedSeries.push({
      name: "Somma Totale",
      data: summedData,
      type: "area",
      color: "red",
    } as any);

    const chartContainer = this.shadowRoot?.getElementById("chart");
    if (chartContainer) {
      if (this.chart) {
        this.chart.destroy();
      }

      const options = {
        fill: {
          type: "gradient",
          gradient: {
            // shade: 'light',
            type: "vertical",
            // shadeIntensity: 0.5,
            // gradientToColors: [ '#FDD835'], // optional, if not defined - uses the shades of same color in series
            inverseColors: false,
            opacityFrom: 0.2,
            opacityTo: 0.6,
            stops: [0, 100],
            // colorStops: []
          },
        },
        chart: {
          type: "rangeArea",
          height: this.chartHeight,
          zoom: { enabled: true, type: "x" },
          toolbar: { show: true },
        },
        series: groupedSeries,
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          min: graphSpan.min,
          max: graphSpan.max,
          tooltip: {
            enabled: false, // Disattiva il tooltip separato per l'asse X
          },
          labels: {
            formatter: (value: number) => {
              const date = new Date(value);
              return `${date.getHours().toString().padStart(2, "0")}:00`;
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number | null | undefined) => {
              if (typeof value !== "number" || isNaN(value)) {
                return "";
              }
              return value.toFixed(1);
            },
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          theme: "dark",
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const timestamp = w.globals.seriesX[seriesIndex][dataPointIndex];
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString("it-IT", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            let tooltipHtml = `<div><strong>${formattedDate}</strong></div>`;
            series.forEach((value, idx) => {
              const dataValue = value[dataPointIndex];
              if (dataValue !== undefined && !isNaN(dataValue)) {
                const seriesName = w.globals.seriesNames[idx];
                tooltipHtml += `<div>${seriesName}: ${dataValue.toFixed(1)} kW</div>`;
              }
            });

            return tooltipHtml;
          },
        },
        grid: {
          show: true,
          borderColor: "var(--divider-color)", // '#FF5733', // Cambia il colore delle linee tratteggiate
          strokeDashArray: 4, // Lunghezza dei trattini
        },
        stroke: {
          width: 2,
          // curve: 'smooth',
          curve: "straight",
        },
        legend: {
          show: true,
          custom: true,
          formatter: function (seriesName, opts) {
            // Ottiene il colore della serie dall'indice della serie
            const seriesColor = opts.w.globals.colors[opts.seriesIndex];

            return `
              <button class="custom-legend-btn" style="border: 2px solid ${seriesColor};">
                ${seriesName}
              </button>
            `;
          },
        },
      };

      this.chart = new ApexCharts(chartContainer, options);
      this.chart.render().then(() => {
        this.config.entities.forEach((entity: { pv: string }) => {
          const friendlyName =
            this.hass.states[entity.pv]?.attributes?.friendly_name || entity.pv;
          this.chart.hideSeries(friendlyName); // Usa direttamente il friendlyName o l'entityId
        });
      });
    }
    this._addTicks();
  }

  private _groupByNearest(
    data: { x: number; y: number }[],
    intervalMs: number,
    startTime: number,
    endTime: number
  ) {
    const groupedData: { x: number; y: number }[] = [];
    let currentInterval = startTime;

    while (currentInterval <= endTime) {
      let closestPoint: { x: number; y: number } | null = null;
      let minDistance = Infinity;

      data.forEach((point) => {
        const distance = Math.abs(point.x - currentInterval);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      });

      if (closestPoint) {
        groupedData.push({ x: currentInterval, y: closestPoint.y });
      } else {
        groupedData.push({ x: currentInterval, y: null });
      }

      currentInterval += intervalMs;
    }

    return groupedData;
  }

  // ************************* NUOVO GRAFICO Daily *****************************
  formatDataForWeekApexChart() {
    const weekEntities = this.config.entities.map(
      (entry) => entry.sensor_meter
    );
    const now = new Date();
    const startTime = new Date();
    startTime.setDate(now.getDate() - this.daysToEvaluate);
    startTime.setHours(23, 0, 0);

    const fetchAllData = () => {
      if (weekEntities.length === 0) {
        console.log("Nessuna entità da interrogare");
        return Promise.resolve({});
      }
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: weekEntities,
        period: "day",
        start_time: startTime.toISOString(),
        types: ["sum"],
      });
    };

    const fetchTotalPvMeter = () => {
      if (!this.config.total_pv_power) {
        return Promise.resolve(null);
      }
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: [this.config.total_pv_power],
        period: "day",
        start_time: startTime.toISOString(),
        types: ["sum"],
      });
    };

    return Promise.all([fetchAllData(), fetchTotalPvMeter()])
      .then(([recorderResponse, totalPvPowerResponse]) => {
        const formattedData = weekEntities.map((sensorId) => {
          const sensorValues = recorderResponse[sensorId] || [];
          const unit = this.hass.states[sensorId]?.attributes?.unit_of_measurement || "";
          const needsConversion = unit.toLowerCase() === "w";

          if (sensorValues.length < 2) {
            console.warn(
              `Dati insufficienti per ${sensorId}, impossibile rimuovere il valore iniziale.`
            );
            return {
              name: sensorId,
              data: [],
            };
          }

          let previousSum = sensorValues[0].sum;
          return {
            name:
              this.hass.states[sensorId]?.attributes?.friendly_name || sensorId,
            data: sensorValues.slice(1).map((entry) => {
              let dailyValue = entry.sum - previousSum;
              if (needsConversion) {
                dailyValue /= 1000; // Converti da W a kW
              }
              previousSum = entry.sum;
              return {
                x: new Date(entry.start).getTime(),
                y: dailyValue,
              };
            }),
          };
        });

        let series = formattedData;
        if (weekEntities.length > 1) {
          let totalSeries = {
            name: "totale",
            data: [],
          };

          if (this.config.total_pv_power && totalPvPowerResponse) {
            const totalData =
              totalPvPowerResponse[this.config.total_pv_power] || [];

            if (totalData.length < 2) {
              console.warn(
                `Dati insufficienti per ${this.config.total_pv_power}, impossibile rimuovere il valore iniziale.`
              );
            } else {
              let previousSum = totalData[0].sum;
              const unit = this.hass.states[this.config.total_pv_power]?.attributes?.unit_of_measurement || "";
              const needsConversion = unit.toLowerCase() === "w";
              totalSeries = {
                name:
                  this.hass.states[this.config.total_pv_power]?.attributes
                    ?.friendly_name || this.config.total_pv_power,
                data: totalData.slice(1).map((entry) => {
                  let dailyValue = entry.sum - previousSum;
                  if (needsConversion) {
                    dailyValue /= 1000;
                  }
                  previousSum = entry.sum;
                  return {
                    x: new Date(entry.start).getTime(),
                    y: dailyValue,
                  };
                }),
              };
            }
          } else {
            const daysCount =
              formattedData.length > 0 ? formattedData[0].data.length : 0;
            for (let i = 0; i < daysCount; i++) {
              let sum = 0;
              formattedData.forEach((series) => {
                sum += series.data[i]?.y || 0;
              });
              totalSeries.data.push({
                x: formattedData[0].data[i]?.x || 0,
                y: sum,
              });
            }
          }
          series.push(totalSeries);
        }

        this.chartdata = {
          chart: { type: "bar" },
          series: series,
        };
        this.sommaYUltimi7(this.chartdata);
        // console.log('chart data: ', this.chartdata);
        // console.log('sensori', this.hass.states['sensor.2_condizionatore_channel_1_power']);
        this.requestUpdate();
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati:", error);
      });
  }


  sommaYUltimi7(chartObj: any): number {
    // Cerchiamo la serie con nome "totale"
    const serieTotale = chartObj.series.find(
      (serie) => serie.name === "totale"
    );

    if (!serieTotale) {
      throw new Error("Serie 'totale' non trovata.");
    }

    // Prendiamo gli ultimi 7 elementi dell'array 'data'
    const ultimiSette = serieTotale.data.slice(-7);
    // console.log("ultimi7pv", ultimiSette);

    // Sommiamo i valori di y dei punti presi
    const somma = ultimiSette.reduce((acc, punto) => acc + punto.y, 0);
    this.totalWekkPvProduction = somma.toFixed(2);
    return somma;
  }

  private async initializeApexChart(chartOptions, containerId) {

    const chartContainer = await this.shadowRoot?.getElementById(containerId);
    if (chartContainer) {
      if (this.weekChart) {
        this.weekChart.destroy();
      }
    }

    const options = {
      chart: {
        type: "bar",
        height: this.chartHeight,
        events: {
          mounted: () => {
            this.setDefaultZoom();
            this.hideNonTotaleSeries(chartOptions.series);
          },
          resetZoom: () => {
            setTimeout(() => {
              this.setDefaultZoom();
            }, 100);
          },
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "dd/MM",
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return Math.round(val);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        custom: true,
        formatter: function (seriesName, opts) {
          const seriesColor = opts.w.globals.colors[opts.seriesIndex];
          return `
                    <button class="custom-legend-btn" style="border: 2px solid ${seriesColor}; background: none; color: ${seriesColor}; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                        ${seriesName}
                    </button>
                `;
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
      series: chartOptions.series.map((series) => ({
        ...series,
        visible: series.name === "totale",
      })),
    };

    this.weekChart = new ApexCharts(
      this.shadowRoot?.querySelector(`#${containerId}`),
      options
    );
    this.weekChart.render();
  }

  private setDefaultZoom() {
    if (!this.weekChart) return;

    const allDataPoints = this.weekChart.w.config.series[0].data;
    if (allDataPoints.length > 7) {
      const lastIndex = allDataPoints.length - 1;
      const firstIndex = Math.max(0, lastIndex - 6);
      const startDate = allDataPoints[firstIndex].x;
      const endDate = allDataPoints[lastIndex].x;

      this.weekChart.updateOptions(
        {
          xaxis: {
            min: startDate,
            max: endDate,
          },
        },
        false,
        false
      );
    }
  }

  private hideNonTotaleSeries(series) {
    if (!this.weekChart) return;

    series.forEach((seriesItem) => {
      if (seriesItem.name !== "totale") {
        this.weekChart.hideSeries(seriesItem.name);
      }
    });
  }

  // ************************* FINE GRAFICO daily *****************************

  private async _getApexCharts() {
    if (!window.ApexCharts) {
      const { default: ApexCharts } = await import("apexcharts");
      window.ApexCharts = ApexCharts;
    }
    return window.ApexCharts;
  }
  // *********************************      test new heatmap ****************************

  private waitForApexCharts(): Promise<void> {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (typeof ApexCharts !== "undefined") {
          clearInterval(interval);
          resolve(); // Risolve la Promise senza restituire alcun valore
        }
      }, 100); // Controlla ogni 100ms
    });
    
  }

  private updateDateRange(days: number) {
    const newStartTime = new Date(this.startTime);
    const newEndTime = new Date(this.endTime);
    newStartTime.setDate(newStartTime.getDate() + days);
    newEndTime.setDate(newEndTime.getDate() + days);

    // Assicura che endTime non superi il giorno attuale
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (newEndTime > today) {
      return; // Se si tenta di andare oltre oggi, non fare nulla
    }

    this.startTime = newStartTime;
    this.endTime = newEndTime;
    this.get_recorder_for_heatmap(); // Ricarica i dati con le nuove date
  }

  private get_recorder_for_heatmap() {
    const entitiesToPass = this.config.entities
      .filter((entry) => entry.sensor_meter)
      .map((entry) => entry.sensor_meter);

    const fetchAllData = () => {
      if (entitiesToPass.length === 0) {
        return Promise.resolve({});
      }
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: entitiesToPass,
        period: "hour",
        start_time: this.startTime.toISOString(),
        end_time: this.endTime.toISOString(),
        types: ["sum"],
      });
    };

    const fetchTotalPvMeter = () => {
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: [this.config.total_pv_meter],
        period: "hour",
        start_time: this.startTime.toISOString(),
        end_time: this.endTime.toISOString(),
        types: ["sum"],
      });
    };

    const processResponse = (recorderResponse, isSummed = false) => {
      // Converti alba e tramonto in formato HH:mm
      const dawnTime = new Date(this.dawnTime);
      const duskTime = new Date(this.duskTime);

      const dawnExtended = new Date(
        dawnTime.getTime() - 2 * 60 * 60 * 1000
      ).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const duskExtended = new Date(
        duskTime.getTime() + 1 * 60 * 60 * 1000
      ).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      let hourlyData = {}; // Oggetto per organizzare i dati per ora

      Object.keys(recorderResponse).forEach((sensor) => {
        let data = recorderResponse[sensor];

        if (data.length < 2) {
          console.warn(`Dati insufficienti per ${sensor}`);
          return;
        }

        data.forEach((entry, index) => {
          if (index === 0) return; // Il primo valore viene ignorato per il calcolo

          let previousEntry = data[index - 1]; // Valore precedente per la sottrazione
          let dailyValue = Number((entry.sum - previousEntry.sum).toFixed(2)); // Differenza arrotondata a 2 decimali

          let entryDate = new Date(entry.start);
          let hourKey =
            entryDate.getHours().toString().padStart(2, "0") + ":00"; // Formato "HH:00"
          let dateString = entryDate.toISOString().split("T")[0]; // Solo la data "YYYY-MM-DD"

          // Filtra solo le ore comprese tra 2 ore prima dell'alba e 1 ora dopo il tramonto
          if (hourKey < dawnExtended || hourKey > duskExtended) {
            return;
          }

          if (!hourlyData[hourKey]) {
            hourlyData[hourKey] = {};
          }

          if (!hourlyData[hourKey][dateString]) {
            hourlyData[hourKey][dateString] = 0;
          }

          // Se stiamo aggregando i sensori, sommiamo i valori
          if (isSummed) {
            hourlyData[hourKey][dateString] += dailyValue;
          } else {
            hourlyData[hourKey][dateString] = dailyValue;
          }
        });
      });

      // Convertiamo i dati nel formato richiesto (array con {name: 'HH:00', data: [...]})
      let formattedData = Object.keys(hourlyData)
        .sort((a, b) => parseInt(b) - parseInt(a)) // Ordine decrescente delle ore
        .map((hour) => ({
          name: hour,
          data: Object.keys(hourlyData[hour]).map((date) => ({
            x: date,
            y: Number(hourlyData[hour][date].toFixed(2)),
          })),
        }));

      const disableLeftButtonHeatmap =
        formattedData.length > 0 &&
        formattedData[formattedData.length - 1].data.length <= 6;

      this.heatmapObj = formattedData;

      this.initializeHeatmapChart2(formattedData);
      this.updateNavigatorButtonsHeatmap(disableLeftButtonHeatmap);
      return formattedData;
    };

    if (this.config.total_pv_meter) {
      fetchTotalPvMeter()
        .then((response) => processResponse(response, false)) // NO somma, il valore è già aggregato
        .catch((error) => {
          console.error("Errore nel recupero dei dati:", error);
        });
    } else {
      fetchAllData()
        .then((response) => processResponse(response, true)) // SOMMA tutti i sensori interrogati
        .catch((error) => {
          console.error("Errore nel recupero dei dati:", error);
        });
    }
  }

  async initializeHeatmapChart2(formattedData) {
    // const totalMaxPower =
    //   this.entities.reduce((sum, entity) => sum + (entity.max_power || 0), 0) /
    //   1000;
    const step = parseFloat((this.totalMaxPower / 5).toFixed(2));
    const totalMaxPowerArray = Array.from({ length: 6 }, (_, i) =>
      parseFloat(((i + 1) * step).toFixed(2))
    );
    await this.waitForApexCharts();

    // let formattedData = this.transformToHeatmapData();

    if (formattedData.length === 0) {
      console.warn(
        "Dati formattati vuoti. Impossibile inizializzare il grafico."
      );
      return;
    }

    // ✅ Aggiunge `min` e `max` a ogni serie
    formattedData = formattedData.map((series) => ({
      ...series,
      data: series.data.map((dataPoint) => ({
        ...dataPoint,
        min: 0, // Minimo comune per tutte le serie
        max: totalMaxPowerArray[5], // Massimo comune per tutte le serie
      })),
    }));

    const options = {
      chart: {
        type: "heatmap",
        height: 550,
        zoom: {
          enabled: true, // ✅ Abilita il zoom manuale
          autoScaleYaxis: true,
        },
      },
      series: formattedData, // ✅ Usa i dati aggiornati con `min` e `max`
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.8,
          useFillColorAsStroke: true,
          radius: 0,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: totalMaxPowerArray[0],
                color: "#280487",
                name: `0 - ${totalMaxPowerArray[0]}`,
              }, // Blu
              {
                from: totalMaxPowerArray[0],
                to: totalMaxPowerArray[1],
                color: "#b6346a",
              }, // Verde
              {
                from: totalMaxPowerArray[1],
                to: totalMaxPowerArray[2],
                color: "#df6d2e",
              }, // Giallo
              {
                from: totalMaxPowerArray[2],
                to: totalMaxPowerArray[3],
                color: "#efb03d",
              }, // Arancione
              {
                from: totalMaxPowerArray[3],
                to: totalMaxPowerArray[4],
                color: "#f8e36c",
              }, // Rosso
              {
                from: totalMaxPowerArray[4],
                to: totalMaxPowerArray[5],
                color: "#f3f4d0",
              }, // Bianco
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        formatter: function (seriesName, opts) {
          // Array di gradienti da assegnare in ordine
          const gradients = [
            "linear-gradient(to right, #280487, #8b2572)",
            "linear-gradient(to right, #8b2572, #c54855)",
            "linear-gradient(to right, #c54855, #df6d2f)",
            "linear-gradient(to right, #df6d2f, #e99838)",
            "linear-gradient(to right, #e99838, #f0c56c)",
            "linear-gradient(to right, #f0c56c, #f3f2cc)",
          ];

          // Determina il colore in base all'indice della serie
          const background = gradients[opts.seriesIndex] || "#ccc"; // Default a grigio se fuori range

          return `<button style="
          
          background:${background}; 
          color:white; 
          border:none; 
          flex-grow: 1
          border-radius: 0 !important;
          height: 35px; /* Altezza fissa per tutti i pulsanti */
          text-align: center;
          cursor:pointer;
          font-weight:bold;
          ;">
            ${seriesName}
        </button>`;
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: "var(--primary-text-color)",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "var(--primary-text-color)",
          },
        },
      },

      tooltip: {
        enabled: true,
        theme: "dark",
      },
      title: {
        text: "Produzione giornaliera",
        align: "center",
        style: {
          color: "#FFF",
        },
      },
    };

    const chartElement = this.shadowRoot?.querySelector("#heatmap-chart");
    if (!chartElement) {
      console.error("Elemento #heatmap-chart non trovato.");
      return;
    }

    if (this.chartMap) {
      this.chartMap.destroy();
    }

    this.chartMap = new ApexCharts(chartElement, options);
    // this.chartMap.render();
    this.chartMap.render().then(() => {
      // Combiniamo tutti i dati di tutte le serie in un unico array
      const allDataPoints = formattedData.flatMap((series) => series.data);

      // Verifica che ci siano dati
      if (!allDataPoints.length) {
        console.warn("Nessun dato disponibile per il grafico.");
        return;
      }

      // Ordina per asse X (tempo) se necessario
      allDataPoints.sort((a, b) => a.x - b.x);

      // Se ci sono più di 7 giorni di dati, limita la visualizzazione
      if (allDataPoints.length > 7) {
        const lastIndex = allDataPoints.length - 1;
        const firstIndex = Math.max(0, lastIndex - 6);
        const startDate = new Date(allDataPoints[firstIndex].x).getTime();
        const endDate = new Date(allDataPoints[lastIndex].x).getTime();

        // Converti x in Date per confronto
        formattedData.forEach((series) => {
          series.data.forEach((point) => {
            point.x = new Date(point.x); // Converti la stringa "YYYY-MM-DD" in un oggetto Date
          });
        });

        // Ordina per data (se non già ordinato)
        formattedData.forEach((series) => {
          series.data.sort((a, b) => a.x - b.x);
        });

        // Trova la data limite per gli ultimi 7 giorni
        const lastDate =
          formattedData[0].data[formattedData[0].data.length - 1].x;
        const firstDate = new Date(lastDate);
        firstDate.setDate(firstDate.getDate() - 6); // Ultimi 7 giorni

        // Filtra i dati per tenere solo gli ultimi 7 giorni
        const filteredData = formattedData.map((series) => ({
          name: series.name,
          data: series.data.filter((point) => point.x >= firstDate),
        }));

        // 🔥 Converti `x` in stringa per renderlo compatibile con Heatmap
        filteredData.forEach((series) => {
          series.data.forEach((point) => {
            point.x = point.x.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            });
          });
        });

        // 🔄 Aggiorna il grafico con i dati corretti
        this.chartMap.updateSeries(filteredData);
      }

      const chartContainer = this.shadowRoot?.querySelector("#heatmap-chart");
      // Controlla se il navigatore già esiste per evitare duplicati

      if (!this.shadowRoot?.querySelector(".chart-cutton-container")) {
        // Aggiunge l'HTML sotto il grafico
        chartContainer.insertAdjacentHTML(
          "afterend",
          `
          <div class="chart-cutton-container">
            <button class="chart-button-select" id="prev-day-heatmap">◀ Giorno Precedente</button>
            <div style="width: 2px; height: 80%; background-color: var(--divider-color); align-self: center;"></div>
            <button class="chart-button-select" id="reset-heatmap">Ripristina</button>
            <div style="width: 2px; height: 80%; background-color: var(--divider-color); align-self: center;"></div>
            <button class="chart-button-select" id="next-day-heatmap">Giorno Successivo ▶</button>
          </div>
        `
        );

        // Aggiungi gli event listener ai bottoni
        this.shadowRoot
          ?.querySelector("#prev-day-heatmap")
          ?.addEventListener("click", () => {
            this.updateDateRange(-1); // Cambia la data
            // Aggiorna lo stato dei pulsanti
          });
        this.shadowRoot
          ?.querySelector("#reset-heatmap")
          ?.addEventListener("click", () => {
            // this.initializeHeatmapChart2(formattedData);
            this.getNowTime();
            this.initializeHeatmapChart2(formattedData);
          });
        this.shadowRoot
          ?.querySelector("#next-day-heatmap")
          .addEventListener("click", () => this.updateDateRange(1));
      }
    });
  }

  private updateNavigatorButtonsHeatmap = (disableLeftButtonHeatmap) => {
    const nextButton = this.shadowRoot?.querySelector(
      "#prev-day-heatmap"
    ) as HTMLButtonElement;
    if (nextButton) {
      nextButton.disabled = disableLeftButtonHeatmap;
    }
  };

  private _moreinfo(entityinfo) {
    const popupEvent = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });

    // Utilizza 'as any' per aggirare la verifica del tipo
    (popupEvent as any).detail = { entityId: entityinfo };

    this.ownerDocument
      .querySelector("home-assistant")
      .dispatchEvent(popupEvent);
  }
}
