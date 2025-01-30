export type IconName = "lightbulb" | "alarm";

export type DashboardConfig = {
  //   id: string; // maybe not necessary as not being stored in a DB. Could leave out to save space.
  /* name of dash/scene/group (e.g. "Wake up", "Cooking", "Movie night") */
  name: string;
  /* base url for automation trigger */
  urlBase: string;
  /* api key for home assistant */
  apiKey: string;
};

export type Dashboard = DashboardConfig & {
  items: DashboardItem[];
};

export type DashboardItem = {
  /* automation trigger url */
  automationPath: string;
  // datasource: string; possible websocket url for
  icon: IconName;
  name: string;
};
