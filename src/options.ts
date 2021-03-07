import { IRedisConverter } from '@yanglex/data-connector/Redis';

export class AgentOptions {
	id : string;
	last_date : string;
	built_date : string;
	kd_date : string;

	constructor (id: string, last_date: string, built_date: string, kd_date: string) {
		this.id = id;
		this.last_date = last_date;
		this.built_date = built_date;
		this.kd_date = kd_date;
	}
	static firestoreConverter = {
		toFirestore: (options: AgentOptions) => ({
			last_date: options.last_date,
			built_date: options.built_date,
		}),
		fromFirestore: (snapshot: any) : AgentOptions => {
			const data = snapshot.data();
			return new AgentOptions(snapshot.id, data.last_date, data.built_date, data.kd_date);
		}
	}
	static redisConverter : IRedisConverter<AgentOptions> = {
		toRedis: (options: AgentOptions) : string => JSON.stringify(options),
		fromRedis: (data: string) : AgentOptions => JSON.parse(data)
	}
}