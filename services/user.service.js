import UserModel from "../database/users.schema.js";

export const addCustomer = async (dto) => {
	try {
		const data = await UserModel.create(dto);
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

// export const findCustomerBirthdays
