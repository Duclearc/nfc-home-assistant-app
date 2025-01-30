export type IconName = "lightbulb" | "alarm";

export type Dashboard = {
  //   id: string; // maybe not necessary as not being stored in a DB. Could leave out to save space.
  name: string; // name of dash/scene/group (e.g. "Wake up", "Cooking", "Movie night")
  urlBase: string; // base url for automation trigger
  apiKey: string; // api key for home assistant
  items: DashboardItem[];
};

export type DashboardItem = {
  automationPath: string; // automation trigger url
  // datasource: string; possible websocket url for
  icon: IconName;
  name: string;
};
