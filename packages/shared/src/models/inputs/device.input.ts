export class DeviceInput {
  constructor(id: string, name: string, type_id: string, config: any) {
    this.id = id;
    this.name = name;
    this.type_id = type_id;
    this.config = config;
  }

  id?: string;
  name: string;
  type_id: string;
  config: any;
}
