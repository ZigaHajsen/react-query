export type Friend = {
  id: number;
  name: string;
};

export interface Hero extends Friend {
  id: number;
  name: string;
  alterEgo: string;
}

export type User = {
  id: string;
  channelId: string;
};

export type Channel = {
  id: string;
  courses: string[];
};

export type Color = {
  id: string;
  label: string;
};
