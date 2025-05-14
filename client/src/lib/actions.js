import { getUsers } from "~/lib/api";

export async function signIn(value){
    const users = await getUsers();

    const existingUser = users.find((user) => user.username === value.username);
    if(!existingUser) {
        return console.log("account not found");
    }

    if(value.password !== existingUser.password){
        return console.log("Password Is Wrong!");
    }

    return existingUser;
}