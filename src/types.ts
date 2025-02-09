import { HomeAssistant } from "custom-card-helpers";

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string;
  device_id?: string;
  area_id?: string;
  hidden?: boolean;
  entity_category?: "config" | "diagnostic";
  translation_key?: string;
  platform?: string;
  display_precision?: number;
}

export interface HomeAssistantFixed extends HomeAssistant {
  entities: { [id: string]: EntityRegistryDisplayEntry };
  connection: HomeAssistant["connection"] & {
    baseUrl: string; // Aggiunge la proprietà baseUrl
  };
  auth: HomeAssistant["auth"] & {
    token: string; // Aggiunge la proprietà token
  };
}

export interface WindowWithCards extends Window {
  customCards: unknown[];
}
