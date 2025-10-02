const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

  // 🔹 Create single hardcoded user
  const user1 = await prisma.user.upsert({
    where: { name: "Rodrickjesferhadley" }, // unique check
    update: {},
    create: {
      name: "Rodrickjesferhadley",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
  });

  // 🔹 Create main comment
  const comment1 = await prisma.comment.create({
    data: {
      text: "Hello today is a very good day to go out in a picnic with family.",
      like: 41,
      userId: user1.id, // 🔹 connect via userId
    },
  });

  // 🔹 Create reply to main comment
  const reply1 = await prisma.comment.create({
    data: {
      text: "Indeed, I cannot agree more.",
      like: 12,
      userId: user1.id,
      parentId: comment1.id, // 🔹 connect via parentId
    },
  });

  // 🔹 Nested reply
  const nestedReply1 = await prisma.comment.create({
    data: {
      text: "I don't know, it's raining where I'm from 🥲",
      like: 5,
      userId: user1.id,
      parentId: reply1.id,
    },
  });

  // 🔹 Another main comment
  await prisma.comment.create({
    data: {
      text: "This is a comment to say I am very happy,",
      like: 34,
      userId: user1.id,
    },
  });

  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
