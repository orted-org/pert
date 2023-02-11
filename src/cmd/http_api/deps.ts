import Logs from "../../util/logs";

export interface IAPIDependencies {
  
}

export async function InitiateDependencies(): Promise<IAPIDependencies> {
  Logs.ConfigureLogger();
  const deps: IAPIDependencies = {

  };
  return deps;
}