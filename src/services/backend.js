const latency = 0;

function wait(ms = latency) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export class Backend {
}