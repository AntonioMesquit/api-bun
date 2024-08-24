import { faker } from '@faker-js/faker'
import { users, restaurants } from './schema'
import { db } from './connection'
import chalk from 'chalk'

// reset bd 
await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow(' Database resetado 👌'))


// create customers 

await db.insert(users).values(
  [
    {
    name : faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer'
  },
  {
    name : faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer'
  },
  ]
)
console.log(chalk.yellow("Usuarios criados com sucesso!"))



// create manager 

const [restaurant] = await db.insert(users).values(
  {
  name : 'antonio',
  email: 'antonio@gmail.com',
  role: 'manager'
}).returning({
  id: users.id
})

console.log(chalk.yellow("Admin criado com sucesso!"))

// create restaurants
await db.insert(restaurants).values(
[{
  name : faker.company.name(),
  description: faker.lorem.paragraph(),
  managerId: restaurant.id
 }])

 console.log(chalk.yellow("Restaurante criado com sucesso!"))

console.log(chalk.yellow("Database com dados enviados com sucesso!"))