# photovoltaic-card
photovoltaic-card

![all](image/tablet.jpg)


  ```yaml
type: custom:photovoltaic-card
days: 15
entities:
  - pv: sensor.pv1
    max_power: 2500
    sensor_meter: sensor.consumo_giornaliero_pv1
    more_elements:
      - sensor.0xa4c138d9e90cb6c8_battery
  - pv: sensor.pv2
    max_power: 6000
    unit_of_mesurament: Kwh
    sensor_meter: sensor.consumo_giornaliero_pv2
  - pv: sensor.shellyem_05df18_channel_2_power
    max_power: 6000
    unit_of_mesurament: Kwh
    sensor_meter: sensor.consumo_giornaliero_shelly
grafic_forcast:
  forcast: sensor.solcast_pv_forecast_forecast_today
options:
  data_time_period: 12
tile_cards:
  - light.esp_bagni_luce_corridoio
  - light.luce_emma
  - light.esp_bagni_luce_corridoio
  - light.luce_emma
entity2: light.luce_emma
weather_entity: weather.forecast_casa
battery:
  battery_state: input_number.battery_power
  power: input_number.battery_power_2
  battery_meter: sensor.consumo_giornaliero_grid
  battery_to_inverter: input_number.energia_venduta
  more_elements:
    - sensor.0xa4c138d9e90cb6c8_battery

grid:
  grid_entity: input_number.energia_aquista
  max_power: 6000
  grid_meter: sensor.consumo_giornaliero_grid
  sell_energy: input_number.energia_venduta
inverter:
  more_elements:
    - sensor.0xa4c138d9e90cb6c8_battery
    - sensor.2_condizionatore_channel_1_energy
    - sensor.0xa4c1385d2f8c8977_battery
    - light.esp_bagni_luce_corridoio


```

 ```yaml
type: custom:photovoltaic-card
days: 15
entities:
  - pv: sensore di produzione istantania
    unit_of_mesurament: kWh <= unità di misuramenteo del sensore di produzione istantania. scomparirà presto e non saeà più necessario
    max_power: 2500 <= massima potenza erogabile dall'impianto
    sensor_meter: sensore meter di produzione giornaliera
    more_elements:
      - lista di entità che compaiono quando clicchi sulla tile del photovoltaico corrispondente
      - sensor.0xa4c138d9e90cb6c8_battery
  - pv: sensor.pv2
    max_power: 6000
    unit_of_mesurament: Kwh
    sensor_meter: sensor.consumo_giornaliero_pv2
  - pv: sensor.2_condizionatore_channel_1_power
    max_power: 6000
    unit_of_mesurament: watt
    sensor_meter: sensor.consumo_giornaliero_shelly
grafic_forcast:
  forcast: sensor.solcast_pv_forecast_forecast_today <= sensore si previsione di solcast
options:
  data_time_period: 12 <= valore iniziale di aggregazone (in minuti) dati nel sensore. è il valore iniziale dello slider.
tile_cards:
  - lista di entità che appaiono quando clicchi sul l'icona 123 del menù
  - light.esp_bagni_luce_corridoio
  - light.luce_emma
  - light.esp_bagni_luce_corridoio
  - light.luce_emma
weather_entity: weather.forecast_casa
battery:
  battery_state: input_number.battery_power <= sensore che indica la percentuale di carica della batteria
  power: input_number.battery_power_2 <= sensore che indica l'energia che la batteria sta cedendo o accumulando
  battery_meter: sensor.consumo_giornaliero_grid <= meter giornaliero della batteria
  more_elements: <= elenco delle entità che compaiono quando clicchi sulla tule batteria
    - sensor.0xa4c138d9e90cb6c8_battery 
    - sensor.2_condizionatore_channel_1_energy
    - sensor.0xa4c1385d2f8c8977_battery
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
grid:
  grid_entity: input_number.energia_aquista <= sensore di consumo  istantaneo 
  max_power: 3000 <= massima potenza dalla rete
  grid_meter: sensor.consumo_giornaliero_grid <= meter giornaliero del cosumo dalla rete
  energy_power: input_number.energia_venduta <= sensore istantaneo di energia venduta alla rete.  cambierà il nome in Energy_sell
inverter:
  more_elements: <= lista di entità che compaiono quando clicchi sulla tile inverter
    - sensor.0xa4c138d9e90cb6c8_battery
    - sensor.2_condizionatore_channel_1_energy
    - sensor.0xa4c1385d2f8c8977_battery
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
```

P.s.: mi sono resto conto che in battery manca il sensore di voltaggio della corrente continua e alternata. 
nella tile di default saranno 12v 2 220v ma se sono disponibili e configurati nella tile verranno mostrati i calori correnti.
è una piccola implementazione che farò domani