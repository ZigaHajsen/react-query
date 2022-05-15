export type Friend = {
  id: number;
  name: string;
};

export interface Hero extends Friend {
  id: number;
  name: string;
  alterEgo: string;
}
