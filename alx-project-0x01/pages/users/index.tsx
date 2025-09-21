
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserData, UserProps, UsersPageProps } from "@/interfaces";
import { useState } from "react";

const Users: React.FC<UsersPageProps> = ({ users }) => {
    const [user, setUser] = useState <UserData | null>(null)
    const [isModalOpen, setModalOpen]= useState(false)

    const handleAddUser = ( prevUser: UserData) => {
        setUser({... prevUser, id : users.length +1 })
    }

//   console.log(users[5])

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
            <h1 className=" text-2xl font-semibold">Users Details</h1>
            <button onClick={()=> setModalOpen(true)} className="bg-blue-700 px-4 py-2 rounded-full text-white">Add User</button>
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          {
            users?.map((user: UserProps) => (
              <UserCard 
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username} 
                email={user.email}
                address={user.address}
                phone={user.phone}
                website={user.website}
                company={user.company}
              />
            ))
          }
        </div>
      </main>
      {isModalOpen && (
        <UserModal onClose={()=> setModalOpen(false)} onSubmit={handleAddUser}/>

      )}
    </div>
  )
}

export async function getStaticProps(){
    const response= await fetch ("https://jsonplaceholder.typicode.com/users")
    const users = await response.json()

    return {
        props:{
            users
        }
     }
}

export default Users ;