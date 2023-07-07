import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDemandes = async (req, res) => {
  const userId = req.userId;
  // give me all demandes that are related to the user, the relation is on the post side so get all demande for each post
  const demandes = await prisma.demande.findMany({
    include: {
      post: {
        where: {
          authorId: userId,
        },
      },
    },
  });
  console.log("JD - getDemandes ", demandes);
  return notes;
};

// export const createNote = async (req, res) => {
//   const { title, content } = req.body;
//   const note = await prisma.post.create({
//     data: {
//       title,
//       content,
//     },
//   });
//   return note;
// };

// export const updateNote = async (req, res) => {
//   console.log("JD - Update note ",req.body);
//   const { content } = req.body;
//   const note = await prisma.post.update({
//     where: {
//       id: parseInt(req.params.id),
//     },
//     data: {
//       content,
//     },
//   });

//   return note;
// };

// export const deleteNote = async (req, res) => {
//   const note = await prisma.post.delete({
//     where: {
//       id: parseInt(req.params.id),
//     },
//   });

//   return note;
// };
