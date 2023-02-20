import userModal from "../Modals/Modaluser.js";
export const getalluser = async (req, res) => {
  try {
    const search = req.query.search;
    const keyword = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await userModal.find(keyword).select("-password");
    res.json({ data: users });
  } catch (error) {
    console.log("chat api:", error);
  }
};
