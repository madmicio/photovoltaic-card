# photovoltaic-card
photovoltaic-card

![all](image/tablet.jpg)


  ```yaml
type: custom:photovoltaic-card
days: 15
entities:
  - pv: sensor.pv1
    unit_of_mesurament: kWh
    max_power: 2500
    sensor_meter: sensor.consumo_giornaliero_pv1
    more_elements:
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
  more_elements:
    - sensor.0xa4c138d9e90cb6c8_battery
    - sensor.2_condizionatore_channel_1_energy
    - sensor.0xa4c1385d2f8c8977_battery
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
    - light.esp_bagni_luce_corridoio
grid:
  grid_entity: input_number.energia_aquista
  max_power: 3000
  grid_meter: sensor.consumo_giornaliero_grid
  energy_power: input_number.energia_venduta
inverter:
  more_elements:
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