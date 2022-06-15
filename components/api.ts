import { apiUrl } from "../store/common";

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

const deleteCall = (item: ItemProps, collectionName: string) => {
  console.log(collectionName, item.id);
  return fetch(`${apiUrl}/item/${collectionName}/${item.id}`, {
    method: "DELETE",
  });
};

const keepCall = (item: ItemProps, from: string) => {
  return fetch(`${apiUrl}/item/move/${item.id}?target=keep&origin=${from}`);
};

const raindropCollectionListCall = () => {
  return fetch(`${apiUrl}/raindrop/collections`);
};

const makeRaindropCall = (item: ItemProps, collectionId: string) => {
  return fetch(`${apiUrl}/raindrop/${collectionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const getBookmarkListCall = async () => {
  const response = await fetch(`${apiUrl}/item/bookmark`);
  const json = await response.json();
  return json;
};

const sendToBookmarkCall = (item: ItemProps, path: string, origin: string) => {
  return fetch(`${apiUrl}/item/bookmark?from=${origin}&path=${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export {
  deleteCall,
  keepCall,
  raindropCollectionListCall,
  makeRaindropCall,
  getBookmarkListCall,
  sendToBookmarkCall,
};
