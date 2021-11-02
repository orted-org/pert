// The name of variables must be same as that in DB and should contains all the fields that are there in the DB
export interface MTodo {
  id: string;
  title: string;
  description: string | null;
  status: boolean;
  updated_at: Date;
}
