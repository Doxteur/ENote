import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotes = async (req, res) => {
  const userId = req.userId;
  const notes = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      id: "asc",
    },
    include: {
      demandes: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return notes;
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return note;
};

export const updateNote = async (req, res) => {
  console.log("JD - Update note ",req.body);
  const { content } = req.body;
  const note = await prisma.post.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      content,
    },
  });

  return note;
};

export const deleteNote = async (req, res) => {
  const note = await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return note;
};
