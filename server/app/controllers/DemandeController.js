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
export const createDemande = async (req, res) => {
  // demande is related to a note and a user, the user send a code via the body, in the note table the field of code is shareLink
  const { link } = req.body;
  const userId = req.userId;

  const existingDemande = await prisma.demande.findFirst({
    // where shareLink and userId is the same
    where: {
      post: {
        shareLink: link,
      },
      user: {
        id: userId,
      },
    },
  });

  if (existingDemande) {
    throw new Error("Vous avez déjà envoyé une demande pour cette note");
  }

  // get the note that has the shareLink
  const note = await prisma.post.findUnique({
    where: {
      shareLink: link,
    },
  });
  if (!note) {
    throw new Error("La note n'existe pas");
  }

  // create a demande with the noteId and the userId
  const demande = await prisma.demande.create({
    data: {
      post: {
        connect: {
          id: note.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return demande;
};

export const updateDemande = async (req, res) => {
  const { status } = req.body;

  // update table demande where id = req.params.id
  const note = await prisma.demande.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      status: status,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return note;
};

// export const deleteNote = async (req, res) => {
//   const note = await prisma.post.delete({
//     where: {
//       id: parseInt(req.params.id),
//     },
//   });

//   return note;
// };
