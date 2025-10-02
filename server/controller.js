const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Single hardcoded user
const DEFAULT_USER_ID = "6510c0a1b2f1c3d4e5f67890";

// 🔹 Get all comments as a nested threaded structure
const getComment = async (req, res) => {
  try {
    const allComments = await prisma.comment.findMany({
      include: { author: true },
      orderBy: { id: "asc" }
    });

    const commentMap = {};
    const rootComments = [];

    allComments.forEach(comment => {
      commentMap[comment.id] = { ...comment, children: [] };
    });

    allComments.forEach(comment => {
      if (!comment.parentId) rootComments.push(commentMap[comment.id]);
      else if (commentMap[comment.parentId])
        commentMap[comment.parentId].children.push(commentMap[comment.id]);
    });

    return res.status(200).json(rootComments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


const postComment = async (req, res) => {
  try {
    const { text, parentId } = req.body;
    if (!text || !text.trim())
      return res.status(400).json({ message: "Comments cannot be empty" });
    if (parentId) {
      const parent = await prisma.comment.findUnique({ where: { id: parentId } });
      if (!parent) return res.status(400).json({ error: "parentId not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        parentId: parentId || null,
        userId: DEFAULT_USER_ID, 
      },
      include: { author: true }, 
    });

    return res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};


const addLike = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: DEFAULT_USER_ID } });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


const deleted=async(req,res)=>{
  try{
    const deleted=await prisma.user.deleteMany({})
    return res.status(200).json({ message: "All comments deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { postComment, getComment, addLike, getUser, deleted};
