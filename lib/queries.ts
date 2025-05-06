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

/**
 * Get a deal POC by deal id
 * @param dealId - the id of the deal
 * @returns the deal POC
 */
export const getDealPOC = async (dealId: string) => {
  try {
    return await prismaDB.pOC.findMany({
      where: { dealId },
    });
  } catch (error) {
    console.error("Error fetching deal POC", error);
    throw new Error("Error fetching deal POC");
  }
};
