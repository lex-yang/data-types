import { IRedisConverter } from '@yanglex/data-connector/Redis';

export class Stock {
	id: string;
	name: string;
	roi: number;
	since: string;
	sector: string;

	constructor (name: string, id: string, roi: number, since: string, sector: string) {
		this.name = name;
		this.id = id;
		this.roi = roi;
		this.since = since;
		this.sector = sector;
	}
	static firestoreConverter = {
		toFirestore: (stock: Stock) => ({
			name: stock.name,
			roi: stock.roi,
			since: stock.since,
			sector: stock.sector,
		}),
		fromFirestore: (snapshot: any) : Stock => {
			const data = snapshot.data();
			return new Stock(data.name, snapshot.id, data.roi, data.since, data.sector);
		}
	}
	static redisConverter : IRedisConverter<Stock> = {
		toRedis: (stock: Stock) : string => JSON.stringify(stock),
		fromRedis: (data: string) : Stock => JSON.parse(data)
	}
}
