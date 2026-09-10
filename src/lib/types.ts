/** One row of the `gahwa_logs` table, as the app reads it. */
export type GahwaLog = {
  id: string;
  place_name: string;
  /** Stored as a DATE in Postgres, arrives as "YYYY-MM-DD". */
  date: string;
  rating: number;
  notes: string | null;
};
