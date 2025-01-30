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
export const getDevices = async (url: string, key: string) => {
  try {
    const res = await fetch(`${url}/api/template`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: `
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
{{ ns.devices }}`,
      }),
    });

    if (res.status !== 200) {
      console.error("Failed to get devices: ", res);
      throw new Error("Failed to get devices: " + res.status);
    }

    const devicesString = await res.text();

    const sanitizedRes = devicesString
      .replace(/None/g, "null")
      .replace(/'/g, '"');

    const allData = JSON.parse(sanitizedRes);

    const devicesWithEntities = allData.map((device: any) => ({
      id: device.deviceId,
      name: device.name_user || device.name,
      entities: device.entities.filter(
        (entity: any) => entity.includes("light.") || entity.includes("switch.")
      ),
    }));

    const filteredDevices = devicesWithEntities.filter(
      (device: any) => device.entities.length > 0
    );

    console.log(`Fetched ${filteredDevices.length} devices from HA`);

    return filteredDevices;
  } catch (error) {
    console.error("Error getting devices:", error);
    throw error;
  }
};
