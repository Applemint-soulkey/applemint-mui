import { apiUrl } from "../../store/common";

export interface ItemProps {
  id: string;
  text_content: string;
  url: string;
  domain: string;
  tags: string[];
  timestamp: string;
  source: string;
  path: string;
}

export const deleteCall = (item: ItemProps, collectionName: string) => {
  return fetch(`${apiUrl}/item/${collectionName}/${item.id}`, {
    method: "DELETE",
  });
};
