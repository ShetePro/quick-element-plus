import axios from "axios";

export type RequestDictProp = {
  url: string;
  method: "post" | "get";
  params: Record<string, any>;
  data: Record<string, any>;
};
export function requestDictByUrl(prop: RequestDictProp) {
  return axios.request(prop);
}
