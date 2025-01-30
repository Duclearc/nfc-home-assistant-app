import HomeAssistant from "homeassistant";

let hass;

const getHassClient = (apiKey) =>
  hass ||
  new HomeAssistant({
    // Your Home Assistant host
    // Optional, defaults to http://locahost
    host: "http://homeassistant.local",

    // Your Home Assistant port number
    // Optional, defaults to 8123
    port: 8123,

    // Your long lived access token generated on your profile page.
    // Optional
    token: apiKey,

    // Your Home Assistant Legacy API password
    // Optional
    // password: 'api_password',

    // Ignores SSL certificate errors, use with caution
    // Optional, defaults to false
    ignoreCert: false,
  });



// {
//   "61bc0ea769e9d433ae603b3432b7bc3b": {
//     "name": "Living room window lamp",
//     "entities": [
//       [
//         "number.tz3210_mja6r5ix_ts0505b_on_level",
//         "number.tz3210_mja6r5ix_ts0505b_on_transition_time",
//         "number.tz3210_mja6r5ix_ts0505b_off_transition_time",
//         "number.tz3210_mja6r5ix_ts0505b_start_up_current_level",
//         "number.tz3210_mja6r5ix_ts0505b_start_up_color_temperature",
//         "update.tz3210_mja6r5ix_ts0505b_firmware",
//         "button.tz3210_mja6r5ix_ts0505b_identify",
//         "light.tz3210_mja6r5ix_ts0505b_light",
//         "select.tz3210_mja6r5ix_ts0505b_start_up_behavior"
//       ]
//     ]
//   }
// },
export const getDevices = async () => {

  console.log("Getting devices from Home Assistant...");


  const res = await hass.templates.render(`
{% set devices = states | map(attribute='entity_id') | map('device_id') | unique | reject('eq', None) | list %}
{%- set ns = namespace(devices = []) %}
{%- for device in devices %}
    {%- set entities = device_entities(device) | list %}
    {%- if entities %}
        {%- set ns.devices = ns.devices + [ 
            {
                "deviceId": device,
                "name": device_attr(device, "name"),
                "name_user": device_attr(device, "name_by_user"),
                "entities": entities
            }
        ] %}
    {%- endif %}
{%- endfor %}
{{ ns.devices }}
  `);

  const sanitizedRes = res.replace(/None/g, "null").replace(/'/g, '"');

  const allData = JSON.parse(sanitizedRes);
  const devicesWithEntities = allData.map((device) => ({
    id: device.id,
    name: device.name_user || device.name,
    entities: device.entities.filter((entity) => entity.includes("light") || entity.includes("switch")),
  }));
  const filteredDevices = devicesWithEntities.filter(device => device.entities.length > 0);
  console.log(filteredDevices);

  return filteredDevices;
};
