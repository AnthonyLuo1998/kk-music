export interface CustomElectronApi {
  beforeWindowClose: (callback: (...args) => any) => any
}
