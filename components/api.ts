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
  return fetch(`${apiUrl}/raindrop/list`);
};

const makeRaindropCall = (item: ItemProps, collectionId: string) => {
  return fetch(`${apiUrl}/raindrop/${collectionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const getCollectionItemsCall = async (
  pageParam = 0,
  collectionName: string,
  domainFilter = "",
  pathFilter = ""
) => {
  const res = await fetch(
    `${apiUrl}/collection/${collectionName}?cursor=${pageParam}&domain=${domainFilter}&path=${pathFilter}`
  );
  const json = await res.json();
  return json;
};

const getCollectionInfoCall = async (collectionName: string) => {
  const res = await fetch(`${apiUrl}/collection/${collectionName}/info`);
  return await res.json();
};

const getBookmarkListCall = async () => {
  const response = await fetch(`${apiUrl}/item/bookmark/list`);
  const json = await response.json();
  return json;
};

const getCollectionListCall = async () => {
  const response = await fetch(`${apiUrl}/collection/list`);
  const json = await response.json();
  return json;
};

const clearCollectionCall = (collectionName: string) => {
  return fetch(`${apiUrl}/collection/${collectionName}/clear`, {
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
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const dropboxCall = async (link: string, path: string) => {
  const res = await fetch(`${apiUrl}/dropbox?path=${path}&url=${link}`);
  return await res.json();
};

const galleryItemsCall = async (pageParam = 0) => {
  const res = await fetch(`${apiUrl}/gallery?cursor=${pageParam}`);
  const json = await res.json();
  return json;
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
  getCollectionItemsCall,
  getCollectionInfoCall,
  dropboxCall,
  galleryItemsCall,
};
