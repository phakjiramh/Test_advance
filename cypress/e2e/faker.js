import { faker } from '@faker-js/faker';
import bcrypt from "bcryptjs"

const passwordHash = bcrypt.hashSync("password", 10)

export const createFakeUser = ()=>({
    randomFirstName : faker.person.firstName(),
    randomLastName : faker.person.firstName(),
    randomEmail : faker.internet.email(),
    randomPassword: passwordHash,
})

// console.log('firstName',randomFirstName)
// console.log('lastname',randomFirstName)
// console.log('email',randomEmail)
// console.log('password', randomPassword)






