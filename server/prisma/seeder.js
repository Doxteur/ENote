import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: bcrypt.hashSync("password1", 8),
      name: "User 1",
      posts: {
        create: [
          {
            title: "Post 1",
            content: "Content of Post 1",
            published: true,
          },
          {
            title: "Post 2",
            content: "Content of Post 2",
            published: false,
          },
        ],
      },
      profile: {
        create: {
          bio: "Bio of User 1",
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: bcrypt.hashSync("password2", 8),
      name: "User 2",
      posts: {
        create: [
          {
            title: "Post 1 by User 2",
            content: "Content of Post 1",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: "Bio of User 2",
        },
      },
    },
  });

  console.log("Seeding completed!");
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
