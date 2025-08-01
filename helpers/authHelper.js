import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error", error);
  }
};

export const compareHashPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
