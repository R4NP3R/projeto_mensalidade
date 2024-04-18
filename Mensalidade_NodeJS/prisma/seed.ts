import { faker } from '@faker-js/faker';
import { Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { currentDate, generateSlug } from '../src/utlis';


async function seed() {

  await prisma.gyms.deleteMany()

  await prisma.gyms.create({
    data: {
      gymId: 'black-and-white-academy', 
      name: 'black and white academy'
    }
  })

  const insertClients: Prisma.ClientUncheckedCreateInput[] = []

  

  for (let i = 0; i < 114; i++) {
    let fakeDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), faker.number.int({min: 1, max: 30}))
    insertClients.push({
      name: faker.person.fullName(),
      cpf: faker.number.int({min: 12345678910, max: 92345678910}).toString(),
      phoneNumber: faker.number.int({min: 12345678910, max: 92345678910}).toString(),
      paymentDayDate: fakeDate,
      adress: faker.location.street(),
      adressNumber: faker.location.buildingNumber(),
      slug: generateSlug(faker.person.fullName()),
      gymId: 'black-and-white-academy',
    })
  }

  await Promise.all(insertClients.map((data) => {
    return prisma.client.create({
      data,
    })
  }))

}



seed().then(() => {
  console.log('Database Seeded!')
})