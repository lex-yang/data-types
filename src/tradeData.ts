import { IRedisConverter } from '@yanglex/data-connector';

export class TradeData {
	id: string;

	date: string;
	symbol: string;
	exchange: string;

	high: number;
	low: number;
	open: number;
	close: number;
	volume: number;

	adj_high: number;
	adj_low: number;
	adj_open: number;
	adj_close: number;
	adj_volume: number;

	wc_high?: number;
	wc_low?: number;
	wc_open?: number;
	wc_close?: number;
	wc_volume?: number;
	
	constructor (symbol: string, date: string, exchange: string) {
		this.id = date;

		this.symbol = symbol;
		this.date = date;
		this.exchange = exchange;
	}

	fromDictionary(dict: any) {
		this.high = dict.high;
		this.low = dict.low;
		this.open = dict.open;
		this.close = dict.close;
		this.volume = dict.volume;

		this.adj_high = dict.adj_high;
		this.adj_low = dict.adj_low;
		this.adj_open = dict.adj_open;
		this.adj_close = dict.adj_close;
		this.adj_volume = dict.adj_volume;
	}

	static firestoreConverter = {
		toFirestore: (data: TradeData) => ({
			date: data.date,
			symbol: data.symbol,
			exchange: data.exchange,
		
			high: data.high,
			low: data.low,
			open: data.open,
			close: data.close,
			volume: data.volume,
		
			adj_high: data.adj_high,
			adj_low: data.adj_low,
			adj_open: data.adj_open,
			adj_close: data.adj_close,
			adj_volume: data.adj_volume,
		}),
		fromFirestore: (snapshot: any) : TradeData => {
			const data = snapshot.data();
			const tradeData = new TradeData(data.symbol, data.date, data.exchange);
			
			tradeData.high = data.high;
			tradeData.low = data.low;
			tradeData.open = data.open;
			tradeData.close = data.close;
			tradeData.volume = data.volume;

			tradeData.adj_high = data.adj_high;
			tradeData.adj_low = data.adj_low;
			tradeData.adj_open = data.adj_open;
			tradeData.adj_close = data.adj_close;
			tradeData.adj_volume = data.adj_volume;
			
			return tradeData;
		}
	}
	static redisConverter : IRedisConverter<TradeData> = {
		toRedis: (tradeData: TradeData) : string => JSON.stringify(tradeData),
		fromRedis: (data: string) : TradeData => JSON.parse(data)
	}
}
