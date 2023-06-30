import ICard from '../interfaces/card';

const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export const getDeckMasters = async (name: string, abortSignal?: AbortSignal): Promise<ICard[]>  => {
  try {
    const response = await fetch(`${url}?fname=${name}`, { signal: abortSignal });
    if (!response.ok) throw new Error(response.statusText);
    const _data = await response.json();
    const data: ICard[] = _data.data;
    const filteredData = data.filter((c) => !['spell', 'trap', 'token', 'skill'].includes(c.frameType));
    return filteredData;
  } catch {
    return [];
  }
}