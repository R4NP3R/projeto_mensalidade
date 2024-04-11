import { prisma } from "../src/lib/prisma";


async function seed() {
  await prisma.gyms.create({
    data: {
      gymId: 'black-and-white-academy', 
      name: 'black and white academy'
    }
  })
}


seed().then(() => {
  console.log('Database Seeded!')
})