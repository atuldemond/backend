import axios from "axios";

export async function checkUserLoggedIn() {
  try {
    const response = await axios.get(
      `${process.env.DOMAIN_NAME}/database/profile`,
      {
        withCredentials: true,
      }
    );

    return response.status === 200; // This will return true if the response status is 200
  } catch (error) {
    return false;
  }
}
