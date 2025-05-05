// all our database queries for the app

import prismaDB from "./prisma";

/**
 * Get a user by their id
 * @param id - the id of the user
 * @returns the user
 */
export const getUserById = async (id: string) => {
  try {
    return await prismaDB.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error fetching user by id", error);
    throw new Error("Error fetching user by id");
  }
};
