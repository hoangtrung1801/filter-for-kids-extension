import type { IType } from "~lib/Request";

class Model {
	public type: IType;

	public process(payload: any): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}

export default Model;
