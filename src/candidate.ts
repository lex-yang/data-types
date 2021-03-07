import { IRedisConverter } from '../stock/Redis';
import { Stock } from './stock';

export class Candidate extends Stock {

	constructor (name: string, id: string, roi: number, since: string, sector: string) {
		super(name, id, roi, since, sector);
	}
	static redisConverter : IRedisConverter<Candidate> = {
		toRedis: (candidate: Candidate) : string => JSON.stringify(candidate),
		fromRedis: (data: string) : Candidate => JSON.parse(data)
	}
}