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

const deleteCall = (itemId: string, collectionName: string) => {
  console.log(collectionName, itemId);
  return fetch(`${apiUrl}/item/${collectionName}/${itemId}`, {
    method: "DELETE",
  });
};

const trashCall = (item: ItemProps, origin: string) => {
  return fetch(`${apiUrl}/item/move/${item.id}?target=trash&origin=${origin}`);
};

const restoreCall = (item: ItemProps) => {
  return fetch(`${apiUrl}/item/move/${item.id}?target=new&origin=trash`);
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

const getCollectionListCall = async () => {
  const response = await fetch(`${apiUrl}/collection`);
  const json = await response.json();
  return json;
};

const clearCollectionCall = (collectionName: string) => {
  return fetch(`${apiUrl}/collection/${collectionName}`, {
    method: "DELETE",
  });
};

const manualCrawlCall = async () => {
  let bpCrawlResult = await fetch(`${apiUrl}/crawl/bp`);
  let isgCrawlResult = await fetch(`${apiUrl}/crawl/isg`);
  console.log(bpCrawlResult, isgCrawlResult);
  return { bpCrawlResult, isgCrawlResult };
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
  restoreCall,
  trashCall,
  raindropCollectionListCall,
  makeRaindropCall,
  getBookmarkListCall,
  sendToBookmarkCall,
  getCollectionListCall,
  clearCollectionCall,
  manualCrawlCall,
};
