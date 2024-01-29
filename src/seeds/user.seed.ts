import mongoose from "mongoose";
import User from "../models/user.model";

mongoose.connect('mongodb://localhost:27017/mongostore', {
    family: 4
})

const seedUser = async () => {
    try {
      mongoose.connection.on("connected", async () => {
        
        const admUser = new User({
          user_name: "Admin",
          user_username: "Admin",
          user_password: "senhaadmin",
          user_role: "admin",
          user_image: "admin.png",
          user_email: "admin@email.com.br",
          user_phone: "99999-9999",
          user_city: "City",
          user_street: "Street",
          user_number: 0,
          user_cep: "22790-999"
        })
        
        const qtdUser = 6
        for (let index = 1; index < qtdUser; index++) {
          const newUser = new User({
            user_name: "User" + index,
            user_username: "UserName" + index,
            user_password: "senhauser" + index,
            user_role: "user",
            user_image: "user" + index + ".png",
            user_email: "user" + index + "@email.com.br",
            user_phone: "99999-999" + index,
            user_city: "City" + index,
            user_street: "Street" + index,
            user_number: index,
            user_cep: "22790-00" + index
          })
          
          await admUser.save()
          await newUser.save()
          
        }
        console.log("Usuários criados com sucesso")
        mongoose.disconnect()
      })
    } catch (error) {
      console.log("ERROR:", error)
      mongoose.disconnect()
    }
}

seedUser()