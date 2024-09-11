import UserModel from "../database/users.schema.js";

export const addCustomer = async (dto) => {
	const data = await UserModel.create(dto);
	if (data) {
		return data;
	} else {
		throw new Error("Server Error");
	}
};

// export const findCustomerBirthdays
