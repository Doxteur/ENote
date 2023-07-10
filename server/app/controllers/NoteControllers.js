import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotes = async (req, res) => {
  const userId = req.userId;

  const notes = await prisma.post.findMany({
    where: {
      OR: [
        {
          authorId: userId,
        },
        {
          demandes: {
            some: {
              status: "accepted",
            },
          },
        },
      ],
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
              email: true,
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
  const { content } = req.body;

  // is allowed need to check on post and demandes
  const isAllowed = await prisma.post.findFirst({
    where: {
      id: parseInt(req.params.id),
      OR: [
        {
          authorId: req.userId,
        },
        {
          demandes: {
            some: {
              status: "accepted",
              userId: req.userId,
            },
          },
        },
      ],
    },
  });

  if(!isAllowed) {
    throw new Error("You are not allowed to modify this note");
  }

  const note = await prisma.post.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      content,
    },
    include: {
      demandes: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
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
